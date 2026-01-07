import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import {
  Sparkles,
  X,
  Mic,
  Send,
  Command,
  ChevronDown,
  FileText,
  Users,
  AlertCircle,
  BarChart,
  Database,
  Clock,
  Zap,
  MessageSquare,
  Search as SearchIcon,
  Type,
  Maximize2,
  Minimize2,
  Layout,
  PanelLeft,
  PanelRight,
  PanelTop,
  PanelBottom,
  Fullscreen,
  Plus,
  Globe,
  Video,
  Music,
  Layout as LayoutIcon,
  CheckSquare,
  Network,
  Info,
  Calendar,
  Grid,
  FileSearch,
  BookOpen
} from 'lucide-react';
import { CopilotAllSearch } from './intelligence/CopilotAllSearch';
import { CopilotKeywordSearch } from './intelligence/CopilotKeywordSearch';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  dataSource?: string;
  timeframe?: string;
  suggestions?: string[];
  actionCards?: ActionCard[];
  isTyping?: boolean;
}

interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: any;
  action: string;
}

interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  task?: string;
  avatar?: string;
  logs?: string[];
}

interface AttachedFile {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'uploading' | 'ready';
}

interface ChatSession {
  id: string;
  title: string;
  date: string;
  caseId: string;
}

interface IntelligenceSource {
  id: string;
  name: string;
  type: 'case' | 'file' | 'link' | 'video' | 'audio';
  active: boolean;
  count?: number; // for citations or internal pages
}

interface StudioModule {
  id: string;
  title: string;
  icon: any;
  color: string;
  description: string;
}

type DockPosition = 'right' | 'left' | 'top' | 'bottom' | 'full';

