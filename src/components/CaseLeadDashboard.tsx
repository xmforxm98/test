import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  Brain, 
  CheckCircle2, 
  XCircle, 
  TrendingUp, 
  FolderOpen, 
  ListTodo, 
  Sparkles,
  AlertCircle,
  Clock,
  FileText,
  Users,
  Target,
  UserPlus,
  AlertTriangle
} from 'lucide-react';

export function CaseLeadDashboard() {
  const [suggestions, setSuggestions] = useState([
    {
      id: 1,
      title: 'Request DNA Analysis',
      context: 'Evidence collected contains biological material',
      why: 'Similar cases without DNA confirmation had 32% lower conviction rate',
      impact: 'Could delay case by 2 days if postponed',
      source: 'Case #54 summary',
      confidence: 92,
      status: 'pending'
    },
    {
      id: 2,
      title: 'Interview Witness',
      context: 'Witness observed incident from nearby location',
      why: 'Witness memory retention drops 40% after 72 hours from incident',
      impact: 'Critical testimony window closes in 18 hours',
      source: 'Case #54 summary',
      confidence: 87,
      status: 'pending'
    },
    {
      id: 3,
      title: 'Trace Vehicle ABC-123',
      context: 'Suspect vehicle spotted near crime scene',
      why: 'Vehicle registry shows pattern of use in 3 similar incidents',
      impact: 'Owner may relocate vehicle within 24-48 hours',
      source: 'Case #54 summary',
      confidence: 94,
      status: 'pending'
    }
  ]);

  const [selectedRisk, setSelectedRisk] = useState<string>('all');

  const allCases = [
    { id: '#58', title: 'Armed Robbery - Downtown', status: 'Active', risk: 'critical', updated: '1h ago' },
    { id: '#54', title: 'Vehicle Theft Investigation', status: 'In Progress', risk: 'high', updated: '2h ago' },
    { id: '#55', title: 'Corporate Espionage', status: 'Active', risk: 'high', updated: '3h ago' },
    { id: '#56', title: 'Assault Investigation', status: 'Review', risk: 'high', updated: '4h ago' },
    { id: '#53', title: 'Fraud Case Analysis', status: 'Review', risk: 'medium', updated: '5h ago' },
    { id: '#52', title: 'Missing Person Report', status: 'Active', risk: 'medium', updated: '1d ago' },
    { id: '#51', title: 'Property Damage Claim', status: 'Closed', risk: 'stable', updated: '2d ago' },
    { id: '#50', title: 'Traffic Violation Review', status: 'Closed', risk: 'stable', updated: '2d ago' },
    { id: '#49', title: 'Noise Complaint Follow-up', status: 'Closed', risk: 'stable', updated: '3d ago' },
    { id: '#48', title: 'Minor Theft Report', status: 'Closed', risk: 'stable', updated: '3d ago' },
    { id: '#47', title: 'Lost Property Case', status: 'Closed', risk: 'stable', updated: '4d ago' },
    { id: '#46', title: 'Vandalism Report', status: 'Closed', risk: 'stable', updated: '5d ago' },
  ];

  const riskCounts = {
    critical: allCases.filter(c => c.risk === 'critical').length,
    high: allCases.filter(c => c.risk === 'high').length,
    medium: allCases.filter(c => c.risk === 'medium').length,
    stable: allCases.filter(c => c.risk === 'stable').length,
  };

  const filteredCases = selectedRisk === 'all' 
    ? allCases.slice(0, 3)
    : allCases.filter(c => c.risk === selectedRisk).slice(0, 3);

  const handleExplainReasoning = (id: number) => {
    console.log(`Explaining reasoning for suggestion ${id}`);
    // In a real app, this would open a detailed reasoning panel
  };

  const handleAssignToSomeone = (id: number) => {
    console.log(`Assigning suggestion ${id} to team member`);
    // In a real app, this would open a team member selection dialog
  };

  const handleDefer = (id: number) => {
    console.log(`Deferring suggestion ${id}`);
    setSuggestions(suggestions.map(s => 
      s.id === id ? { ...s, status: 'deferred' } : s
    ));
  };

  const handleBriefClick = (type: string) => {
    // Deep link handlers for command brief items
    console.log(`Navigating to: ${type}`);
    // In a real app, this would navigate to the specific view
    // For example: navigate to risk dashboard, SLA breach view, team workload, or entity graph
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white mb-1">Case Lead Dashboard</h2>
          <p className="text-slate-400">Your AI-powered command center for case management</p>
        </div>
      </div>

      {/* AI Command Brief */}
      <Card className="bg-gradient-to-r from-slate-900/80 via-blue-950/40 to-slate-900/80 border-cyan-500/40 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="flex-1">
              <p className="text-cyan-300 mb-3">Today's Command Brief</p>
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <button
                  onClick={() => handleBriefClick('escalation-risk')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-red-950/30 transition-colors cursor-pointer group"
                >
                  <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 group-hover:text-red-300">2 cases show escalation risk</span>
                </button>
                <div className="w-px h-4 bg-slate-700"></div>
                <button
                  onClick={() => handleBriefClick('sla-breach')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-yellow-950/30 transition-colors cursor-pointer group"
                >
                  <Clock className="w-4 h-4 text-yellow-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 group-hover:text-yellow-300">1 critical SLA breach in 6 hours</span>
                </button>
                <div className="w-px h-4 bg-slate-700"></div>
                <button
                  onClick={() => handleBriefClick('investigator-overloaded')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-orange-950/30 transition-colors cursor-pointer group"
                >
                  <Users className="w-4 h-4 text-orange-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 group-hover:text-orange-300">1 investigator overloaded</span>
                </button>
                <div className="w-px h-4 bg-slate-700"></div>
                <button
                  onClick={() => handleBriefClick('cross-case-entity')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-purple-950/30 transition-colors cursor-pointer group"
                >
                  <Target className="w-4 h-4 text-purple-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-slate-300 group-hover:text-purple-300">1 cross-case entity detected</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - AI Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Suggestions Widget */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-800 bg-gradient-to-r from-blue-950/50 to-cyan-950/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">AI Suggestions</CardTitle>
                    <CardDescription className="text-slate-400">
                      Context-aware task recommendations with decision support
                    </CardDescription>
                  </div>
                </div>
                <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {suggestions.filter(s => s.status === 'pending').length} New
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* AI Copilot Message */}
              <div className="mb-6 flex items-start gap-3 p-4 rounded-lg bg-blue-950/30 border border-blue-800/30">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/20">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-blue-300">
                    I've analyzed the case summary and cross-referenced with historical data – here are recommended next actions with impact analysis:
                  </p>
                </div>
              </div>

              {/* Suggestion Cards */}
              <div className="space-y-4">
                {suggestions.map((suggestion) => (
                  <div
                    key={suggestion.id}
                    className={`p-5 rounded-lg border transition-all ${
                      suggestion.status === 'deferred'
                        ? 'bg-slate-950/30 border-slate-800/30 opacity-60'
                        : 'bg-slate-950/50 border-slate-700 hover:border-blue-600/50'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Title and Badge */}
                      <div className="flex items-center gap-2">
                        <h4 className="text-white">{suggestion.title}</h4>
                        {suggestion.status === 'deferred' && (
                          <Badge className="bg-slate-600/20 text-slate-400 border-slate-500/30 text-xs">
                            Deferred
                          </Badge>
                        )}
                        <span className="ml-auto text-blue-400 flex items-center gap-1 text-xs">
                          <Sparkles className="w-3 h-3" />
                          {suggestion.confidence}% confidence
                        </span>
                      </div>

                      {/* Context Quote */}
                      <p className="text-cyan-400/80 text-sm italic pl-3 border-l-2 border-cyan-500/30">
                        "{suggestion.context}"
                      </p>

                      {/* Decision Context */}
                      <div className="space-y-2 bg-slate-900/50 p-3 rounded-md border border-slate-800/50">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-blue-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-blue-300 text-xs uppercase tracking-wide">Why this matters:</span>
                            <p className="text-slate-300 text-sm mt-0.5">{suggestion.why}</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-yellow-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-yellow-300 text-xs uppercase tracking-wide">Impact:</span>
                            <p className="text-slate-300 text-sm mt-0.5">{suggestion.impact}</p>
                          </div>
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          {suggestion.source}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      {suggestion.status === 'pending' && (
                        <div className="flex gap-2 pt-2">
                          <Button
                            onClick={() => handleExplainReasoning(suggestion.id)}
                            size="sm"
                            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 flex-1"
                          >
                            <Brain className="w-3.5 h-3.5 mr-1.5" />
                            Explain reasoning
                          </Button>
                          <Button
                            onClick={() => handleAssignToSomeone(suggestion.id)}
                            size="sm"
                            className="bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 flex-1"
                          >
                            <UserPlus className="w-3.5 h-3.5 mr-1.5" />
                            Assign to someone
                          </Button>
                          <Button
                            onClick={() => handleDefer(suggestion.id)}
                            size="sm"
                            className="bg-slate-800 text-slate-400 border border-slate-700 hover:bg-slate-700 hover:text-slate-300"
                          >
                            <Clock className="w-3.5 h-3.5 mr-1.5" />
                            Defer
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* My Cases Section */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-5 h-5 text-blue-400" />
                  <CardTitle className="text-white">My Cases</CardTitle>
                </div>
                <Button size="sm" className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Case Risk Strip */}
              <div className="mb-4 flex items-center gap-2 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                <button
                  onClick={() => setSelectedRisk('critical')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                    selectedRisk === 'critical'
                      ? 'bg-red-600/20 text-red-300 border border-red-500/40'
                      : 'text-slate-400 hover:text-red-400 hover:bg-red-950/20'
                  }`}
                >
                  <span className="uppercase text-xs tracking-wide">Critical</span>
                  <span className="text-xs opacity-70">({riskCounts.critical})</span>
                </button>
                <div className="w-px h-4 bg-slate-700"></div>
                <button
                  onClick={() => setSelectedRisk('high')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                    selectedRisk === 'high'
                      ? 'bg-orange-600/20 text-orange-300 border border-orange-500/40'
                      : 'text-slate-400 hover:text-orange-400 hover:bg-orange-950/20'
                  }`}
                >
                  <span className="uppercase text-xs tracking-wide">High</span>
                  <span className="text-xs opacity-70">({riskCounts.high})</span>
                </button>
                <div className="w-px h-4 bg-slate-700"></div>
                <button
                  onClick={() => setSelectedRisk('medium')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                    selectedRisk === 'medium'
                      ? 'bg-yellow-600/20 text-yellow-300 border border-yellow-500/40'
                      : 'text-slate-400 hover:text-yellow-400 hover:bg-yellow-950/20'
                  }`}
                >
                  <span className="uppercase text-xs tracking-wide">Medium</span>
                  <span className="text-xs opacity-70">({riskCounts.medium})</span>
                </button>
                <div className="w-px h-4 bg-slate-700"></div>
                <button
                  onClick={() => setSelectedRisk('stable')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
                    selectedRisk === 'stable'
                      ? 'bg-green-600/20 text-green-300 border border-green-500/40'
                      : 'text-slate-400 hover:text-green-400 hover:bg-green-950/20'
                  }`}
                >
                  <span className="uppercase text-xs tracking-wide">Stable</span>
                  <span className="text-xs opacity-70">({riskCounts.stable})</span>
                </button>
                {selectedRisk !== 'all' && (
                  <>
                    <div className="w-px h-4 bg-slate-700"></div>
                    <button
                      onClick={() => setSelectedRisk('all')}
                      className="flex items-center gap-2 px-3 py-1.5 rounded text-slate-400 hover:text-slate-300 hover:bg-slate-800 text-xs"
                    >
                      Clear filter
                    </button>
                  </>
                )}
              </div>

              {/* Cases List */}
              <div className="space-y-3">
                {filteredCases.map((case_item) => (
                  <div
                    key={case_item.id}
                    className="p-4 rounded-lg border border-slate-700 hover:border-blue-600/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-blue-400">{case_item.id}</span>
                        <span className="text-white">{case_item.title}</span>
                      </div>
                      <Badge className={`text-xs uppercase ${
                        case_item.risk === 'critical' 
                          ? 'bg-red-600/20 text-red-400 border-red-500/30' 
                          : case_item.risk === 'high'
                            ? 'bg-orange-600/20 text-orange-400 border-orange-500/30'
                            : case_item.risk === 'medium'
                              ? 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30'
                              : 'bg-green-600/20 text-green-400 border-green-500/30'
                      }`}>
                        {case_item.risk}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                      <span>{case_item.status}</span>
                      <span>•</span>
                      <span>Updated {case_item.updated}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Team Attention Required */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400" />
                <CardTitle className="text-white">Team Attention Required</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {[
                  { 
                    task: 'DNA Follow-up', 
                    issue: 'blocked', 
                    reason: 'waiting on approval',
                    investigator: 'Det. Martinez',
                    caseId: '#54',
                    urgent: true 
                  },
                  { 
                    task: 'Interview delayed', 
                    issue: 'overloaded', 
                    reason: 'investigator overloaded',
                    investigator: 'Det. Johnson',
                    caseId: '#53',
                    urgent: true 
                  },
                  { 
                    task: 'Evidence review', 
                    issue: 'overdue', 
                    reason: '2 days overdue',
                    investigator: 'Det. Chen',
                    caseId: '#55',
                    urgent: true 
                  },
                  { 
                    task: 'Warrant request', 
                    issue: 'approval', 
                    reason: 'awaiting lead approval',
                    investigator: 'Det. Rodriguez',
                    caseId: '#56',
                    urgent: false 
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      item.urgent 
                        ? 'border-yellow-800/40 bg-yellow-950/20 hover:bg-yellow-950/30 hover:border-yellow-700/50' 
                        : 'border-slate-700 hover:border-blue-600/50 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        item.urgent ? 'text-yellow-400' : 'text-slate-400'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-white text-sm">{item.task}</p>
                          <Badge className={`text-xs uppercase ${
                            item.issue === 'blocked' 
                              ? 'bg-red-600/20 text-red-400 border-red-500/30'
                              : item.issue === 'overloaded'
                                ? 'bg-orange-600/20 text-orange-400 border-orange-500/30'
                                : item.issue === 'overdue'
                                  ? 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30'
                                  : 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                          }`}>
                            {item.issue}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-400 mb-1">{item.reason}</p>
                        <div className="flex items-center gap-3 text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {item.investigator}
                          </span>
                          <span>•</span>
                          <span className="text-blue-400">{item.caseId}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}