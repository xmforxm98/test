import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import {
  Shield,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Calendar,
  User,
  MapPin,
  Smartphone,
  Clock,
  Hash,
  Info,
  X,
  Sparkles,
  Image as ImageIcon,
  Video,
  Music,
  File
} from 'lucide-react';

interface EvidenceAuthenticityViewerProps {
  evidence: {
    id: string;
    fileName: string;
    fileType: string;
    uploadedBy: string;
    timestamp: string;
  };
  onClose: () => void;
}

export function EvidenceAuthenticityViewer({ evidence, onClose }: EvidenceAuthenticityViewerProps) {
  const [authenticityScore] = useState(97);

  // Mock validation data
  const metadataValidation = {
    deviceId: { value: 'iPhone 14 Pro (ID: A2894)', status: 'verified' },
    timestamp: { value: '2025-10-25 18:42:17 UTC', status: 'verified' },
    gpsAlignment: { value: '40.7128° N, 74.0060° W', status: 'verified' },
    fileFormat: { value: 'MP4 (H.264)', status: 'verified' }
  };

  const digitalFingerprint = {
    originalHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    blockchainHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    status: 'match',
    verifiedOn: '2025-10-25 18:45:03 UTC'
  };

  const tamperDetection = [
    { region: 'Frame 1-450', status: 'clean', confidence: 99 },
    { region: 'Frame 451-892', status: 'clean', confidence: 98 },
    { region: 'Frame 893-1340', status: 'clean', confidence: 97 },
    { region: 'Audio Track', status: 'clean', confidence: 99 }
  ];

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return ImageIcon;
    if (type.startsWith('video/')) return Video;
    if (type.startsWith('audio/')) return Music;
    if (type.includes('pdf') || type.includes('document')) return FileText;
    return File;
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
                <Shield className="w-6 h-6 text-blue-400" />
                Authenticity & Tamper Detection
              </h2>
              <div className="flex items-center gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  Evidence ID: {evidence.id}
                </span>
                <span>•</span>
                <span>File Type: {evidence.fileType.split('/')[1].toUpperCase()}</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  Uploaded By: {evidence.uploadedBy}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {evidence.timestamp}
                </span>
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Panel - Original File Preview */}
            <div className="space-y-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <FileIcon className="w-5 h-5 text-blue-400" />
                    Original File Preview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Video/Image Preview */}
                  <div className="aspect-video bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {evidence.fileType.startsWith('video/') ? (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 to-slate-950" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Video className="w-16 h-16 text-slate-600" />
                        </div>
                        {/* Simulated video frame */}
                        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/80 to-transparent p-3 flex items-center justify-between">
                          <span className="text-white text-sm">18:42:17</span>
                          <div className="flex items-center gap-2">
                            <div className="w-32 h-1 bg-slate-700 rounded-full">
                              <div className="w-1/3 h-full bg-blue-500 rounded-full" />
                            </div>
                            <span className="text-white text-sm">00:45 / 02:15</span>
                          </div>
                        </div>
                      </div>
                    ) : evidence.fileType.startsWith('audio/') ? (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-8">
                        <Music className="w-16 h-16 text-slate-600" />
                        {/* Waveform visualization */}
                        <div className="w-full flex items-center gap-1 justify-center">
                          {Array.from({ length: 50 }).map((_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-blue-500/50 rounded-full"
                              style={{ 
                                height: `${Math.random() * 60 + 20}px`,
                                opacity: i < 15 ? 1 : 0.3
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="relative w-full h-full bg-gradient-to-br from-slate-900 to-slate-950">
                        <ImageIcon className="absolute inset-0 m-auto w-16 h-16 text-slate-600" />
                      </div>
                    )}
                  </div>

                  {/* File Info */}
                  <div className="mt-4 p-4 bg-slate-950 border border-slate-800 rounded-lg space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">File Name:</span>
                      <span className="text-slate-300">{evidence.fileName}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Resolution:</span>
                      <span className="text-slate-300">1920x1080 @ 30fps</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="text-slate-300">2m 15s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Size:</span>
                      <span className="text-slate-300">245 MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - AI Validation Report */}
            <div className="space-y-4">
              {/* Authenticity Score */}
              <Card className="bg-gradient-to-br from-blue-950/30 to-slate-900/50 border-blue-500/30">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="relative w-32 h-32">
                      {/* Circular Progress Indicator */}
                      <svg className="transform -rotate-90 w-32 h-32">
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-slate-800"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 56}`}
                          strokeDashoffset={`${2 * Math.PI * 56 * (1 - authenticityScore / 100)}`}
                          className="text-green-500 transition-all duration-1000"
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl text-white">{authenticityScore}%</div>
                          <div className="text-xs text-slate-400">Authentic</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-400" />
                      <span className="text-white">No modifications detected</span>
                    </div>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 text-slate-400 text-sm cursor-help">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span>AI validation powered by image forensics and metadata verification models</span>
                            <Info className="w-4 h-4" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="bg-slate-900 border-slate-700 text-slate-300 max-w-xs">
                          <p>Advanced AI models analyze cryptographic signatures, EXIF data, compression artifacts, and frame-level consistency to detect tampering</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>

              {/* Metadata Validation */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-blue-400" />
                    Metadata Validation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">Device ID</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 text-sm">{metadataValidation.deviceId.value}</span>
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">Timestamp</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 text-sm">{metadataValidation.timestamp.value}</span>
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">GPS Alignment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 text-sm">{metadataValidation.gpsAlignment.value}</span>
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-400 text-sm">File Format</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-300 text-sm">{metadataValidation.fileFormat.value}</span>
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Digital Fingerprint Match */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Hash className="w-5 h-5 text-blue-400" />
                    Digital Fingerprint Match
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-slate-400">Original Hash (SHA-256)</span>
                      <div className="mt-1 p-2 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-green-400 break-all">
                        {digitalFingerprint.originalHash}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400">Blockchain Record</span>
                      <div className="mt-1 p-2 bg-slate-950 border border-slate-800 rounded font-mono text-xs text-green-400 break-all">
                        {digitalFingerprint.blockchainHash}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                      <span className="text-slate-400">Status</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Verified Match
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Verified On</span>
                      <span className="text-slate-300">{digitalFingerprint.verifiedOn}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tamper Detection */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Tamper Detection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-3">
                    {tamperDetection.map((region, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">{region.region}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-300">{region.confidence}%</span>
                            {region.status === 'clean' ? (
                              <CheckCircle2 className="w-4 h-4 text-green-400" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-amber-400" />
                            )}
                          </div>
                        </div>
                        <Progress value={region.confidence} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-green-400">No potential modifications detected</div>
                        <div className="text-slate-400 text-xs mt-1">
                          All frames and audio tracks passed forensic analysis
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