interface AICopilotProps {
  userRole: 'Case Lead' | 'Investigator' | 'Dept Admin' | 'Dept Head';
  currentCaseId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function AICopilot({ userRole, currentCaseId, isOpen: propIsOpen, onClose }: AICopilotProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = propIsOpen !== undefined ? propIsOpen : internalIsOpen;
  const [isMinimized, setIsMinimized] = useState(false);
  const [dockPosition, setDockPosition] = useState<DockPosition>('right');
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'keyword'>('chat');
  const [viewCaseId, setViewCaseId] = useState<string>(currentCaseId || 'global');
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(true);
  const [isStudioOpen, setIsStudioOpen] = useState(true);

  const [messagesByCase, setMessagesByCase] = useState<Record<string, Message[]>>({
    'global': [
      {
        id: '1',
        role: 'assistant',
        content: `Hello! I'm your AI Assistant. I'm here to help with case management tasks. What can I help you with today?`,
        timestamp: new Date(),
        suggestions: ['Show my open cases', 'Summarize evidence for Case #182', "Who's assigned to forensic tasks?"]
      }
    ]
  });

  const activeCaseId = viewCaseId;
  const messages = messagesByCase[activeCaseId] || [];

  const [agents, setAgents] = useState<Agent[]>([
    { id: '1', name: 'Analytical Engine', role: 'Data Analysis', status: 'idle' },
    { id: '2', name: 'Legal Scout', role: 'Compliance', status: 'idle' },
    { id: '3', name: 'Forensic Link', role: 'Digital Forensics', status: 'idle' }
  ]);

  const [sources, setSources] = useState<IntelligenceSource[]>([
    { id: 'src-1', name: 'Case #4521: Evidence Log', type: 'case', active: true },
    { id: 'src-2', name: 'Interrogations_Video_01', type: 'video', active: true },
    { id: 'src-3', name: 'Financial_Records_Excel', type: 'file', active: false },
    { id: 'src-4', name: 'Police_Report_Summary', type: 'file', active: true }
  ]);

  const [chatSessions] = useState<ChatSession[]>([
    { id: 'c1', title: 'Dubai Metro Fraud Analysis', date: 'Today', caseId: '#4521' },
    { id: 'c2', title: 'General Intelligence Query', date: 'Yesterday', caseId: 'global' }
  ]);

  const [searchSessions] = useState<ChatSession[]>([
    { id: 's1', title: 'Deep Search: Financial Anomaly', date: 'Today', caseId: '#4521' },
    { id: 's2', title: 'Global Entity Extraction', date: 'Yesterday', caseId: 'global' }
  ]);

  const [analysisSessions] = useState<ChatSession[]>([
    { id: 'a1', title: 'Cross-Case Correlation', date: 'Today', caseId: '#4521' },
    { id: 'a2', title: 'Risk Score Forecasting', date: 'Oct 24', caseId: 'global' }
  ]);

  const studioModules: StudioModule[] = [
    { id: 'audio', title: 'Audio Overview', icon: Music, color: 'bg-indigo-500/20 text-indigo-400', description: 'AI-generated podcast of your sources.' },
    { id: 'video', title: 'Video Overview', icon: Video, color: 'bg-emerald-500/20 text-emerald-400', description: 'Visual summary of key evidence.' },
    { id: 'mindmap', title: 'Mind Map', icon: Network, color: 'bg-purple-500/20 text-purple-400', description: 'Conceptual link analysis.' },
    { id: 'report', title: 'Reports', icon: FileText, color: 'bg-amber-500/20 text-amber-400', description: 'Formal investigation report.' },
    { id: 'flashcards', title: 'Flashcards', icon: BookOpen, color: 'bg-rose-500/20 text-rose-400', description: 'Study key facts and dates.' },
    { id: 'quiz', title: 'Quiz', icon: Info, color: 'bg-cyan-500/20 text-cyan-400', description: 'Test your case knowledge.' },
    { id: 'infographic', title: 'Infographic', icon: BarChart, color: 'bg-fuchsia-500/20 text-fuchsia-400', description: 'Data visualization summary.' },
    { id: 'slides', title: 'Slide deck', icon: LayoutIcon, color: 'bg-orange-500/20 text-orange-400', description: 'Presentation for the department.' },
    { id: 'table', title: 'Data table', icon: Grid, color: 'bg-blue-500/20 text-blue-400', description: 'Structured evidence extraction.' }
  ];

  // Resize State
  const [size, setSize] = useState({ width: 420, height: 650 });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const parent = scrollRef.current.parentElement;
      if (parent) {
        parent.scrollTop = parent.scrollHeight;
      }
    }
  }, [messages]);

  const startResizing = useCallback((edge: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeRef.current = edge;
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
    resizeRef.current = null;
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (!isResizing || !resizeRef.current) return;

    if (resizeRef.current === 'left') {
      const newWidth = window.innerWidth - e.clientX;
      if (newWidth > 300 && newWidth < 800) setSize(prev => ({ ...prev, width: newWidth }));
    } else if (resizeRef.current === 'right') {
      const newWidth = e.clientX;
      if (newWidth > 300 && newWidth < 800) setSize(prev => ({ ...prev, width: newWidth }));
    } else if (resizeRef.current === 'top') {
      const newHeight = window.innerHeight - e.clientY;
      if (newHeight > 300 && newHeight < 900) setSize(prev => ({ ...prev, height: newHeight }));
    } else if (resizeRef.current === 'bottom') {
      const newHeight = e.clientY;
      if (newHeight > 300 && newHeight < 900) setSize(prev => ({ ...prev, height: newHeight }));
    }
  }, [isResizing, size.width, size.height]);

  const toggleSource = (sourceId: string) => {
    setSources(prev => prev.map(s => s.id === sourceId ? { ...s, active: !s.active } : s));
  };

  const activeSourcesCount = sources.filter(s => s.active).length;

  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);

  const getRoleSpecificResponse = (query: string): { content: string; dataSource: string; timeframe: string; suggestions: string[]; actionCards?: ActionCard[] } => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('open cases') || lowerQuery.includes('my cases')) {
      if (userRole === 'Case Lead') {
        return {
          content: "You have 4 cases pending SLA review. Would you like to prioritize them? I've identified 2 high-priority cases that need immediate attention based on risk scores and deadlines.",
          dataSource: 'Case Management DB',
          timeframe: 'This Week',
          suggestions: ['View Dashboard', 'Assign Investigator', 'Download Report'],
          actionCards: [
            {
              id: '1',
              title: 'Case #4521 - Cyber Fraud',
              description: 'SLA: 2 days remaining',
              icon: AlertCircle,
              action: 'view-case-4521'
            }
          ]
        };
      }
    }
    return {
      content: "I can help you with case management, task tracking, evidence review, and team coordination. Try asking about your open cases or specific case details.",
      dataSource: 'AI Knowledge Base',
      timeframe: 'Real-time',
      suggestions: ['Show my cases', 'Recent updates', 'Help topics']
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: inputValue, timestamp: new Date() };

    // Update messages for current case
    setMessagesByCase((prev: Record<string, Message[]>) => ({
      ...prev,
      [activeCaseId]: [...(prev[activeCaseId] || []), userMessage]
    }));

    setInputValue('');
    setIsProcessing(true);

    // Simulate multi-agent activity
    if (inputValue.toLowerCase().includes('analyze') || inputValue.toLowerCase().includes('summarize')) {
      setAgents((prev: Agent[]) => prev.map(a =>
        a.id === '1' ? {
          ...a,
          status: 'processing',
          task: 'Cross-referencing data...',
          logs: ['Connecting to Case Database...', 'Fetching risk scores...', 'Analyzing anomaly patterns...']
        } : a
      ));
    }

    setTimeout(() => {
      const response = getRoleSpecificResponse(inputValue);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.content,
        timestamp: new Date(),
        dataSource: response.dataSource,
        timeframe: response.timeframe,
        suggestions: response.suggestions,
        actionCards: response.actionCards
      };

      setMessagesByCase((prev: Record<string, Message[]>) => ({
        ...prev,
        [activeCaseId]: [...(prev[activeCaseId] || []), aiMessage]
      }));

      setAgents((prev: Agent[]) => prev.map(a => ({ ...a, status: 'idle' as const, task: undefined })));
      setIsProcessing(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setIsListening(false);
        setInputValue("Show my open cases");
      }, 2000);
    }
  };

  const handleSuggestionClick = (suggestion: string) => setInputValue(suggestion);

  const getDockStyles = () => {
    switch (dockPosition) {
      case 'left':
        return { top: 0, left: 0, height: '100%', width: size.width };
      case 'top':
        return { top: 0, left: 0, width: '100%', height: size.height };
      case 'bottom':
        return { bottom: 0, left: 0, width: '100%', height: size.height };
      case 'full':
        return { top: 0, left: 0, width: '100%', height: '100%' };
      default: // right
        return { top: 0, right: 0, height: '100%', width: size.width };
    }
  };

  const getResizeHandle = () => {
    if (dockPosition === 'full') return null;
    let className = "absolute z-[60] hover:bg-blue-500/30 transition-colors cursor-";
    if (dockPosition === 'right') return <div className={className + "col-resize left-0 top-0 bottom-0 w-1"} onMouseDown={startResizing('left')} />;
    if (dockPosition === 'left') return <div className={className + "col-resize right-0 top-0 bottom-0 w-1"} onMouseDown={startResizing('right')} />;
    if (dockPosition === 'top') return <div className={className + "row-resize bottom-0 left-0 right-0 h-1"} onMouseDown={startResizing('bottom')} />;
    if (dockPosition === 'bottom') return <div className={className + "row-resize top-0 left-0 right-0 h-1"} onMouseDown={startResizing('top')} />;
    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={dockPosition === 'right' ? { x: 420 } : dockPosition === 'left' ? { x: -420 } : dockPosition === 'top' ? { y: -650 } : { y: 650 }}
          animate={{ x: 0, y: 0 }}
          exit={dockPosition === 'right' ? { x: 420 } : dockPosition === 'left' ? { x: -420 } : dockPosition === 'top' ? { y: -650 } : { y: 650 }}
          className="fixed z-50 bg-slate-900 border-slate-800 shadow-2xl"
          style={getDockStyles()}
        >
          {getResizeHandle()}

          <Card className="bg-slate-900/95 border-none h-full flex flex-col rounded-none">
            <CardHeader className="pb-3 border-b border-slate-800 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-base">
                      {dockPosition === 'full' ? 'Intelligence Command Center' : 'Advanced AI Assistant'}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[10px] font-medium">{userRole}</Badge>
                      {currentCaseId && <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20 text-[10px] font-medium">{currentCaseId}</Badge>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {/* Docking Menu */}
                  <div className="flex items-center gap-0.5 mr-2 bg-slate-950/50 p-1 rounded-lg border border-slate-800">
                    <Button variant="ghost" size="icon" onClick={() => setDockPosition('left')} className={`h-8 w-8 ${dockPosition === 'left' ? 'text-blue-400' : 'text-slate-500'}`}><PanelLeft className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDockPosition('right')} className={`h-8 w-8 ${dockPosition === 'right' ? 'text-blue-400' : 'text-slate-500'}`}><PanelRight className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDockPosition('top')} className={`h-8 w-8 ${dockPosition === 'top' ? 'text-blue-400' : 'text-slate-500'}`}><PanelTop className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDockPosition('bottom')} className={`h-8 w-8 ${dockPosition === 'bottom' ? 'text-blue-400' : 'text-slate-500'}`}><PanelBottom className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setDockPosition('full')} className={`h-8 w-8 ${dockPosition === 'full' ? 'text-blue-400' : 'text-slate-500'}`}><Fullscreen className="w-4 h-4" /></Button>
                  </div>

                  <Button variant="ghost" size="icon" onClick={() => setIsMinimized(!isMinimized)} className="text-slate-400 h-8 w-8"><ChevronDown className={`w-4 h-4 transition-transform ${isMinimized ? 'rotate-180' : ''}`} /></Button>
                  <Button variant="ghost" size="icon" onClick={() => onClose ? onClose() : setInternalIsOpen(false)} className="text-slate-400 h-8 w-8"><X className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Tabs */}
              {!isMinimized && (
                <div className="flex gap-2 mt-4 border-t border-slate-800 pt-3 flex-wrap">
                  {[
                    { id: 'chat', label: 'Chat', icon: MessageSquare },
                    { id: 'search', label: 'Deep Search', icon: SearchIcon },
                    { id: 'keyword', label: 'Analysis', icon: Type }
                  ].map((tab: { id: string, label: string, icon: any }) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-xs font-medium transition-all ${activeTab === tab.id
                        ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-600 hover:text-slate-200'
                        }`}
                    >
                      <tab.icon className="w-3.5 h-3.5" />
                      {tab.label}
                    </button>
                  ))}
                </div>
              )}
            </CardHeader>

            {!isMinimized && (
              <CardContent className="flex-1 overflow-hidden p-0 flex flex-col">
                <div className={`flex-1 flex overflow-hidden ${dockPosition === 'full' ? 'flex-row' : 'flex-col'}`}>
                  {/* Multi-Panel Layout Sidebars (Full Screen only) */}
                  {dockPosition === 'full' && (
                    <>
                      {/* 1. History Sidebar (Tab-Specific) */}
                      <div className="w-64 border-r border-slate-800 flex flex-col bg-slate-900/50 shrink-0 overflow-hidden">
                        <div className="p-4 border-b border-slate-800 flex items-center justify-between shrink-0 h-14 bg-slate-900/80">
                          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                            {activeTab === 'chat' ? 'Chat History' : activeTab === 'search' ? 'Search History' : 'Analysis History'}
                          </h3>
                          <Clock className="w-3.5 h-3.5 text-slate-600" />
                        </div>
                        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-hide">
                          {(activeTab === 'chat' ? chatSessions : activeTab === 'search' ? searchSessions : analysisSessions).map((session: ChatSession) => (
                            <button
                              key={session.id}
                              onClick={() => setViewCaseId(session.caseId)}
                              className={`w-full text-left p-2.5 rounded-xl transition-all group border ${session.caseId === activeCaseId ? 'bg-blue-600/10 border-blue-500/30 shadow-lg shadow-blue-500/5' : 'hover:bg-slate-800/50 border-transparent opacity-70 hover:opacity-100'}`}
                            >
                              <div className="flex items-center gap-2.5">
                                <div className={`w-1.5 h-1.5 rounded-full ${session.caseId === activeCaseId ? 'bg-blue-500' : 'bg-slate-700'}`} />
                                <span className={`text-[11px] truncate leading-tight ${session.caseId === activeCaseId ? 'text-white font-bold' : 'text-slate-400 group-hover:text-slate-200'}`}>
                                  {session.title}
                                </span>
                              </div>
                              <div className="flex items-center justify-between mt-2 pl-4 opacity-70">
                                <span className="text-[9px] text-slate-500 font-mono tracking-tighter">{session.caseId}</span>
                                <span className="text-[9px] text-slate-600">{session.date}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="p-4 border-t border-slate-800/50 bg-slate-900/30">
                          <Button variant="ghost" className="w-full text-[10px] text-slate-500 hover:text-white justify-start gap-2 h-8 px-2 rounded-lg hover:bg-slate-800">
                            <Plus className="w-3 h-3" /> New {activeTab === 'chat' ? 'Thread' : activeTab === 'search' ? 'Search' : 'Analysis'}
                          </Button>
                        </div>
                      </div>

                      {/* 2. Collapsible Sources Hub Toggle Bar */}
                      <div className="flex flex-row overflow-hidden relative">
                        {/* Toggle Bar Vertical */}
                        <div className="w-10 border-r border-slate-800 flex flex-col items-center py-4 gap-6 bg-slate-950/80 z-20">
                          <button
                            onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                            className={`p-2 rounded-lg transition-all ${isSourcesOpen ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'}`}
                          >
                            <Database className="w-4 h-4" />
                          </button>
                          <div className="flex-1 flex flex-col items-center gap-4">
                            <div className="w-[1px] h-12 bg-slate-800" />
                            <span className="[writing-mode:vertical-lr] text-[9px] font-bold text-slate-600 tracking-widest uppercase rotate-180">Sources Hub</span>
                          </div>
                        </div>

                        {/* Actual Sources Panel */}
                        <motion.div
                          initial={false}
                          animate={{ width: isSourcesOpen ? 280 : 0 }}
                          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                          className="border-r border-slate-800 bg-slate-950/20 overflow-hidden shrink-0 h-full"
                        >
                          <div className="w-[280px] h-full flex flex-col">
                            <div className="p-5 border-b border-slate-800/50 h-14 bg-slate-900/20 flex items-center justify-between">
                              <h3 className="text-xs font-bold text-white tracking-wide">ANALYSIS CONTEXT</h3>
                              <Badge className="bg-blue-500/10 text-blue-400 border-none text-[9px]">{activeSourcesCount}</Badge>
                            </div>
                            <div className="flex-1 overflow-y-auto p-5 space-y-4 shadow-inner">
                              <div className="bg-gradient-to-br from-blue-600/20 via-cyan-600/10 to-transparent border border-blue-500/20 rounded-2xl p-4 group cursor-pointer hover:border-blue-500/40 transition-all">
                                <div className="flex items-center gap-2.5 mb-2">
                                  <Sparkles className="w-4 h-4 text-blue-400" />
                                  <span className="text-[11px] font-bold text-blue-300">Case Correlation</span>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Link multi-case intelligence for pattern discovery.</p>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest pl-1">Active Sources</h4>
                                {sources.map((source: IntelligenceSource) => (
                                  <div
                                    key={source.id}
                                    onClick={() => toggleSource(source.id)}
                                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${source.active ? 'bg-slate-900 border-slate-800 shadow-md ring-1 ring-white/5' : 'hover:bg-slate-900/40 border-transparent opacity-40'}`}
                                  >
                                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${source.active ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 'bg-slate-900 text-slate-600'}`}>
                                      {source.type === 'case' && <Database className="w-3.5 h-3.5" />}
                                      {source.type === 'video' && <Video className="w-3.5 h-3.5" />}
                                      {source.type === 'file' && <FileText className="w-3.5 h-3.5" />}
                                      {source.type === 'link' && <Globe className="w-3.5 h-3.5" />}
                                    </div>
                                    <div className="overflow-hidden flex-1">
                                      <p className={`text-[11px] truncate font-bold ${source.active ? 'text-white' : 'text-slate-500'}`}>{source.name}</p>
                                      <p className="text-[9px] text-slate-600 font-medium capitalize mt-0.5">{source.type}</p>
                                    </div>
                                    {source.active && <CheckSquare className="w-3.5 h-3.5 text-blue-500" />}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="p-4 border-t border-slate-800/50 bg-slate-900/10">
                              <Button className="w-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 h-9 rounded-xl text-xs gap-2">
                                <Plus className="w-3.5 h-3.5" /> Add Intelligence
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </>
                  )}

                  {/* 3. Main Content Area */}
                  <div className="flex-1 flex flex-col overflow-hidden bg-slate-950/20 relative">
                    <div className="h-14 border-b border-slate-800 px-6 flex items-center justify-between shrink-0 bg-slate-900/30">
                      <div className="flex items-center gap-4">
                        <h2 className="text-sm font-semibold text-white tracking-tight">
                          {activeTab === 'chat' ? 'Interactive Analysis' : activeTab === 'search' ? 'Discovery Hub' : 'Forensic Insights'}
                        </h2>
                        <div className="h-4 w-[1px] bg-slate-800" />
                        <div className="flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 select-none">
                          <span className="text-[10px] font-bold text-blue-400 tracking-tight uppercase">{activeSourcesCount} Sources Linked</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 text-[10px] text-slate-500 hover:text-white px-2">Export Data</Button>
                      </div>
                    </div>

                    {activeTab === 'chat' ? (
                      <div className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 scrollbar-hide" ref={scrollRef}>
                          <div className="max-w-4xl mx-auto space-y-8 pb-10">
                            {messages.map((message: Message) => (
                              <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-slate-900 shadow-2xl'} rounded-2xl px-6 py-5 ring-1 ring-black/5`}>
                                  {message.role === 'assistant' && (
                                    <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                                      <div className="flex items-center gap-2.5">
                                        <div className="w-6 h-6 rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center shadow-lg">
                                          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                                        </div>
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">System Intelligence</span>
                                      </div>
                                      {message.dataSource && (
                                        <Badge className="bg-slate-900 text-white border-none text-[9px] hover:bg-slate-800 px-2 py-0.5">{message.dataSource}</Badge>
                                      )}
                                    </div>
                                  )}

                                  <div className="text-sm leading-relaxed font-medium whitespace-pre-wrap">
                                    {message.content}
                                  </div>

                                  {message.actionCards && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                                      {message.actionCards.map((card: ActionCard) => (
                                        <div key={card.id} className="bg-slate-50 border border-slate-200 rounded-2xl p-4 hover:bg-white hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer group flex items-start gap-4 ring-1 ring-black/5">
                                          <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-sm text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <card.icon className="w-5 h-5" />
                                          </div>
                                          <div>
                                            <h4 className="text-xs font-black text-slate-800 mb-1">{card.title}</h4>
                                            <p className="text-[10px] text-slate-500 font-bold leading-snug">{card.description}</p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  <div className={`text-[10px] mt-4 font-bold opacity-40 uppercase tracking-widest ${message.role === 'user' ? 'text-white' : 'text-slate-400'}`}>
                                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>
                              </div>
                            ))}
                            {isProcessing && (
                              <div className="flex gap-4 text-blue-400 px-4 italic text-sm items-center max-w-4xl mx-auto py-6">
                                <div className="relative">
                                  <motion.div
                                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="absolute inset-0 bg-blue-500 rounded-full blur-md"
                                  />
                                  <div className="relative w-8 h-8 rounded-full bg-slate-900 border border-blue-500/50 flex items-center justify-center shadow-lg">
                                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                                  </div>
                                </div>
                                <div className="flex flex-col">
                                  <span className="font-bold tracking-wider text-xs uppercase opacity-80">Orchestrating multi-agent fabric</span>
                                  <span className="text-[10px] text-slate-500 not-italic font-mono">Parallel processing sequence active...</span>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-8 border-t border-slate-800 bg-slate-950/40 backdrop-blur-xl">
                          <div className="max-w-4xl mx-auto flex gap-4 items-end">
                            <div className="flex-1 relative bg-slate-900/80 border border-slate-800/80 rounded-[2rem] shadow-2xl focus-within:border-blue-500/50 transition-all p-1.5 backdrop-blur-sm group">
                              <textarea
                                value={inputValue}
                                onChange={(e: any) => setInputValue(e.target.value)}
                                onKeyPress={(e: any) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                                placeholder="Execute command or consult intelligence sources..."
                                className="w-full bg-transparent border-none text-white px-6 py-4 text-base focus:ring-0 resize-none min-h-[60px] max-h-[300px] font-medium placeholder:text-slate-600"
                              />
                              <div className="flex items-center justify-between px-4 pb-3">
                                <div className="flex gap-2">
                                  <Badge className="bg-blue-600 text-white border-none text-[9px] font-black px-2 shadow-sm rounded-md tracking-tighter">
                                    {activeSourcesCount} SOURCES ACTIVE
                                  </Badge>
                                  <button className="text-slate-500 hover:text-white transition-all"><LayoutIcon className="w-3.5 h-3.5" /></button>
                                </div>
                                <div className="flex items-center gap-3">
                                  <button onClick={handleVoiceInput} className={`p-2 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)] animate-pulse' : 'text-slate-500 hover:text-white hover:bg-slate-800'}`}>
                                    <Mic className="w-4 h-4" />
                                  </button>
                                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()} className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-[44px] px-6 shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2 group-focus-within:scale-105">
                                    <span className="text-xs font-bold uppercase tracking-widest">Send</span>
                                    <Send className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="text-center text-[10px] text-slate-700 mt-6 font-bold tracking-tighter uppercase opacity-50">AI decision support system • Intelligence agency restricted access</p>
                        </div>
                      </div>
                    ) : activeTab === 'search' ? (
                      <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <CopilotAllSearch />
                      </div>
                    ) : (
                      <div className="flex-1 overflow-y-auto scrollbar-hide">
                        <CopilotKeywordSearch />
                      </div>
                    )}
                  </div>

                  {/* 4. Collapsible Studio Panel */}
                  {dockPosition === 'full' && (
                    <div className="flex flex-row overflow-hidden relative">
                      {/* Toggle Bar Vertical (Right side) */}
                      <div className="w-10 border-l border-slate-800 flex flex-col items-center py-4 gap-6 bg-slate-950/80 z-20">
                        <button
                          onClick={() => setIsStudioOpen(!isStudioOpen)}
                          className={`p-2 rounded-lg transition-all ${isStudioOpen ? 'bg-amber-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'}`}
                        >
                          <Zap className="w-4 h-4" />
                        </button>
                        <div className="flex-1 flex flex-col items-center gap-4">
                          <div className="w-[1px] h-12 bg-slate-800" />
                          <span className="[writing-mode:vertical-lr] text-[9px] font-bold text-slate-600 tracking-widest uppercase">Intelligence Studio</span>
                        </div>
                      </div>

                      {/* Actual Studio Panel */}
                      <motion.div
                        initial={false}
                        animate={{ width: isStudioOpen ? 320 : 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="bg-slate-900/80 overflow-hidden shrink-0 h-full border-l border-slate-800/50"
                      >
                        <div className="w-[320px] h-full flex flex-col">
                          <div className="p-6 h-14 bg-slate-950/20 flex items-center justify-between border-b border-slate-800/50">
                            <h3 className="text-xs font-black text-white tracking-[0.2em] uppercase">Studio Outputs</h3>
                            <Zap className="w-4 h-4 text-amber-500 fill-amber-500/20" />
                          </div>

                          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
                            <div>
                              <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-4">Analytical Modules</h4>
                              <div className="grid grid-cols-2 gap-3">
                                {studioModules.map((module) => (
                                  <motion.div
                                    whileHover={{ scale: 1.02, translateY: -2 }}
                                    key={module.id}
                                    className={`${module.color} rounded-2xl p-4 border border-white/5 cursor-pointer shadow-xl relative group overflow-hidden ring-1 ring-white/5`}
                                  >
                                    <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Plus className="w-3 h-3 text-white/50" />
                                    </div>
                                    <module.icon className="w-6 h-6 mb-3 opacity-80" />
                                    <h4 className="text-[11px] font-black tracking-tight leading-tight">{module.title}</h4>
                                  </motion.div>
                                ))}
                              </div>
                            </div>

                            <div className="border-t border-slate-800/80 pt-8">
                              <h4 className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-5">Agent Fabrication State</h4>
                              <div className="space-y-5">
                                {agents.map((agent: Agent) => (
                                  <div key={agent.id} className="flex gap-4">
                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${agent.status === 'processing' ? 'bg-blue-600/20 border border-blue-500/30' : 'bg-slate-950 border border-slate-800'}`}>
                                      <Zap className={`w-4 h-4 ${agent.status === 'processing' ? 'text-blue-400 animate-pulse' : 'text-slate-700'}`} />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                      <div className="flex items-center justify-between mb-1.5">
                                        <span className="text-[11px] font-black text-slate-200 uppercase tracking-tighter">{agent.name}</span>
                                        <span className={`text-[8px] px-2 py-0.5 rounded-full font-bold ${agent.status === 'processing' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'bg-slate-950 text-slate-600'}`}>{agent.status.toUpperCase()}</span>
                                      </div>
                                      <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-[1px]">
                                        {agent.status === 'processing' && (
                                          <motion.div
                                            initial={{ x: '-100%' }}
                                            animate={{ x: '100%' }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                            className="h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent shadow-[0_0_10px_rgba(59,130,246,1)] rounded-full"
                                          />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="p-6 border-t border-slate-800 shadow-2xl bg-slate-950/20">
                            <Button className="w-full bg-slate-50 text-slate-900 hover:bg-white rounded-2xl font-black text-xs h-12 gap-3 mb-4 shadow-xl shadow-white/5 flex items-center justify-center tracking-widest uppercase transition-all hover:scale-[1.02]">
                              <Plus className="w-4 h-4" /> Save Analysis Note
                            </Button>
                            <p className="text-[9px] text-slate-700 text-center font-black uppercase tracking-tighter opacity-60">Outputs synchronized with evidence database</p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
