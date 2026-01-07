import { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CaseDetailsView } from './CaseDetailsView';
import { Clock, Users, FolderOpen, X, ChevronRight, TrendingUp, AlertCircle, Zap, Brain, Link2, UserX, Hourglass, TrendingDown, ArrowRight, AlertTriangle, Lock, FileText } from 'lucide-react';
import { Smartphone, Shield, Target, ChevronDown, ChevronUp, BarChart3, LayoutGrid, Calendar as CalendarIcon, History, List } from 'lucide-react';
import { CaseAnalytics } from './CaseAnalytics';
import { CaseFilterBar } from './CaseFilterBar';
import { CaseTimelineView } from './CaseTimelineView';
import { CaseTableView, Case } from './CaseTableView';


interface CasesViewProps {
  onTaskSelect?: (task: any) => void;
}

const cases: Case[] = [
  {
    id: '#54',
    name: 'Vehicle Theft Investigation',
    type: 'Criminal Defense',
    status: 'In Progress',
    priority: 'High',
    health: 'critical',
    healthScore: 32,
    riskTrend: 'up',
    momentum: 'slowing',
    sla: 'at-risk',
    aiFlagged: true,
    crossLinked: true,
    daysOpen: 45,
    startDate: '2023-11-15',
    endDate: '2024-01-10',
    investigatorOverloaded: true,
    investigator: 'Sarah Chen',
    leadInvestigator: { name: 'Sarah Chen', initials: 'SC', avatar: '' },
    lastUpdated: '2 hours ago',
  },
  {
    id: '#53',
    name: 'Corporate Fraud Case',
    type: 'White Collar',
    status: 'Review',
    priority: 'Medium',
    health: 'high',
    healthScore: 78,
    riskTrend: 'down',
    momentum: 'advancing',
    sla: 'approaching',
    aiFlagged: false,
    crossLinked: false,
    daysOpen: 15,
    startDate: '2023-12-01',
    endDate: '2023-12-20',
    investigatorOverloaded: false,
    investigator: 'David Kim',
    leadInvestigator: { name: 'David Kim', initials: 'DK', avatar: '' },
    lastUpdated: '5 hours ago',
  },
  {
    id: '#52',
    name: 'Civil Litigation Support',
    type: 'Civil',
    status: 'Active',
    priority: 'High',
    health: 'critical',
    healthScore: 45,
    riskTrend: 'up',
    momentum: 'stalled',
    sla: 'at-risk',
    aiFlagged: true,
    crossLinked: false,
    daysOpen: 8,
    startDate: '2023-12-25',
    endDate: '2024-01-05',
    investigatorOverloaded: true,
    investigator: 'John Smith',
    leadInvestigator: { name: 'John Smith', initials: 'JS', avatar: '' },
    lastUpdated: '1 day ago',
  },
  {
    id: '#51',
    name: 'Financial Audit Exception',
    type: 'Compliance',
    status: 'Under Investigation',
    priority: 'Critical',
    health: 'high',
    healthScore: 82,
    riskTrend: 'stable',
    momentum: 'advancing',
    sla: 'at-risk',
    aiFlagged: true,
    crossLinked: true,
    daysOpen: 67,
    startDate: '2023-10-20',
    endDate: '2023-12-30',
    investigatorOverloaded: false,
    investigator: 'Kevin Wang',
    leadInvestigator: { name: 'Kevin Wang', initials: 'KW', avatar: '' },
    lastUpdated: '3 hours ago',
  }
];

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'Critical': return 'bg-red-500/10 text-red-500 border-red-500/20';
    case 'High': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
    case 'Medium': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    case 'Low': return 'bg-green-500/10 text-green-500 border-green-500/20';
    default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
  }
};

const getStatusColor = (status: string) => {
  const statusMap: Record<string, string> = {
    'In Progress': 'bg-blue-600/20 text-blue-400 border-blue-500/30',
    'Review': 'bg-purple-600/20 text-purple-400 border-purple-500/30',
    'Active': 'bg-green-600/20 text-green-400 border-green-500/30',
    'Under Investigation': 'bg-cyan-600/20 text-cyan-400 border-cyan-500/30',
    'Pending': 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30',
    'Closed': 'bg-red-600/20 text-red-400 border-red-500/30'
  };
  return statusMap[status] || 'bg-slate-600/20 text-slate-400 border-slate-500/30';
};

const getAvatarColor = (index: number) => {
  const colors = [
    'bg-blue-600',
    'bg-purple-600',
    'bg-cyan-600',
    'bg-green-600',
    'bg-orange-600',
    'bg-pink-600'
  ];
  return colors[index % colors.length];
};

