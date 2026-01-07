import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { EvidenceUpload } from './EvidenceUpload';
import { EvidenceAuthenticityViewer } from './EvidenceAuthenticityViewer';
import { EvidenceSummaryViewer } from './EvidenceSummaryViewer';
import { CrossEvidenceLinkGraph } from './CrossEvidenceLinkGraph';
import { ChainOfCustodyValidation } from './ChainOfCustodyValidation';
import { ScrollArea } from './ui/scroll-area';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import {
  FolderOpen,
  Plus,
  FileText,
  Image as ImageIcon,
  Video,
  Music,
  File,
  Eye,
  Download,
  User,
  Calendar,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Building2,
  Hash,
  Shield,
  FileCheck,
  ArrowLeft,
  Network,
  Clock
} from 'lucide-react';

interface ExtractedEntity {
  id: string;
  type: 'person' | 'location' | 'organization' | 'keyword' | 'license-plate' | 'integrity';
  label: string;
  value: string;
  confidence: 'low' | 'medium' | 'high';
  confidenceScore: number;
}

interface EvidenceFile {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  taskName?: string;
  taskId?: string;
  loggedBy: string;
  loggedOn: string;
  hasAIAnalysis: boolean;
  entities?: ExtractedEntity[];
}

interface EvidenceDashboardProps {
  caseData: any;
}

