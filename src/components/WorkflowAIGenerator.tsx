import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import {
  X,
  Sparkles,
  Zap,
  FileText,
  GitBranch,
  Loader2,
  CheckCircle,
  AlertCircle,
  Clock,
  Bell,
  Play,
  Settings,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Check,
  RefreshCw,
  Activity,
  Lightbulb,
  ChevronLeft,
  Users,
  Shield,
} from 'lucide-react';

interface WorkflowAIGeneratorProps {
  onClose: () => void;
  onGenerate?: () => void;
}

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'condition' | 'action' | 'end';
  title: string;
  icon: any;
  x: number;
  y: number;
}

export function WorkflowAIGenerator({ onClose, onGenerate }: WorkflowAIGeneratorProps) {
  const [workflowPrompt, setWorkflowPrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const templates = [
    {
      id: 'auto-assign',
      title: 'Auto-Assignment Workflow',
      description: 'Automatically assign tasks/services based on role, workload, or expertise',
      icon: Activity,
      color: 'blue',
      prompt: 'Create a workflow that automatically assigns incoming forensics service requests to available forensics analysts based on their current workload and expertise level.',
    },
    {
      id: 'sla-escalation',
      title: 'SLA Escalation',
      description: 'Trigger alerts or escalations when SLA thresholds are reached',
      icon: Clock,
      color: 'amber',
      prompt: 'Create a workflow that monitors SLA consumption and automatically escalates to department head when 80% threshold is reached, with notifications at 50% and 80%.',
    },
    {
      id: 'approval-chain',
      title: 'Approval Chain',
      description: 'Route requests through multi-level approval process',
      icon: CheckCircle,
      color: 'green',
      prompt: 'Create a workflow that routes cross-department service requests through a two-level approval chain: first to requesting department head, then to service provider department head.',
    },
    {
      id: 'data-validation',
      title: 'Data Validation',
      description: 'Validate data quality before processing a task/service request',
      icon: Shield,
      color: 'purple',
      prompt: 'Create a workflow that validates evidence metadata completeness and file integrity when evidence is uploaded, rejecting uploads that fail validation.',
    },
    {
      id: 'priority-routing',
      title: 'Priority-Based Routing',
      description: 'Route tasks based on priority and urgency',
      icon: Zap,
      color: 'red',
      prompt: 'Create a workflow that routes high-priority cybercrime tasks directly to senior investigators, while medium priority goes to standard queue, and low priority batches overnight.',
    },
    {
      id: 'custom',
      title: 'Custom Workflow',
      description: 'Describe your own workflow requirements',
      icon: Lightbulb,
      color: 'cyan',
      prompt: '',
    },
  ];

  const examplePrompts = [
    'Create a workflow that escalates to supervisor if a task remains unassigned for 24 hours.',
    'Build a workflow that sends daily digest emails summarizing pending service requests.',
    'Design a workflow that validates evidence chain-of-custody before case closure.',
  ];

  const workflowNodes: WorkflowNode[] = [
    { id: '1', type: 'trigger', title: 'Service Request Created', icon: Play, x: 50, y: 50 },
    { id: '2', type: 'condition', title: 'IF Priority = High', icon: AlertCircle, x: 50, y: 150 },
    { id: '3', type: 'action', title: 'Assign to Forensics Analyst', icon: Users, x: 250, y: 150 },
    { id: '4', type: 'action', title: 'Start SLA Timer (24h)', icon: Clock, x: 50, y: 250 },
    { id: '5', type: 'action', title: 'Notify Department Head', icon: Bell, x: 250, y: 250 },
    { id: '6', type: 'end', title: 'End', icon: CheckCircle, x: 150, y: 350 },
  ];

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    if (template.prompt) {
      setWorkflowPrompt(template.prompt);
    }
  };

  const handleExampleClick = (example: string) => {
    setWorkflowPrompt(example);
    setSelectedTemplate('custom');
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
    }, 2000);
  };

  const handleClear = () => {
    setWorkflowPrompt('');
    setHasGenerated(false);
    setSelectedNode(null);
    setSelectedTemplate(null);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger':
        return 'bg-blue-600/20 border-blue-500/50 text-blue-400';
      case 'condition':
        return 'bg-orange-600/20 border-orange-500/50 text-orange-400';
      case 'action':
        return 'bg-green-600/20 border-green-500/50 text-green-400';
      case 'end':
        return 'bg-slate-700/50 border-slate-600 text-slate-400';
      default:
        return 'bg-slate-700/50 border-slate-600 text-slate-400';
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                AI Workflow Generator
              </h1>
              <p className="text-slate-400 text-sm">Describe your workflow and let AI build it for you</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
            >
              Back to Workflow Library
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex gap-6 p-6">
          {/* Left Panel - Quick Start Templates */}
          <div className="w-80 flex-shrink-0">
            <Card className="bg-slate-900/50 border-slate-800 h-full">
              <CardHeader>
                <CardTitle className="text-white text-base">Quick Start Templates</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Choose a common workflow pattern to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="space-y-2 pr-4">
                    {templates.map((template) => {
                      const Icon = template.icon;
                      const isSelected = selectedTemplate === template.id;

                      return (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50'
                              : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-blue-600/30' : 'bg-slate-700/50'
                            }`}>
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm mb-1">{template.title}</p>
                              <p className="text-slate-400 text-xs line-clamp-2">{template.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Natural Language Input */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Input Card */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">Describe Your Workflow</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Be specific about triggers, conditions, actions, and outcomes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300 mb-2 block">Workflow Description</Label>
                  <Textarea
                    value={workflowPrompt}
                    onChange={(e) => setWorkflowPrompt(e.target.value)}
                    placeholder="Create a workflow that routes cross-department service requests through a two-level approval chain: first to requesting department head, then to service provider department head..."
                    className="min-h-[150px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* AI Tips */}
                <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-300 mb-2">Tips for Better AI Generation</p>
                      <ul className="text-xs text-blue-200/80 space-y-1">
                        <li>• Specify clear triggers (e.g., "when a service request is created", "when SLA reaches 80%")</li>
                        <li>• Define conditions (e.g., "if priority is high", "if department is Forensics")</li>
                        <li>• Describe actions (e.g., "assign to role", "send notification", "update status")</li>
                        <li>• Mention expected outcomes (e.g., "ensure case lead is notified within 5 minutes")</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!workflowPrompt.trim() || isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Workflow...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      ✨ Generate Workflow
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example AI Prompts */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">Example AI Prompts</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Click to use these examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 gap-3">
                  {examplePrompts.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleClick(example)}
                      className="text-left p-4 bg-slate-800/30 border border-slate-700 rounded-lg hover:bg-slate-800/50 hover:border-slate-600 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-400 mt-0.5 flex-shrink-0 transition-colors" />
                        <p className="text-slate-300 text-sm">{example}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Workflow Preview Canvas */}
          <div className="w-[480px] flex-shrink-0">
            <Card className="bg-slate-900/50 border-slate-800 h-full flex flex-col">
              {/* Canvas Header */}
              <div className="border-b border-slate-800 px-4 py-3 flex items-center justify-between bg-slate-900/70">
                <h3 className="text-sm text-slate-300">Workflow Preview</h3>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 h-7 px-2"
                  >
                    <ZoomOut className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 h-7 px-2"
                  >
                    <ZoomIn className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 h-7 px-2"
                  >
                    <Maximize2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Canvas Area */}
              <CardContent className="flex-1 p-0 relative bg-slate-950/50 overflow-hidden">
                {!hasGenerated ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                        <GitBranch className="w-8 h-8 text-slate-600" />
                      </div>
                      <p className="text-slate-400 text-sm">
                        Workflow preview will appear here
                      </p>
                      <p className="text-slate-500 text-xs mt-1">
                        Generate a workflow to see the visual diagram
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 p-8">
                    {/* SVG for connections */}
                    <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
                      <defs>
                        <marker
                          id="arrowhead"
                          markerWidth="10"
                          markerHeight="10"
                          refX="9"
                          refY="3"
                          orient="auto"
                          fill="#64748b"
                        >
                          <polygon points="0 0, 10 3, 0 6" />
                        </marker>
                      </defs>
                      
                      {/* Curved paths */}
                      <path
                        d={`M ${workflowNodes[0].x + 85} ${workflowNodes[0].y + 40} 
                            L ${workflowNodes[1].x + 85} ${workflowNodes[1].y}`}
                        stroke="#64748b"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d={`M ${workflowNodes[1].x + 170} ${workflowNodes[1].y + 20} 
                            L ${workflowNodes[2].x} ${workflowNodes[2].y + 20}`}
                        stroke="#64748b"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d={`M ${workflowNodes[1].x + 85} ${workflowNodes[1].y + 40} 
                            L ${workflowNodes[3].x + 85} ${workflowNodes[3].y}`}
                        stroke="#64748b"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d={`M ${workflowNodes[2].x + 85} ${workflowNodes[2].y + 40} 
                            L ${workflowNodes[4].x + 85} ${workflowNodes[4].y}`}
                        stroke="#64748b"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d={`M ${workflowNodes[3].x + 85} ${workflowNodes[3].y + 40} 
                            L ${workflowNodes[5].x + 35} ${workflowNodes[5].y}`}
                        stroke="#64748b"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      <path
                        d={`M ${workflowNodes[4].x + 85} ${workflowNodes[4].y + 40} 
                            L ${workflowNodes[5].x + 135} ${workflowNodes[5].y}`}
                        stroke="#64748b"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                    </svg>

                    {/* Nodes */}
                    {workflowNodes.map((node) => {
                      const Icon = node.icon;
                      const isSelected = selectedNode === node.id;

                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNode(node.id)}
                          className={`absolute cursor-pointer transition-all ${getNodeColor(
                            node.type
                          )} border-2 rounded-lg shadow-md hover:shadow-lg ${
                            isSelected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : ''
                          }`}
                          style={{
                            left: `${node.x}px`,
                            top: `${node.y}px`,
                            width: node.type === 'end' ? '70px' : '170px',
                            height: '40px',
                            zIndex: 10,
                          }}
                        >
                          <div className="flex items-center justify-between h-full px-3">
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="text-xs truncate">{node.title}</span>
                            </div>
                            {node.type !== 'end' && (
                              <Settings className="w-3 h-3 text-slate-500 flex-shrink-0 ml-1" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>

              {/* Canvas Actions */}
              {hasGenerated && (
                <div className="border-t border-slate-800 p-4 space-y-2">
                  <Button
                    onClick={onGenerate}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <GitBranch className="w-4 h-4 mr-2" />
                    Insert into Workflow Builder
                  </Button>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleGenerate}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button
                      onClick={handleClear}
                      className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                    >
                      Clear Preview
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
