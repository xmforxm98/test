import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent } from './ui/card';
import { X, Send, Search, FileText, AlertTriangle, Sparkles, MessageSquare, Type, Maximize2, Minimize2 } from 'lucide-react';
import { CopilotAllSearch } from './intelligence/CopilotAllSearch';
import { CopilotKeywordSearch } from './intelligence/CopilotKeywordSearch';

interface IntelligenceAICopilotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IntelligenceAICopilot({ isOpen, onClose }: IntelligenceAICopilotProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'search' | 'keyword'>('chat');
  const [query, setQuery] = useState('');
  const [responses, setResponses] = useState<Array<{ type: string; content: string }>>([]);

  const handleQuickAction = (action: string) => {
    setResponses([...responses, { type: 'query', content: action }]);
    // Simulate AI response
    setTimeout(() => {
      let response = '';
      if (action.includes('Search')) {
        response = 'Searching across all connected systems. Found 12 relevant entities, 3 active cases, and 7 evidence items matching recent activity patterns.';
      } else if (action.includes('Summarize')) {
        response = 'Case #129: Active investigation into organized fraud network. 5 suspects identified, 12 evidence items collected, next interview scheduled in 2 hours.';
      } else if (action.includes('risks')) {
        response = 'Today: 1 SLA breach risk (2 hrs), 2 critical alerts requiring review, 1 high-priority evidence verification pending.';
      }
      setResponses(prev => [...prev, { type: 'response', content: response }]);
    }, 800);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setResponses([...responses, { type: 'query', content: query }]);
    setQuery('');

    // Simulate AI response
    setTimeout(() => {
      setResponses(prev => [...prev, {
        type: 'response',
        content: 'Processing your request. AI analysis complete. No immediate threats detected in current intelligence feed.'
      }]);
    }, 800);
  };

  if (!isOpen) return null;

  return (
    <div className={`fixed right-0 top-0 h-full bg-slate-950 border-l border-slate-800 shadow-2xl z-50 flex flex-col transition-all duration-300 ease-in-out ${isExpanded ? 'w-[calc(100%-4rem)]' : 'w-96'}`}>
      {/* Header */}
      <div className="flex flex-col border-b border-slate-800 bg-slate-950">
        <div className="flex items-center justify-between p-4 pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="text-white uppercase tracking-wider text-sm">AI Copilot</h3>
          </div>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex px-4 gap-6">
          <button
            onClick={() => setActiveTab('chat')}
            className={`pb-3 text-sm font-medium transition-all relative ${activeTab === 'chat'
              ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
              : 'text-slate-400 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              Chat
            </div>
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`pb-3 text-sm font-medium transition-all relative ${activeTab === 'search'
              ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
              : 'text-slate-400 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" />
              All Search
            </div>
          </button>
          <button
            onClick={() => setActiveTab('keyword')}
            className={`pb-3 text-sm font-medium transition-all relative ${activeTab === 'keyword'
              ? 'text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-400'
              : 'text-slate-400 hover:text-white'
              }`}
          >
            <div className="flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5" />
              Keyword
            </div>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden flex flex-col bg-slate-950/50">
        {activeTab === 'chat' && (
          <>
            {/* Quick Actions */}
            <div className="p-4 border-b border-slate-800 space-y-2">
              <Button
                onClick={() => handleQuickAction('Search across all systems')}
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
              >
                <Search className="w-3 h-3 mr-2" />
                Search across all systems
              </Button>
              <Button
                onClick={() => handleQuickAction('Summarize this case')}
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
              >
                <FileText className="w-3 h-3 mr-2" />
                Summarize this case
              </Button>
              <Button
                onClick={() => handleQuickAction('What are my risks today?')}
                variant="outline"
                size="sm"
                className="w-full justify-start bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
              >
                <AlertTriangle className="w-3 h-3 mr-2" />
                What are my risks today?
              </Button>
            </div>

            {/* Conversation Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {responses.length === 0 && (
                <div className="text-center text-slate-500 text-sm mt-8">
                  Ask anything or use quick actions above
                </div>
              )}

              {responses.map((item, index) => (
                <div key={index}>
                  {item.type === 'query' ? (
                    <div className="text-right">
                      <div className="inline-block bg-blue-900/30 border border-blue-800/50 px-3 py-2 rounded text-sm text-blue-200">
                        {item.content}
                      </div>
                    </div>
                  ) : (
                    <Card className="bg-slate-900/50 border-slate-800">
                      <CardContent className="p-3">
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {item.content}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-slate-800 bg-slate-950">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask anything..."
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </>
        )}

        {activeTab === 'search' && <CopilotAllSearch />}

        {activeTab === 'keyword' && <CopilotKeywordSearch />}
      </div>
    </div>
  );
}
