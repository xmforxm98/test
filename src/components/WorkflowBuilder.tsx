import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  X,
  Save,
  Play,
  Eye,
  Zap,
  FileText,
  CheckCircle,
  Upload,
  Clock,
  GitBranch,
  AlertCircle,
  Users,
  User,
  Bell,
  ThumbsUp,
  Timer,
  PlusCircle,
  XCircle,
  FileCheck,
  Code,
  Webhook,
  Settings,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Undo,
  Redo,
  Circle,
  Diamond,
  Square,
  ArrowRight,
  ChevronRight,
  GripVertical,
} from 'lucide-react';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'integration';
  title: string;
  icon: any;
  position: { x: number; y: number };
  connections: string[];
  config?: any;
}

interface BlockTemplate {
  type: 'trigger' | 'action' | 'condition' | 'integration';
  title: string;
  icon: any;
  category: string;
}

const blockTemplates: BlockTemplate[] = [
  // Triggers
  { type: 'trigger', title: 'Service Request Created', icon: FileText, category: 'trigger' },
  { type: 'trigger', title: 'Task Created', icon: CheckCircle, category: 'trigger' },
  { type: 'trigger', title: 'Task Completed', icon: CheckCircle, category: 'trigger' },
  { type: 'trigger', title: 'Evidence Uploaded', icon: Upload, category: 'trigger' },
  { type: 'trigger', title: 'SLA Threshold Reached', icon: Clock, category: 'trigger' },
  { type: 'trigger', title: 'Cross-Dept Request Received', icon: GitBranch, category: 'trigger' },
  
  // Conditions
  { type: 'condition', title: 'IF / ELSE Condition', icon: GitBranch, category: 'condition' },
  { type: 'condition', title: 'Check Priority', icon: AlertCircle, category: 'condition' },
  { type: 'condition', title: 'Check Role', icon: Users, category: 'condition' },
  { type: 'condition', title: 'Check Required Fields', icon: FileCheck, category: 'condition' },
  { type: 'condition', title: 'Branch by Service Type', icon: GitBranch, category: 'condition' },
  
  // Actions
  { type: 'action', title: 'Assign to Role', icon: Users, category: 'action' },
  { type: 'action', title: 'Assign to User', icon: User, category: 'action' },
  { type: 'action', title: 'Send Notification', icon: Bell, category: 'action' },
  { type: 'action', title: 'Request Dept Head Approval', icon: ThumbsUp, category: 'action' },
  { type: 'action', title: 'Start SLA Timer', icon: Timer, category: 'action' },
  { type: 'action', title: 'Extend SLA', icon: Clock, category: 'action' },
  { type: 'action', title: 'Add to Case Timeline', icon: PlusCircle, category: 'action' },
  { type: 'action', title: 'Reject Request', icon: XCircle, category: 'action' },
  { type: 'action', title: 'Auto-Close Task', icon: CheckCircle, category: 'action' },
  { type: 'action', title: 'Add Evidence Requirement', icon: Upload, category: 'action' },
  
  // Integrations
  { type: 'integration', title: 'API Call (HTTP)', icon: Code, category: 'integration' },
  { type: 'integration', title: 'Webhook Trigger', icon: Webhook, category: 'integration' },
  { type: 'integration', title: 'External System Update', icon: GitBranch, category: 'integration' },
];