export function EvidenceDashboard({ caseData }: EvidenceDashboardProps) {
  const [activeEvidenceTab, setActiveEvidenceTab] = useState('files');
  const [showAddEvidence, setShowAddEvidence] = useState(false);
  const [selectedEvidence, setSelectedEvidence] = useState<string | null>(null);
  const [viewingAuthenticityFor, setViewingAuthenticityFor] = useState<EvidenceFile | null>(null);
  const [viewingSummaryFor, setViewingSummaryFor] = useState<EvidenceFile | null>(null);

  // Mock evidence data
  const evidenceFiles: EvidenceFile[] = [
    {
      id: 'EVD-001',
      fileName: 'surveillance_footage_main_entrance.mp4',
      fileType: 'video/mp4',
      fileSize: '245 MB',
      taskName: 'Analyze surveillance footage',
      taskId: 'T-003',
      loggedBy: 'Det. Sarah Mitchell',
      loggedOn: '2025-10-25',
      hasAIAnalysis: true,
      entities: [
        {
          id: 'e1',
          type: 'person',
          label: 'Person Detected',
          value: 'John Doe',
          confidence: 'high',
          confidenceScore: 92
        },
        {
          id: 'e2',
          type: 'license-plate',
          label: 'License Plate',
          value: 'JBK-59211',
          confidence: 'high',
          confidenceScore: 88
        },
        {
          id: 'e3',
          type: 'location',
          label: 'Location Extracted',
          value: '1234 Main Street, NY',
          confidence: 'medium',
          confidenceScore: 76
        }
      ]
    },
    {
      id: 'EVD-002',
      fileName: 'financial_records_Q3_2024.pdf',
      fileType: 'application/pdf',
      fileSize: '12.4 MB',
      taskName: 'Review financial records',
      taskId: 'T-001',
      loggedBy: 'Analyst Maria Garcia',
      loggedOn: '2025-10-26',
      hasAIAnalysis: true,
      entities: [
        {
          id: 'e4',
          type: 'organization',
          label: 'Organization',
          value: 'TechCorp Industries',
          confidence: 'high',
          confidenceScore: 94
        },
        {
          id: 'e5',
          type: 'keyword',
          label: 'Keywords Detected',
          value: 'financial transaction, suspicious activity',
          confidence: 'high',
          confidenceScore: 85
        }
      ]
    },
    {
      id: 'EVD-003',
      fileName: 'witness_statement_audio.mp3',
      fileType: 'audio/mp3',
      fileSize: '8.2 MB',
      taskName: 'Interview suspect #2',
      taskId: 'T-002',
      loggedBy: 'Det. James Chen',
      loggedOn: '2025-10-27',
      hasAIAnalysis: true,
      entities: [
        {
          id: 'e6',
          type: 'person',
          label: 'Speaker Identified',
          value: 'Witness A - Jane Smith',
          confidence: 'medium',
          confidenceScore: 78
        },
        {
          id: 'e7',
          type: 'keyword',
          label: 'Sentiment Analysis',
          value: 'Negative sentiment detected (threat level: low)',
          confidence: 'medium',
          confidenceScore: 73
        }
      ]
    },
    {
      id: 'EVD-004',
      fileName: 'crime_scene_photo_001.jpg',
      fileType: 'image/jpeg',
      fileSize: '4.8 MB',
      loggedBy: 'Det. Sarah Mitchell',
      loggedOn: '2025-10-23',
      hasAIAnalysis: true,
      entities: [
        {
          id: 'e8',
          type: 'integrity',
          label: 'File Integrity Check',
          value: 'No tampering detected',
          confidence: 'high',
          confidenceScore: 98
        },
        {
          id: 'e9',
          type: 'location',
          label: 'Location Metadata',
          value: 'GPS: 40.7128° N, 74.0060° W',
          confidence: 'high',
          confidenceScore: 99
        }
      ]
    },
    {
      id: 'EVD-005',
      fileName: 'forensic_report_fingerprints.pdf',
      fileType: 'application/pdf',
      fileSize: '2.1 MB',
      taskName: 'Coordinate with forensics',
      taskId: 'T-004',
      loggedBy: 'Analyst John Smith',
      loggedOn: '2025-10-28',
      hasAIAnalysis: false
    },
    {
      id: 'EVD-006',
      fileName: 'suspect_background_check.pdf',
      fileType: 'application/pdf',
      fileSize: '1.5 MB',
      loggedBy: 'Det. James Chen',
      loggedOn: '2025-10-24',
      hasAIAnalysis: true,
      entities: [
        {
          id: 'e10',
          type: 'person',
          label: 'Person Profile',
          value: 'Michael Johnson - Prior Record Found',
          confidence: 'high',
          confidenceScore: 96
        }
      ]
    }
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

  const getConfidenceColor = (confidence: ExtractedEntity['confidence']) => {
    switch (confidence) {
      case 'high':
        return 'bg-green-500';
      case 'medium':
        return 'bg-amber-500';
      case 'low':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  // Evidence Files View Component
  const EvidenceFilesView = () => {
    // Conditional rendering: Show Add Evidence view or Evidence Dashboard
    if (showAddEvidence) {
      return (
        <div className="space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => setShowAddEvidence(false)}
                    className="text-slate-400 hover:text-blue-400 cursor-pointer"
                  >
                    Evidence Files
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-slate-600" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="text-white">Add Evidence</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Header with Back Button */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAddEvidence(false)}
              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Evidence
            </Button>
            <div className="flex-1">
              <h3 className="text-white">Add Evidence to Case</h3>
              <p className="text-slate-400 text-sm mt-1">
                {caseData.title || `Case ${caseData.id}`}
              </p>
            </div>
          </div>

          {/* Evidence Upload Component */}
          <EvidenceUpload
            context="task-evidence"
            caseData={caseData}
          />
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-white flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-blue-400" />
              Evidence Files
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              {evidenceFiles.length} evidence files • {evidenceFiles.filter(e => e.hasAIAnalysis).length} with AI analysis
            </p>
          </div>
        </div>

        {/* Evidence Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {evidenceFiles.map((evidence) => {
            const FileIcon = getFileIcon(evidence.fileType);
            const isSelected = selectedEvidence === evidence.id;

            return (
              <Card 
                key={evidence.id} 
                className={`bg-slate-900/50 border-slate-800 transition-all hover:border-blue-500/30 ${
                  evidence.hasAIAnalysis ? 'border-l-4 border-l-blue-500/50' : ''
                }`}
              >
                <CardContent className="p-5 space-y-4">
                  {/* File Header */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FileIcon className="w-6 h-6 text-blue-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-white truncate">{evidence.fileName}</h4>
                      <p className="text-slate-400 text-sm">{evidence.fileSize}</p>
                    </div>

                    {evidence.hasAIAnalysis && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <Sparkles className="w-3 h-3 mr-1" />
                        AI
                      </Badge>
                    )}
                  </div>

                  {/* Metadata */}
                  <div className="space-y-2 text-sm">
                    {evidence.taskName && (
                      <div className="flex items-center gap-2 text-slate-400">
                        <CheckCircle2 className="w-4 h-4 text-blue-400" />
                        <span>Task: <span className="text-slate-300">{evidence.taskName}</span></span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-400">
                      <User className="w-4 h-4" />
                      <span>Logged by: <span className="text-slate-300">{evidence.loggedBy}</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span>Logged on: <span className="text-slate-300">{evidence.loggedOn}</span></span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/50"
                      onClick={() => setViewingSummaryFor(evidence)}
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10 hover:text-blue-300 hover:border-blue-500/50"
                    >
                      <Download className="w-3 h-3 mr-1" />
                      Download
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-green-500/30 text-green-400 hover:bg-green-500/10 hover:text-green-300 hover:border-green-500/50"
                      onClick={() => setViewingAuthenticityFor(evidence)}
                    >
                      <Shield className="w-3 h-3 mr-1" />
                      Authenticity
                    </Button>
                    
                    {evidence.hasAIAnalysis && evidence.entities && evidence.entities.length > 0 && (
                      <>
                        <div className="flex-1" />
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          onClick={() => setSelectedEvidence(isSelected ? null : evidence.id)}
                        >
                          {isSelected ? 'Hide' : 'Show'} AI Analysis
                          <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${isSelected ? 'rotate-90' : ''}`} />
                        </Button>
                      </>
                    )}
                  </div>

                  {/* AI Analysis Section */}
                  {isSelected && evidence.entities && evidence.entities.length > 0 && (
                    <div className="pt-4 border-t border-slate-800 space-y-3 animate-in slide-in-from-top duration-300">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <h6 className="text-white text-sm">AI Extracted Data</h6>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                          {evidence.entities.length} extractions
                        </Badge>
                      </div>

                      <ScrollArea className="max-h-[300px] pr-2">
                        <div className="space-y-2">
                          {evidence.entities.map((entity) => {
                            const EntityIcon = getEntityIcon(entity.type);
                            return (
                              <div
                                key={entity.id}
                                className={`flex items-center gap-2 p-3 rounded-lg border ${getEntityColor(entity.type)}`}
                              >
                                <EntityIcon className="w-4 h-4 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs opacity-80">{entity.label}</p>
                                  <p className="text-sm truncate">{entity.value}</p>
                                </div>
                                <div className="flex-shrink-0">
                                  <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs text-slate-400">{entity.confidenceScore}%</span>
                                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full ${getConfidenceColor(entity.confidence)}`}
                                        style={{ width: `${entity.confidenceScore}%` }}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Authenticity Viewer */}
        {viewingAuthenticityFor && (
          <EvidenceAuthenticityViewer
            evidence={{
              id: viewingAuthenticityFor.id,
              fileName: viewingAuthenticityFor.fileName,
              fileType: viewingAuthenticityFor.fileType,
              uploadedBy: viewingAuthenticityFor.loggedBy,
              timestamp: viewingAuthenticityFor.loggedOn
            }}
            onClose={() => setViewingAuthenticityFor(null)}
          />
        )}

        {/* Summary Viewer */}
        {viewingSummaryFor && (
          <EvidenceSummaryViewer
            evidence={{
              id: viewingSummaryFor.id,
              fileName: viewingSummaryFor.fileName,
              fileType: viewingSummaryFor.fileType
            }}
            onClose={() => setViewingSummaryFor(null)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Tabs for Evidence sections */}
      <Tabs value={activeEvidenceTab} onValueChange={setActiveEvidenceTab} className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-slate-900/50 p-1 border border-slate-800">
            <TabsTrigger 
              value="files"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Evidence Files
            </TabsTrigger>
            <TabsTrigger 
              value="link-graph"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
            >
              <Network className="w-4 h-4 mr-2" />
              Link Graph
            </TabsTrigger>
            <TabsTrigger 
              value="custody"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
            >
              <Clock className="w-4 h-4 mr-2" />
              Chain of Custody
            </TabsTrigger>
          </TabsList>
          {activeEvidenceTab === 'files' && (
            <Button
              onClick={() => setShowAddEvidence(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Evidence
            </Button>
          )}
        </div>

        <TabsContent value="files" className="mt-0">
          <EvidenceFilesView />
        </TabsContent>

        <TabsContent value="link-graph" className="mt-0">
          <CrossEvidenceLinkGraph />
        </TabsContent>

        <TabsContent value="custody" className="mt-0">
          <ChainOfCustodyValidation />
        </TabsContent>
      </Tabs>
    </div>
  );
}
