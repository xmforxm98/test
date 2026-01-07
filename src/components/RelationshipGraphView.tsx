import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { X, Maximize2, ExternalLink, Users, Link2, Brain } from 'lucide-react';
import { motion } from 'motion/react';

interface LinkedCase {
  id: string;
  title: string;
  status: string;
  relationshipType: string;
  sharedEntities: Array<{ name: string; type: string }>;
  confidence: number;
}

interface RelationshipGraphViewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  primaryCase: {
    id: string;
    title: string;
    status: string;
  };
  linkedCases: LinkedCase[];
  onNavigateToCase: (caseId: string) => void;
}

export function RelationshipGraphView({
  open,
  onOpenChange,
  primaryCase,
  linkedCases,
  onNavigateToCase,
}: RelationshipGraphViewProps) {
  const [selectedLink, setSelectedLink] = useState<LinkedCase | null>(null);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Calculate positions for nodes in a circular layout
  const centerX = 400;
  const centerY = 300;
  const radius = 200;

  const getNodePosition = (index: number, total: number) => {
    const angle = (index * 2 * Math.PI) / total - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  const totalSharedEntities = linkedCases.reduce(
    (sum, case_) => sum + case_.sharedEntities.length,
    0
  );

  const averageConfidence =
    linkedCases.length > 0
      ? Math.round(
          linkedCases.reduce((sum, case_) => sum + case_.confidence, 0) / linkedCases.length
        )
      : 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-7xl h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link2 className="w-6 h-6 text-blue-400" />
              <span>Relationship Graph View</span>
              <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">
                Case #{primaryCase.id}
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 h-full overflow-hidden">
          {/* Graph Visualization */}
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-slate-950/50 rounded-lg border border-slate-700 overflow-hidden">
              <svg width="100%" height="100%" className="w-full h-full">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Connection Lines */}
                {linkedCases.map((linkedCase, index) => {
                  const pos = getNodePosition(index, linkedCases.length);
                  const isHovered = hoveredLink === linkedCase.id;
                  return (
                    <g key={linkedCase.id}>
                      <motion.line
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: index * 0.1 }}
                        x1={centerX}
                        y1={centerY}
                        x2={pos.x}
                        y2={pos.y}
                        stroke={isHovered ? '#06b6d4' : 'url(#lineGradient)'}
                        strokeWidth={isHovered ? 3 : 2}
                        strokeDasharray={linkedCase.relationshipType === 'follow-up' ? '5,5' : '0'}
                        filter={isHovered ? 'url(#glow)' : ''}
                        style={{ cursor: 'pointer' }}
                        onMouseEnter={() => setHoveredLink(linkedCase.id)}
                        onMouseLeave={() => setHoveredLink(null)}
                        onClick={() => setSelectedLink(linkedCase)}
                      />
                      {/* Line Label */}
                      {isHovered && (
                        <motion.g
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <rect
                            x={(centerX + pos.x) / 2 - 60}
                            y={(centerY + pos.y) / 2 - 12}
                            width="120"
                            height="24"
                            rx="4"
                            fill="#0f172a"
                            stroke="#06b6d4"
                            strokeWidth="1"
                          />
                          <text
                            x={(centerX + pos.x) / 2}
                            y={(centerY + pos.y) / 2 + 4}
                            textAnchor="middle"
                            fill="#06b6d4"
                            fontSize="10"
                            fontWeight="500"
                          >
                            {linkedCase.relationshipType.replace('-', ' ')}
                          </text>
                        </motion.g>
                      )}
                    </g>
                  );
                })}

                {/* Primary Case Node (Center) */}
                <motion.g
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: 'spring' }}
                >
                  <circle
                    cx={centerX}
                    cy={centerY}
                    r="50"
                    fill="url(#primaryGradient)"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    filter="url(#glow)"
                  />
                  <defs>
                    <linearGradient id="primaryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                  <text
                    x={centerX}
                    y={centerY - 8}
                    textAnchor="middle"
                    fill="white"
                    fontSize="14"
                    fontWeight="600"
                  >
                    #{primaryCase.id}
                  </text>
                  <text
                    x={centerX}
                    y={centerY + 8}
                    textAnchor="middle"
                    fill="white"
                    fontSize="10"
                    opacity="0.8"
                  >
                    Primary
                  </text>
                </motion.g>

                {/* Linked Case Nodes */}
                {linkedCases.map((linkedCase, index) => {
                  const pos = getNodePosition(index, linkedCases.length);
                  const isSelected = selectedLink?.id === linkedCase.id;
                  return (
                    <motion.g
                      key={linkedCase.id}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring' }}
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setHoveredLink(linkedCase.id)}
                      onMouseLeave={() => setHoveredLink(null)}
                      onClick={() => setSelectedLink(linkedCase)}
                    >
                      <circle
                        cx={pos.x}
                        cy={pos.y}
                        r={isSelected ? 42 : 38}
                        fill={isSelected ? '#0891b2' : '#0e7490'}
                        stroke={isSelected ? '#06b6d4' : '#0891b2'}
                        strokeWidth={isSelected ? 3 : 2}
                      />
                      <text
                        x={pos.x}
                        y={pos.y - 5}
                        textAnchor="middle"
                        fill="white"
                        fontSize="12"
                        fontWeight="500"
                      >
                        #{linkedCase.id}
                      </text>
                      <text
                        x={pos.x}
                        y={pos.y + 10}
                        textAnchor="middle"
                        fill="white"
                        fontSize="9"
                        opacity="0.8"
                      >
                        {linkedCase.status}
                      </text>
                    </motion.g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-slate-900/90 border border-slate-700 rounded-lg p-3">
                <div className="text-xs text-slate-300 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" />
                    <span>Solid: Standard Link</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 3px, transparent 3px, transparent 6px)' }} />
                    <span>Dashed: Follow-up</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-4 overflow-y-auto">
            {/* Summary Card */}
            <Card className="bg-slate-950/50 border-slate-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  Linked Cases Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Total Linked Cases</span>
                  <span className="text-white">{linkedCases.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Shared Entities</span>
                  <span className="text-white">{totalSharedEntities}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">AI Confidence</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                        style={{ width: `${averageConfidence}%` }}
                      />
                    </div>
                    <span className="text-white text-sm">{averageConfidence}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Link Details */}
            {selectedLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base text-blue-300">
                      Case #{selectedLink.id}
                    </CardTitle>
                    <CardDescription className="text-slate-300 text-sm">
                      {selectedLink.title}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Relationship Type</div>
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 capitalize">
                        {selectedLink.relationshipType.replace('-', ' ')}
                      </Badge>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 mb-2">Shared Entities</div>
                      <div className="space-y-1">
                        {selectedLink.sharedEntities.map((entity, idx) => (
                          <div
                            key={idx}
                            className="text-xs text-slate-300 flex items-center gap-2 p-1.5 bg-slate-900/50 rounded"
                          >
                            <span className="opacity-60">{entity.type}:</span>
                            <span>{entity.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-slate-400 mb-1">Link Confidence</div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                            style={{ width: `${selectedLink.confidence}%` }}
                          />
                        </div>
                        <span className="text-white text-sm">{selectedLink.confidence}%</span>
                      </div>
                    </div>

                    <Button
                      onClick={() => onNavigateToCase(selectedLink.id)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      size="sm"
                    >
                      <ExternalLink className="w-3.5 h-3.5 mr-2" />
                      Open Case #{selectedLink.id}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* AI Copilot Message */}
            <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                <span className="text-xs">AI</span>
              </div>
              <p className="text-xs text-slate-300 italic">
                "Link established successfully. I'll notify both Case Leads of the connection."
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
