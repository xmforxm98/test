
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import {
  Brain, CheckCircle2, XCircle, AlertCircle, Clock, Users, MapPin,
  Car, Shield, TrendingUp, FileText, Info, ChevronRight, Search,
  Filter, Sparkles, Zap, MessageSquare, History, ListChecks, CheckSquare, ClipboardCheck, Hourglass
} from 'lucide-react';
import { toast } from 'sonner';

interface PendingCase {
  id: string;
  title: string;
  type: string;
  officer: string;
  submittedAt: string;
  location: string;
  narrative: string;
  extractedEntities: Array<{
    type: string;
    value: string;
    confidence: number;
  }>;
  workflowTemplate: string;
  riskScore: number;
  suggestedTasks: string[];
  similarCases: Array<{
    id: string;
    title: string;
    similarity: number;
    outcome: string;
    reasoning?: string;
  }>;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export function SupervisorApprovalScreen({ category = 'Approvals' }: { category?: string }) {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [requestInfoMessage, setRequestInfoMessage] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showInfoRequestDialog, setShowInfoRequestDialog] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<string[]>([]);
  const [compareWithCase, setCompareWithCase] = useState<string | null>(null);

  const pendingCases: PendingCase[] = category === 'Approvals' ? [
    {
      id: 'C-5247',
      title: 'Armed Robbery at Downtown Mall',
      type: 'Robbery',
      officer: 'Officer Sarah Chen',
      submittedAt: '2 hours ago',
      location: 'Downtown Mall, 123 Main Street',
      narrative: 'Two armed suspects entered the jewelry store at approximately 3:45 PM. Suspects brandished handguns and demanded merchandise. Store manager complied. Suspects fled in a black sedan with license plate ABC-123. No injuries reported. CCTV footage available.',
      extractedEntities: [
        { type: 'location', value: 'Downtown Mall, 123 Main Street', confidence: 94 },
        { type: 'suspect', value: '2 suspects (male, armed)', confidence: 87 },
        { type: 'vehicle', value: 'Black sedan, License ABC-123', confidence: 92 },
        { type: 'victim', value: 'Store manager', confidence: 98 },
        { type: 'weapon', value: 'Handguns', confidence: 85 }
      ],
      workflowTemplate: 'Robbery Investigation',
      riskScore: 87,
      priority: 'Critical',
      suggestedTasks: [
        'Secure scene and collect CCTV footage',
        'Interview store manager and witnesses',
        'Issue BOLO for vehicle ABC-123',
        'Process forensic evidence from scene',
        'Review similar case patterns'
      ],
      similarCases: [
        {
          id: 'C-4892',
          title: 'Jewelry Store Robbery - 2024',
          similarity: 89,
          outcome: 'Suspects arrested, 45 days',
          reasoning: 'Match on MO: Jewelry store target, 2 armed suspects, daylight hours.'
        },
        {
          id: 'C-4321',
          title: 'Armed Robbery Downtown',
          similarity: 76,
          outcome: 'Ongoing investigation',
          reasoning: 'Match on Location: Downtown district, high-density area.'
        }
      ]
    },
    {
      id: 'C-5248',
      title: 'Cyber Fraud Investigation',
      type: 'Cyber Crime',
      officer: 'Officer Mike Johnson',
      submittedAt: '4 hours ago',
      location: 'Online / Multiple jurisdictions',
      narrative: 'Victim reported unauthorized access to banking accounts resulting in $45,000 loss. Phishing emails traced to overseas IP addresses. Multiple victims identified with similar patterns.',
      extractedEntities: [
        { type: 'victim', value: 'Multiple account holders', confidence: 95 },
        { type: 'location', value: 'Multiple jurisdictions', confidence: 88 },
        { type: 'object', value: 'Phishing emails, IP addresses', confidence: 92 }
      ],
      workflowTemplate: 'Cyber Crime Investigation',
      riskScore: 73,
      priority: 'High',
      suggestedTasks: [
        'Secure digital evidence and device images',
        'Trace IP addresses and network traffic',
        'Interview victims and gather statements',
        'Coordinate with financial institutions',
        'Request international cooperation if needed'
      ],
      similarCases: [
        { id: 'C-4567', title: 'Phishing Campaign 2024', similarity: 82, outcome: 'Suspects identified, arrest pending' }
      ]
    }
  ] : category === 'SLA Alerts' ? [
    {
      id: 'C-9041',
      title: 'Homicide Investigation - Delay in Forensic Processing',
      type: 'Homicide',
      officer: 'Lead Det. James Miller',
      submittedAt: 'Breached 42m ago',
      location: 'Crime Lab / Sector 7',
      narrative: 'DNA processing for Case #9041 has exceeded the 48-hour mandatory threshold. Critical lab backlog detected in Sector 7. Evidence integrity at risk if processing is not prioritized within the next 2 hours.',
      extractedEntities: [
        { type: 'location', value: 'Sector 7 Forensic Lab', confidence: 99 },
        { type: 'object', value: 'DNA Evidence (Serial #XJ-9)', confidence: 95 }
      ],
      workflowTemplate: 'Expedited Forensic Intake',
      riskScore: 94,
      priority: 'Critical',
      suggestedTasks: [
        'Authorize priority lab routing to Sector 2',
        'Escalate to Head of Forensics',
        'Notify District Attorney of SLA breach'
      ],
      similarCases: []
    }
  ] : [
    {
      id: 'I-442',
      title: 'Anomalous Transaction Chain (Cross-Border)',
      type: 'Money Laundering',
      officer: 'AI Signal System',
      submittedAt: 'Detected 5m ago',
      location: 'Virtual / Multiple jurisdictions',
      narrative: 'AI detected a high-speed chain of transactions involving 12 shell companies. Pattern matches historical "Silk Road" laundering MO. Immediate asset freeze and investigation authorization required.',
      extractedEntities: [
        { type: 'object', value: 'Asset volume: $2.4M', confidence: 91 },
        { type: 'victim', value: 'Regional Banking Unit', confidence: 85 }
      ],
      workflowTemplate: 'Financial Asset Interdiction',
      riskScore: 98,
      priority: 'Critical',
      suggestedTasks: [
        'Issue emergency asset freeze order',
        'Coordinate with International Financial Crime Unit',
        'Auto-generate interdiction report'
      ],
      similarCases: [
        { id: 'I-102', title: 'Virtual Asset Laundering 2023', similarity: 94, outcome: 'Funds recovered, suspects fled' }
      ]
    }
  ];

