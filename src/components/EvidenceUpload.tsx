import { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner@2.0.3';
import { 
  Upload, 
  FileText, 
  Image as ImageIcon,
  Video,
  Music,
  File,
  X,
  CheckCircle2,
  AlertCircle,
  User,
  MapPin,
  Building2,
  Hash,
  Shield,
  Sparkles,
  Loader2,
  FileCheck,
  Info,
  ChevronRight,
  Save,
  Network,
  Link2,
  Eye,
  Clock,
  Database,
  Car,
  LinkIcon
} from 'lucide-react';

interface ExtractedEntity {
  id: string;
  type: 'person' | 'location' | 'organization' | 'keyword' | 'license-plate' | 'integrity';
  label: string;
  value: string;
  confidence: 'low' | 'medium' | 'high';
  confidenceScore: number;
  timestamp: number;
}

interface FileClassification {
  type: string;
  confidence: number;
  icon: any;
}

interface CrossReference {
  entityValue: string;
  entityType: string;
  fileIds: string[];
  fileNames: string[];
}

interface TimelineEntry {
  id: string;
  entityName: string;
  event: string;
  location: string;
  time: string;
  date: string;
  fileSource: string;
}

interface CaseLinkSuggestion {
  caseId: string;
  caseTitle: string;
  linkReason: string;
  confidence: number;
  sharedEntities: string[];
}

interface VehicleRegistration {
  plate: string;
  owner: string;
  caseId?: string;
  caseTitle?: string;
  flagged: boolean;
}

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: string;
  type: string;
  icon: any;
  status: 'uploading' | 'analyzing' | 'complete' | 'error';
  progress: number;
  entities: ExtractedEntity[];
  analysisComplete: boolean;
  classification: FileClassification | null;
  timelineEntries: TimelineEntry[];
  caseLinkSuggestions: CaseLinkSuggestion[];
}

interface EvidenceUploadProps {
  context: 'case-creation' | 'task-evidence';
  caseData?: any;
  taskData?: any;
}

