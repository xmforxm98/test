import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner@2.0.3';
import {
  Network,
  User,
  MapPin,
  Building2,
  FileText,
  Calendar,
  Sparkles,
  Download,
  FileUp,
  Filter,
  Info,
  ChevronRight,
  X,
  Link2
} from 'lucide-react';

interface GraphNode {
  id: string;
  type: 'person' | 'location' | 'organization' | 'event' | 'evidence';
  label: string;
  x: number;
  y: number;
  connections: number;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  type: 'person' | 'location' | 'organization' | 'temporal' | 'keyword';
  confidence: number;
  supporting: string[];
}

interface LinkDetail {
  confidence: number;
  linkType: string;
  supportingEvidence: string[];
  inferredBy: string;
}

export function CrossEvidenceLinkGraph() {
  const [showPeopleOnly, setShowPeopleOnly] = useState(false);
  const [highlightWeak, setHighlightWeak] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState(90);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<GraphEdge | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);

  // Mock graph data
  const nodes: GraphNode[] = [
    { id: 'e32', type: 'evidence', label: 'Evidence #32', x: 300, y: 200, connections: 5 },
    { id: 'e45', type: 'evidence', label: 'Evidence #45', x: 500, y: 150, connections: 3 },
    { id: 'e67', type: 'evidence', label: 'Evidence #67', x: 700, y: 250, connections: 4 },
    { id: 'p1', type: 'person', label: 'John Doe', x: 400, y: 300, connections: 6 },
    { id: 'p2', type: 'person', label: 'Jane Smith', x: 600, y: 350, connections: 4 },
    { id: 'l1', type: 'location', label: '1234 Main St', x: 500, y: 450, connections: 3 },
    { id: 'o1', type: 'organization', label: 'TechCorp', x: 350, y: 400, connections: 2 },
    { id: 'ev1', type: 'event', label: 'Meeting 03/15', x: 550, y: 300, connections: 3 },
  ];

  const edges: GraphEdge[] = [
    { id: 'e1', source: 'e32', target: 'p1', type: 'person', confidence: 95, supporting: ['Facial Recognition', 'Document Analysis'] },
    { id: 'e2', source: 'e45', target: 'p1', type: 'person', confidence: 88, supporting: ['Voice Analysis', 'Metadata'] },
    { id: 'e3', source: 'e67', target: 'p2', type: 'person', confidence: 92, supporting: ['Facial Recognition'] },
    { id: 'e4', source: 'p1', target: 'l1', type: 'location', confidence: 85, supporting: ['GPS Data', 'Visual Location Match'] },
    { id: 'e5', source: 'p1', target: 'o1', type: 'organization', confidence: 78, supporting: ['Employment Records'] },
    { id: 'e6', source: 'p2', target: 'l1', type: 'location', confidence: 91, supporting: ['GPS Data'] },
    { id: 'e7', source: 'ev1', target: 'p1', type: 'temporal', confidence: 87, supporting: ['Calendar Data', 'Timestamp Analysis'] },
    { id: 'e8', source: 'ev1', target: 'p2', type: 'temporal', confidence: 89, supporting: ['Calendar Data'] },
    { id: 'e9', source: 'e32', target: 'l1', type: 'location', confidence: 82, supporting: ['Image Analysis'] },
    { id: 'e10', source: 'e45', target: 'ev1', type: 'temporal', confidence: 94, supporting: ['Timestamp Correlation'] },
  ];

  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'person':
        return 'fill-purple-500';
      case 'location':
        return 'fill-green-500';
      case 'organization':
        return 'fill-blue-500';
      case 'event':
        return 'fill-amber-500';
      case 'evidence':
        return 'fill-cyan-500';
    }
  };

  const getNodeIcon = (type: GraphNode['type']) => {
    switch (type) {
      case 'person':
        return User;
      case 'location':
        return MapPin;
      case 'organization':
        return Building2;
      case 'event':
        return Calendar;
      case 'evidence':
        return FileText;
    }
  };

  const getEdgeColor = (type: GraphEdge['type'], confidence: number) => {
    if (highlightWeak && confidence < 85) {
      return 'stroke-red-500';
    }
    switch (type) {
      case 'person':
        return 'stroke-purple-400';
      case 'location':
        return 'stroke-green-400';
      case 'organization':
        return 'stroke-blue-400';
      case 'temporal':
        return 'stroke-amber-400';
      case 'keyword':
        return 'stroke-cyan-400';
      default:
        return 'stroke-slate-500';
    }
  };

  const filteredEdges = edges.filter(edge => {
    if (edge.confidence < confidenceThreshold) return false;
    if (showPeopleOnly && edge.type !== 'person') return false;
    return true;
  });

  const connectedNodes = new Set<string>();
  filteredEdges.forEach(edge => {
    connectedNodes.add(edge.source);
    connectedNodes.add(edge.target);
  });

  const filteredNodes = nodes.filter(node => connectedNodes.has(node.id));

  const handleEdgeClick = (edge: GraphEdge) => {
    setSelectedEdge(edge);
    setShowSidePanel(true);
  };

  const handleDownloadPDF = () => {
    toast.success('Graph exported as PDF', {
      description: 'Cross-evidence link graph has been downloaded.',
    });
  };

  const handleExportToCase = () => {
    toast.success('Graph exported to case', {
      description: 'Link analysis added to case evidence.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white flex items-center gap-2">
            <Network className="w-6 h-6 text-blue-400" />
            Cross-Evidence Link Graph
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Interactive network showing how evidence files connect through shared entities
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            onClick={handleDownloadPDF}
            variant="outline"
            className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download as PDF
          </Button>
          <Button
            onClick={handleExportToCase}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <FileUp className="w-4 h-4 mr-2" />
            Export to Case
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <Card className="bg-slate-900/50 border-slate-800 lg:col-span-1">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-white">
              <Filter className="w-5 h-5 text-blue-400" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Show People Links Only */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="people-only" className="text-slate-300">
                  Show only People-Evidence links
                </Label>
                <Switch
                  id="people-only"
                  checked={showPeopleOnly}
                  onCheckedChange={setShowPeopleOnly}
                />
              </div>
            </div>

            {/* Highlight Weak Connections */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="weak-connections" className="text-slate-300">
                  Highlight Weak Connections
                </Label>
                <Switch
                  id="weak-connections"
                  checked={highlightWeak}
                  onCheckedChange={setHighlightWeak}
                />
              </div>
            </div>

            {/* Confidence Threshold */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-slate-300">Filter by Confidence</Label>
                <span className="text-blue-400">&gt; {confidenceThreshold}%</span>
              </div>
              <Slider
                value={[confidenceThreshold]}
                onValueChange={(value) => setConfidenceThreshold(value[0])}
                min={50}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            {/* AI Assistant Tooltip */}
            <div className="pt-4 border-t border-slate-800">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-start gap-3 p-3 bg-blue-950/30 border border-blue-500/30 rounded-lg cursor-help">
                      <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-300 text-sm">
                          AI Link Analysis
                        </p>
                        <p className="text-slate-400 text-xs mt-1">
                          Hover for details
                        </p>
                      </div>
                      <Info className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="bg-slate-900 border-slate-700 text-slate-300 max-w-sm">
                    <p>These connections were inferred using co-occurrence analysis and temporal alignment models</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {/* Legend */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-white text-sm">Node Types</h4>
              <div className="space-y-2">
                {[
                  { type: 'person', label: 'Person', icon: User },
                  { type: 'location', label: 'Location', icon: MapPin },
                  { type: 'organization', label: 'Organization', icon: Building2 },
                  { type: 'event', label: 'Event', icon: Calendar },
                  { type: 'evidence', label: 'Evidence', icon: FileText },
                ].map(({ type, label, icon: Icon }) => (
                  <div key={type} className="flex items-center gap-2 text-sm text-slate-300">
                    <div className={`w-3 h-3 rounded-full ${getNodeColor(type as any)}`} />
                    <Icon className="w-3 h-3" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Edge Legend */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <h4 className="text-white text-sm">Relationship Types</h4>
              <div className="space-y-2">
                {[
                  { type: 'person', label: 'Person Link', color: 'stroke-purple-400' },
                  { type: 'location', label: 'Location Link', color: 'stroke-green-400' },
                  { type: 'organization', label: 'Organization Link', color: 'stroke-blue-400' },
                  { type: 'temporal', label: 'Temporal Link', color: 'stroke-amber-400' },
                ].map(({ type, label, color }) => (
                  <div key={type} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg width="20" height="2">
                      <line x1="0" y1="1" x2="20" y2="1" className={color} strokeWidth="2" />
                    </svg>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Graph Visualization */}
        <Card className="bg-slate-900/50 border-slate-800 lg:col-span-3">
          <CardContent className="p-6">
            <div className="relative w-full h-[600px] bg-slate-950/50 rounded-lg border border-slate-800 overflow-hidden">
              <svg className="w-full h-full">
                {/* Render Edges */}
                {filteredEdges.map((edge) => {
                  const sourceNode = nodes.find(n => n.id === edge.source);
                  const targetNode = nodes.find(n => n.id === edge.target);
                  if (!sourceNode || !targetNode) return null;

                  const isHovered = hoveredNode === edge.source || hoveredNode === edge.target;
                  const isWeak = edge.confidence < 85;

                  return (
                    <g key={edge.id}>
                      <line
                        x1={sourceNode.x}
                        y1={sourceNode.y}
                        x2={targetNode.x}
                        y2={targetNode.y}
                        className={`${getEdgeColor(edge.type, edge.confidence)} transition-all cursor-pointer`}
                        strokeWidth={isHovered ? 3 : (isWeak && highlightWeak ? 2 : 1.5)}
                        strokeDasharray={isWeak && highlightWeak ? '5,5' : 'none'}
                        opacity={isHovered ? 1 : 0.6}
                        onClick={() => handleEdgeClick(edge)}
                      />
                      {isHovered && (
                        <text
                          x={(sourceNode.x + targetNode.x) / 2}
                          y={(sourceNode.y + targetNode.y) / 2 - 10}
                          className="fill-white text-xs"
                          textAnchor="middle"
                        >
                          {edge.confidence}% confidence
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Render Nodes */}
                {filteredNodes.map((node) => {
                  const Icon = getNodeIcon(node.type);
                  const isHovered = hoveredNode === node.id;
                  const connectedEdges = filteredEdges.filter(
                    e => e.source === node.id || e.target === node.id
                  );
                  const nodeRadius = isHovered ? 24 : 20;

                  return (
                    <g
                      key={node.id}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className="cursor-pointer"
                    >
                      {/* Node Circle */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={nodeRadius}
                        className={`${getNodeColor(node.type)} transition-all`}
                        opacity={isHovered ? 1 : 0.9}
                        stroke={isHovered ? '#60a5fa' : '#1e293b'}
                        strokeWidth={isHovered ? 3 : 2}
                      />
                      
                      {/* Node Icon */}
                      <foreignObject
                        x={node.x - nodeRadius / 2}
                        y={node.y - nodeRadius / 2}
                        width={nodeRadius}
                        height={nodeRadius}
                        className="pointer-events-none"
                      >
                        <div className="flex items-center justify-center w-full h-full">
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                      </foreignObject>
                      
                      {/* Node Label */}
                      <text
                        x={node.x}
                        y={node.y + 35}
                        className="fill-white text-xs"
                        textAnchor="middle"
                      >
                        {node.label}
                      </text>

                      {/* Connection Count Badge - only show when not hovered */}
                      {!isHovered && (
                        <g>
                          <circle
                            cx={node.x + 12}
                            cy={node.y - 12}
                            r="8"
                            className="fill-blue-600"
                            stroke="#1e293b"
                            strokeWidth="2"
                          />
                          <text
                            x={node.x + 12}
                            y={node.y - 9}
                            className="fill-white text-xs"
                            textAnchor="middle"
                            fontSize="10"
                          >
                            {connectedEdges.length}
                          </text>
                        </g>
                      )}

                      {/* Hover Tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={node.x + 30}
                            y={node.y - 40}
                            width="200"
                            height="60"
                            className="fill-slate-900"
                            stroke="#475569"
                            strokeWidth="1"
                            rx="4"
                          />
                          <text
                            x={node.x + 40}
                            y={node.y - 20}
                            className="fill-white text-xs"
                          >
                            {node.label}
                          </text>
                          <text
                            x={node.x + 40}
                            y={node.y - 5}
                            className="fill-slate-400 text-xs"
                          >
                            {connectedEdges.length} connection{connectedEdges.length !== 1 ? 's' : ''}
                          </text>
                          <text
                            x={node.x + 40}
                            y={node.y + 10}
                            className="fill-blue-400 text-xs"
                          >
                            Click edge for details
                          </text>
                        </g>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Stats Overlay */}
              <div className="absolute top-4 left-4 bg-slate-900/90 border border-slate-700 rounded-lg p-3 backdrop-blur-sm">
                <div className="space-y-1 text-sm">
                  <div className="text-slate-400">
                    Nodes: <span className="text-white">{filteredNodes.length}</span>
                  </div>
                  <div className="text-slate-400">
                    Connections: <span className="text-white">{filteredEdges.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Side Panel - AI Link Summary */}
      {showSidePanel && selectedEdge && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-end">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-md h-full m-0 rounded-none overflow-hidden flex flex-col animate-in slide-in-from-right duration-300">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Link2 className="w-5 h-5 text-blue-400" />
                  AI Link Summary
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowSidePanel(false);
                    setSelectedEdge(null);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                {/* Connection Overview */}
                <div>
                  <h4 className="text-white mb-3">Connection Details</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Source</span>
                      <span className="text-white">
                        {nodes.find(n => n.id === selectedEdge.source)?.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-400 text-sm">Target</span>
                      <span className="text-white">
                        {nodes.find(n => n.id === selectedEdge.target)?.label}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Confidence Score */}
                <div>
                  <h4 className="text-white mb-3">Confidence Score</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Overall Confidence</span>
                      <Badge className={`${
                        selectedEdge.confidence >= 90 ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                        selectedEdge.confidence >= 80 ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                        'bg-amber-500/20 text-amber-400 border-amber-500/30'
                      }`}>
                        {selectedEdge.confidence}%
                      </Badge>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          selectedEdge.confidence >= 90 ? 'bg-green-500' :
                          selectedEdge.confidence >= 80 ? 'bg-blue-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: `${selectedEdge.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Link Type */}
                <div>
                  <h4 className="text-white mb-3">Link Type</h4>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {selectedEdge.type.charAt(0).toUpperCase() + selectedEdge.type.slice(1)} Connection
                  </Badge>
                </div>

                {/* Supporting Evidence */}
                <div>
                  <h4 className="text-white mb-3">Supporting Evidence</h4>
                  <div className="space-y-2">
                    {selectedEdge.supporting.map((evidence, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-slate-300 text-sm">{evidence}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Analysis */}
                <div className="p-4 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-white text-sm mb-1">AI Inference Method</h5>
                      <p className="text-slate-400 text-xs">
                        This connection was identified using {selectedEdge.type === 'temporal' ? 'temporal alignment' : 'co-occurrence'} analysis across multiple evidence files. The AI model cross-referenced {selectedEdge.supporting.length} data points to establish this relationship.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  <Button
                    onClick={() => {
                      toast.success('Link added to case notes');
                      setShowSidePanel(false);
                    }}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Add to Case Notes
                  </Button>
                  <Button
                    onClick={() => toast.info('Feature coming soon')}
                    variant="outline"
                    className="w-full bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                  >
                    View Source Evidence
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