  const currentCase = pendingCases.find(c => c.id === selectedCaseId);

  // Initialize selectedCaseId based on current pendingCases when category changes
  useEffect(() => {
    if (pendingCases.length > 0) {
      setSelectedCaseId(pendingCases[0].id);
    }
  }, [category]);

  const toggleTaskSelection = (task: string) => {
    setSelectedTasks(prev =>
      prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]
    );
  };

  const handleApprove = (caseId: string) => {
    toast.success('Case Approved & Tasks Assigned', {
      description: `Case ${caseId} is now active. ${selectedTasks.length} tasks assigned to ${currentCase?.officer}.`
    });
    setSelectedCaseId(null);
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'location': return MapPin;
      case 'suspect': return Users;
      case 'vehicle': return Car;
      case 'victim': return Users;
      case 'weapon': return Shield;
      default: return FileText;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-400 border-red-500/30 bg-red-500/5';
      case 'High': return 'text-orange-400 border-orange-500/30 bg-orange-500/5';
      default: return 'text-blue-400 border-blue-500/30 bg-blue-500/5';
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col gap-6">
      {/* Top Actionable Header */}
      <div className="flex items-center justify-between bg-slate-900/40 border border-slate-800 p-4 rounded-xl backdrop-blur-sm">
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Action Center: {category}
            </h2>
            <p className="text-slate-400 text-xs">Awaiting your tactical decisions in {category}</p>
          </div>
          <div className="h-8 w-px bg-slate-800" />
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-slate-500 uppercase">SLA Pressure</span>
              <span className="text-xs text-red-400">2 Critical ( {'<'} 4h )</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              placeholder="Search queue..."
              className="bg-slate-950 border border-slate-800 rounded-lg py-1.5 pl-9 pr-4 text-xs text-slate-300 w-48 focus:border-blue-500 outline-none transition-all"
            />
          </div>
          <Button variant="outline" size="sm" className="border-slate-800 text-slate-400 text-xs">
            <Filter className="w-3.5 h-3.5 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Pane 1: Smart Queue */}
        <div className="w-80 flex flex-col gap-3 overflow-y-auto pr-2 custom-scrollbar">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-2 px-2">
            <ListChecks className="w-3 h-3" />
            Active Queue ({pendingCases.length})
          </h3>
          {pendingCases.map((c) => (
            <Card
              key={c.id}
              onClick={() => {
                setSelectedCaseId(c.id);
                setSelectedTasks([]);
                setCompareWithCase(null);
              }}
              className={`cursor-pointer transition-all hover:scale-[1.02] active:scale-[0.98] ${selectedCaseId === c.id
                ? 'bg-blue-600/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.15)]'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
            >
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <span className="text-xs font-mono text-blue-400">{c.id}</span>
                  <Badge variant="outline" className={`text-[10px] ${getPriorityColor(c.priority)}`}>
                    {c.priority}
                  </Badge>
                </div>
                <h4 className="text-white text-sm font-medium leading-tight group-hover:text-blue-400">{c.title}</h4>
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {c.submittedAt}
                  </span>
                  <span>{c.officer}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pane 2: Decision Context (Main Area) */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
          {currentCase ? (
            <>
              <div className="space-y-6">
                {/* Visual Identity */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl rounded-full -mr-16 -mt-16" />
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-2xl text-white font-bold mb-2">{currentCase.title}</h2>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5"><FileText className="w-3.5 h-3.5 text-blue-400" />{currentCase.type}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-green-400" />{currentCase.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] text-slate-500 uppercase mb-1">AI Risk Confidence</div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]" style={{ width: `${currentCase.riskScore}%` }} />
                        </div>
                        <span className="text-sm font-bold text-cyan-400">{currentCase.riskScore}%</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-300 text-sm leading-relaxed bg-slate-950/40 p-4 rounded-lg border border-slate-800/50">
                      {currentCase.narrative}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      {currentCase.extractedEntities.slice(0, 3).map((entity, i) => {
                        const Icon = getEntityIcon(entity.type);
                        return (
                          <div key={i} className="flex flex-col gap-1 p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                            <Icon className="w-3.5 h-3.5 text-blue-400 mb-1" />
                            <span className="text-[10px] text-slate-500 uppercase">{entity.type}</span>
                            <span className="text-xs text-white truncate font-medium">{entity.value}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* HITL Control Panel */}
                <div className="grid grid-cols-2 gap-6">
                  {/* AI Suggested Workflow & Tasks */}
                  <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                    <div className="bg-cyan-500/10 border-b border-cyan-500/20 px-4 py-2 flex items-center justify-between">
                      <h3 className="text-xs font-bold text-cyan-400 uppercase flex items-center gap-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        AI Task Assignment
                      </h3>
                      <button className="text-[10px] text-cyan-300 hover:underline">Select All</button>
                    </div>
                    <CardContent className="p-4 space-y-2">
                      {currentCase.suggestedTasks.map((task, i) => (
                        <div
                          key={i}
                          onClick={() => toggleTaskSelection(task)}
                          className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer ${selectedTasks.includes(task)
                            ? 'bg-cyan-500/10 border-cyan-500/50 ring-1 ring-cyan-500/30'
                            : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                            }`}
                        >
                          <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedTasks.includes(task) ? 'bg-cyan-500 border-cyan-500' : 'border-slate-700'
                            }`}>
                            {selectedTasks.includes(task) && <CheckCircle2 className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-xs ${selectedTasks.includes(task) ? 'text-white font-medium' : 'text-slate-400'}`}>
                            {task}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Similarity Analysis Component */}
                  <Card className="bg-slate-900/50 border-slate-800">
                    <div className="bg-purple-500/10 border-b border-purple-500/20 px-4 py-2">
                      <h3 className="text-xs font-bold text-purple-400 uppercase flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5" />
                        Pattern Matching Analysis
                      </h3>
                    </div>
                    <CardContent className="p-4 space-y-4">
                      {currentCase.similarCases.map((sim, i) => (
                        <div key={i} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-purple-400">{sim.id}</span>
                              <Badge variant="outline" className="text-[9px] bg-purple-500/10 text-purple-300 border-purple-500/30">
                                {sim.similarity}% Similarity
                              </Badge>
                            </div>
                            <button
                              onClick={() => setCompareWithCase(sim.id)}
                              className="text-[10px] text-slate-400 hover:text-white underline"
                            >
                              Quick Compare
                            </button>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-2 italic leading-relaxed">
                            {sim.reasoning}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 bg-slate-950/50 p-2 rounded">
                            <CheckCircle2 className="w-3 h-3 text-green-500" />
                            Outcome: {sim.outcome}
                          </div>
                          {i < currentCase.similarCases.length - 1 && <div className="border-b border-slate-800 pt-2" />}
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>

                {/* Decision Bar */}
                <div className="bg-slate-900/80 border border-slate-700 p-4 rounded-xl flex items-center justify-between sticky bottom-0 z-10 backdrop-blur-md shadow-2xl">
                  <div className="flex items-center gap-4">
                    <AvatarGroup initials={[currentCase.officer.split(' ').pop()?.charAt(0) || '']} />
                    <div>
                      <p className="text-xs text-slate-300">Approving for: <span className="text-white font-bold">{currentCase.officer}</span></p>
                      <p className="text-[10px] text-slate-500">{selectedTasks.length} tasks to be assigned</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setShowInfoRequestDialog(true)}
                      className="border-slate-700 text-slate-300 hover:bg-slate-800 text-sm"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Request Info
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => setShowRejectDialog(true)}
                      className="bg-red-900/40 text-red-300 border border-red-500/30 hover:bg-red-900/60 text-sm"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                    <Button
                      onClick={() => handleApprove(currentCase.id)}
                      className="bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 text-sm px-8"
                    >
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Finalize & Approve
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-800">
                  <ListChecks className="w-8 h-8 text-slate-700" />
                </div>
                <h4 className="text-slate-400 font-medium">Select a case for strategic review</h4>
                <p className="text-slate-600 text-xs mt-1">Review narratives, entities, and AI Task suggestions</p>
              </div>
            </div>
          )}
        </div>

        {/* Pane 3: AI Assistant & Multi-Case Context (Right Sidebar) */}
        <div className="w-80 space-y-6 overflow-y-auto pr-1 custom-scrollbar">
          {/* AI Decision Support */}
          <Card className="bg-slate-900/50 border-cyan-500/20 backdrop-blur-sm">
            <CardHeader className="p-4 border-b border-slate-800/50">
              <CardTitle className="text-xs text-cyan-400 flex items-center gap-2">
                <Brain className="w-4 h-4" />
                AI CO-PILOT ANALYSIS
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-4">
              <div className="p-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] text-cyan-400 font-bold uppercase">Critical Signal</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Found MO correlation in 2 closed cases from Sector 4. High probability of coordinated robbery crew."
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-[10px] text-slate-500 uppercase font-bold">Suggested Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 hover:text-white hover:border-blue-500 transition-all flex items-center gap-2">
                    <History className="w-3 h-3" />
                    Timeline Sector 4 overlap map
                  </button>
                  <button className="w-full text-left p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-400 hover:text-white hover:border-blue-500 transition-all flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    BOLO known jewelry crew aliases
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Productivity Feed */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase px-2">Decision Log (Last 24h)</h3>
            <div className="space-y-4 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-px before:bg-slate-800">
              {[
                { action: 'Approved Case #5524', user: 'You', time: '1h ago', status: 'Active' },
                { action: 'Rejected Case #5522', user: 'You', time: '3h ago', status: 'Returned' },
                { action: 'Info Request #5519', user: 'You', time: '5h ago', status: 'Pending' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 relative pl-8 group">
                  <div className="absolute left-[13px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-800 border-2 border-slate-950 z-10 group-hover:bg-blue-500 transition-colors" />
                  <div>
                    <p className="text-[11px] text-slate-300">{log.action}</p>
                    <p className="text-[9px] text-slate-500 mt-0.5">{log.time} • {log.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Overlay (Modal-like) */}
      {compareWithCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-slate-950/80 backdrop-blur-md">
          <Card className="w-full max-w-5xl h-[80vh] bg-slate-950 border-purple-500/30 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-xl text-white font-bold">Side-by-Side Pattern Match</h2>
                <p className="text-xs text-slate-400 mt-1">Comparing {selectedCaseId} with {compareWithCase}</p>
              </div>
              <Button variant="ghost" onClick={() => setCompareWithCase(null)} className="text-slate-400 hover:text-white">
                <XCircle className="w-6 h-6" />
              </Button>
            </div>
            <div className="flex-1 flex gap-6 p-6 overflow-hidden">
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                <Badge className="w-fit bg-blue-500/20 text-blue-400">CURRENT: {selectedCaseId}</Badge>
                <p className="text-sm text-white leading-relaxed">{currentCase?.narrative}</p>
              </div>
              <div className="w-px bg-slate-800" />
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                <Badge className="w-fit bg-purple-500/20 text-purple-400">HISTORICAL: {compareWithCase}</Badge>
                <p className="text-sm text-slate-300 leading-relaxed italic">
                  Historical narrative data loading... Matching entities: "Black Sedan", "Jewelry Shop", "Two Suspects".
                  Previous resolution: Suspects apprehended after bait shop sting.
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-slate-800 bg-slate-900/50">
              <p className="text-xs text-purple-400 flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4" />
                AI recommendation: "Strong correlation detected. Recommend deploying the same tactical unit from {compareWithCase}."
              </p>
              <Button onClick={() => setCompareWithCase(null)} className="w-full bg-purple-600 hover:bg-purple-500">Close Comparison</Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

const AvatarGroup = ({ initials }: { initials: string[] }) => (
  <div className="flex -space-x-2">
    {initials.map((i, idx) => (
      <div key={idx} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">
        {i}
      </div>
    ))}
  </div>
);