export function EvidenceUpload({ context, caseData, taskData }: EvidenceUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [advancedEnrichment, setAdvancedEnrichment] = useState(false);
  const [showExtractionLog, setShowExtractionLog] = useState(false);
  const [selectedFileForLog, setSelectedFileForLog] = useState<string | null>(null);
  const [showLinkMap, setShowLinkMap] = useState(false);
  const [crossReferences, setCrossReferences] = useState<CrossReference[]>([]);
  const [linkedCases, setLinkedCases] = useState<Set<string>>(new Set());

  const handleLinkCase = (caseId: string, caseTitle: string) => {
    setLinkedCases(prev => new Set(prev).add(caseId));
    
    toast.success(`Case linked successfully!`, {
      description: `Current case linked to ${caseId} - ${caseTitle}`,
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
  };

  const getFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Auto-classify file based on content/name
  const classifyFile = (file: File): FileClassification => {
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    
    // Mock classification based on file name and type
    if (fileName.includes('forensic') || fileName.includes('report')) {
      return { type: 'Forensic Report', confidence: 97, icon: FileText };
    } else if (fileName.includes('transcript') || fileName.includes('interview')) {
      return { type: 'Interview Transcript', confidence: 94, icon: FileText };
    } else if (fileName.includes('cctv') || fileName.includes('surveillance')) {
      return { type: 'CCTV Footage', confidence: 96, icon: Video };
    } else if (fileName.includes('audio') || fileType.startsWith('audio/')) {
      return { type: 'Audio Recording', confidence: 93, icon: Music };
    } else if (fileName.includes('photo') || fileName.includes('image') || fileType.startsWith('image/')) {
      return { type: 'Photographic Evidence', confidence: 95, icon: ImageIcon };
    } else if (fileName.includes('statement') || fileName.includes('witness')) {
      return { type: 'Witness Statement', confidence: 92, icon: FileText };
    } else if (fileType.startsWith('video/')) {
      return { type: 'Video Evidence', confidence: 91, icon: Video };
    } else if (fileType.includes('pdf')) {
      return { type: 'Document Evidence', confidence: 88, icon: FileText };
    } else {
      return { type: 'General Evidence', confidence: 85, icon: File };
    }
  };

  // Mock AI entity extraction with varied data based on file type
  const generateMockEntities = (file: File, advanced: boolean): ExtractedEntity[] => {
    const fileName = file.name.toLowerCase();
    
    // Base entities that vary by file type
    let entities: ExtractedEntity[] = [];
    
    // Common entities across multiple files for cross-correlation
    const commonPersons = ['Ali F.', 'John Doe', 'Jane Smith'];
    const commonLocations = ['1234 Main Street, NY', 'Central Park'];
    
    if (fileName.includes('transcript') || fileName.includes('interview')) {
      entities = [
        {
          id: `${file.name}-e1`,
          type: 'person',
          label: 'Person Mentioned',
          value: 'Ali F.',
          confidence: 'high',
          confidenceScore: 94,
          timestamp: Date.now()
        },
        {
          id: `${file.name}-e2`,
          type: 'location',
          label: 'Location Referenced',
          value: '1234 Main Street, NY',
          confidence: 'high',
          confidenceScore: 89,
          timestamp: Date.now() + 200
        },
        {
          id: `${file.name}-e3`,
          type: 'keyword',
          label: 'Keywords Detected',
          value: 'suspicious behavior, late night meeting',
          confidence: 'medium',
          confidenceScore: 76,
          timestamp: Date.now() + 400
        }
      ];
    } else if (fileName.includes('nissan') || fileName.includes('2465') || fileName.includes('barsha')) {
      // Special case for vehicle photos with plate in filename
      const locationMatch = fileName.match(/(al barsha|barsha mall|main street|downtown|parking)/i);
      const location = locationMatch ? locationMatch[0] : 'Al Barsha Mall';
      
      entities = [
        {
          id: `${file.name}-e1`,
          type: 'license-plate',
          label: 'License Plate Detected',
          value: '2465',
          confidence: 'high',
          confidenceScore: 96,
          timestamp: Date.now()
        },
        {
          id: `${file.name}-e2`,
          type: 'location',
          label: 'Location Extracted',
          value: location,
          confidence: 'high',
          confidenceScore: 91,
          timestamp: Date.now() + 200
        },
        {
          id: `${file.name}-e3`,
          type: 'person',
          label: 'Vehicle Owner (DB Match)',
          value: 'Ahmed R.',
          confidence: 'high',
          confidenceScore: 94,
          timestamp: Date.now() + 400
        }
      ];
    } else if (fileName.includes('cctv') || fileName.includes('photo') || fileName.includes('image')) {
      entities = [
        {
          id: `${file.name}-e1`,
          type: 'person',
          label: 'Person Detected',
          value: 'Ali F.',
          confidence: 'high',
          confidenceScore: 92,
          timestamp: Date.now()
        },
        {
          id: `${file.name}-e2`,
          type: 'location',
          label: 'Location Extracted',
          value: '1234 Main Street, NY',
          confidence: 'high',
          confidenceScore: 88,
          timestamp: Date.now() + 200
        },
        {
          id: `${file.name}-e3`,
          type: 'license-plate',
          label: 'License Plate',
          value: 'JBK-59211',
          confidence: 'high',
          confidenceScore: 95,
          timestamp: Date.now() + 400
        }
      ];
    } else {
      entities = [
        {
          id: `${file.name}-e1`,
          type: 'person',
          label: 'Person Detected',
          value: 'John Doe',
          confidence: 'high',
          confidenceScore: 92,
          timestamp: Date.now()
        },
        {
          id: `${file.name}-e2`,
          type: 'organization',
          label: 'Organization',
          value: 'TechCorp Industries',
          confidence: 'medium',
          confidenceScore: 71,
          timestamp: Date.now() + 400
        },
        {
          id: `${file.name}-e3`,
          type: 'keyword',
          label: 'Keywords Detected',
          value: 'financial transaction, suspicious activity',
          confidence: 'high',
          confidenceScore: 85,
          timestamp: Date.now() + 600
        }
      ];
    }
    
    // Always add integrity check
    entities.push({
      id: `${file.name}-e-integrity`,
      type: 'integrity',
      label: 'File Integrity Check',
      value: 'No tampering detected',
      confidence: 'high',
      confidenceScore: 98,
      timestamp: Date.now() + 800
    });

    if (advanced) {
      entities.push(
        {
          id: `${file.name}-e-facial`,
          type: 'person',
          label: 'Facial Recognition',
          value: 'Jane Smith (87% match to existing profile)',
          confidence: 'high',
          confidenceScore: 87,
          timestamp: Date.now() + 1000
        },
        {
          id: `${file.name}-e-sentiment`,
          type: 'keyword',
          label: 'Sentiment Analysis',
          value: 'Negative sentiment detected (threat level: low)',
          confidence: 'medium',
          confidenceScore: 73,
          timestamp: Date.now() + 1200
        }
      );
    }

    return entities;
  };

  // Mock vehicle registration database
  const checkVehicleRegistration = (plateNumber: string): VehicleRegistration | null => {
    const vehicleDB: VehicleRegistration[] = [
      {
        plate: '2465',
        owner: 'Ahmed R.',
        caseId: '#288',
        caseTitle: 'Al Barsha Mall Theft Case',
        flagged: true
      },
      {
        plate: 'JBK-59211',
        owner: 'Ali F.',
        caseId: '#145',
        caseTitle: 'Downtown Fraud Investigation',
        flagged: true
      }
    ];

    return vehicleDB.find(v => v.plate === plateNumber) || null;
  };

  // Generate timeline entries from extracted entities
  const generateTimelineEntries = (file: File, entities: ExtractedEntity[]): TimelineEntry[] => {
    const timeline: TimelineEntry[] = [];
    
    const licensePlate = entities.find(e => e.type === 'license-plate');
    const location = entities.find(e => e.type === 'location');
    
    if (licensePlate && location) {
      // Check vehicle registration
      const vehicleRecord = checkVehicleRegistration(licensePlate.value);
      
      if (vehicleRecord) {
        const now = new Date();
        timeline.push({
          id: `timeline-${file.name}-vehicle`,
          entityName: vehicleRecord.owner,
          event: 'Vehicle Spotted',
          location: location.value,
          time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          date: now.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
          fileSource: file.name
        });
      }
    }
    
    return timeline;
  };

  // Generate case link suggestions
  const generateCaseLinkSuggestions = (file: File, entities: ExtractedEntity[]): CaseLinkSuggestion[] => {
    const suggestions: CaseLinkSuggestion[] = [];
    
    const licensePlate = entities.find(e => e.type === 'license-plate');
    
    if (licensePlate) {
      const vehicleRecord = checkVehicleRegistration(licensePlate.value);
      
      if (vehicleRecord && vehicleRecord.caseId) {
        suggestions.push({
          caseId: vehicleRecord.caseId,
          caseTitle: vehicleRecord.caseTitle || 'Related Investigation',
          linkReason: `Vehicle ${licensePlate.value} registered to suspect ${vehicleRecord.owner} from another ongoing case`,
          confidence: 94,
          sharedEntities: [vehicleRecord.owner, licensePlate.value]
        });
      }
    }
    
    return suggestions;
  };

  // Detect cross-file correlations
  const detectCrossReferences = (files: UploadedFile[]) => {
    const completedFiles = files.filter(f => f.analysisComplete);
    if (completedFiles.length < 2) {
      setCrossReferences([]);
      return;
    }

    const entityMap = new Map<string, { type: string; fileIds: string[]; fileNames: string[] }>();

    completedFiles.forEach(file => {
      file.entities.forEach(entity => {
        const key = `${entity.type}-${entity.value}`;
        if (!entityMap.has(key)) {
          entityMap.set(key, {
            type: entity.type,
            fileIds: [],
            fileNames: []
          });
        }
        const existing = entityMap.get(key)!;
        if (!existing.fileIds.includes(file.id)) {
          existing.fileIds.push(file.id);
          existing.fileNames.push(file.name);
        }
      });
    });

    // Filter to only entities that appear in multiple files
    const crossRefs: CrossReference[] = [];
    entityMap.forEach((value, key) => {
      if (value.fileIds.length > 1) {
        const entityValue = key.split('-').slice(1).join('-');
        crossRefs.push({
          entityValue,
          entityType: value.type,
          fileIds: value.fileIds,
          fileNames: value.fileNames
        });
      }
    });

    setCrossReferences(crossRefs);
  };

  const simulateFileAnalysis = async (fileId: string, file: File) => {
    // Classify file first
    const classification = classifyFile(file);
    setUploadedFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, classification } : f
    ));

    // Uploading phase
    setUploadedFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'uploading', progress: 0 } : f
    ));

    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, progress: i } : f
      ));
    }

    // Analyzing phase
    setUploadedFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, status: 'analyzing', progress: 0 } : f
    ));

    // Generate entities
    const entities = generateMockEntities(file, advancedEnrichment);

    // Simulate entity extraction with animated appearance
    for (let i = 0; i < entities.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setUploadedFiles(prev => prev.map(f => 
        f.id === fileId ? { 
          ...f, 
          entities: [...f.entities, entities[i]],
          progress: Math.round(((i + 1) / entities.length) * 100)
        } : f
      ));
    }

    // Complete - Generate timeline and case link suggestions
    setUploadedFiles(prev => {
      const currentFile = prev.find(f => f.id === fileId);
      if (!currentFile) return prev;

      // Generate timeline entries and case suggestions
      const timelineEntries = generateTimelineEntries(file, entities);
      const caseLinkSuggestions = generateCaseLinkSuggestions(file, entities);

      const updated = prev.map(f => 
        f.id === fileId ? { 
          ...f, 
          status: 'complete', 
          progress: 100,
          analysisComplete: true,
          timelineEntries,
          caseLinkSuggestions
        } : f
      );
      
      // Detect cross-references after file is complete
      setTimeout(() => detectCrossReferences(updated), 500);
      
      return updated;
    });
  };

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      const fileId = `file-${Date.now()}-${Math.random()}`;
      const newFile: UploadedFile = {
        id: fileId,
        file,
        name: file.name,
        size: getFileSize(file.size),
        type: file.type,
        icon: getFileIcon(file.type),
        status: 'uploading',
        progress: 0,
        entities: [],
        analysisComplete: false,
        classification: null,
        timelineEntries: [],
        caseLinkSuggestions: []
      };

      setUploadedFiles(prev => [...prev, newFile]);
      simulateFileAnalysis(fileId, file);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (fileId: string) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSubmitEvidence = () => {
    const completedFiles = uploadedFiles.filter(f => f.analysisComplete);
    
    if (completedFiles.length === 0) {
      toast.error('No analyzed files to submit', {
        description: 'Please wait for file analysis to complete before submitting.',
      });
      return;
    }

    // Show success toast
    toast.success('Evidence submitted successfully!', {
      description: `${completedFiles.length} file${completedFiles.length > 1 ? 's' : ''} with ${uploadedFiles.reduce((acc, f) => acc + f.entities.length, 0)} extracted entities added to the case.`,
    });

    // Clear uploaded files after submission
    setUploadedFiles([]);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-blue-400" />
            AI Evidence Enrichment
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Upload evidence for automated analysis and entity extraction
          </p>
        </div>

        {/* Advanced Enrichment Toggle */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-2">
                  <Switch
                    id="advanced-enrichment"
                    checked={advancedEnrichment}
                    onCheckedChange={setAdvancedEnrichment}
                  />
                  <Label htmlFor="advanced-enrichment" className="text-slate-300 cursor-pointer">
                    Advanced Enrichment
                  </Label>
                </div>
                <Info className="w-4 h-4 text-slate-400" />
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 border-slate-700 text-slate-300 max-w-xs">
              <p>AI automatically links extracted entities to existing case profiles using semantic matching, facial recognition, and advanced NLP analysis</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Drag and Drop Area */}
      <Card 
        className={`border-2 border-dashed transition-all ${
          isDragging 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-slate-700 bg-slate-900/50'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center text-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isDragging ? 'bg-blue-500/20' : 'bg-slate-800'
            }`}>
              <Upload className={`w-8 h-8 ${isDragging ? 'text-blue-400' : 'text-slate-400'}`} />
            </div>
            
            <div>
              <h4 className="text-white mb-1">
                {isDragging ? 'Drop files here' : 'Drag & drop evidence files'}
              </h4>
              <p className="text-slate-400 text-sm">
                Supports images, audio, video, documents (PDF, DOCX)
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-500 text-sm">or</span>
            </div>

            <Button
              onClick={() => {
                const input = document.createElement('input');
                input.type = 'file';
                input.multiple = true;
                input.accept = 'image/*,video/*,audio/*,.pdf,.doc,.docx';
                input.onchange = (e) => handleFiles((e.target as HTMLInputElement).files);
                input.click();
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Upload className="w-4 h-4 mr-2" />
              Browse Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Uploaded Files with AI Analysis */}
      {uploadedFiles.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Files List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-white">Uploaded Evidence ({uploadedFiles.length})</h4>
              {uploadedFiles.filter(f => f.analysisComplete).length > 0 && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {uploadedFiles.filter(f => f.analysisComplete).length} analyzed
                </Badge>
              )}
            </div>

            {uploadedFiles.map((file) => {
              const FileIcon = file.icon;
              return (
                <Card key={file.id} className="bg-slate-900/50 border-slate-800">
                  <CardContent className="p-5 space-y-4">
                    {/* File Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                        <FileIcon className="w-6 h-6 text-blue-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="text-white truncate">{file.name}</h5>
                            </div>
                            {/* Auto Classification Badge */}
                            {file.classification && (
                              <div className="flex items-center gap-2 mb-1">
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                  <Sparkles className="w-3 h-3 mr-1" />
                                  {file.classification.type}
                                </Badge>
                                <span className="text-xs text-slate-500">{file.classification.confidence}% confidence</span>
                              </div>
                            )}
                            <p className="text-slate-400 text-sm">{file.size}</p>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => removeFile(file.id)}
                            className="text-slate-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Status */}
                        {file.status !== 'complete' && (
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-slate-400">
                                {file.status === 'uploading' ? 'Uploading...' : 
                                 file.status === 'analyzing' ? 'Analyzing with AI...' : ''}
                              </span>
                              <span className="text-slate-300">{file.progress}%</span>
                            </div>
                            <Progress value={file.progress} className="h-2" />
                          </div>
                        )}

                        {/* Complete Status */}
                        {file.status === 'complete' && (
                          <div className="mt-3">
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Analysis Complete
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Cross-Evidence Correlation Alerts */}
                    {file.analysisComplete && crossReferences.some(ref => ref.fileIds.includes(file.id)) && (
                      <div className="space-y-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2 text-cyan-400 text-sm">
                          <Link2 className="w-4 h-4" />
                          <span>Cross-Evidence Matches Detected</span>
                        </div>
                        {crossReferences
                          .filter(ref => ref.fileIds.includes(file.id))
                          .slice(0, 2)
                          .map((ref, idx) => {
                            const otherFiles = ref.fileNames.filter(name => name !== file.name);
                            const EntityIcon = getEntityIcon(ref.entityType as any);
                            return (
                              <div key={idx} className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 space-y-1">
                                <div className="flex items-start gap-2">
                                  <EntityIcon className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm text-cyan-300">
                                      <span className="text-cyan-100">{ref.entityType === 'person' ? 'Person' : ref.entityType === 'location' ? 'Location' : 'Entity'} '{ref.entityValue}'</span> found in:
                                    </p>
                                    <ul className="text-xs text-cyan-400/80 mt-1 space-y-0.5">
                                      {otherFiles.map((fileName, i) => (
                                        <li key={i}>• {fileName}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {crossReferences.filter(ref => ref.fileIds.includes(file.id)).length > 2 && (
                          <p className="text-xs text-cyan-400">
                            +{crossReferences.filter(ref => ref.fileIds.includes(file.id)).length - 2} more correlations
                          </p>
                        )}
                      </div>
                    )}

                    {/* Vehicle Registration DB Check & Timeline Entry */}
                    {file.analysisComplete && file.timelineEntries && file.timelineEntries.length > 0 && (
                      <div className="space-y-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2 text-blue-400 text-sm">
                          <Database className="w-4 h-4" />
                          <span>Vehicle Registration Match</span>
                        </div>
                        {file.timelineEntries.map((entry) => (
                          <div key={entry.id} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-3 space-y-2">
                            <div className="flex items-start gap-2">
                              <Clock className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-blue-300">
                                  <span className="text-purple-400">{entry.entityName}</span> — "{entry.event}"
                                </p>
                                <p className="text-xs text-slate-400 mt-1">
                                  {entry.location}, {entry.time}, {entry.date}
                                </p>
                              </div>
                            </div>
                            <div className="bg-slate-900/50 rounded p-2 border border-slate-700">
                              <p className="text-xs text-slate-500">Evidence Source:</p>
                              <p className="text-xs text-slate-300">{entry.fileSource}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Case Link Suggestions */}
                    {file.analysisComplete && file.caseLinkSuggestions && file.caseLinkSuggestions.length > 0 && (
                      <div className="space-y-2 pb-3 border-b border-slate-800">
                        <div className="flex items-center gap-2 text-amber-400 text-sm">
                          <LinkIcon className="w-4 h-4" />
                          <span>Cross-Case Link Detected</span>
                        </div>
                        {file.caseLinkSuggestions.map((suggestion, idx) => (
                          <div key={idx} className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="text-sm text-amber-300">AI suggests linking to:</p>
                                <p className="text-white">Case {suggestion.caseId} - {suggestion.caseTitle}</p>
                              </div>
                              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                                {suggestion.confidence}% match
                              </Badge>
                            </div>
                            <div className="bg-slate-900/50 rounded p-2 border border-amber-500/20">
                              <p className="text-xs text-slate-400">Reason:</p>
                              <p className="text-xs text-slate-300">{suggestion.linkReason}</p>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              <span className="text-xs text-slate-400">Shared entities:</span>
                              {suggestion.sharedEntities.map((entity, i) => (
                                <Badge key={i} className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                                  {entity}
                                </Badge>
                              ))}
                            </div>
                            {linkedCases.has(suggestion.caseId) ? (
                              <Button size="sm" className="w-full bg-green-600 text-white" disabled>
                                <CheckCircle2 className="w-3 h-3 mr-2" />
                                Linked to Case {suggestion.caseId}
                              </Button>
                            ) : (
                              <Button 
                                size="sm" 
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                                onClick={() => handleLinkCase(suggestion.caseId, suggestion.caseTitle)}
                              >
                                <LinkIcon className="w-3 h-3 mr-2" />
                                Link to Case {suggestion.caseId}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Extracted Entities */}
                    {file.entities.length > 0 && (
                      <div className="space-y-2 pt-3 border-t border-slate-800">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-sm">Extracted Data</span>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedFileForLog(file.id);
                              setShowExtractionLog(true);
                            }}
                            className="text-blue-400 hover:text-blue-300 text-xs h-7"
                          >
                            View Extraction Log
                            <ChevronRight className="w-3 h-3 ml-1" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-2">
                          {file.entities.slice(0, 3).map((entity) => {
                            const EntityIcon = getEntityIcon(entity.type);
                            return (
                              <div 
                                key={entity.id}
                                className={`flex items-center gap-2 p-2 rounded-lg border ${getEntityColor(entity.type)} animate-in slide-in-from-left duration-300`}
                              >
                                <EntityIcon className="w-4 h-4 flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs opacity-80">{entity.label}</p>
                                  <p className="text-sm truncate">{entity.value}</p>
                                </div>
                                <div className="flex-shrink-0">
                                  <TooltipProvider>
                                    <Tooltip>
                                      <TooltipTrigger>
                                        <div className="flex items-center gap-1">
                                          <div className="w-12 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                            <div 
                                              className={`h-full ${getConfidenceColor(entity.confidence)}`}
                                              style={{ width: `${entity.confidenceScore}%` }}
                                            />
                                          </div>
                                        </div>
                                      </TooltipTrigger>
                                      <TooltipContent className="bg-slate-900 border-slate-700">
                                        <p>Confidence: {entity.confidenceScore}% ({entity.confidence})</p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {file.entities.length > 3 && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedFileForLog(file.id);
                              setShowExtractionLog(true);
                            }}
                            className="w-full text-slate-400 hover:text-white text-xs"
                          >
                            +{file.entities.length - 3} more entities
                          </Button>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* AI Analysis Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-blue-950/30 to-slate-900/50 border-blue-500/30 sticky top-6">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Active Analysis */}
                {uploadedFiles.filter(f => f.status === 'analyzing').length > 0 && (
                  <div className="space-y-3 pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2 text-blue-400">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Analyzing files...</span>
                    </div>
                    {uploadedFiles
                      .filter(f => f.status === 'analyzing')
                      .map(file => (
                        <div key={file.id} className="space-y-2">
                          <p className="text-slate-300 text-sm truncate">{file.name}</p>
                          <ul className="text-xs text-slate-400 space-y-1.5 ml-4">
                            <li>• Extracting entities</li>
                            <li>• Analyzing metadata</li>
                            <li>• Checking authenticity</li>
                            {advancedEnrichment && (
                              <>
                                <li>• Performing facial recognition</li>
                                <li>• Running NLP analysis</li>
                              </>
                            )}
                          </ul>
                        </div>
                      ))}
                  </div>
                )}

                {/* Summary Stats */}
                <div className="space-y-4">
                  <h5 className="text-white">Extraction Summary</h5>
                  
                  <div className="space-y-3">
                    {['person', 'location', 'organization', 'keyword', 'license-plate', 'integrity'].map(type => {
                      const count = uploadedFiles.reduce((acc, file) => 
                        acc + file.entities.filter(e => e.type === type).length, 0
                      );
                      const EntityIcon = getEntityIcon(type as any);
                      
                      if (count === 0) return null;
                      
                      // Better pluralization
                      const getLabel = () => {
                        switch(type) {
                          case 'person': return count === 1 ? 'Person' : 'Persons';
                          case 'location': return count === 1 ? 'Location' : 'Locations';
                          case 'organization': return count === 1 ? 'Organization' : 'Organizations';
                          case 'keyword': return count === 1 ? 'Keyword' : 'Keywords';
                          case 'license-plate': return count === 1 ? 'License Plate' : 'License Plates';
                          case 'integrity': return count === 1 ? 'Integrity' : 'Integrities';
                          default: return type;
                        }
                      };
                      
                      return (
                        <div key={type} className="flex items-center justify-between py-2">
                          <div className="flex items-center gap-3 text-slate-300">
                            <EntityIcon className="w-4 h-4" />
                            <span>{getLabel()}</span>
                          </div>
                          <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                            {count}
                          </Badge>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* High Confidence Matches */}
                {uploadedFiles.some(f => f.entities.some(e => e.confidenceScore >= 85)) && (
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <h5 className="text-white flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      High Confidence
                    </h5>
                    <div className="space-y-2">
                      {uploadedFiles.flatMap(f => 
                        f.entities.filter(e => e.confidenceScore >= 85)
                      ).slice(0, 3).map(entity => (
                        <div key={entity.id} className="text-xs text-slate-300 bg-slate-800/50 p-2.5 rounded">
                          <span className="text-green-400">{entity.confidenceScore}%</span> - {entity.value}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Cross-Evidence Correlations */}
                {crossReferences.length > 0 && (
                  <div className="pt-4 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-white flex items-center gap-2">
                        <Network className="w-4 h-4 text-cyan-400" />
                        Cross-Evidence Links
                      </h5>
                      <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
                        {crossReferences.length}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-400">
                      AI detected {crossReferences.length} entity matches across multiple evidence files
                    </p>
                    <div className="space-y-2">
                      {crossReferences.slice(0, 3).map((ref, idx) => {
                        const EntityIcon = getEntityIcon(ref.entityType as any);
                        return (
                          <div key={idx} className="bg-cyan-500/10 border border-cyan-500/30 rounded p-2.5 space-y-1">
                            <div className="flex items-center gap-2">
                              <EntityIcon className="w-3 h-3 text-cyan-400" />
                              <p className="text-xs text-cyan-300 truncate flex-1">{ref.entityValue}</p>
                            </div>
                            <p className="text-xs text-cyan-400/60">
                              Found in {ref.fileIds.length} files
                            </p>
                          </div>
                        );
                      })}
                    </div>
                    {crossReferences.length > 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowLinkMap(true)}
                        className="w-full bg-cyan-500/10 border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 hover:text-cyan-200"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Evidence Link Map
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Submit Evidence Button */}
      {uploadedFiles.length > 0 && (
        <div className="flex items-center justify-between p-6 bg-slate-900/50 border border-slate-800 rounded-lg">
          <div>
            <p className="text-white">
              {uploadedFiles.filter(f => f.analysisComplete).length} of {uploadedFiles.length} files analyzed
            </p>
            <p className="text-slate-400 text-sm mt-1">
              {uploadedFiles.reduce((acc, f) => acc + f.entities.length, 0)} total entities extracted
            </p>
          </div>
          <Button
            onClick={handleSubmitEvidence}
            disabled={uploadedFiles.filter(f => f.analysisComplete).length === 0}
            className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 mr-2" />
            Submit Evidence
          </Button>
        </div>
      )}

      {/* Extraction Log Modal */}
      {showExtractionLog && selectedFileForLog && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-blue-400" />
                  Extraction Log
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setShowExtractionLog(false);
                    setSelectedFileForLog(null);
                  }}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto">
              {(() => {
                const file = uploadedFiles.find(f => f.id === selectedFileForLog);
                if (!file) return null;

                return (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 pb-4 border-b border-slate-800">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        {(() => {
                          const FileIcon = file.icon;
                          return <FileIcon className="w-6 h-6 text-blue-400" />;
                        })()}
                      </div>
                      <div>
                        <h4 className="text-white">{file.name}</h4>
                        <p className="text-slate-400 text-sm">{file.size} • {file.entities.length} extractions</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {file.entities.map((entity) => {
                        const EntityIcon = getEntityIcon(entity.type);
                        return (
                          <Card key={entity.id} className={`bg-slate-800/50 border ${getEntityColor(entity.type).split(' ')[2]}`}>
                            <CardContent className="p-4 space-y-3">
                              <div className="flex items-start gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getEntityColor(entity.type).split(' ').slice(0, 2).join(' ')}`}>
                                  <EntityIcon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h5 className="text-white text-sm">{entity.label}</h5>
                                    <Badge className={getEntityColor(entity.type)}>
                                      {entity.type.replace('-', ' ')}
                                    </Badge>
                                  </div>
                                  <p className="text-slate-300">{entity.value}</p>
                                </div>
                              </div>

                              {/* Confidence Score */}
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-sm">
                                  <span className="text-slate-400">Confidence Score</span>
                                  <span className="text-white">{entity.confidenceScore}% ({entity.confidence})</span>
                                </div>
                                <div className="w-full bg-slate-900 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${getConfidenceColor(entity.confidence)}`}
                                    style={{ width: `${entity.confidenceScore}%` }}
                                  />
                                </div>
                              </div>

                              {/* Timestamp */}
                              <p className="text-slate-500 text-xs">
                                Extracted at {new Date(entity.timestamp).toLocaleTimeString()}
                              </p>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                );
              })()}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Evidence Link Map Modal */}
      {showLinkMap && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-6xl max-h-[85vh] overflow-hidden flex flex-col">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Network className="w-5 h-5 text-cyan-400" />
                  Evidence Link Map
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowLinkMap(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-slate-400 text-sm mt-2">
                Visual representation of cross-evidence entity correlations detected by AI
              </p>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto">
              <div className="space-y-6">
                {/* Visual Network Map */}
                <div className="bg-slate-950/50 border border-slate-800 rounded-lg p-8 min-h-[400px] relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Central Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 border-2 border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                        <Network className="w-10 h-10 text-cyan-300" />
                      </div>
                    </div>

                    {/* Files positioned around the center */}
                    {uploadedFiles.filter(f => f.analysisComplete).map((file, idx) => {
                      const total = uploadedFiles.filter(f => f.analysisComplete).length;
                      const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
                      const radius = 180;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;
                      const FileIcon = file.icon;
                      
                      return (
                        <div
                          key={file.id}
                          className="absolute"
                          style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                          }}
                        >
                          {/* Connection line to center */}
                          <svg className="absolute top-1/2 left-1/2 -z-10" style={{
                            width: Math.abs(x) * 2,
                            height: Math.abs(y) * 2,
                            transform: `translate(-50%, -50%)`
                          }}>
                            <line
                              x1={x > 0 ? 0 : Math.abs(x) * 2}
                              y1={y > 0 ? 0 : Math.abs(y) * 2}
                              x2={x > 0 ? Math.abs(x) * 2 : 0}
                              y2={y > 0 ? Math.abs(y) * 2 : 0}
                              stroke="rgb(34 211 238 / 0.3)"
                              strokeWidth="2"
                              strokeDasharray="4 4"
                            />
                          </svg>

                          {/* File Node */}
                          <div className="bg-slate-900 border-2 border-blue-500/50 rounded-lg p-3 shadow-lg hover:border-blue-400 transition-colors min-w-[140px]\">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center">
                                <FileIcon className="w-4 h-4 text-blue-400" />
                              </div>
                              <p className="text-white text-xs truncate flex-1">{file.name}</p>
                            </div>
                            <div className="space-y-1">
                              <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-xs">
                                {file.entities.length} entities
                              </Badge>
                              {crossReferences.filter(ref => ref.fileIds.includes(file.id)).length > 0 && (
                                <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30 text-xs ml-1">
                                  {crossReferences.filter(ref => ref.fileIds.includes(file.id)).length} links
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Detailed Cross-Reference List */}
                <div className="space-y-3">
                  <h5 className="text-white flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-cyan-400" />
                    Detected Correlations ({crossReferences.length})
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {crossReferences.map((ref, idx) => {
                      const EntityIcon = getEntityIcon(ref.entityType as any);
                      return (
                        <Card key={idx} className="bg-slate-800/50 border-cyan-500/30">
                          <CardContent className="p-4 space-y-3">
                            <div className="flex items-start gap-3">
                              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                <EntityIcon className="w-5 h-5 text-cyan-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge className={getEntityColor(ref.entityType as any)}>
                                    {ref.entityType}
                                  </Badge>
                                </div>
                                <p className="text-white">{ref.entityValue}</p>
                              </div>
                            </div>
                            
                            <div className="space-y-1 pt-2 border-t border-slate-700">
                              <p className="text-xs text-slate-400">Found in {ref.fileIds.length} files:</p>
                              <ul className="text-xs text-cyan-400 space-y-1">
                                {ref.fileNames.map((fileName, i) => (
                                  <li key={i} className="truncate">• {fileName}</li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}