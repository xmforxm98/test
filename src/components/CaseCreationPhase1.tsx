import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Loader2, Sparkles, Brain, MapPin, Users, Car, AlertTriangle, CheckCircle2, Clock, ArrowRight, FileText, Target, Shield, Zap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CaseCreationPhase1Props {
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

export function CaseCreationPhase1({ onCaseCreated }: CaseCreationPhase1Props) {
  // Step 1: Incident Logging
  const [incidentType, setIncidentType] = useState('');
  const [location, setLocation] = useState('');
  const [narrative, setNarrative] = useState('');
  const [timeOfOccurrence, setTimeOfOccurrence] = useState('');
  const [partiesInvolved, setPartiesInvolved] = useState('');
  const [evidencePlaceholders, setEvidencePlaceholders] = useState('');

  // AI Entity Extraction
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedEntities, setExtractedEntities] = useState<ExtractedEntity[]>([]);
  const [entitiesConfirmed, setEntitiesConfirmed] = useState(false);

  // Workflow Template Selection
  const [showWorkflowTemplates, setShowWorkflowTemplates] = useState(false);
  const [suggestedTemplate, setSuggestedTemplate] = useState<WorkflowTemplate | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<WorkflowTemplate | null>(null);

  // Case Submission
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

  const handleExtractEntities = () => {
    if (!narrative) {
      toast.error('Please provide incident narrative first');
      return;
    }

    setIsExtracting(true);

    // Simulate AI entity extraction
    setTimeout(() => {
      const entities: ExtractedEntity[] = [
        { type: 'location', value: location || 'Downtown Mall, 123 Main Street', confidence: 94, confirmed: false },
        { type: 'suspect', value: '2 suspects (male, approx. 25-30 years old)', confidence: 87, confirmed: false },
        { type: 'vehicle', value: 'Black sedan, License Plate ABC-123', confidence: 92, confirmed: false },
        { type: 'victim', value: 'Store manager John Smith', confidence: 98, confirmed: false },
        { type: 'weapon', value: 'Handgun (description matches Glock 9mm)', confidence: 85, confirmed: false }
      ];
      setExtractedEntities(entities);
      setIsExtracting(false);

      // AI suggests workflow template based on incident type
      const suggested = workflowTemplates.find(t => t.type.toLowerCase() === incidentType.toLowerCase());
      if (suggested) {
        setSuggestedTemplate(suggested);
        setShowWorkflowTemplates(true);
      }
    }, 2000);
  };

  const handleConfirmEntity = (index: number) => {
    const updated = [...extractedEntities];
    updated[index].confirmed = !updated[index].confirmed;
    setExtractedEntities(updated);
  };

  const handleConfirmAllEntities = () => {
    if (extractedEntities.length === 0) {
      toast.error('Please extract entities first');
      return;
    }
    
    const allConfirmed = extractedEntities.every(e => e.confirmed);
    if (!allConfirmed) {
      const updated = extractedEntities.map(e => ({ ...e, confirmed: true }));
      setExtractedEntities(updated);
    }
    
    setEntitiesConfirmed(true);
    toast.success('All entities confirmed');
  };

  const handleSelectTemplate = (template: WorkflowTemplate) => {
    setSelectedTemplate(template);
    toast.success(`Workflow template "${template.name}" selected`);
  };

  const handleSubmitCase = () => {
    if (!selectedTemplate) {
      toast.error('Please select a workflow template');
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
          <h1 className="text-white text-2xl mb-2">Phase 1: Incident Logging & Case Creation</h1>
          <p className="text-slate-400">Operations → Investigation → Insight → Action</p>
        </div>
        <Badge className="bg-blue-600/20 text-blue-400 border-blue-500/30 px-4 py-2">
          <Brain className="w-4 h-4 mr-2" />
          AI-Assisted Workflow
        </Badge>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-4">
        <div className={`flex items-center gap-2 ${extractedEntities.length > 0 ? 'text-green-400' : 'text-blue-400'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${extractedEntities.length > 0 ? 'border-green-500 bg-green-500/20' : 'border-blue-500 bg-blue-500/20'}`}>
            {extractedEntities.length > 0 ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-sm">1</span>}
          </div>
          <span className="text-sm">Incident Logging</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />
        <div className={`flex items-center gap-2 ${entitiesConfirmed ? 'text-green-400' : 'text-slate-500'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${entitiesConfirmed ? 'border-green-500 bg-green-500/20' : 'border-slate-700 bg-slate-800'}`}>
            {entitiesConfirmed ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-sm">2</span>}
          </div>
          <span className="text-sm">Entity Confirmation</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />
        <div className={`flex items-center gap-2 ${selectedTemplate ? 'text-green-400' : 'text-slate-500'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${selectedTemplate ? 'border-green-500 bg-green-500/20' : 'border-slate-700 bg-slate-800'}`}>
            {selectedTemplate ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-sm">3</span>}
          </div>
          <span className="text-sm">Workflow Selection</span>
        </div>
        <ArrowRight className="w-4 h-4 text-slate-600" />
        <div className={`flex items-center gap-2 ${caseSubmitted ? 'text-green-400' : 'text-slate-500'}`}>
          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${caseSubmitted ? 'border-green-500 bg-green-500/20' : 'border-slate-700 bg-slate-800'}`}>
            <span className="text-sm">4</span>
          </div>
          <span className="text-sm">Submit for Approval</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: Incident Form */}
        <div className="col-span-2 space-y-6">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">1.1 Incident Information</CardTitle>
              <CardDescription>Officer logs incident details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-slate-300">Incident Type *</Label>
                  <Select value={incidentType} onValueChange={setIncidentType}>
                    <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white">
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-700">
                      <SelectItem value="robbery">Robbery</SelectItem>
                      <SelectItem value="fraud">Fraud</SelectItem>
                      <SelectItem value="assault">Assault</SelectItem>
                      <SelectItem value="cyber crime">Cyber Crime</SelectItem>
                      <SelectItem value="theft">Theft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300">Time of Occurrence *</Label>
                  <Input
                    type="datetime-local"
                    value={timeOfOccurrence}
                    onChange={(e) => setTimeOfOccurrence(e.target.value)}
                    className="bg-slate-950/50 border-slate-700 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Location *</Label>
                <Input
                  placeholder="e.g., Downtown Mall, 123 Main Street"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-slate-950/50 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Brief Narrative *</Label>
                <Textarea
                  placeholder="Describe the incident in detail. Include what happened, who was involved, and any relevant circumstances..."
                  value={narrative}
                  onChange={(e) => setNarrative(e.target.value)}
                  rows={6}
                  className="bg-slate-950/50 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Parties Involved (if known)</Label>
                <Input
                  placeholder="Names, descriptions, or identifiers"
                  value={partiesInvolved}
                  onChange={(e) => setPartiesInvolved(e.target.value)}
                  className="bg-slate-950/50 border-slate-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-300">Evidence Placeholder Entries</Label>
                <Textarea
                  placeholder="List expected evidence items (e.g., CCTV footage, witness statements, physical items)"
                  value={evidencePlaceholders}
                  onChange={(e) => setEvidencePlaceholders(e.target.value)}
                  rows={3}
                  className="bg-slate-950/50 border-slate-700 text-white"
                />
              </div>

              <Button
                onClick={handleExtractEntities}
                disabled={!incidentType || !narrative || isExtracting}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
              >
                {isExtracting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    AI Extracting Entities...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Extract Entities with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Entity Extraction Results */}
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
                      Review and confirm extracted information (HITL)
                    </CardDescription>
                  </div>
                  <Button
                    onClick={handleConfirmAllEntities}
                    size="sm"
                    variant="outline"
                    className="border-green-500/30 text-green-400 hover:bg-green-500/20"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-2" />
                    Confirm All
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

                {entitiesConfirmed && (
                  <div className="bg-green-950/20 border border-green-800/30 rounded-lg p-4 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-green-300">All entities confirmed by officer</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Workflow Template Selection */}
          {showWorkflowTemplates && entitiesConfirmed && (
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  1.2 Select Workflow Template
                </CardTitle>
                <CardDescription>
                  AI suggests workflow based on case type (HITL Selection)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestedTemplate && (
                  <div className="bg-purple-950/20 border border-purple-800/30 rounded-lg p-4 mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      <span className="text-purple-300 text-sm">AI Recommendation</span>
                    </div>
                    <p className="text-white">
                      Based on incident type "<span className="text-purple-400">{incidentType}</span>", we recommend the{' '}
                      <span className="text-purple-400">{suggestedTemplate.name}</span> template.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  {workflowTemplates.map((template) => {
                    const Icon = template.icon;
                    const isSelected = selectedTemplate?.id === template.id;
                    const isSuggested = suggestedTemplate?.id === template.id;

                    return (
                      <div
                        key={template.id}
                        onClick={() => handleSelectTemplate(template)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500/50 ring-2 ring-blue-500/30'
                            : isSuggested
                            ? 'bg-purple-950/20 border-purple-500/50'
                            : 'bg-slate-950/50 border-slate-700 hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className={`w-10 h-10 rounded-lg bg-${template.color}-500/20 border border-${template.color}-500/30 flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${template.color}-400`} />
                          </div>
                          {isSuggested && !isSelected && (
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                              AI Suggested
                            </Badge>
                          )}
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                        <h4 className="text-white mb-2">{template.name}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">SLA:</span>
                            <span className="text-white">{template.slaHours}h</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Approvals:</span>
                            <span className="text-white">{template.approvalPath.length}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Tasks:</span>
                            <span className="text-white">{template.taskSequence.length}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          {selectedTemplate && (
            <Button
              onClick={handleSubmitCase}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-12"
            >
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Submit Case for Supervisor Approval
            </Button>
          )}
        </div>

        {/* Right: Workflow Details */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30 sticky top-6">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2">
                <Brain className="w-5 h-5" />
                AI Assistant
              </CardTitle>
              <CardDescription>Horizontal augmentation layer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-300">Real-time entity extraction from narrative</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-300">Intelligent workflow template suggestions</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="text-sm text-slate-300">Human-in-the-loop at every decision point</p>
                  </div>
                </div>
              </div>

              {selectedTemplate && (
                <>
                  <div className="pt-4 border-t border-slate-700">
                    <h4 className="text-white mb-3">Selected Template Details</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Approval Path:</p>
                        <div className="space-y-1">
                          {selectedTemplate.approvalPath.map((approver, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <span className="text-blue-400">{i + 1}.</span>
                              <span className="text-white">{approver}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-slate-400 text-sm mb-2">Mandatory Evidence:</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.mandatoryEvidence.map((evidence, i) => (
                            <Badge key={i} className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                              {evidence}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-slate-400 text-sm mb-2">Task Sequence:</p>
                        <div className="space-y-1">
                          {selectedTemplate.taskSequence.slice(0, 3).map((task, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                              <CheckCircle2 className="w-3 h-3 text-slate-500" />
                              <span className="text-slate-300">{task}</span>
                            </div>
                          ))}
                          {selectedTemplate.taskSequence.length > 3 && (
                            <p className="text-xs text-slate-500 ml-5">
                              +{selectedTemplate.taskSequence.length - 3} more tasks
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
