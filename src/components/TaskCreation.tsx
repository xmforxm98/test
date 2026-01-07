import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon, Check, Sparkles, X, CheckCircle2, User, Building2, MapPin, Calendar as CalendarEvent } from 'lucide-react';
import { format } from 'date-fns';

interface TaskCreationProps {
  caseData: any;
  onTaskCreated?: () => void;
  onCancel?: () => void;
}

interface AISuggestion {
  id: string;
  title: string;
  description: string;
  source: string;
  entityType: 'person' | 'organization' | 'location' | 'event' | 'case-type' | 'report';
  entityName: string;
  priority: 'high' | 'medium' | 'low';
  suggestedService: string;
  suggestedAssignee: string;
  accepted?: boolean;
  rejected?: boolean;
}

export function TaskCreation({ caseData, onTaskCreated, onCancel }: TaskCreationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [assignedService, setAssignedService] = useState('');
  const [assignee, setAssignee] = useState('');
  const [linkedCase, setLinkedCase] = useState(caseData?.id || '');
  const [priority, setPriority] = useState('');
  const [slaDeadline, setSlaDeadline] = useState<Date>();

  // AI Suggestions
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([
    {
      id: 'ai-1',
      title: 'Interview Suspect',
      description: 'Conduct formal interview with identified person of interest to gather testimony and establish timeline',
      source: 'POLE Entity: Person',
      entityType: 'person',
      entityName: 'John Doe',
      priority: 'high',
      suggestedService: 'investigations',
      suggestedAssignee: 'james-chen'
    },
    {
      id: 'ai-2',
      title: 'Run Background Check',
      description: 'Execute comprehensive background investigation including criminal history, financial records, and associates',
      source: 'POLE Entity: Person',
      entityType: 'person',
      entityName: 'John Doe',
      priority: 'high',
      suggestedService: 'intelligence',
      suggestedAssignee: 'maria-garcia'
    },
    {
      id: 'ai-3',
      title: 'Investigate Organization',
      description: 'Analyze corporate structure, financial dealings, and key personnel of identified organization',
      source: 'POLE Entity: Organization',
      entityType: 'organization',
      entityName: 'TechCorp Industries',
      priority: 'medium',
      suggestedService: 'financial',
      suggestedAssignee: 'john-smith'
    },
    {
      id: 'ai-4',
      title: 'Site Inspection',
      description: 'Conduct physical inspection and evidence collection at identified location',
      source: 'POLE Entity: Location',
      entityType: 'location',
      entityName: '1234 Main Street',
      priority: 'high',
      suggestedService: 'forensics',
      suggestedAssignee: 'sarah-mitchell'
    },
    {
      id: 'ai-5',
      title: 'Analyze Financial Transactions',
      description: 'Review and analyze transaction patterns from transcribed financial records',
      source: 'Case Type: Financial Fraud',
      entityType: 'case-type',
      entityName: 'Financial Fraud Pattern',
      priority: 'medium',
      suggestedService: 'financial',
      suggestedAssignee: 'john-smith'
    },
    {
      id: 'ai-6',
      title: 'Verify Event Timeline',
      description: 'Cross-reference reported event timeline with surveillance and witness statements',
      source: 'POLE Entity: Event',
      entityType: 'event',
      entityName: 'Transaction on Oct 15, 2025',
      priority: 'medium',
      suggestedService: 'investigations',
      suggestedAssignee: 'james-chen'
    }
  ]);

  const acceptSuggestion = (suggestion: AISuggestion) => {
    setTaskTitle(suggestion.title);
    setTaskDescription(suggestion.description);
    setAssignedService(suggestion.suggestedService);
    setAssignee(suggestion.suggestedAssignee);
    setPriority(suggestion.priority);
    
    // Mark as accepted
    setAiSuggestions(prev =>
      prev.map(s => s.id === suggestion.id ? { ...s, accepted: true, rejected: false } : s)
    );
  };

  const rejectSuggestion = (suggestionId: string) => {
    setAiSuggestions(prev =>
      prev.map(s => s.id === suggestionId ? { ...s, rejected: true, accepted: false } : s)
    );
  };

  const acceptAllSuggestions = () => {
    // Accept the first non-rejected suggestion for the current task
    const firstSuggestion = aiSuggestions.find(s => !s.rejected);
    if (firstSuggestion) {
      acceptSuggestion(firstSuggestion);
    }
  };

  const rejectAllSuggestions = () => {
    setAiSuggestions(prev =>
      prev.map(s => ({ ...s, rejected: true, accepted: false }))
    );
  };

  const getEntityIcon = (entityType: AISuggestion['entityType']) => {
    switch (entityType) {
      case 'person':
        return <User className="w-4 h-4" />;
      case 'organization':
        return <Building2 className="w-4 h-4" />;
      case 'location':
        return <MapPin className="w-4 h-4" />;
      case 'event':
        return <CalendarEvent className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && taskTitle && taskDescription) {
      setCurrentStep(2);
    } else if (currentStep === 2 && assignedService && assignee && linkedCase && priority && slaDeadline) {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Handle task creation
    console.log({
      taskTitle,
      taskDescription,
      assignedService,
      assignee,
      linkedCase,
      priority,
      slaDeadline
    });
    onTaskCreated?.();
  };

  const navigateToStep = (step: number) => {
    if (step <= currentStep || (currentStep === 1 && taskTitle && taskDescription)) {
      setCurrentStep(step);
    }
  };

  const canProceed = () => {
    if (currentStep === 1) {
      return taskTitle && taskDescription;
    }
    if (currentStep === 2) {
      return assignedService && assignee && linkedCase && priority && slaDeadline;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigateToStep(1)}
              className={currentStep === 1 ? 'text-blue-400 cursor-pointer' : 'text-slate-400 cursor-pointer hover:text-slate-300'}
            >
              Task Details
            </BreadcrumbLink>
          </BreadcrumbItem>
          {currentStep >= 2 && (
            <>
              <BreadcrumbSeparator className="text-slate-600" />
              <BreadcrumbItem>
                <BreadcrumbLink
                  onClick={() => navigateToStep(2)}
                  className={currentStep === 2 ? 'text-blue-400 cursor-pointer' : 'text-slate-400 cursor-pointer hover:text-slate-300'}
                >
                  Assignment & Priority
                </BreadcrumbLink>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* AI Task Suggestions */}
      {currentStep === 1 && aiSuggestions.filter(s => !s.rejected).length > 0 && (
        <Card className="bg-gradient-to-br from-blue-950/30 to-slate-900/50 border-blue-500/30 relative overflow-hidden">
          {/* Glowing accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <CardContent className="p-6 space-y-4 relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-white flex items-center gap-2">
                    AI Task Suggestions
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {aiSuggestions.filter(s => !s.rejected).length} suggested
                    </Badge>
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    Based on case type, POLE entities, and transcribed reports
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={rejectAllSuggestions}
                  className="border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"
                >
                  <X className="w-4 h-4 mr-1" />
                  Reject All
                </Button>
                <Button
                  size="sm"
                  onClick={acceptAllSuggestions}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <CheckCircle2 className="w-4 h-4 mr-1" />
                  Accept First
                </Button>
              </div>
            </div>

            {/* Suggestions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {aiSuggestions
                .filter(s => !s.rejected)
                .map((suggestion) => (
                  <Card
                    key={suggestion.id}
                    className={`bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all ${
                      suggestion.accepted ? 'border-green-500/50 bg-green-950/20' : ''
                    }`}
                  >
                    <CardContent className="p-4 space-y-3">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              suggestion.entityType === 'person' ? 'bg-purple-500/20 text-purple-400' :
                              suggestion.entityType === 'organization' ? 'bg-blue-500/20 text-blue-400' :
                              suggestion.entityType === 'location' ? 'bg-green-500/20 text-green-400' :
                              suggestion.entityType === 'event' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-cyan-500/20 text-cyan-400'
                            }`}>
                              {getEntityIcon(suggestion.entityType)}
                            </div>
                            <h4 className="text-white text-sm">{suggestion.title}</h4>
                          </div>
                          <p className="text-slate-400 text-xs line-clamp-2 ml-10">
                            {suggestion.description}
                          </p>
                        </div>
                        
                        {suggestion.accepted && (
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        )}
                      </div>

                      {/* Entity Info */}
                      <div className="flex items-center gap-2 ml-10">
                        <Badge className="bg-slate-800/50 text-slate-400 border-slate-700 text-xs">
                          {suggestion.entityName}
                        </Badge>
                        <Badge className={`text-xs ${
                          suggestion.priority === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          suggestion.priority === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                          'bg-green-500/20 text-green-400 border-green-500/30'
                        }`}>
                          {suggestion.priority}
                        </Badge>
                      </div>

                      {/* Source */}
                      <div className="text-xs text-slate-500 ml-10">
                        Source: {suggestion.source}
                      </div>

                      {/* Actions */}
                      {!suggestion.accepted && (
                        <div className="flex items-center gap-2 ml-10 pt-2 border-t border-slate-800">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => rejectSuggestion(suggestion.id)}
                            className="flex-1 border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white text-xs h-8"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => acceptSuggestion(suggestion)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs h-8"
                          >
                            <Check className="w-3 h-3 mr-1" />
                            Accept
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 1: Task Details */}
      {currentStep === 1 && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-white mb-2">Task Details</h3>
              <p className="text-slate-400 text-sm">Provide basic information about the task</p>
            </div>

            <div className="space-y-4">
              {/* Task Title */}
              <div className="space-y-2">
                <Label htmlFor="task-title" className="text-slate-300">
                  Task Title <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="task-title"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Enter task title"
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="task-description" className="text-slate-300">
                  Description <span className="text-red-400">*</span>
                </Label>
                <Textarea
                  id="task-description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  placeholder="Provide detailed description of the task"
                  rows={6}
                  className="bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 resize-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
              <Button
                variant="outline"
                onClick={onCancel}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Assignment & Priority */}
      {currentStep === 2 && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="text-white mb-2">Assignment & Priority</h3>
              <p className="text-slate-400 text-sm">Assign task and set priority and deadline</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Assigned Service */}
              <div className="space-y-2">
                <Label htmlFor="assigned-service" className="text-slate-300">
                  Service <span className="text-red-400">*</span>
                </Label>
                <Select value={assignedService} onValueChange={setAssignedService}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="cyber-crime">Cyber Crime Unit</SelectItem>
                    <SelectItem value="forensics">Forensics Department</SelectItem>
                    <SelectItem value="intelligence">Intelligence Unit</SelectItem>
                    <SelectItem value="financial">Financial Crimes</SelectItem>
                    <SelectItem value="investigations">Investigations</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Assignee */}
              <div className="space-y-2">
                <Label htmlFor="assignee" className="text-slate-300">
                  Assignee <span className="text-red-400">*</span>
                </Label>
                <Select value={assignee} onValueChange={setAssignee}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="sarah-mitchell">Det. Sarah Mitchell</SelectItem>
                    <SelectItem value="james-chen">Det. James Chen</SelectItem>
                    <SelectItem value="maria-garcia">Analyst Maria Garcia</SelectItem>
                    <SelectItem value="john-smith">Analyst John Smith</SelectItem>
                    <SelectItem value="robert-johnson">Det. Robert Johnson</SelectItem>
                    <SelectItem value="emily-davis">Analyst Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Linked Case */}
              <div className="space-y-2">
                <Label htmlFor="linked-case" className="text-slate-300">
                  Linked Case <span className="text-red-400">*</span>
                </Label>
                <Select value={linkedCase} onValueChange={setLinkedCase}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select case" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value={caseData?.id}>{caseData?.id} - {caseData?.name}</SelectItem>
                    <SelectItem value="#53">#53 - Financial Fraud Investigation</SelectItem>
                    <SelectItem value="#52">#52 - Identity Theft Case</SelectItem>
                    <SelectItem value="#51">#51 - Money Laundering Probe</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <Label htmlFor="priority" className="text-slate-300">
                  Priority <span className="text-red-400">*</span>
                </Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="high">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span>
                        High
                      </div>
                    </SelectItem>
                    <SelectItem value="medium">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        Medium
                      </div>
                    </SelectItem>
                    <SelectItem value="low">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Low
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* SLA Deadline */}
              <div className="space-y-2">
                <Label htmlFor="sla-deadline" className="text-slate-300">
                  SLA Deadline <span className="text-red-400">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left bg-slate-800/50 border-slate-700 text-white hover:bg-slate-800 ${
                        !slaDeadline && 'text-slate-500'
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {slaDeadline ? format(slaDeadline, 'PPP') : 'Pick a date'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-slate-800 border-slate-700">
                    <Calendar
                      mode="single"
                      selected={slaDeadline}
                      onSelect={setSlaDeadline}
                      initialFocus
                      className="bg-slate-800 text-white"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Summary */}
            {taskTitle && taskDescription && (
              <div className="p-4 bg-slate-800/30 border border-slate-700 rounded-lg space-y-2">
                <h4 className="text-white text-sm">Task Summary</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-start gap-2 text-slate-400">
                    <span className="text-slate-500 min-w-[100px]">Title:</span>
                    <span className="text-white">{taskTitle}</span>
                  </div>
                  <div className="flex items-start gap-2 text-slate-400">
                    <span className="text-slate-500 min-w-[100px]">Description:</span>
                    <span className="text-white line-clamp-2">{taskDescription}</span>
                  </div>
                  {assignedService && (
                    <div className="flex items-start gap-2 text-slate-400">
                      <span className="text-slate-500 min-w-[100px]">Service:</span>
                      <span className="text-white capitalize">{assignedService.replace('-', ' ')}</span>
                    </div>
                  )}
                  {assignee && (
                    <div className="flex items-start gap-2 text-slate-400">
                      <span className="text-slate-500 min-w-[100px]">Assignee:</span>
                      <span className="text-white capitalize">{assignee.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                    </div>
                  )}
                  {priority && (
                    <div className="flex items-start gap-2 text-slate-400">
                      <span className="text-slate-500 min-w-[100px]">Priority:</span>
                      <Badge className={`text-xs ${
                        priority === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                        priority === 'medium' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                        'bg-green-500/20 text-green-400 border-green-500/30'
                      }`}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Badge>
                    </div>
                  )}
                  {slaDeadline && (
                    <div className="flex items-start gap-2 text-slate-400">
                      <span className="text-slate-500 min-w-[100px]">Deadline:</span>
                      <span className="text-white">{format(slaDeadline, 'PPP')}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Back
              </Button>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={onCancel}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Create Task
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
