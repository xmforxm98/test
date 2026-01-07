import { useState } from 'react';
import { Badge } from './ui/badge';
import {
  User,
  MapPin,
  Building2,
  FileText,
  Network
} from 'lucide-react';

interface GraphNode {
  id: string;
  type: 'person' | 'location' | 'organization' | 'evidence';
  label: string;
  x: number;
  y: number;
}

interface GraphEdge {
  id: string;
  source: string;
  target: string;
  confidence: number;
}

export function CompactEvidenceLinkGraph() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Compact mock data - fewer nodes for overview
  const nodes: GraphNode[] = [
    { id: 'e1', type: 'evidence', label: 'Bank Stmt', x: 140, y: 80, connections: 3 },
    { id: 'e2', type: 'evidence', label: 'Email', x: 260, y: 80, connections: 2 },
    { id: 'p1', type: 'person', label: 'Ali Hussain', x: 80, y: 160, connections: 3 },
    { id: 'p2', type: 'person', label: 'John Chen', x: 200, y: 160, connections: 2 },
    { id: 'p3', type: 'person', label: 'Maria G.', x: 320, y: 160, connections: 2 },
    { id: 'l1', type: 'location', label: 'Bank A', x: 140, y: 240, connections: 2 },
    { id: 'l2', type: 'location', label: 'Bank B', x: 260, y: 240, connections: 2 },
  ];

  const edges: GraphEdge[] = [
    { id: 'e1', source: 'e1', target: 'p1', confidence: 95 },
    { id: 'e2', source: 'e1', target: 'p2', confidence: 88 },
    { id: 'e3', source: 'e2', target: 'p2', confidence: 92 },
    { id: 'e4', source: 'e2', target: 'p3', confidence: 85 },
    { id: 'e5', source: 'p1', target: 'l1', confidence: 90 },
    { id: 'e6', source: 'p2', target: 'l1', confidence: 87 },
    { id: 'e7', source: 'p2', target: 'l2', confidence: 84 },
    { id: 'e8', source: 'p3', target: 'l2', confidence: 91 },
  ];

  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'person':
        return 'fill-purple-500';
      case 'location':
        return 'fill-green-500';
      case 'organization':
        return 'fill-blue-500';
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
      case 'evidence':
        return FileText;
    }
  };

  return (
    <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-white text-sm flex items-center gap-2">
          <Network className="w-4 h-4 text-blue-400" />
          Entity Connections
        </h4>
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
          {nodes.length} nodes
        </Badge>
      </div>

      {/* Compact Graph Visualization */}
      <div className="relative w-full h-[280px] bg-slate-900/50 rounded border border-slate-800">
        <svg className="w-full h-full">
          {/* Render Edges */}
          {edges.map((edge) => {
            const sourceNode = nodes.find(n => n.id === edge.source);
            const targetNode = nodes.find(n => n.id === edge.target);
            if (!sourceNode || !targetNode) return null;

            const isHovered = hoveredNode === edge.source || hoveredNode === edge.target;

            return (
              <line
                key={edge.id}
                x1={sourceNode.x}
                y1={sourceNode.y}
                x2={targetNode.x}
                y2={targetNode.y}
                className="stroke-slate-600 transition-all"
                strokeWidth={isHovered ? 2 : 1}
                opacity={isHovered ? 0.8 : 0.4}
              />
            );
          })}

          {/* Render Nodes */}
          {nodes.map((node) => {
            const Icon = getNodeIcon(node.type);
            const isHovered = hoveredNode === node.id;
            const nodeRadius = isHovered ? 18 : 14;

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
                  strokeWidth={isHovered ? 2 : 1.5}
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
                    <Icon className="w-3 h-3 text-white" />
                  </div>
                </foreignObject>
                
                {/* Node Label */}
                <text
                  x={node.x}
                  y={node.y + 26}
                  className="fill-white text-[10px]"
                  textAnchor="middle"
                >
                  {node.label}
                </text>

                {/* Hover Tooltip */}
                {isHovered && (
                  <g>
                    <rect
                      x={node.x + 20}
                      y={node.y - 25}
                      width="100"
                      height="40"
                      className="fill-slate-900"
                      stroke="#475569"
                      strokeWidth="1"
                      rx="4"
                    />
                    <text
                      x={node.x + 25}
                      y={node.y - 10}
                      className="fill-white text-[10px]"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x + 25}
                      y={node.y + 2}
                      className="fill-slate-400 text-[9px]"
                    >
                      {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-slate-900/90 border border-slate-700 rounded p-2 backdrop-blur-sm">
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[10px]">
            {[
              { type: 'person', label: 'Person', color: 'bg-purple-500' },
              { type: 'location', label: 'Location', color: 'bg-green-500' },
              { type: 'evidence', label: 'Evidence', color: 'bg-cyan-500' },
              { type: 'organization', label: 'Org', color: 'bg-blue-500' },
            ].map(({ type, label, color }) => (
              <div key={type} className="flex items-center gap-1 text-slate-300">
                <div className={`w-2 h-2 rounded-full ${color}`} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-[10px] mt-2 text-center">
        Hover over nodes to see details • AI-generated relationships
      </p>
    </div>
  );
}
