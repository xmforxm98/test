import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Loader2, Sparkles, Brain, MapPin, Users, Car, AlertTriangle, CheckCircle2, Clock, ArrowRight, FileText, Target, Shield, Zap, Send, Edit2, Lightbulb } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CaseCreationPhase1SmartProps {
  onCaseCreated?: () => void;
}

interface ExtractedEntity {
  type: 'location' | 'suspect' | 'vehicle' | 'victim' | 'weapon' | 'object';
  value: string;
  confidence: number;
  confirmed: boolean;
}

interface WorkflowTemplate {
  id: string;
  name: string;
  type: string;
  approvalPath: string[];
  mandatoryEvidence: string[];
  taskSequence: string[];
  slaHours: number;
  icon: any;
  color: string;
}

interface SmartSuggestion {
  text: string;
  type: 'continue' | 'question' | 'detail';
}

export function CaseCreationPhase1Smart({ onCaseCreated }: CaseCreationPhase1SmartProps) {
  const [narrative, setNarrative] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [smartSuggestions, setSmartSuggestions] = useState<SmartSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-extracted fields
  const [incidentType, setIncidentType] = useState('');
  const [location, setLocation] = useState('');
  const [timeOfOccurrence, setTimeOfOccurrence] = useState('');
  const [partiesInvolved, setPartiesInvolved] = useState<string[]>([]);
  const [aiConfidence, setAiConfidence] = useState(0);

  // Entity extraction
  const [extractedEntities, setExtractedEntities] = useState<ExtractedEntity[]>([]);
  const [entitiesConfirmed, setEntitiesConfirmed] = useState(false);

  // Workflow
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);
  const [caseSubmitted, setCaseSubmitted] = useState(false);

  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: 'robbery',
      name: 'Robbery Investigation',
      type: 'Robbery',
      approvalPath: ['Supervisor', 'Dept Head'],
      mandatoryEvidence: ['Scene Photos', 'Witness Statements', 'CCTV Footage'],
      taskSequence: ['Secure Scene', 'Collect Evidence', 'Interview Witnesses', 'Forensic Analysis', 'Suspect Identification'],
      slaHours: 72,
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 'fraud',
      name: 'Fraud Investigation',
      type: 'Fraud',
      approvalPath: ['Supervisor', 'Financial Crimes Unit Head', 'Legal Advisor'],
      mandatoryEvidence: ['Financial Records', 'Transaction Logs', 'Email Communications', 'Account Statements'],
      taskSequence: ['Document Review', 'Transaction Analysis', 'Interview Suspects', 'Subpoena Bank Records', 'Build Case Timeline'],
      slaHours: 120,
      icon: Shield,
      color: 'purple'
    },
    {
      id: 'assault',
      name: 'Assault Investigation',
      type: 'Assault',
      approvalPath: ['Supervisor', 'Dept Head'],
      mandatoryEvidence: ['Medical Reports', 'Victim Statement', 'Scene Photos', 'Witness Statements'],
      taskSequence: ['Medical Examination', 'Victim Interview', 'Scene Documentation', 'Witness Interviews', 'Suspect Apprehension'],
      slaHours: 48,
      icon: Target,
      color: 'orange'
    },
    {
      id: 'cyber-crime',
      name: 'Cyber Crime Investigation',
      type: 'Cyber Crime',
      approvalPath: ['Cyber Unit Supervisor', 'Technical Director', 'Legal Advisor'],
      mandatoryEvidence: ['Digital Forensics Report', 'System Logs', 'Network Traffic Analysis', 'Device Images'],
      taskSequence: ['Secure Digital Evidence', 'Forensic Analysis', 'Trace IP Addresses', 'Interview Victims', 'Build Technical Report'],
      slaHours: 96,
      icon: Zap,
      color: 'cyan'
    }
  ];

  // Smart AI suggestions based on context
  const generateSmartSuggestions = (text: string): SmartSuggestion[] => {
    const lowercaseText = text.toLowerCase();
    
    if (text.length < 20) {
      return [
        { text: 'at approximately [time]', type: 'continue' },
        { text: 'involving [number] suspects', type: 'continue' },
        { text: 'reported by [witness/victim name]', type: 'continue' }
      ];
    }

    if (lowercaseText.includes('armed') || lowercaseText.includes('weapon')) {
      return [
        { text: 'What type of weapon was used?', type: 'question' },
        { text: 'brandished [weapon type] and demanded', type: 'continue' },
        { text: 'Were there any injuries reported?', type: 'question' }
      ];
    }

    if (lowercaseText.includes('vehicle') || lowercaseText.includes('fled')) {
      return [
        { text: 'fled in a [color] [vehicle type]', type: 'continue' },
        { text: 'with license plate [number]', type: 'continue' },
        { text: 'Was the vehicle description confirmed?', type: 'question' }
      ];
    }

    if (lowercaseText.includes('witness') || lowercaseText.includes('footage')) {
      return [
        { text: 'CCTV footage available from [location]', type: 'detail' },
        { text: '[Number] witnesses interviewed at scene', type: 'detail' },
        { text: 'Are there additional witnesses to locate?', type: 'question' }
      ];
    }

    return [
      { text: 'Suspects then fled the scene', type: 'continue' },
      { text: 'No injuries were reported', type: 'detail' },
      { text: 'Evidence collected includes', type: 'continue' }
    ];
  };

  // Real-time AI extraction as user types
  useEffect(() => {
    if (narrative.length > 50) {
      const timer = setTimeout(() => {
        performSmartExtraction(narrative);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [narrative]);

  const performSmartExtraction = (text: string) => {
    const lowercaseText = text.toLowerCase();
    
    // Extract incident type
    if (lowercaseText.includes('robbery') || lowercaseText.includes('robbed')) {
      setIncidentType('robbery');
      setAiConfidence(92);
    } else if (lowercaseText.includes('fraud') || lowercaseText.includes('scam')) {
      setIncidentType('fraud');
      setAiConfidence(88);
    } else if (lowercaseText.includes('assault') || lowercaseText.includes('attacked')) {
      setIncidentType('assault');
      setAiConfidence(90);
    } else if (lowercaseText.includes('cyber') || lowercaseText.includes('hacking') || lowercaseText.includes('phishing')) {
      setIncidentType('cyber-crime');
      setAiConfidence(85);
    }

    // Extract location (simple pattern matching)
    const locationPatterns = [
      /at\s+([A-Z][a-z]+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/,
      /(?:located at|location:|scene:)\s+([^.,]+)/i
    ];
    
    for (const pattern of locationPatterns) {
      const match = text.match(pattern);
      if (match) {
        setLocation(match[1].trim());
        break;
      }
    }

    // Extract time
    const timePatterns = [
      /at\s+(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/,
      /approximately\s+(\d{1,2}:\d{2}\s*(?:AM|PM|am|pm))/
    ];
    
    for (const pattern of timePatterns) {
      const match = text.match(pattern);
      if (match) {
        setTimeOfOccurrence(match[1]);
        break;
      }
    }

    // Extract entities
    const entities: ExtractedEntity[] = [];
    
    if (location) {
      entities.push({
        type: 'location',
        value: location,
        confidence: 94,
        confirmed: false
      });
    }

    // Check for suspects
    const suspectMatch = text.match(/(\d+)\s+(?:armed\s+)?suspects?/i) || text.match(/suspects?\s+(?:were|was)\s+([^.]+)/i);
    if (suspectMatch) {
      entities.push({
        type: 'suspect',
        value: suspectMatch[0],
        confidence: 87,
        confirmed: false
      });
    }

    // Check for vehicle
    const vehicleMatch = text.match(/(?:fled in|drove|vehicle:|car:)\s+a?\s*([^.]+(?:sedan|SUV|truck|car|vehicle))/i);
    if (vehicleMatch) {
      entities.push({
        type: 'vehicle',
        value: vehicleMatch[1].trim(),
        confidence: 92,
        confirmed: false
      });
    }

    // Check for weapon
    const weaponMatch = text.match(/(?:brandished|wielding|armed with|weapon:)\s+([^.]+)/i);
    if (weaponMatch) {
      entities.push({
        type: 'weapon',
        value: weaponMatch[1].trim(),
        confidence: 85,
        confirmed: false
      });
    }

    if (entities.length > 0) {
      setExtractedEntities(entities);
    }
  };

  const handleNarrativeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNarrative(text);
    setIsTyping(true);
    
    if (text.length > 10) {
      setSmartSuggestions(generateSmartSuggestions(text));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }

    // Hide typing indicator after delay
    setTimeout(() => setIsTyping(false), 500);
  };

  const applySuggestion = (suggestion: SmartSuggestion) => {
    if (suggestion.type === 'continue') {
      setNarrative(prev => prev.trimEnd() + ' ' + suggestion.text);
    } else if (suggestion.type === 'detail') {
      setNarrative(prev => prev.trimEnd() + '. ' + suggestion.text);
    }
    
    // Focus back on textarea
    textareaRef.current?.focus();
    
    // Move cursor to end
    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.selectionStart = textareaRef.current.value.length;
        textareaRef.current.selectionEnd = textareaRef.current.value.length;
      }
    }, 0);
  };

  const handleConfirmEntity = (index: number) => {
    const updated = [...extractedEntities];
    updated[index].confirmed = !updated[index].confirmed;
    setExtractedEntities(updated);
  };

  const handleConfirmAllEntities = () => {
    if (extractedEntities.length === 0) {
      toast.error('No entities extracted yet. Please provide more details in your narrative.');
      return;
    }
    
    const updated = extractedEntities.map(e => ({ ...e, confirmed: true }));
    setExtractedEntities(updated);
    setEntitiesConfirmed(true);
    
    // Auto-select workflow template
    if (incidentType) {
      const template = workflowTemplates.find(t => t.id === incidentType);
      if (template) {
        setSelectedTemplate(template);
        toast.success('Entities confirmed! Workflow auto-selected', {
          description: `${template.name} workflow has been selected based on incident type`
        });
      }
    } else {
      toast.success('All entities confirmed');
    }
  };

  const handleSubmitCase = () => {
    if (!selectedTemplate) {
      toast.error('Please confirm entities first to auto-select workflow');
      return;
    }

    if (!entitiesConfirmed) {
      toast.error('Please confirm extracted entities');
      return;
    }

    setCaseSubmitted(true);
    toast.success('Case submitted for supervisor approval', {
      description: `Case #${Math.floor(Math.random() * 1000) + 5000} created and awaiting approval`
    });
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'location': return MapPin;
      case 'suspect': return Users;
      case 'vehicle': return Car;
      case 'victim': return Users;
      case 'weapon': return AlertTriangle;
      default: return FileText;
    }
  };

  const getEntityColor = (type: string) => {
    switch (type) {
      case 'location': return 'blue';
      case 'suspect': return 'red';
      case 'vehicle': return 'purple';
      case 'victim': return 'cyan';
      case 'weapon': return 'orange';
      default: return 'slate';
    }
  };

  if (caseSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <Card className="bg-slate-900/50 border-slate-800 max-w-2xl w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-white text-2xl mb-3">Case Successfully Submitted</h2>
            <p className="text-slate-400 mb-6">
              Your case has been created and is now awaiting supervisor approval.
            </p>
            <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-blue-300">Workflow Status: Step 1</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Current Step:</span>
                  <span className="text-white">Awaiting Supervisor Approval</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Template:</span>
                  <span className="text-white">{selectedTemplate?.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">SLA:</span>
                  <span className="text-white">{selectedTemplate?.slaHours} hours</span>
                </div>
              </div>
            </div>
            <Button
              onClick={() => {
                setCaseSubmitted(false);
                if (onCaseCreated) onCaseCreated();
              }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              Return to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white text-2xl mb-2">Smart AI-Assisted Case Creation</h1>
          <p className="text-slate-400">Just describe what happened - AI handles the rest</p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 px-4 py-2">
          <Brain className="w-4 h-4 mr-2" />
          Powered by AI
        </Badge>
      </div>

      {/* Progress Indicator */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${narrative.length > 50 ? 'text-green-400' : 'text-blue-400'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${narrative.length > 50 ? 'border-green-500 bg-green-500/20' : 'border-blue-500 bg-blue-500/20'}`}>
            {narrative.length > 50 ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-sm">1</span>}
          </div>
          <span className="text-sm">Tell Your Story</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />
        <div className={`flex items-center gap-2 ${entitiesConfirmed ? 'text-green-400' : 'text-slate-500'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${entitiesConfirmed ? 'border-green-500 bg-green-500/20' : 'border-slate-700 bg-slate-800'}`}>
            {entitiesConfirmed ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-sm">2</span>}
          </div>
          <span className="text-sm">AI Confirms</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />
        <div className={`flex items-center gap-2 ${selectedTemplate ? 'text-green-400' : 'text-slate-500'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedTemplate ? 'border-green-500 bg-green-500/20' : 'border-slate-700 bg-slate-800'}`}>
            {selectedTemplate ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-sm">3</span>}
          </div>
          <span className="text-sm">Auto-Workflow</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Smart Input */}
        <div className="col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-slate-900/90 to-blue-950/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400 animate-pulse" />
                Smart Incident Narrative
              </CardTitle>
              <CardDescription className="text-slate-300">
                Just type naturally - AI will extract all the details automatically
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={narrative}
                  onChange={handleNarrativeChange}
                  placeholder="Start typing... e.g., 'Two armed suspects entered the Downtown Mall jewelry store at approximately 3:45 PM. They brandished handguns and demanded...'"
                  rows={12}
                  className="w-full bg-slate-950/80 border-2 border-blue-500/30 rounded-lg p-4 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
                />
                
                {isTyping && (
                  <div className="absolute top-2 right-2">
                    <div className="flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-3 py-1">
                      <Brain className="w-3 h-3 text-blue-400 animate-pulse" />
                      <span className="text-blue-300 text-xs">AI analyzing...</span>
                    </div>
                  </div>
                )}

                {narrative.length > 0 && (
                  <div className="absolute bottom-2 right-2">
                    <span className="text-xs text-slate-500">{narrative.length} characters</span>
                  </div>
                )}
              </div>

              {/* Smart Suggestions */}
              {showSuggestions && smartSuggestions.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                    <span>AI Suggestions:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {smartSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion(suggestion)}
                        className={`px-3 py-2 rounded-lg text-sm transition-all ${
                          suggestion.type === 'question'
                            ? 'bg-purple-500/20 border border-purple-500/30 text-purple-300 hover:bg-purple-500/30'
                            : suggestion.type === 'detail'
                            ? 'bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30'
                            : 'bg-blue-500/20 border border-blue-500/30 text-blue-300 hover:bg-blue-500/30'
                        }`}
                      >
                        {suggestion.type === 'question' ? '?' : '+'} {suggestion.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Auto-extracted fields preview */}
              {(incidentType || location || timeOfOccurrence) && (
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4 text-green-400" />
                    <span className="text-green-300 text-sm">Auto-Extracted Information</span>
                    {aiConfidence > 0 && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs ml-auto">
                        {aiConfidence}% confidence
                      </Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {incidentType && (
                      <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-3">
                        <p className="text-slate-400 text-xs mb-1">Incident Type</p>
                        <p className="text-white text-sm capitalize">{incidentType.replace('-', ' ')}</p>
                      </div>
                    )}
                    {location && (
                      <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-3">
                        <p className="text-slate-400 text-xs mb-1">Location</p>
                        <p className="text-white text-sm">{location}</p>
                      </div>
                    )}
                    {timeOfOccurrence && (
                      <div className="bg-blue-950/30 border border-blue-800/30 rounded-lg p-3">
                        <p className="text-slate-400 text-xs mb-1">Time</p>
                        <p className="text-white text-sm">{timeOfOccurrence}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Entity Confirmation */}
          {extractedEntities.length > 0 && (
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-400" />
                      AI Extracted Entities
                    </CardTitle>
                    <CardDescription>
                      Review and confirm (HITL)
                    </CardDescription>
                  </div>
                  <Button
                    onClick={handleConfirmAllEntities}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm All & Continue
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {extractedEntities.map((entity, index) => {
                  const Icon = getEntityIcon(entity.type);
                  const color = getEntityColor(entity.type);
                  
                  return (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all ${
                        entity.confirmed
                          ? 'bg-green-950/20 border-green-800/30'
                          : 'bg-slate-950/50 border-slate-700 hover:border-blue-500/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <div className={`w-10 h-10 rounded-lg bg-${color}-500/20 border border-${color}-500/30 flex items-center justify-center flex-shrink-0`}>
                            <Icon className={`w-5 h-5 text-${color}-400`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-slate-400 text-sm capitalize">{entity.type}</span>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                {entity.confidence}% confidence
                              </Badge>
                            </div>
                            <p className="text-white">{entity.value}</p>
                          </div>
                        </div>
                        <Checkbox
                          checked={entity.confirmed}
                          onCheckedChange={() => handleConfirmEntity(index)}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}

          {/* Auto-selected Workflow */}
          {selectedTemplate && (
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  Auto-Selected Workflow Template
                </CardTitle>
                <CardDescription>
                  Based on incident type and AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-purple-950/20 border border-purple-800/30 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${selectedTemplate.color}-500/20 border border-${selectedTemplate.color}-500/30 flex items-center justify-center flex-shrink-0`}>
                      <selectedTemplate.icon className={`w-6 h-6 text-${selectedTemplate.color}-400`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white mb-2">{selectedTemplate.name}</h4>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400 mb-1">SLA</p>
                          <p className="text-white">{selectedTemplate.slaHours}h</p>
                        </div>
                        <div>
                          <p className="text-slate-400 mb-1">Approvals</p>
                          <p className="text-white">{selectedTemplate.approvalPath.length} steps</p>
                        </div>
                        <div>
                          <p className="text-slate-400 mb-1">Tasks</p>
                          <p className="text-white">{selectedTemplate.taskSequence.length} tasks</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleSubmitCase}
                  className="w-full mt-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12"
                >
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Submit Case for Supervisor Approval
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right: AI Assistant */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30 sticky top-6">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>Real-time intelligent extraction</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-300">Extracts entities as you type</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-300">Smart auto-complete suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-300">Auto-fills structured fields</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-300">Selects optimal workflow template</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-green-300">Human confirms every step (HITL)</p>
                  </div>
                </div>
              </div>

              {narrative.length < 50 && (
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-white text-sm mb-3">💡 Quick Tips</h4>
                  <ul className="space-y-2 text-xs text-slate-400">
                    <li>• Include who, what, when, where</li>
                    <li>• Mention suspects, vehicles, weapons</li>
                    <li>• Describe what happened chronologically</li>
                    <li>• Note any witnesses or evidence</li>
                  </ul>
                </div>
              )}

              {selectedTemplate && (
                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-white text-sm mb-3">Next Steps</h4>
                  <div className="space-y-2">
                    {selectedTemplate.approvalPath.map((step, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                          <span className="text-blue-400 text-xs">{i + 1}</span>
                        </div>
                        <span className="text-slate-300">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}