const intelligenceInsights = [
  {
    id: 'insight-1',
    type: 'shared-entity',
    icon: Users,
    title: '1 person entity appears across 3 fraud cases in different districts',
    description: 'Marcus Chen identified as victim in Case #53, witness in Case #49, and complainant in Case #51',
    confidence: 94,
    dataSources: ['Case Management DB', 'Public Records', 'District Integration API'],
    reasoning: 'Entity linking algorithm detected name match with 98.7% similarity across jurisdictions. Cross-referenced with DMV records and employment history. Timeline analysis shows consistent geographic patterns.',
    relatedCases: ['#53', '#49', '#51'],
    iconColor: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  }
];

export function CasesView({ onTaskSelect }: CasesViewProps) {
  const [activeCaseTab, setActiveCaseTab] = useState('all-cases');
  const [openCaseTabs, setOpenCaseTabs] = useState<Array<{ id: string; name: string; data: Case }>>([]);
  const [healthFilter, setHealthFilter] = useState<string>('all');
  const [smartView, setSmartView] = useState<string>('none');
  const [showIntelligencePanel, setShowIntelligencePanel] = useState(false);
  const [expandedInsight, setExpandedInsight] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'ai-priority' | 'risk-level' | 'sla-pressure' | 'last-updated' | 'investigator' | 'days-open' | 'priority'>('ai-priority');
  const [viewMode, setViewMode] = useState<'command' | 'analytics' | 'timeline' | 'table'>('command');
  const [filters, setFilters] = useState({
    searchQuery: '',
    dateRange: 'all',
    investigator: 'all',
    priority: 'all'
  });
  const [pinnedCaseIds, setPinnedCaseIds] = useState<string[]>(['#54']);
  const [selectedCases, setSelectedCases] = useState<string[]>([]);


  const handleOpenFullDetail = (caseData: any) => {
    const tabId = `case-${caseData.id}`;
    if (!openCaseTabs.find(tab => tab.id === tabId)) {
      setOpenCaseTabs([...openCaseTabs, { id: tabId, name: caseData.name, data: caseData }]);
    }
    setActiveCaseTab(tabId);
  };

  const togglePinCase = (e: React.MouseEvent, caseId: string) => {
    e.stopPropagation();
    setPinnedCaseIds(prev =>
      prev.includes(caseId) ? prev.filter(id => id !== caseId) : [...prev, caseId]
    );
  };

  const handleCloseCaseTab = (tabId: string) => {
    setOpenCaseTabs(openCaseTabs.filter(tab => tab.id !== tabId));
    setActiveCaseTab('all-cases');
  };

  const handleSelectCase = (caseId: string) => {
    setSelectedCases(prev =>
      prev.includes(caseId) ? prev.filter(id => id !== caseId) : [...prev, caseId]
    );
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCases(cases.map(c => c.id));
    } else {
      setSelectedCases([]);
    }
  };

  const handleBulkAction = (action: string) => {
    if (selectedCases.length === 0) {
      toast.error('No cases selected');
      return;
    }

    toast.success(`Bulk ${action.charAt(0).toUpperCase() + action.slice(1)} Successful`, {
      description: `Action applied to ${selectedCases.length} selected cases.`,
      icon: <Zap className="w-4 h-4 text-yellow-400" />
    });

    console.log(`Performing ${action} on:`, selectedCases);
    setSelectedCases([]);
  };

  // Data logic moved outside

  const healthCounts = {
    critical: cases.filter(c => c.health === 'critical' && c.status !== 'Closed').length,
    high: cases.filter(c => c.health === 'high' && c.status !== 'Closed').length,
    medium: cases.filter(c => c.health === 'medium' && c.status !== 'Closed').length,
    stable: cases.filter(c => c.health === 'stable' && c.status !== 'Closed').length
  };

  const slaCounts = {
    atRisk: cases.filter(c => c.sla === 'at-risk').length,
    approaching: cases.filter(c => c.sla === 'approaching').length,
    onTrack: cases.filter(c => c.sla === 'on-track').length,
  };

  const aiFlaggedCount = cases.filter(c => c.aiFlagged && c.status !== 'Closed').length;

  const smartViewCounts = {
    escalationRisk: cases.filter(c => (c.health === 'critical' || c.health === 'high') && c.sla === 'at-risk').length,
    crossLinked: cases.filter(c => c.crossLinked).length,
    investigatorOverload: cases.filter(c => c.investigatorOverloaded).length,
    aiAnomaly: cases.filter(c => c.aiFlagged).length,
    longRunning: cases.filter(c => c.daysOpen >= 30).length,
  };

  let filteredList = [...cases];

  if (activeCaseTab === 'archive') {
    filteredList = filteredList.filter(c => c.status === 'Closed');
  } else if (activeCaseTab === 'all-cases') {
    filteredList = filteredList.filter(c => c.status !== 'Closed');
  }

  filteredList = filteredList.filter(c => {
    const matchesSearch = c.id.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      c.name.toLowerCase().includes(filters.searchQuery.toLowerCase());
    const matchesInvestigator = filters.investigator === 'all' || c.leadInvestigator.initials === filters.investigator;
    const matchesPriority = filters.priority === 'all' || c.priority === filters.priority;
    return matchesSearch && matchesInvestigator && matchesPriority;
  });

  if (healthFilter !== 'all') {
    filteredList = filteredList.filter(c => c.health === healthFilter);
  }

  if (smartView !== 'none') {
    switch (smartView) {
      case 'escalation-risk':
        filteredList = filteredList.filter(c => (c.health === 'critical' || c.health === 'high') && c.sla === 'at-risk');
        break;
      case 'cross-linked':
        filteredList = filteredList.filter(c => c.crossLinked);
        break;
      case 'investigator-overload':
        filteredList = filteredList.filter(c => c.investigatorOverloaded);
        break;
      case 'ai-anomaly':
        filteredList = filteredList.filter(c => c.aiFlagged);
        break;
      case 'long-running':
        filteredList = filteredList.filter(c => c.daysOpen >= 30);
        break;
    }
  }

  // Manual sorting logic
  const filteredCasesByHealth = [...filteredList];
  switch (sortBy) {
    case 'ai-priority':
      filteredCasesByHealth.sort((a, b) => (b.aiFlagged ? 1 : 0) - (a.aiFlagged ? 1 : 0));
      break;
    case 'risk-level':
      filteredCasesByHealth.sort((a, b) => {
        const healthOrder = ['critical', 'high', 'medium', 'stable'];
        return healthOrder.indexOf(a.health) - healthOrder.indexOf(b.health);
      });
      break;
    case 'sla-pressure':
      filteredCasesByHealth.sort((a, b) => {
        const slaOrder = ['at-risk', 'approaching', 'on-track'];
        return slaOrder.indexOf(a.sla) - slaOrder.indexOf(b.sla);
      });
      break;
    case 'investigator':
      filteredCasesByHealth.sort((a, b) => a.leadInvestigator.name.localeCompare(b.leadInvestigator.name));
      break;
    case 'days-open':
      filteredCasesByHealth.sort((a, b) => b.daysOpen - a.daysOpen);
      break;
    case 'priority':
      filteredCasesByHealth.sort((a, b) => {
        const priorityOrder = ['Critical', 'High', 'Medium', 'Low'];
        return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
      });
      break;
    case 'last-updated':
      filteredCasesByHealth.sort((a, b) => b.daysOpen - a.daysOpen);
      break;
  }

  // Intelligence Insight logic moved outside

  const AllCasesGrid = () => {
    const statusGroups = [
      { id: 'pending', label: 'Pending / To-Do', statuses: ['Pending', 'Active'] },
      { id: 'investigation', label: 'In Investigation', statuses: ['In Progress', 'Under Investigation'] },
      { id: 'review', label: 'Needs Review', statuses: ['Review'] }
    ];

    const pinnedCases = filteredCasesByHealth.filter(c => pinnedCaseIds.includes(c.id));
    const otherCases = filteredCasesByHealth.filter(c => !pinnedCaseIds.includes(c.id));

    return (
      <div className="space-y-8">
        {/* Pinned Cases Section */}
        {pinnedCases.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-cyan-400">
              <Shield className="w-4 h-4" />
              <h3 className="text-sm font-semibold uppercase tracking-wider">Pinned & High Priority</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {pinnedCases.map((caseItem) => (
                <CaseCard key={caseItem.id} caseItem={caseItem} />
              ))}
            </div>
          </div>
        )}

        {/* Kanban Style Swimlanes */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {statusGroups.map((group) => {
            const groupCases = otherCases.filter(c => group.statuses.includes(c.status));
            return (
              <div key={group.id} className="flex-shrink-0 w-80 flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">{group.label}</h3>
                  </div>
                  <Badge variant="outline" className="text-[10px] text-slate-500 border-slate-800">
                    {groupCases.length}
                  </Badge>
                </div>

                <div className="flex flex-col gap-4 min-h-[500px] p-2 rounded-xl bg-slate-900/20 border border-slate-800/50">
                  {groupCases.length > 0 ? (
                    groupCases.map(caseItem => (
                      <CaseCard key={caseItem.id} caseItem={caseItem} />
                    ))
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800/50 rounded-lg p-6 text-center">
                      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center mb-2">
                        <FolderOpen className="w-5 h-5 text-slate-700" />
                      </div>
                      <p className="text-xs text-slate-600">No cases in this stage</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const CaseCard = ({ caseItem }: { caseItem: Case }) => {
    const isPinned = pinnedCaseIds.includes(caseItem.id);
    const TrendIcon = caseItem.riskTrend === 'up' ? TrendingUp : caseItem.riskTrend === 'down' ? TrendingDown : ArrowRight;
    const trendColor = caseItem.riskTrend === 'up' ? 'text-red-400' : caseItem.riskTrend === 'down' ? 'text-green-400' : 'text-slate-400';
    const healthColorMap: Record<string, string> = {
      'critical': 'text-red-400',
      'high': 'text-orange-400',
      'medium': 'text-yellow-400',
      'stable': 'text-green-400'
    };
    const healthColor = healthColorMap[caseItem.health] || 'text-slate-400';
    const momentumMap: Record<string, { text: string; color: string }> = {
      'advancing': { text: 'Advancing', color: 'text-green-400' },
      'slowing': { text: 'Slowing', color: 'text-yellow-400' },
      'stalled': { text: 'Stalled', color: 'text-red-400' }
    };
    const momentum = momentumMap[caseItem.momentum] || { text: 'Unknown', color: 'text-slate-400' };
    const slaMap: Record<string, { text: string; color: string }> = {
      'at-risk': { text: 'SLA At Risk', color: 'text-red-400' },
      'approaching': { text: 'SLA Approaching', color: 'text-yellow-400' },
      'on-track': { text: 'On Track', color: 'text-green-400' }
    };
    const slaStatus = slaMap[caseItem.sla] || { text: 'Unknown', color: 'text-slate-400' };

    return (
      <Card
        onClick={() => handleOpenFullDetail(caseItem)}
        className={`bg-slate-900/50 border-slate-800 backdrop-blur-sm hover:border-blue-600/50 transition-all cursor-pointer group relative overflow-hidden ${caseItem.status === 'Closed' ? 'opacity-60 grayscale-[0.5] hover:opacity-80 hover:grayscale-0' : ''}`}
      >
        <div className="absolute top-2 right-2 z-20 flex gap-1">
          <button
            onClick={(e) => togglePinCase(e, caseItem.id)}
            className={`p-1.5 rounded-md border transition-all ${isPinned ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'bg-slate-800/50 border-slate-700 text-slate-500 opacity-0 group-hover:opacity-100'}`}
          >
            <Shield className="w-3 h-3" />
          </button>
          {caseItem.status === 'Closed' && (
            <div className="bg-red-600/20 rounded-md p-1 border border-red-500/30">
              <Lock className="w-3 h-3 text-red-400" />
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-1">
            <div className="text-[10px] text-blue-400 font-mono">{caseItem.id}</div>
            <h3 className="text-sm text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug font-medium">
              {caseItem.name}
            </h3>
          </div>
          <div className="border-t border-slate-800" />
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 uppercase">Risk Level</span>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs capitalize ${healthColor}`}>{caseItem.health}</span>
              <TrendIcon className={`w-3 h-3 ${trendColor}`} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-500 uppercase">SLA Status</span>
            <span className={`text-[10px] ${slaStatus.color}`}>{slaStatus.text}</span>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1.5">
              <Avatar className="w-6 h-6 border border-slate-700">
                <AvatarFallback className="bg-blue-600 text-white text-[10px]">
                  {caseItem.leadInvestigator.initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-slate-400">{caseItem.leadInvestigator.name}</span>
            </div>
            {caseItem.aiFlagged && <Brain className="w-3.5 h-3.5 text-cyan-400" />}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Layer - Context Setting (Non-Interactive) */}
      {activeCaseTab === 'all-cases' && (
        <div className="space-y-2">
          <h1 className="text-white">Department Case Intelligence</h1>
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <span className="flex items-center gap-1.5">
              <FolderOpen className="w-4 h-4 text-blue-400" />
              18 active cases
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-orange-400" />
              4 trending toward escalation
            </span>
            <span className="text-slate-700">|</span>
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-yellow-400" />
              2 resource bottlenecks detected
            </span>
          </div>
        </div>
      )}

      {/* View Mode Selector */}
      {activeCaseTab === 'all-cases' && (
        <div className="flex items-center gap-3 p-1 bg-slate-900/50 border border-slate-800 rounded-lg w-fit">
          <button
            onClick={() => setViewMode('command')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${viewMode === 'command'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
          >
            <Shield className="w-4 h-4" />
            Command View
          </button>
          <button
            onClick={() => setViewMode('analytics')}
            className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm transition-all ${viewMode === 'analytics'
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
              }`}
          >
            <BarChart3 className="w-4 h-4" />
            Case Analytics
          </button>
        </div>
      )}

      {/* Case Health Overview */}
      {activeCaseTab === 'all-cases' && viewMode === 'command' && (
        <div className="space-y-4">
          {/* A. Case Health Distribution */}
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">Case Health Distribution</p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setHealthFilter('critical')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${healthFilter === 'critical'
                  ? 'bg-red-600/30 text-red-300 border border-red-500/50 shadow-lg shadow-red-500/10'
                  : 'bg-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-600/20 hover:border-red-500/40'
                  }`}
              >
                CRITICAL ({healthCounts.critical})
              </button>
              <span className="text-slate-700">|</span>
              <button
                onClick={() => setHealthFilter('high')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${healthFilter === 'high'
                  ? 'bg-orange-600/30 text-orange-300 border border-orange-500/50 shadow-lg shadow-orange-500/10'
                  : 'bg-orange-600/10 text-orange-400 border border-orange-500/20 hover:bg-orange-600/20 hover:border-orange-500/40'
                  }`}
              >
                HIGH ({healthCounts.high})
              </button>
              <span className="text-slate-700">|</span>
              <button
                onClick={() => setHealthFilter('medium')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${healthFilter === 'medium'
                  ? 'bg-yellow-600/30 text-yellow-300 border border-yellow-500/50 shadow-lg shadow-yellow-500/10'
                  : 'bg-yellow-600/10 text-yellow-400 border border-yellow-500/20 hover:bg-yellow-600/20 hover:border-yellow-500/40'
                  }`}
              >
                MEDIUM ({healthCounts.medium})
              </button>
              <span className="text-slate-700">|</span>
              <button
                onClick={() => setHealthFilter('stable')}
                className={`px-4 py-2 rounded-full text-sm transition-all ${healthFilter === 'stable'
                  ? 'bg-green-600/30 text-green-300 border border-green-500/50 shadow-lg shadow-green-500/10'
                  : 'bg-green-600/10 text-green-400 border border-green-500/20 hover:bg-green-600/20 hover:border-green-500/40'
                  }`}
              >
                STABLE ({healthCounts.stable})
              </button>
              {healthFilter !== 'all' && (
                <>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={() => setHealthFilter('all')}
                    className="px-4 py-2 rounded-full text-sm bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-300 transition-all"
                  >
                    Clear filter
                  </button>
                </>
              )}
            </div>
          </div>

          {/* B. SLA & Time Sensitivity Overview */}
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-2">SLA & Time Sensitivity Overview</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-slate-400">
                SLA At Risk <span className="text-red-400">({slaCounts.atRisk})</span>
              </span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400">
                Approaching <span className="text-yellow-400">({slaCounts.approaching})</span>
              </span>
              <span className="text-slate-700">|</span>
              <span className="text-slate-400">
                On Track <span className="text-green-400">({slaCounts.onTrack})</span>
              </span>
            </div>
          </div>

          {/* C. AI Attention Summary */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-950/20 border border-blue-800/30">
            <Brain className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-300 text-sm">
                AI has flagged <span className="font-medium">{aiFlaggedCount} cases</span> for review
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Patterns, anomalies, or risk indicators detected
              </p>
            </div>
          </div>

          {/* D. Smart Views - Pre-Built Intelligence Lenses */}
          <div>
            <p className="text-slate-500 text-xs uppercase tracking-wide mb-3">Smart Views</p>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Escalation Risk */}
              <button
                onClick={() => {
                  setSmartView(smartView === 'escalation-risk' ? 'none' : 'escalation-risk');
                  setHealthFilter('all');
                }}
                className={`p-4 rounded-lg border transition-all text-left ${smartView === 'escalation-risk'
                  ? 'bg-red-600/20 border-red-500/50 shadow-lg shadow-red-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-red-500/30 hover:bg-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className={`text-sm ${smartView === 'escalation-risk' ? 'text-red-300' : 'text-red-400'}`}>
                    Escalation Risk
                  </span>
                </div>
                <p className="text-2xl mb-1 text-white">{smartViewCounts.escalationRisk}</p>
                <p className="text-xs text-slate-400">High/Critical health + SLA at-risk</p>
              </button>

              {/* Cross-Linked Cases */}
              <button
                onClick={() => {
                  setSmartView(smartView === 'cross-linked' ? 'none' : 'cross-linked');
                  setHealthFilter('all');
                }}
                className={`p-4 rounded-lg border transition-all text-left ${smartView === 'cross-linked'
                  ? 'bg-purple-600/20 border-purple-500/50 shadow-lg shadow-purple-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-purple-500/30 hover:bg-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Link2 className="w-4 h-4 text-purple-400" />
                  <span className={`text-sm ${smartView === 'cross-linked' ? 'text-purple-300' : 'text-purple-400'}`}>
                    Cross-Linked
                  </span>
                </div>
                <p className="text-2xl mb-1 text-white">{smartViewCounts.crossLinked}</p>
                <p className="text-xs text-slate-400">Cases with cross-references</p>
              </button>

              {/* Investigator Overload */}
              <button
                onClick={() => {
                  setSmartView(smartView === 'investigator-overload' ? 'none' : 'investigator-overload');
                  setHealthFilter('all');
                }}
                className={`p-4 rounded-lg border transition-all text-left ${smartView === 'investigator-overload'
                  ? 'bg-orange-600/20 border-orange-500/50 shadow-lg shadow-orange-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-orange-500/30 hover:bg-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <UserX className="w-4 h-4 text-orange-400" />
                  <span className={`text-sm ${smartView === 'investigator-overload' ? 'text-orange-300' : 'text-orange-400'}`}>
                    Investigator Overload
                  </span>
                </div>
                <p className="text-2xl mb-1 text-white">{smartViewCounts.investigatorOverload}</p>
                <p className="text-xs text-slate-400">Assigned investigators at capacity</p>
              </button>

              {/* AI Anomaly Detected */}
              <button
                onClick={() => {
                  setSmartView(smartView === 'ai-anomaly' ? 'none' : 'ai-anomaly');
                  setHealthFilter('all');
                }}
                className={`p-4 rounded-lg border transition-all text-left ${smartView === 'ai-anomaly'
                  ? 'bg-cyan-600/20 border-cyan-500/50 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-cyan-500/30 hover:bg-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span className={`text-sm ${smartView === 'ai-anomaly' ? 'text-cyan-300' : 'text-cyan-400'}`}>
                    AI Anomaly
                  </span>
                </div>
                <p className="text-2xl mb-1 text-white">{smartViewCounts.aiAnomaly}</p>
                <p className="text-xs text-slate-400">Flagged by AI pattern detection</p>
              </button>

              {/* Long-Running Cases */}
              <button
                onClick={() => {
                  setSmartView(smartView === 'long-running' ? 'none' : 'long-running');
                  setHealthFilter('all');
                }}
                className={`p-4 rounded-lg border transition-all text-left ${smartView === 'long-running'
                  ? 'bg-yellow-600/20 border-yellow-500/50 shadow-lg shadow-yellow-500/10'
                  : 'bg-slate-900/50 border-slate-800 hover:border-yellow-500/30 hover:bg-slate-900'
                  }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Hourglass className="w-4 h-4 text-yellow-400" />
                  <span className={`text-sm ${smartView === 'long-running' ? 'text-yellow-300' : 'text-yellow-400'}`}>
                    Long-Running
                  </span>
                </div>
                <p className="text-2xl mb-1 text-white">{smartViewCounts.longRunning}</p>
                <p className="text-xs text-slate-400">Open for 30+ days</p>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => setActiveCaseTab('all-cases')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeCaseTab === 'all-cases'
            ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
            : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
        >
          <FolderOpen className="w-4 h-4" />
          Cases
        </button>

        <button
          onClick={() => setActiveCaseTab('archive')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${activeCaseTab === 'archive'
            ? 'bg-red-600/20 text-red-400 border border-red-500/30'
            : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
            }`}
        >
          <History className="w-4 h-4" />
          Archive
        </button>

        {openCaseTabs.map((tab, index) => (
          <div key={tab.id} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-slate-600" />
            <button
              onClick={() => setActiveCaseTab(tab.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all max-w-[300px] ${activeCaseTab === tab.id
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                }`}
            >
              <span className="truncate">{tab.data.id} - {tab.data.name}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseCaseTab(tab.id);
                }}
                className="ml-1 hover:bg-slate-700/50 rounded p-0.5 transition-colors flex-shrink-0"
              >
                <X className="w-3 h-3" />
              </button>
            </button>
          </div>
        ))}

        {/* Cross-Case Intelligence Button */}
        {activeCaseTab === 'all-cases' && (
          <button
            onClick={() => setShowIntelligencePanel(!showIntelligencePanel)}
            className={`ml-auto flex items-center gap-2 px-4 py-1.5 rounded-lg transition-all ${showIntelligencePanel
              ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/50'
              : 'bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:border-cyan-500/30'
              }`}
          >
            <Brain className="w-4 h-4" />
            Cross-Case Intelligence
            {showIntelligencePanel && <span className="text-xs bg-cyan-500/20 px-2 py-0.5 rounded-full">{intelligenceInsights.length}</span>}
          </button>
        )}
      </div>

      {/* Content */}
      <Tabs value={activeCaseTab} onValueChange={setActiveCaseTab} className="w-full">
        <TabsList className="hidden">
          <TabsTrigger value="all-cases">All Cases</TabsTrigger>
          {openCaseTabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>{tab.data.id}</TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="all-cases" className="mt-0 space-y-6">
          <CaseFilterBar
            filters={filters}
            setFilters={setFilters}
            onReset={() => setFilters({ searchQuery: '', dateRange: 'all', investigator: 'all', priority: 'all' })}
          />

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 p-1 bg-slate-900/50 border border-slate-800 rounded-lg w-fit">
              <button
                onClick={() => setViewMode('command')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'command'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <List className="w-3.5 h-3.5" />
                Table View
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'timeline'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                Timeline
              </button>
            </div>

            <div className="flex items-center gap-3">
              {selectedCases.length > 0 && (
                <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 px-3 py-1.5 rounded-lg mr-4">
                  <span className="text-xs text-blue-400 font-bold">{selectedCases.length} Selected</span>
                  <div className="h-4 w-px bg-blue-500/30 mx-2" />
                  <button onClick={() => handleBulkAction('assign')} className="text-[10px] text-blue-400 hover:text-white transition-colors">Assign</button>
                  <button onClick={() => handleBulkAction('priority')} className="text-[10px] text-blue-400 hover:text-white transition-colors">Set Priority</button>
                  <button onClick={() => handleBulkAction('archive')} className="text-[10px] text-red-400 hover:text-red-300 transition-colors">Archive</button>
                </div>
              )}
              <span className="text-slate-400 text-sm">Sort by:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortBy('ai-priority')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy === 'ai-priority'
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                  AI Priority
                </button>
                <button
                  onClick={() => setSortBy('risk-level')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy === 'risk-level'
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                  Health
                </button>
                <button
                  onClick={() => setSortBy('priority')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy === 'priority'
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                  Priority
                </button>
                <button
                  onClick={() => setSortBy('days-open')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy === 'days-open'
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                  Days Open
                </button>
                <button
                  onClick={() => setSortBy('investigator')}
                  className={`px-3 py-1.5 rounded-lg text-xs transition-all ${sortBy === 'investigator'
                    ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/50'
                    : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                    }`}
                >
                  Investigator
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'command' ? (
            <AllCasesGrid />
          ) : viewMode === 'table' ? (
            <CaseTableView
              cases={filteredCasesByHealth}
              selectedCases={selectedCases}
              onSelectCase={handleSelectCase}
              onSelectAll={handleSelectAll}
              onCaseClick={(cId) => {
                const c = cases.find(curr => curr.id === cId);
                if (c) handleOpenFullDetail(c);
              }}
              onOpenFullDetail={(cId) => {
                const c = cases.find(curr => curr.id === cId);
                if (c) handleOpenFullDetail(c);
              }}
              sortBy={sortBy}
              onSort={(k) => setSortBy(k as any)}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          ) : viewMode === 'timeline' ? (
            <CaseTimelineView cases={filteredCasesByHealth} onCaseClick={handleOpenFullDetail} />
          ) : (
            <CaseAnalytics />
          )}


        </TabsContent>

        <TabsContent value="archive" className="mt-0 space-y-6">
          <CaseFilterBar
            filters={filters}
            setFilters={setFilters}
            onReset={() => setFilters({ searchQuery: '', dateRange: 'all', investigator: 'all', priority: 'all' })}
          />

          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-2 p-1 bg-slate-900/50 border border-slate-800 rounded-lg w-fit">
              <button
                onClick={() => setViewMode('command')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'command'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Grid View
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'table'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <List className="w-3.5 h-3.5" />
                Table View
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs transition-all ${viewMode === 'timeline'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }`}
              >
                <CalendarIcon className="w-3.5 h-3.5" />
                Timeline
              </button>
            </div>
          </div>

          {viewMode === 'command' ? (
            <AllCasesGrid />
          ) : viewMode === 'table' ? (
            <CaseTableView
              cases={filteredCasesByHealth}
              selectedCases={selectedCases}
              onSelectCase={handleSelectCase}
              onSelectAll={handleSelectAll}
              onCaseClick={(cId) => {
                const c = cases.find(curr => curr.id === cId);
                if (c) handleOpenFullDetail(c);
              }}
              onOpenFullDetail={(cId) => handleOpenFullDetail(cases.find(c => c.id === cId))}
              sortBy={sortBy}
              onSort={(k) => setSortBy(k as any)}
              getStatusColor={getStatusColor}
              getPriorityColor={getPriorityColor}
            />
          ) : viewMode === 'timeline' ? (
            <CaseTimelineView cases={filteredCasesByHealth} onCaseClick={handleOpenFullDetail} />
          ) : (
            <AllCasesGrid />
          )}
        </TabsContent>

        {openCaseTabs.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <CaseDetailsView caseData={tab.data} onTaskSelect={onTaskSelect} />
          </TabsContent>
        ))}
      </Tabs>

      {/* Cross-Case Intelligence Panel (Sliding Side Panel) */}
      {showIntelligencePanel && (
        <div className="fixed inset-y-0 right-0 w-[500px] bg-slate-950/95 border-l border-cyan-500/20 backdrop-blur-xl shadow-2xl shadow-cyan-500/10 z-50 overflow-y-auto">
          <div className="sticky top-0 bg-slate-950/95 border-b border-slate-800 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <Brain className="w-6 h-6 text-cyan-400" />
                <h2 className="text-white">Cross-Case Intelligence</h2>
              </div>
              <button
                onClick={() => setShowIntelligencePanel(false)}
                className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <p className="text-slate-400 text-sm">AI-detected patterns across active cases</p>
          </div>

          <div className="p-6 space-y-4">
            {intelligenceInsights.map((insight) => {
              const Icon = insight.icon;
              const isExpanded = expandedInsight === insight.id;

              return (
                <Card key={insight.id} className={`bg-slate-900/50 border ${insight.borderColor} backdrop-blur-sm`}>
                  <CardContent className="p-4 space-y-3">
                    {/* Insight Header */}
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 ${insight.iconColor} flex-shrink-0 mt-0.5`} />
                      <div className="flex-1">
                        <h3 className="text-white text-sm leading-snug mb-1">{insight.title}</h3>
                        <p className="text-slate-400 text-xs">{insight.description}</p>
                      </div>
                    </div>

                    {/* Confidence Score */}
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500">Confidence:</span>
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${insight.confidence >= 90 ? 'bg-green-500' :
                            insight.confidence >= 80 ? 'bg-yellow-500' : 'bg-orange-500'
                            }`}
                          style={{ width: `${insight.confidence}%` }}
                        />
                      </div>
                      <span className={`text-sm ${insight.confidence >= 90 ? 'text-green-400' :
                        insight.confidence >= 80 ? 'text-yellow-400' : 'text-orange-400'
                        }`}>
                        {insight.confidence}%
                      </span>
                    </div>

                    {/* Data Sources */}
                    <div>
                      <span className="text-xs text-slate-500 mb-1.5 block">Data Sources:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {insight.dataSources.map((source, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-slate-800/50 text-slate-300 rounded border border-slate-700">
                            {source}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Related Cases */}
                    <div>
                      <span className="text-xs text-slate-500 mb-1.5 block">Related Cases:</span>
                      <div className="flex flex-wrap gap-1.5">
                        {insight.relatedCases.map((caseId, idx) => (
                          <span key={idx} className="text-xs px-2 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-500/30">
                            {caseId}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Explain Reasoning Toggle */}
                    <button
                      onClick={() => setExpandedInsight(isExpanded ? null : insight.id)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 transition-all text-sm"
                    >
                      <span className="text-cyan-400">Explain reasoning</span>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-cyan-400" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-cyan-400" />
                      )}
                    </button>

                    {/* Expanded Reasoning */}
                    {isExpanded && (
                      <div className="px-3 py-2 bg-slate-800/30 rounded-lg border border-slate-700/50">
                        <p className="text-slate-300 text-xs leading-relaxed">{insight.reasoning}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Footer Note */}
          <div className="sticky bottom-0 bg-slate-950/95 border-t border-slate-800 p-4 backdrop-blur-sm">
            <p className="text-xs text-slate-500 text-center">
              Insight-only panel • No action buttons • Human-in-the-loop maintained
            </p>
          </div>
        </div>
      )}
    </div>
  );
}