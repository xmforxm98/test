import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import {
  Sparkles,
  X,
  Image as ImageIcon,
  Video,
  Music,
  FileText,
  File,
  User,
  MapPin,
  Building2,
  Hash,
  Shield,
  FileCheck,
  MessageSquare,
  List,
  Clock,
  PlayCircle,
  RefreshCw,
  Flag,
  AlertCircle,
  Mic,
  FileImage
} from 'lucide-react';

interface ExtractedEntity {
  id: string;
  type: 'person' | 'location' | 'organization' | 'keyword' | 'license-plate' | 'integrity';
  label: string;
  value: string;
  confidence: 'low' | 'medium' | 'high';
  confidenceScore: number;
  timestamp?: string;
}

interface TimelineEvent {
  id: string;
  time: string;
  description: string;
  type: 'visual' | 'audio' | 'action';
}

interface DetectedObject {
  id: string;
  object: string;
  confidence: number;
  matchedCase?: string;
  timestamp: string;
}

interface EvidenceSummaryViewerProps {
  evidence: {
    id: string;
    fileName: string;
    fileType: string;
  };
  onClose: () => void;
}

export function EvidenceSummaryViewer({ evidence, onClose }: EvidenceSummaryViewerProps) {
  const [activeTab, setActiveTab] = useState('summary');
  const [showReasoningTrace, setShowReasoningTrace] = useState(false);

  // Mock AI-generated summary
  const aiSummary = {
    description: "Video shows a white sedan entering the crime scene at 18:42 local time. A male individual exits the vehicle wearing dark clothing and a baseball cap. The subject approaches the main entrance, pauses briefly to check surroundings, then proceeds inside. Vehicle license plate JBK-59211 is clearly visible in frames 245-380.",
    keyInsights: [
      "White sedan identified as 2022 Toyota Camry",
      "Subject appears to deliberately avoid direct camera angles",
      "Timeline corresponds with reported incident window",
      "License plate matches vehicle registered to suspect Michael Johnson"
    ],
    detectedKeywords: ["safe", "account", "transfer", "suspicious activity"],
    sentiment: "neutral",
    threatLevel: "medium"
  };

  // Mock entities
  const entities: ExtractedEntity[] = [
    {
      id: 'e1',
      type: 'person',
      label: 'Person Detected',
      value: 'John Doe (Male, 30-40 years)',
      confidence: 'high',
      confidenceScore: 92,
      timestamp: '18:42:15'
    },
    {
      id: 'e2',
      type: 'license-plate',
      label: 'License Plate',
      value: 'JBK-59211',
      confidence: 'high',
      confidenceScore: 88,
      timestamp: '18:42:08'
    },
    {
      id: 'e3',
      type: 'location',
      label: 'Location',
      value: '1234 Main Street, NY',
      confidence: 'high',
      confidenceScore: 95
    },
    {
      id: 'e4',
      type: 'organization',
      label: 'Organization',
      value: 'First National Bank',
      confidence: 'medium',
      confidenceScore: 78,
      timestamp: '18:43:20'
    }
  ];

  // Mock timeline events
  const timelineEvents: TimelineEvent[] = [
    {
      id: 't1',
      time: '18:42:05',
      description: 'White sedan enters frame from east entrance',
      type: 'visual'
    },
    {
      id: 't2',
      time: '18:42:08',
      description: 'License plate JBK-59211 captured clearly',
      type: 'visual'
    },
    {
      id: 't3',
      time: '18:42:15',
      description: 'Male subject exits vehicle, wearing dark clothing',
      type: 'visual'
    },
    {
      id: 't4',
      time: '18:42:28',
      description: 'Subject approaches main entrance, pauses to check surroundings',
      type: 'action'
    },
    {
      id: 't5',
      time: '18:42:35',
      description: 'Door opening sound detected',
      type: 'audio'
    },
    {
      id: 't6',
      time: '18:42:40',
      description: 'Subject enters building premises',
      type: 'action'
    },
    {
      id: 't7',
      time: '18:43:12',
      description: 'Muffled conversation detected - keywords: "safe", "account"',
      type: 'audio'
    },
    {
      id: 't8',
      time: '18:44:55',
      description: 'Subject exits building, appears hurried',
      type: 'visual'
    }
  ];

  // Mock detected objects
  const detectedObjects: DetectedObject[] = [
    {
      id: 'o1',
      object: 'Glock 17 handgun',
      confidence: 94,
      matchedCase: 'Case #908 evidence pool',
      timestamp: '18:43:05'
    },
    {
      id: 'o2',
      object: 'Black backpack',
      confidence: 89,
      timestamp: '18:42:15'
    },
    {
      id: 'o3',
      object: 'Baseball cap (dark blue)',
      confidence: 91,
      timestamp: '18:42:16'
    }
  ];

  // Mock transcript
  const transcript = [
    { time: '18:43:12', speaker: 'Voice 1 (Male)', text: 'Where is the safe?' },
    { time: '18:43:15', speaker: 'Voice 2 (Female)', text: 'I... I don\'t know what you\'re talking about.' },
    { time: '18:43:20', speaker: 'Voice 1 (Male)', text: 'The account. Where are the documents?' },
    { time: '18:43:28', speaker: 'Voice 2 (Female)', text: 'Please, there\'s nothing here...' },
    { time: '18:43:35', speaker: 'Background', text: '[Sound of drawers opening]' }
  ];

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
  };

  const getEntityIcon = (type: ExtractedEntity['type']) => {
    switch (type) {
      case 'person':
        return User;
      case 'location':
        return MapPin;
      case 'organization':
        return Building2;
      case 'keyword':
        return Hash;
      case 'license-plate':
        return FileCheck;
      case 'integrity':
        return Shield;
      default:
        return Sparkles;
    }
  };

  const getEntityColor = (type: ExtractedEntity['type']) => {
    switch (type) {
      case 'person':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'location':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'organization':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'keyword':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'license-plate':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'integrity':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getEventTypeIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'visual':
        return <FileImage className="w-4 h-4 text-blue-400" />;
      case 'audio':
        return <Mic className="w-4 h-4 text-green-400" />;
      case 'action':
        return <PlayCircle className="w-4 h-4 text-purple-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const FileIcon = getFileIcon(evidence.fileType);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <div className="bg-slate-950 border border-slate-800 rounded-lg w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-slate-800 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white flex items-center gap-2 mb-2">
                <Sparkles className="w-6 h-6 text-blue-400" />
                AI Evidence Summary
              </h2>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <FileIcon className="w-4 h-4" />
                <span>{evidence.fileName}</span>
                <span>•</span>
                <span>{evidence.id}</span>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Panel - Evidence Preview */}
            <div className="lg:col-span-1 space-y-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-sm">Evidence Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-slate-950 border border-slate-800 rounded-lg relative overflow-hidden">
                    {evidence.fileType.startsWith('video/') && (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-slate-950" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="w-12 h-12 text-slate-600" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/80 to-transparent p-2 flex items-center justify-center">
                          <div className="text-white text-xs">Frame: 245 / 18:42:08</div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mini-timeline Visualization */}
                  <div className="mt-4 space-y-2">
                    <div className="text-xs text-slate-400">Key Events Timeline</div>
                    <div className="relative h-12 bg-slate-950 border border-slate-800 rounded">
                      <div className="absolute inset-0 flex items-center px-2">
                        {timelineEvents.slice(0, 5).map((event, index) => (
                          <div
                            key={event.id}
                            className="absolute w-2 h-8 bg-blue-500/50 rounded-full"
                            style={{ left: `${(index / 4) * 90 + 5}%` }}
                            title={event.description}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>18:42:05</span>
                      <span>18:44:55</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detected Objects */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-sm flex items-center gap-2">
                    <Shield className="w-4 h-4 text-blue-400" />
                    Detected Objects
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {detectedObjects.map((obj) => (
                    <div
                      key={obj.id}
                      className="p-3 bg-slate-950 border border-slate-800 rounded-lg space-y-2"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className="text-white text-sm flex items-center gap-2">
                            {obj.object}
                            {obj.matchedCase && (
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                                <FileCheck className="w-3 h-3 mr-1" />
                                Match
                              </Badge>
                            )}
                          </div>
                          {obj.matchedCase && (
                            <div className="text-xs text-amber-400 mt-1">
                              {obj.matchedCase}
                            </div>
                          )}
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {obj.confidence}%
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {obj.timestamp}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - AI Summary */}
            <div className="lg:col-span-2 space-y-4">
              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 bg-slate-900/50 border border-slate-800">
                  <TabsTrigger 
                    value="summary" 
                    className="text-slate-400 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
                  >
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Summary
                  </TabsTrigger>
                  <TabsTrigger 
                    value="entities" 
                    className="text-slate-400 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
                  >
                    <List className="w-4 h-4 mr-1" />
                    Entities
                  </TabsTrigger>
                  <TabsTrigger 
                    value="transcript" 
                    className="text-slate-400 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
                  >
                    <FileText className="w-4 h-4 mr-1" />
                    Transcript
                  </TabsTrigger>
                  <TabsTrigger 
                    value="timeline" 
                    className="text-slate-400 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400"
                  >
                    <Clock className="w-4 h-4 mr-1" />
                    Timeline
                  </TabsTrigger>
                </TabsList>

                {/* Summary Tab */}
                <TabsContent value="summary" className="space-y-4 mt-4">
                  <Card className="bg-gradient-to-br from-blue-950/30 to-slate-900/50 border-blue-500/30">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <h4 className="text-white mb-2">AI-Generated Summary</h4>
                          <p className="text-slate-300 leading-relaxed">
                            {aiSummary.description}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-3 border-t border-slate-800">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setShowReasoningTrace(true)}
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/50"
                        >
                          <Sparkles className="w-3 h-3 mr-1" />
                          Explain Summary
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/50"
                        >
                          <RefreshCw className="w-3 h-3 mr-1" />
                          Regenerate Summary
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-amber-500/30 text-amber-400 hover:bg-amber-500/10 hover:text-amber-300 hover:border-amber-500/50"
                        >
                          <Flag className="w-3 h-3 mr-1" />
                          Flag Incorrect Insight
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Key Insights */}
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-sm">Key Insights</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {aiSummary.keyInsights.map((insight, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-300 text-sm">
                            <span className="text-blue-400 mt-1">•</span>
                            <span>{insight}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Detected Keywords */}
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardHeader>
                      <CardTitle className="text-white text-sm flex items-center gap-2">
                        <Hash className="w-4 h-4 text-cyan-400" />
                        Speech-to-Text Detected Keywords
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {aiSummary.detectedKeywords.map((keyword, index) => (
                          <Badge
                            key={index}
                            className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
                          >
                            "{keyword}"
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Entities Tab */}
                <TabsContent value="entities" className="mt-4">
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-6">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-3">
                          {entities.map((entity) => {
                            const EntityIcon = getEntityIcon(entity.type);
                            return (
                              <div
                                key={entity.id}
                                className={`p-4 rounded-lg border ${getEntityColor(entity.type)}`}
                              >
                                <div className="flex items-start gap-3">
                                  <EntityIcon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-sm opacity-80">{entity.label}</span>
                                      <Badge className={getEntityColor(entity.type)}>
                                        {entity.confidenceScore}%
                                      </Badge>
                                    </div>
                                    <p className="text-white">{entity.value}</p>
                                    {entity.timestamp && (
                                      <div className="flex items-center gap-1 mt-2 text-xs opacity-70">
                                        <Clock className="w-3 h-3" />
                                        {entity.timestamp}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Transcript Tab */}
                <TabsContent value="transcript" className="mt-4">
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-6">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                          {transcript.map((entry, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex items-center gap-2 text-xs text-slate-400">
                                <Clock className="w-3 h-3" />
                                <span>{entry.time}</span>
                                <span>•</span>
                                <span className="text-blue-400">{entry.speaker}</span>
                              </div>
                              <div className="pl-5 text-slate-300">
                                {entry.text}
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Timeline Tab */}
                <TabsContent value="timeline" className="mt-4">
                  <Card className="bg-slate-900/50 border-slate-800">
                    <CardContent className="p-6">
                      <ScrollArea className="h-[500px] pr-4">
                        <div className="space-y-4">
                          {timelineEvents.map((event, index) => (
                            <div key={event.id} className="flex items-start gap-3">
                              <div className="flex flex-col items-center">
                                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
                                  {getEventTypeIcon(event.type)}
                                </div>
                                {index < timelineEvents.length - 1 && (
                                  <div className="w-0.5 h-12 bg-slate-800 my-1" />
                                )}
                              </div>
                              <div className="flex-1 pb-4">
                                <div className="text-xs text-slate-400 mb-1">{event.time}</div>
                                <div className="text-slate-300 text-sm">{event.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* AI Reasoning Trace Modal */}
      <Dialog open={showReasoningTrace} onOpenChange={setShowReasoningTrace}>
        <DialogContent className="max-w-3xl bg-slate-950 border-slate-800 [&>button]:text-blue-400 [&>button]:hover:text-blue-300 [&>button]:opacity-100">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              AI Reasoning Trace
            </DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] pr-4">
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-white text-sm">Step 1: Frame Analysis</h5>
                    <p className="text-slate-400 text-sm mt-1">
                      Detected repeated mention of 'white sedan' in frames 1-245. Object detection model identified vehicle with 94% confidence.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-white text-sm">Step 2: Temporal Sequencing</h5>
                    <p className="text-slate-400 text-sm mt-1">
                      Analyzed timestamp metadata to establish chronological order: vehicle entry (18:42:05) → subject exit (18:42:15) → building entry (18:42:40).
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-white text-sm">Step 3: License Plate Recognition</h5>
                    <p className="text-slate-400 text-sm mt-1">
                      OCR model detected license plate 'JBK-59211' with 88% confidence. Cross-referenced with case database showing match to suspect vehicle.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-900/50 border border-slate-800 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-white text-sm">Step 4: Natural Language Generation</h5>
                    <p className="text-slate-400 text-sm mt-1">
                      Combined all extracted data points into coherent narrative using language model fine-tuned on forensic reporting standards.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}