export function WorkflowBuilder({ onClose }: { onClose: () => void }) {
  const [workflowName, setWorkflowName] = useState('Forensics Auto-Routing Workflow');
  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: 'node-1',
      type: 'trigger',
      title: 'Service Request Created',
      icon: FileText,
      position: { x: 100, y: 150 },
      connections: ['node-2'],
      config: { serviceType: 'Forensics Report' },
    },
    {
      id: 'node-2',
      type: 'condition',
      title: 'IF Priority = High',
      icon: GitBranch,
      position: { x: 400, y: 150 },
      connections: ['node-3', 'node-4'],
      config: { field: 'priority', operator: 'equals', value: 'High' },
    },
    {
      id: 'node-3',
      type: 'action',
      title: 'Assign to Forensics Analyst Role',
      icon: Users,
      position: { x: 700, y: 80 },
      connections: ['node-5'],
      config: { role: 'Forensics Analyst' },
    },
    {
      id: 'node-4',
      type: 'action',
      title: 'Notify Dept Head',
      icon: Bell,
      position: { x: 700, y: 220 },
      connections: ['node-5'],
      config: { recipient: 'Department Head', message: 'High priority request received' },
    },
    {
      id: 'node-5',
      type: 'action',
      title: 'Start SLA Timer (24h)',
      icon: Timer,
      position: { x: 1000, y: 150 },
      connections: ['node-6'],
      config: { duration: 24, unit: 'hours' },
    },
    {
      id: 'node-6',
      type: 'action',
      title: 'Add Entry to Case Timeline',
      icon: PlusCircle,
      position: { x: 1300, y: 150 },
      connections: [],
      config: { event: 'Service request auto-assigned' },
    },
  ]);
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isDraggingNode, setIsDraggingNode] = useState(false);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [nodeDragStart, setNodeDragStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger':
        return { bg: 'bg-blue-600/20', border: 'border-blue-500', text: 'text-blue-400', header: 'bg-blue-600' };
      case 'action':
        return { bg: 'bg-green-600/20', border: 'border-green-500', text: 'text-green-400', header: 'bg-green-600' };
      case 'condition':
        return { bg: 'bg-amber-600/20', border: 'border-amber-500', text: 'text-amber-400', header: 'bg-amber-600' };
      case 'integration':
        return { bg: 'bg-purple-600/20', border: 'border-purple-500', text: 'text-purple-400', header: 'bg-purple-600' };
      default:
        return { bg: 'bg-slate-600/20', border: 'border-slate-500', text: 'text-slate-400', header: 'bg-slate-600' };
    }
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging && !isDraggingNode) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
    
    // Handle node dragging
    if (isDraggingNode && draggingNodeId) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - pan.x) / zoom;
        const y = (e.clientY - rect.top - pan.y) / zoom;
        
        setNodes(prevNodes =>
          prevNodes.map(n =>
            n.id === draggingNodeId
              ? { ...n, position: { x: x - 80, y: y - 40 } }
              : n
          )
        );
      }
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    setIsDraggingNode(false);
    setDraggingNodeId(null);
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setIsDraggingNode(true);
    setDraggingNodeId(nodeId);
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setSelectedNode(node);
    }
  };

  const handleAddNode = (template: BlockTemplate) => {
    const newNode: WorkflowNode = {
      id: `node-${Date.now()}`,
      type: template.type,
      title: template.title,
      icon: template.icon,
      position: { x: 150, y: 150 },
      connections: [],
      config: {},
    };
    setNodes([...nodes, newNode]);
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes(nodes.filter(n => n.id !== nodeId));
    // Remove connections to this node
    setNodes(prevNodes =>
      prevNodes.map(n => ({
        ...n,
        connections: n.connections.filter(c => c !== nodeId),
      }))
    );
    setSelectedNode(null);
  };

  const drawConnections = () => {
    return nodes.map(node => {
      return node.connections.map(targetId => {
        const targetNode = nodes.find(n => n.id === targetId);
        if (!targetNode) return null;

        const startX = node.position.x + 160;
        const startY = node.position.y + 40;
        const endX = targetNode.position.x;
        const endY = targetNode.position.y + 40;

        const midX = (startX + endX) / 2;

        return (
          <g key={`${node.id}-${targetId}`}>
            <path
              d={`M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`}
              fill="none"
              stroke="#475569"
              strokeWidth="2"
            />
            <circle cx={endX} cy={endY} r="4" fill="#475569" />
          </g>
        );
      });
    });
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col">
      {/* Top Bar */}
      <div className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
        {/* Left: Title */}
        <div>
          <h1 className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-400" />
            Workflow Builder
          </h1>
          <p className="text-slate-400 text-sm">Create automations for services, tasks, routing, and SLAs.</p>
        </div>

        {/* Center: Workflow Name */}
        <div className="flex-1 max-w-md mx-8">
          <Input
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="bg-slate-800 border-slate-700 text-white text-center"
          />
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-2">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Save className="w-4 h-4 mr-2" />
            Save Workflow
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Play className="w-4 h-4 mr-2" />
            Publish Workflow
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
            <Eye className="w-4 h-4 mr-2" />
            Preview Flow
          </Button>
          <Button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
          >
            <X className="w-4 h-4 mr-2" />
            Exit Builder
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Block Library */}
        <div className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <h2 className="text-white text-sm mb-1">Workflow Blocks</h2>
            <p className="text-slate-500 text-xs">Drag blocks to canvas</p>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              {/* Trigger Blocks */}
              <div>
                <h3 className="text-slate-400 text-xs mb-2 flex items-center gap-2">
                  <Zap className="w-3 h-3" />
                  TRIGGER BLOCKS
                </h3>
                <div className="space-y-2">
                  {blockTemplates.filter(b => b.category === 'trigger').map((block, idx) => {
                    const Icon = block.icon;
                    const colors = getNodeColor(block.type);
                    return (
                      <Card
                        key={idx}
                        className={`${colors.bg} border ${colors.border} cursor-grab hover:scale-105 transition-transform`}
                        onClick={() => handleAddNode(block)}
                      >
                        <CardContent className="p-3 flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${colors.text}`} />
                          <span className="text-xs text-white">{block.title}</span>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Condition Blocks */}
              <div>
                <h3 className="text-slate-400 text-xs mb-2 flex items-center gap-2">
                  <GitBranch className="w-3 h-3" />
                  CONDITION / LOGIC BLOCKS
                </h3>
                <div className="space-y-2">
                  {blockTemplates.filter(b => b.category === 'condition').map((block, idx) => {
                    const Icon = block.icon;
                    const colors = getNodeColor(block.type);
                    return (
                      <Card
                        key={idx}
                        className={`${colors.bg} border ${colors.border} cursor-grab hover:scale-105 transition-transform`}
                        onClick={() => handleAddNode(block)}
                      >
                        <CardContent className="p-3 flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${colors.text}`} />
                          <span className="text-xs text-white">{block.title}</span>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Action Blocks */}
              <div>
                <h3 className="text-slate-400 text-xs mb-2 flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" />
                  ACTION BLOCKS
                </h3>
                <div className="space-y-2">
                  {blockTemplates.filter(b => b.category === 'action').map((block, idx) => {
                    const Icon = block.icon;
                    const colors = getNodeColor(block.type);
                    return (
                      <Card
                        key={idx}
                        className={`${colors.bg} border ${colors.border} cursor-grab hover:scale-105 transition-transform`}
                        onClick={() => handleAddNode(block)}
                      >
                        <CardContent className="p-3 flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${colors.text}`} />
                          <span className="text-xs text-white">{block.title}</span>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Integration Blocks */}
              <div>
                <h3 className="text-slate-400 text-xs mb-2 flex items-center gap-2">
                  <Code className="w-3 h-3" />
                  INTEGRATION BLOCKS
                </h3>
                <div className="space-y-2">
                  {blockTemplates.filter(b => b.category === 'integration').map((block, idx) => {
                    const Icon = block.icon;
                    const colors = getNodeColor(block.type);
                    return (
                      <Card
                        key={idx}
                        className={`${colors.bg} border ${colors.border} cursor-grab hover:scale-105 transition-transform`}
                        onClick={() => handleAddNode(block)}
                      >
                        <CardContent className="p-3 flex items-center gap-2">
                          <Icon className={`w-4 h-4 ${colors.text}`} />
                          <span className="text-xs text-white">{block.title}</span>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* Main Canvas */}
        <div className="flex-1 relative overflow-hidden bg-slate-950">
          {/* Dotted grid background */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #334155 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* Canvas */}
          <div
            ref={canvasRef}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            onMouseDown={handleCanvasMouseDown}
            onMouseMove={handleCanvasMouseMove}
            onMouseUp={handleCanvasMouseUp}
            onMouseLeave={handleCanvasMouseUp}
          >
            {/* SVG for connections */}
            <svg
              ref={svgRef}
              className="absolute inset-0 pointer-events-none"
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              {drawConnections()}
            </svg>

            {/* Nodes */}
            <div
              className="absolute"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                transformOrigin: '0 0',
              }}
            >
              {nodes.map(node => {
                const Icon = node.icon;
                const colors = getNodeColor(node.type);
                const isSelected = selectedNode?.id === node.id;

                return (
                  <div
                    key={node.id}
                    className={`absolute cursor-pointer transition-all ${
                      isSelected ? 'ring-2 ring-cyan-500 ring-offset-2 ring-offset-slate-950' : ''
                    }`}
                    style={{
                      left: node.position.x,
                      top: node.position.y,
                      width: '160px',
                    }}
                    onClick={() => setSelectedNode(node)}
                    onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
                    onMouseMove={(e) => {
                      if (isDraggingNode && draggingNodeId === node.id) {
                        setNodes(prevNodes =>
                          prevNodes.map(n => (n.id === node.id ? { ...n, position: { x: e.clientX - nodeDragStart.x, y: e.clientY - nodeDragStart.y } } : n))
                        );
                      }
                    }}
                    onMouseUp={() => {
                      setIsDraggingNode(false);
                      setDraggingNodeId(null);
                    }}
                    onMouseLeave={() => {
                      setIsDraggingNode(false);
                      setDraggingNodeId(null);
                    }}
                  >
                    <Card className={`${colors.bg} border-2 ${colors.border} shadow-lg`}>
                      {/* Node Header */}
                      <div className={`${colors.header} px-3 py-2 flex items-center justify-between rounded-t-lg`}>
                        <div className="flex items-center gap-2">
                          <Icon className="w-4 h-4 text-white" />
                          <Badge className="text-[10px] bg-white/20 text-white border-0">
                            {node.type.toUpperCase()}
                          </Badge>
                        </div>
                        <Settings className="w-3 h-3 text-white/70 hover:text-white transition-colors" />
                      </div>

                      {/* Node Body */}
                      <CardContent className="p-3">
                        <p className="text-white text-xs leading-tight">{node.title}</p>
                      </CardContent>

                      {/* Connection ports */}
                      <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-950" />
                      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-600 border-2 border-slate-950" />
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Configuration Panel */}
        {selectedNode && (
          <div className="w-96 bg-slate-900 border-l border-slate-800 flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h2 className="text-white">Node Configuration</h2>
                <p className="text-slate-400 text-xs">Configure selected node</p>
              </div>
              <Button
                size="sm"
                onClick={() => setSelectedNode(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {/* Node Type Badge */}
                <div>
                  <Badge
                    className={
                      selectedNode.type === 'trigger'
                        ? 'bg-blue-600/20 text-blue-400 border-blue-500'
                        : selectedNode.type === 'action'
                        ? 'bg-green-600/20 text-green-400 border-green-500'
                        : selectedNode.type === 'condition'
                        ? 'bg-amber-600/20 text-amber-400 border-amber-500'
                        : 'bg-purple-600/20 text-purple-400 border-purple-500'
                    }
                  >
                    {selectedNode.type.toUpperCase()}
                  </Badge>
                </div>

                {/* Node Title */}
                <div>
                  <Label className="text-slate-300 text-sm">Node Title</Label>
                  <Input
                    value={selectedNode.title}
                    onChange={(e) => {
                      setNodes(
                        nodes.map(n => (n.id === selectedNode.id ? { ...n, title: e.target.value } : n))
                      );
                      setSelectedNode({ ...selectedNode, title: e.target.value });
                    }}
                    className="mt-1 bg-slate-800 border-slate-700 text-white"
                  />
                </div>

                {/* Node Description */}
                <div>
                  <Label className="text-slate-300 text-sm">Description (Optional)</Label>
                  <Textarea
                    placeholder="Add a description for this node..."
                    className="mt-1 bg-slate-800 border-slate-700 text-white resize-none"
                    rows={3}
                  />
                </div>

                <Separator className="bg-slate-800" />

                {/* Settings Section */}
                <div>
                  <h3 className="text-white text-sm mb-3">Settings</h3>

                  {/* Trigger Settings */}
                  {selectedNode.type === 'trigger' && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-slate-300 text-xs">Trigger Event</Label>
                        <Select defaultValue={selectedNode.config?.serviceType || 'forensics'}>
                          <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="forensics">Forensics Report</SelectItem>
                            <SelectItem value="dna">DNA Analysis</SelectItem>
                            <SelectItem value="ballistics">Ballistics</SelectItem>
                            <SelectItem value="digital">Digital Forensics</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300 text-xs">When</Label>
                        <Select defaultValue="created">
                          <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="created">Request Created</SelectItem>
                            <SelectItem value="updated">Request Updated</SelectItem>
                            <SelectItem value="completed">Request Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}

                  {/* Condition Settings */}
                  {selectedNode.type === 'condition' && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-slate-300 text-xs">Field to Check</Label>
                        <Select defaultValue={selectedNode.config?.field || 'priority'}>
                          <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="priority">Priority</SelectItem>
                            <SelectItem value="role">Role</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                            <SelectItem value="service">Service Type</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300 text-xs">Operator</Label>
                        <Select defaultValue={selectedNode.config?.operator || 'equals'}>
                          <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="equals">Equals</SelectItem>
                            <SelectItem value="not_equals">Not Equals</SelectItem>
                            <SelectItem value="contains">Contains</SelectItem>
                            <SelectItem value="greater_than">Greater Than</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300 text-xs">Value</Label>
                        <Input
                          defaultValue={selectedNode.config?.value || 'High'}
                          className="mt-1 bg-slate-800 border-slate-700 text-white"
                        />
                      </div>
                    </div>
                  )}

                  {/* Action Settings */}
                  {selectedNode.type === 'action' && (
                    <div className="space-y-3">
                      {selectedNode.title.includes('Assign') && (
                        <div>
                          <Label className="text-slate-300 text-xs">Assign To</Label>
                          <Select defaultValue={selectedNode.config?.role || 'analyst'}>
                            <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="analyst">Forensics Analyst</SelectItem>
                              <SelectItem value="lead">Case Lead</SelectItem>
                              <SelectItem value="specialist">Specialist</SelectItem>
                              <SelectItem value="head">Department Head</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {selectedNode.title.includes('Notification') && (
                        <>
                          <div>
                            <Label className="text-slate-300 text-xs">Recipient</Label>
                            <Select defaultValue={selectedNode.config?.recipient || 'head'}>
                              <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="head">Department Head</SelectItem>
                                <SelectItem value="assignee">Assigned User</SelectItem>
                                <SelectItem value="requester">Requester</SelectItem>
                                <SelectItem value="all">All Team Members</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-slate-300 text-xs">Message</Label>
                            <Textarea
                              defaultValue={selectedNode.config?.message || ''}
                              placeholder="Notification message..."
                              className="mt-1 bg-slate-800 border-slate-700 text-white resize-none"
                              rows={2}
                            />
                          </div>
                        </>
                      )}
                      {selectedNode.title.includes('SLA') && (
                        <>
                          <div>
                            <Label className="text-slate-300 text-xs">Duration</Label>
                            <Input
                              type="number"
                              defaultValue={selectedNode.config?.duration || 24}
                              className="mt-1 bg-slate-800 border-slate-700 text-white"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300 text-xs">Unit</Label>
                            <Select defaultValue={selectedNode.config?.unit || 'hours'}>
                              <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="hours">Hours</SelectItem>
                                <SelectItem value="days">Days</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {/* Integration Settings */}
                  {selectedNode.type === 'integration' && (
                    <div className="space-y-3">
                      <div>
                        <Label className="text-slate-300 text-xs">API Endpoint</Label>
                        <Input
                          placeholder="https://api.example.com/endpoint"
                          className="mt-1 bg-slate-800 border-slate-700 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-xs">Method</Label>
                        <Select defaultValue="post">
                          <SelectTrigger className="mt-1 bg-slate-800 border-slate-700 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="get">GET</SelectItem>
                            <SelectItem value="post">POST</SelectItem>
                            <SelectItem value="put">PUT</SelectItem>
                            <SelectItem value="delete">DELETE</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>

                <Separator className="bg-slate-800" />

                {/* Validation Messages */}
                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
                    <div>
                      <p className="text-amber-400 text-xs">Validation</p>
                      <p className="text-amber-300 text-xs mt-1">All required fields are configured</p>
                    </div>
                  </div>
                </div>

                {/* Delete Node */}
                <Button
                  onClick={() => handleDeleteNode(selectedNode.id)}
                  className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Node
                </Button>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="h-12 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-6">
        {/* Left: Save Status */}
        <div className="flex items-center gap-3 text-slate-400 text-xs">
          <CheckCircle className="w-4 h-4 text-green-400" />
          <span>Last Saved: 2 minutes ago</span>
        </div>

        {/* Center: Zoom Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 h-8 w-8 p-0"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          <span className="text-slate-400 text-xs w-12 text-center">{Math.round(zoom * 100)}%</span>
          <Button
            size="sm"
            onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 h-8 w-8 p-0"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 h-8"
          >
            <Maximize className="w-4 h-4 mr-1" />
            Fit to Screen
          </Button>
        </div>

        {/* Right: Undo/Redo */}
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 h-8 w-8 p-0"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 h-8 w-8 p-0"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}