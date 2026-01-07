import { useState, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, Sparkles, Brain, MapPin, Users, Car, AlertTriangle, CheckCircle2, Clock, ArrowRight, FileText, Target, Shield, Zap, Send, Lightbulb, Network, Search, TrendingUp, ListTodo, Link2, UserCheck, Scale, Calendar } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PowerAICaseCreationProps {
  onCaseCreated?: () => void;
}

interface ExtractedEntity {
  type: string;
  value: string;
  confidence: number;
}

interface RelatedCase {
  id: string;
  title: string;
  similarity: number;
  status: string;
}

interface ThreatProfile {
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  factors: string[];
  score: number;
}

interface DetectivePlan {
  immediateActions: string[];
  next24Hours: string[];
  next72Hours: string[];
  resources: string[];
}

interface GeneratedTask {
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignedTo: string;
  deadline: string;
  category: string;
}

export function PowerAICaseCreation({ onCaseCreated }: PowerAICaseCreationProps) {
  const [narrative, setNarrative] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState('');
  const [progress, setProgress] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // AI Generated Results
  const [caseCreated, setCaseCreated] = useState(false);
  const [caseNumber, setCaseNumber] = useState('');
  const [extractedEntities, setExtractedEntities] = useState<ExtractedEntity[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState('');
  const [generatedTasks, setGeneratedTasks] = useState<GeneratedTask[]>([]);
  const [relatedCases, setRelatedCases] = useState<RelatedCase[]>([]);
  const [allSearchResults, setAllSearchResults] = useState<any[]>([]);
  const [threatProfile, setThreatProfile] = useState<ThreatProfile | null>(null);
  const [detectivePlan, setDetectivePlan] = useState<DetectivePlan | null>(null);
  const [slaDeadline, setSlaDeadline] = useState('');

  const processingSteps = [
    { label: 'Analyzing narrative...', progress: 10 },
    { label: 'Extracting entities...', progress: 20 },
    { label: 'Creating case record...', progress: 30 },
    { label: 'Selecting optimal workflow...', progress: 40 },
    { label: 'Generating investigation tasks...', progress: 50 },
    { label: 'Connecting to previous cases...', progress: 60 },
    { label: 'Running All Search on subjects...', progress: 70 },
    { label: 'Building threat profile...', progress: 80 },
    { label: 'Creating detective plan...', progress: 90 },
    { label: 'Finalizing investigation package...', progress: 100 }
  ];

  const handlePowerCreate = async () => {
    if (narrative.trim().length < 20) {
      toast.error('Please provide at least 2-3 lines describing the incident');
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate AI processing each step
    for (let i = 0; i < processingSteps.length; i++) {
      const step = processingSteps[i];
      setCurrentStep(step.label);
      setProgress(step.progress);
      
      // Simulate async processing
      await new Promise(resolve => setTimeout(resolve, 600));

      // Generate data for each step
      if (i === 0) {
        // Analyzing narrative
        toast.info('AI analyzing incident details...');
      } else if (i === 1) {
        // Extract entities
        const entities = extractEntitiesFromNarrative(narrative);
        setExtractedEntities(entities);
      } else if (i === 2) {
        // Create case
        const caseNum = `CASE-${Math.floor(Math.random() * 9000) + 1000}`;
        setCaseNumber(caseNum);
        toast.success(`Case ${caseNum} created`);
      } else if (i === 3) {
        // Select workflow
        const workflow = selectWorkflow(narrative);
        setSelectedWorkflow(workflow);
      } else if (i === 4) {
        // Generate tasks
        const tasks = generateInvestigationTasks(narrative);
        setGeneratedTasks(tasks);
      } else if (i === 5) {
        // Find related cases
        const related = findRelatedCases(narrative);
        setRelatedCases(related);
      } else if (i === 6) {
        // All Search
        const searchResults = performAllSearch(narrative);
        setAllSearchResults(searchResults);
      } else if (i === 7) {
        // Threat profile
        const threat = buildThreatProfile(narrative);
        setThreatProfile(threat);
      } else if (i === 8) {
        // Detective plan
        const plan = createDetectivePlan(narrative);
        setDetectivePlan(plan);
        const deadline = new Date(Date.now() + 72 * 60 * 60 * 1000).toLocaleString();
        setSlaDeadline(deadline);
      }
    }

    setIsProcessing(false);
    setCaseCreated(true);
    toast.success('🚀 Investigation package ready!', {
      description: 'Complete case created with AI-generated insights'
    });
  };

  const extractEntitiesFromNarrative = (text: string): ExtractedEntity[] => {
    const entities: ExtractedEntity[] = [];
    const lowercaseText = text.toLowerCase();

    // Location
    const locationMatch = text.match(/at\s+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
    if (locationMatch) {
      entities.push({ type: 'Location', value: locationMatch[1], confidence: 94 });
    }

    // Suspects
    if (lowercaseText.includes('suspect') || lowercaseText.includes('armed')) {
      entities.push({ type: 'Suspects', value: '2 armed individuals', confidence: 88 });
    }

    // Vehicle
    const vehicleMatch = text.match(/(?:fled in|drove|vehicle:)\s+a?\s*([^.]+(?:sedan|SUV|truck|car|vehicle))/i);
    if (vehicleMatch) {
      entities.push({ type: 'Vehicle', value: vehicleMatch[1].trim(), confidence: 92 });
    }

    // Weapon
    if (lowercaseText.includes('handgun') || lowercaseText.includes('weapon') || lowercaseText.includes('armed')) {
      entities.push({ type: 'Weapon', value: 'Handgun (9mm suspected)', confidence: 85 });
    }

    // Time
    const timeMatch = text.match(/(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/);
    if (timeMatch) {
      entities.push({ type: 'Time', value: timeMatch[1], confidence: 98 });
    }

    return entities;
  };

  const selectWorkflow = (text: string): string => {
    const lowercaseText = text.toLowerCase();
    if (lowercaseText.includes('robbery') || lowercaseText.includes('robbed')) {
      return 'Armed Robbery Investigation';
    } else if (lowercaseText.includes('assault')) {
      return 'Assault Investigation';
    } else if (lowercaseText.includes('fraud')) {
      return 'Fraud Investigation';
    } else if (lowercaseText.includes('cyber')) {
      return 'Cyber Crime Investigation';
    }
    return 'General Investigation';
  };

  const generateInvestigationTasks = (text: string): GeneratedTask[] => {
    const tasks: GeneratedTask[] = [
      {
        title: 'Secure and process crime scene',
        priority: 'High',
        assignedTo: 'CSI Team',
        deadline: 'Next 4 hours',
        category: 'Evidence'
      },
      {
        title: 'Interview witnesses and victims',
        priority: 'High',
        assignedTo: 'Detective Unit',
        deadline: 'Next 24 hours',
        category: 'Investigation'
      },
      {
        title: 'Review CCTV footage from location',
        priority: 'High',
        assignedTo: 'Tech Forensics',
        deadline: 'Next 12 hours',
        category: 'Evidence'
      },
      {
        title: 'Run forensic analysis on collected evidence',
        priority: 'Medium',
        assignedTo: 'Forensics Lab',
        deadline: 'Next 48 hours',
        category: 'Forensics'
      },
      {
        title: 'Cross-reference with known offender database',
        priority: 'Medium',
        assignedTo: 'Intelligence Analyst',
        deadline: 'Next 24 hours',
        category: 'Intelligence'
      },
      {
        title: 'Prepare initial case report',
        priority: 'Medium',
        assignedTo: 'Case Officer',
        deadline: 'Next 48 hours',
        category: 'Documentation'
      }
    ];
    return tasks;
  };

  const findRelatedCases = (text: string): RelatedCase[] => {
    return [
      {
        id: 'CASE-4287',
        title: 'Armed Robbery - Downtown Jewelry Store',
        similarity: 87,
        status: 'Active'
      },
      {
        id: 'CASE-4156',
        title: 'Armed Robbery - Similar MO, Mall Area',
        similarity: 76,
        status: 'Under Investigation'
      },
      {
        id: 'CASE-3892',
        title: 'Robbery - Handgun Used, Two Suspects',
        similarity: 68,
        status: 'Closed'
      }
    ];
  };

  const performAllSearch = (text: string): any[] => {
    return [
      { source: 'Criminal Records', hits: 12, status: 'Found matches' },
      { source: 'DMV Database', hits: 8, status: 'Vehicle records found' },
      { source: 'Social Media', hits: 24, status: 'Profiles identified' },
      { source: 'Financial Records', hits: 5, status: 'Transactions flagged' },
      { source: 'Surveillance Network', hits: 3, status: 'CCTV footage available' }
    ];
  };

  const buildThreatProfile = (text: string): ThreatProfile => {
    const lowercaseText = text.toLowerCase();
    const isArmed = lowercaseText.includes('armed') || lowercaseText.includes('weapon');
    const isViolent = lowercaseText.includes('robbery') || lowercaseText.includes('assault');
    
    return {
      level: isArmed && isViolent ? 'HIGH' : 'MEDIUM',
      factors: [
        'Armed suspects at large',
        'Pattern matches previous incidents',
        'High-value target location',
        'Multiple witnesses available',
        'CCTV evidence present'
      ],
      score: isArmed && isViolent ? 78 : 52
    };
  };

  const createDetectivePlan = (text: string): DetectivePlan => {
    return {
      immediateActions: [
        'Dispatch units to secure perimeter',
        'Interview all witnesses at scene',
        'Collect physical evidence and forensics',
        'Request CCTV footage from surrounding businesses'
      ],
      next24Hours: [
        'Complete witness statement documentation',
        'Run forensic analysis on collected evidence',
        'Review all surveillance footage',
        'Cross-reference suspect descriptions with database',
        'Brief investigative team on findings'
      ],
      next72Hours: [
        'Follow up with witnesses for additional details',
        'Coordinate with neighboring jurisdictions',
        'Analyze financial transaction patterns',
        'Prepare case file for prosecution review',
        'Update threat assessment based on new intelligence'
      ],
      resources: [
        'CSI Team (2 technicians)',
        'Detective Unit (Lead + 2 investigators)',
        'Tech Forensics (Video analysis)',
        'Intelligence Analyst (Background research)',
        'K-9 Unit (If tracking needed)'
      ]
    };
  };

  if (caseCreated) {
    return (
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Success Header */}
        <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 border border-green-500/30 rounded-xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center flex-shrink-0">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>
              <div>
                <h1 className="text-white text-2xl mb-2">Investigation Package Ready</h1>
                <p className="text-green-300 mb-4">
                  AI has created a complete investigation package. You can start investigating immediately.
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 px-3 py-1">
                    {caseNumber}
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 px-3 py-1">
                    {selectedWorkflow}
                  </Badge>
                  <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 px-3 py-1">
                    SLA: {slaDeadline}
                  </Badge>
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                setCaseCreated(false);
                setNarrative('');
                if (onCaseCreated) onCaseCreated();
              }}
              variant="outline"
              className="border-slate-600"
            >
              Create Another Case
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column: Entities & Related Cases */}
          <div className="space-y-6">
            {/* Extracted Entities */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-400" />
                  Extracted Entities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {extractedEntities.map((entity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-950/50 border border-slate-700 rounded-lg"
                  >
                    <div>
                      <p className="text-slate-400 text-xs">{entity.type}</p>
                      <p className="text-white text-sm">{entity.value}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                      {entity.confidence}%
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Related Cases */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-purple-400" />
                  Related Cases
                </CardTitle>
                <CardDescription>AI-detected connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {relatedCases.map((relatedCase, index) => (
                  <div
                    key={index}
                    className="p-3 bg-purple-950/20 border border-purple-800/30 rounded-lg hover:border-purple-500/50 cursor-pointer transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-purple-300 text-sm">{relatedCase.id}</span>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                        {relatedCase.similarity}% match
                      </Badge>
                    </div>
                    <p className="text-white text-sm mb-1">{relatedCase.title}</p>
                    <p className="text-slate-400 text-xs">{relatedCase.status}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* All Search Results */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-cyan-400" />
                  All Search Results
                </CardTitle>
                <CardDescription>Cross-database intelligence</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {allSearchResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-cyan-950/20 border border-cyan-800/30 rounded"
                  >
                    <div>
                      <p className="text-cyan-300 text-sm">{result.source}</p>
                      <p className="text-slate-400 text-xs">{result.status}</p>
                    </div>
                    <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs">
                      {result.hits} hits
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Middle Column: Tasks & Threat Profile */}
          <div className="space-y-6">
            {/* Generated Tasks */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-green-400" />
                  Investigation Tasks
                </CardTitle>
                <CardDescription>AI-generated action items</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {generatedTasks.map((task, index) => (
                  <div
                    key={index}
                    className="p-3 bg-slate-950/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-white text-sm flex-1">{task.title}</p>
                      <Badge
                        className={`text-xs ml-2 ${
                          task.priority === 'High'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : task.priority === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }`}
                      >
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{task.assignedTo}</span>
                      <span className="text-slate-500">{task.deadline}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Threat Profile */}
            {threatProfile && (
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                    Threat Profile
                  </CardTitle>
                  <CardDescription>AI risk assessment</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Threat Level</span>
                      <Badge
                        className={`${
                          threatProfile.level === 'CRITICAL'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : threatProfile.level === 'HIGH'
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
                        }`}
                      >
                        {threatProfile.level}
                      </Badge>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-400 text-sm">Risk Score</span>
                        <span className="text-white">{threatProfile.score}/100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            threatProfile.score > 70
                              ? 'bg-red-500'
                              : threatProfile.score > 50
                              ? 'bg-orange-500'
                              : 'bg-yellow-500'
                          }`}
                          style={{ width: `${threatProfile.score}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Key Factors</p>
                      <ul className="space-y-1">
                        {threatProfile.factors.map((factor, index) => (
                          <li key={index} className="text-slate-300 text-xs flex items-start gap-2">
                            <span className="text-orange-400 mt-1">•</span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column: Detective Plan */}
          <div>
            {detectivePlan && (
              <Card className="bg-gradient-to-br from-blue-950/40 to-purple-950/40 border-blue-500/30 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-blue-400" />
                    Detective Plan
                  </CardTitle>
                  <CardDescription>AI-powered investigation roadmap</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Immediate Actions */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                        <Zap className="w-4 h-4 text-red-400" />
                      </div>
                      <h4 className="text-white">Immediate (Now)</h4>
                    </div>
                    <ul className="space-y-2">
                      {detectivePlan.immediateActions.map((action, index) => (
                        <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next 24 Hours */}
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                        <Clock className="w-4 h-4 text-orange-400" />
                      </div>
                      <h4 className="text-white">Next 24 Hours</h4>
                    </div>
                    <ul className="space-y-2">
                      {detectivePlan.next24Hours.map((action, index) => (
                        <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Next 72 Hours */}
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-400" />
                      </div>
                      <h4 className="text-white">Next 72 Hours</h4>
                    </div>
                    <ul className="space-y-2">
                      {detectivePlan.next72Hours.map((action, index) => (
                        <li key={index} className="text-slate-300 text-sm flex items-start gap-2">
                          <ArrowRight className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span>{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Resources */}
                  <div className="pt-4 border-t border-slate-700">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                        <Users className="w-4 h-4 text-green-400" />
                      </div>
                      <h4 className="text-white">Resources Needed</h4>
                    </div>
                    <ul className="space-y-1">
                      {detectivePlan.resources.map((resource, index) => (
                        <li key={index} className="text-slate-300 text-xs flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4 border-t border-slate-700">
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                      <Target className="w-4 h-4 mr-2" />
                      Start Investigation
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="bg-gradient-to-br from-slate-900/90 to-blue-950/50 border-blue-500/30 max-w-3xl w-full">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-white text-3xl mb-3">
            Power AI Case Creation
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Type 2-3 lines. AI does the rest. Start investigating in seconds.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isProcessing ? (
            <>
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  placeholder="Example: Two armed suspects entered the Downtown Mall jewelry store at 3:45 PM. They brandished handguns and fled in a dark blue sedan heading north on Main Street."
                  rows={6}
                  className="w-full bg-slate-950/80 border-2 border-blue-500/30 rounded-xl p-6 text-white text-lg placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
                {narrative.length > 0 && (
                  <div className="absolute bottom-3 right-3">
                    <span className="text-xs text-slate-500">{narrative.length} characters</span>
                  </div>
                )}
              </div>

              <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl p-6">
                <h4 className="text-blue-300 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Will Instantly Generate:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Extract all entities</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Create case record</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Generate investigation tasks</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Select optimal workflow</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Assign SLAs automatically</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Connect to previous cases</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Run All Search on subjects</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Build threat profile</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300 text-sm col-span-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Create complete detective investigation plan</span>
                  </div>
                </div>
              </div>

              <Button
                onClick={handlePowerCreate}
                className="w-full h-16 text-lg bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700"
                disabled={narrative.trim().length < 20}
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Create Case with AI Power
                <ArrowRight className="w-6 h-6 ml-3" />
              </Button>
            </>
          ) : (
            <div className="py-12">
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 mb-8">
                  <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
                  <div
                    className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"
                  ></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-12 h-12 text-blue-400 animate-pulse" />
                  </div>
                </div>

                <h3 className="text-white text-xl mb-2">{currentStep}</h3>
                <p className="text-slate-400 mb-6">AI is building your complete investigation package</p>

                <div className="w-full max-w-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Progress</span>
                    <span className="text-blue-400">{progress}%</span>
                  </div>
                  <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="mt-8 grid grid-cols-3 gap-4 w-full max-w-lg">
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${progress >= 20 ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-800 border border-slate-700'}`}>
                      {progress >= 20 ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <Target className="w-6 h-6 text-slate-600" />}
                    </div>
                    <span className="text-xs text-slate-400">Entities</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${progress >= 50 ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-800 border border-slate-700'}`}>
                      {progress >= 50 ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <ListTodo className="w-6 h-6 text-slate-600" />}
                    </div>
                    <span className="text-xs text-slate-400">Tasks</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${progress >= 90 ? 'bg-green-500/20 border border-green-500/30' : 'bg-slate-800 border border-slate-700'}`}>
                      {progress >= 90 ? <CheckCircle2 className="w-6 h-6 text-green-400" /> : <Brain className="w-6 h-6 text-slate-600" />}
                    </div>
                    <span className="text-xs text-slate-400">Plan</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
