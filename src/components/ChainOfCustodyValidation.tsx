import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { toast } from 'sonner@2.0.3';
import {
  Clock,
  Upload,
  Eye,
  Share2,
  Archive,
  CheckCircle2,
  XCircle,
  User,
  Shield,
  Sparkles,
  Info,
  FileText,
  Database,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

interface CustodyEvent {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: 'Upload' | 'Review' | 'Shared' | 'Archived' | 'Modified' | 'Transferred';
  details: string;
  aiValidation: {
    status: 'valid' | 'mismatch' | 'warning';
    message: string;
    confidence: number;
  };
}

interface BlockchainRecord {
  hash: string;
  previousHash: string;
  timestamp: string;
  data: {
    action: string;
    actor: string;
    fileHash: string;
  };
  signature: string;
}

export function ChainOfCustodyValidation() {
  const [showBlockchain, setShowBlockchain] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CustodyEvent | null>(null);

  // Mock custody events
  const custodyEvents: CustodyEvent[] = [
    {
      id: 'c1',
      timestamp: '2024-03-15 09:23:14',
      actor: 'Sarah Johnson',
      role: 'Evidence Technician',
      action: 'Upload',
      details: 'Initial evidence upload - surveillance_footage_032.mp4',
      aiValidation: {
        status: 'valid',
        message: 'File integrity verified - SHA-256 hash matches',
        confidence: 100
      }
    },
    {
      id: 'c2',
      timestamp: '2024-03-15 10:45:22',
      actor: 'Michael Chen',
      role: 'Lead Analyst',
      action: 'Review',
      details: 'Completed forensic analysis and entity extraction',
      aiValidation: {
        status: 'valid',
        message: 'Analyst credentials verified - authorized access confirmed',
        confidence: 100
      }
    },
    {
      id: 'c3',
      timestamp: '2024-03-15 14:18:33',
      actor: 'Michael Chen',
      role: 'Lead Analyst',
      action: 'Shared',
      details: 'Shared with Case Lead (John Doe) for review',
      aiValidation: {
        status: 'valid',
        message: 'Share permissions validated - recipient authorized',
        confidence: 100
      }
    },
    {
      id: 'c4',
      timestamp: '2024-03-16 08:12:45',
      actor: 'Dr. Emily Roberts',
      role: 'Forensic Lab Director',
      action: 'Transferred',
      details: 'Evidence transferred to Forensic Lab - metadata match confirmed (100%)',
      aiValidation: {
        status: 'valid',
        message: 'Transfer verified - lab chain-of-custody protocol followed',
        confidence: 100
      }
    },
    {
      id: 'c5',
      timestamp: '2024-03-16 15:30:12',
      actor: 'Lab System',
      role: 'Automated Analysis',
      action: 'Modified',
      details: 'Enhanced resolution processing applied',
      aiValidation: {
        status: 'warning',
        message: 'File modified - original preserved, enhancement logged',
        confidence: 95
      }
    },
    {
      id: 'c6',
      timestamp: '2024-03-17 11:22:08',
      actor: 'John Doe',
      role: 'Case Lead',
      action: 'Review',
      details: 'Final review and approval for case inclusion',
      aiValidation: {
        status: 'valid',
        message: 'Review completed - case lead authorization verified',
        confidence: 100
      }
    },
    {
      id: 'c7',
      timestamp: '2024-03-18 09:15:33',
      actor: 'Archive System',
      role: 'System',
      action: 'Archived',
      details: 'Evidence archived to long-term secure storage',
      aiValidation: {
        status: 'valid',
        message: 'Archive integrity verified - blockchain record created',
        confidence: 100
      }
    },
  ];

  const blockchainRecords: BlockchainRecord[] = [
    {
      hash: '0x4f8a9c2d...b3e7',
      previousHash: '0x1a2b3c4d...5e6f',
      timestamp: '2024-03-15 09:23:14',
      data: {
        action: 'Upload',
        actor: 'Sarah Johnson',
        fileHash: 'sha256:a3f8e9d2...c4b1'
      },
      signature: 'sig:0x9e8d7c6b...5a4f'
    },
    {
      hash: '0x7e6d5c4b...a3f2',
      previousHash: '0x4f8a9c2d...b3e7',
      timestamp: '2024-03-15 10:45:22',
      data: {
        action: 'Review',
        actor: 'Michael Chen',
        fileHash: 'sha256:a3f8e9d2...c4b1'
      },
      signature: 'sig:0x2b3c4d5e...6f7a'
    },
    {
      hash: '0x3c2b1a09...8d7e',
      previousHash: '0x7e6d5c4b...a3f2',
      timestamp: '2024-03-15 14:18:33',
      data: {
        action: 'Shared',
        actor: 'Michael Chen',
        fileHash: 'sha256:a3f8e9d2...c4b1'
      },
      signature: 'sig:0x4d5e6f7a...8b9c'
    },
  ];

  const getActionIcon = (action: CustodyEvent['action']) => {
    switch (action) {
      case 'Upload':
        return Upload;
      case 'Review':
        return Eye;
      case 'Shared':
        return Share2;
      case 'Archived':
        return Archive;
      case 'Modified':
        return FileText;
      case 'Transferred':
        return TrendingUp;
    }
  };

  const getValidationIcon = (status: 'valid' | 'mismatch' | 'warning') => {
    switch (status) {
      case 'valid':
        return CheckCircle2;
      case 'mismatch':
        return XCircle;
      case 'warning':
        return AlertCircle;
    }
  };

  const getValidationColor = (status: 'valid' | 'mismatch' | 'warning') => {
    switch (status) {
      case 'valid':
        return 'text-green-400';
      case 'mismatch':
        return 'text-red-400';
      case 'warning':
        return 'text-amber-400';
    }
  };

  const validatedEvents = custodyEvents.filter(e => e.aiValidation.status === 'valid').length;
  const totalEvents = custodyEvents.length;
  const completionPercentage = Math.round((validatedEvents / totalEvents) * 100);

  const handleViewBlockchain = () => {
    setShowBlockchain(true);
  };

  const handleGenerateSummary = () => {
    toast.success('AI Summary Generated', {
      description: 'Chain-of-custody summary has been added to case notes.',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white flex items-center gap-2">
            <Clock className="w-6 h-6 text-blue-400" />
            Chain-of-Custody Validation
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Complete timeline of all custody events with AI-powered validation
          </p>
        </div>

        {/* AI Copilot Note */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-3 p-3 bg-blue-950/30 border border-blue-500/30 rounded-lg cursor-help">
                <Sparkles className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-white text-sm">AI Copilot</p>
                  <p className="text-slate-400 text-xs">Click for suggestion</p>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 border-slate-700 text-slate-300 max-w-sm">
              <p className="mb-2">Would you like me to generate a summary of all evidence custody transitions for this case?</p>
              <Button
                size="sm"
                onClick={handleGenerateSummary}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Generate Summary
              </Button>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Progress Overview */}
      <Card className="bg-gradient-to-br from-blue-950/30 to-slate-900/50 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white">Validation Progress</h3>
              <p className="text-slate-400 text-sm mt-1">
                {validatedEvents} of {totalEvents} events verified
              </p>
            </div>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              {completionPercentage}% Complete
            </Badge>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          
          {/* AI Audit Note */}
          <div className="mt-4 p-3 bg-slate-900/50 border border-slate-800 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-slate-300 text-xs">
                AI continuously audits metadata against custody logs to detect inconsistencies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Timeline */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white">Custody Timeline</h3>
            <Button
              onClick={handleViewBlockchain}
              variant="outline"
              size="sm"
              className="bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              <Database className="w-4 h-4 mr-2" />
              View Blockchain Record
            </Button>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-800" />

            {/* Events */}
            <div className="space-y-6">
              {custodyEvents.map((event, index) => {
                const ActionIcon = getActionIcon(event.action);
                const ValidationIcon = getValidationIcon(event.aiValidation.status);
                const validationColor = getValidationColor(event.aiValidation.status);

                return (
                  <div key={event.id} className="relative pl-20">
                    {/* Timeline Dot */}
                    <div className="absolute left-6 top-4 w-5 h-5 rounded-full bg-blue-500 border-4 border-slate-950 z-10" />

                    <Card className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                      <CardContent className="p-5">
                        <div className="flex items-start gap-4">
                          {/* Action Icon */}
                          <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                            <ActionIcon className="w-6 h-6 text-blue-400" />
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                                    {event.action}
                                  </Badge>
                                  <span className="text-slate-400 text-xs">
                                    {event.timestamp}
                                  </span>
                                </div>
                                <p className="text-white">{event.details}</p>
                              </div>
                            </div>

                            {/* Actor Info */}
                            <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
                              <User className="w-4 h-4" />
                              <span>{event.actor}</span>
                              <span>•</span>
                              <span>{event.role}</span>
                            </div>

                            {/* AI Validation */}
                            <div className={`flex items-start gap-2 p-3 rounded-lg ${
                              event.aiValidation.status === 'valid' 
                                ? 'bg-green-500/10 border border-green-500/30' 
                                : event.aiValidation.status === 'warning'
                                ? 'bg-amber-500/10 border border-amber-500/30'
                                : 'bg-red-500/10 border border-red-500/30'
                            }`}>
                              <ValidationIcon className={`w-5 h-5 ${validationColor} flex-shrink-0 mt-0.5`} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                  <span className={`text-sm ${validationColor}`}>
                                    AI Validation Check
                                  </span>
                                  <Badge className={`${
                                    event.aiValidation.status === 'valid' 
                                      ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                                      : event.aiValidation.status === 'warning'
                                      ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                                      : 'bg-red-500/20 text-red-400 border-red-500/30'
                                  }`}>
                                    {event.aiValidation.confidence}%
                                  </Badge>
                                </div>
                                <p className="text-slate-300 text-xs">
                                  {event.aiValidation.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Validation Stats */}
          <Card className="bg-slate-900/50 border-slate-800 sticky top-6">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-400" />
                Validation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Status Breakdown */}
              <div className="space-y-3">
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    <span>Valid</span>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {custodyEvents.filter(e => e.aiValidation.status === 'valid').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <AlertCircle className="w-4 h-4 text-amber-400" />
                    <span>Warnings</span>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    {custodyEvents.filter(e => e.aiValidation.status === 'warning').length}
                  </Badge>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2 text-slate-300">
                    <XCircle className="w-4 h-4 text-red-400" />
                    <span>Mismatches</span>
                  </div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    {custodyEvents.filter(e => e.aiValidation.status === 'mismatch').length}
                  </Badge>
                </div>
              </div>

              {/* Action Breakdown */}
              <div className="pt-4 border-t border-slate-800 space-y-3">
                <h4 className="text-white text-sm">Actions</h4>
                {['Upload', 'Review', 'Shared', 'Transferred', 'Modified', 'Archived'].map(action => {
                  const count = custodyEvents.filter(e => e.action === action).length;
                  if (count === 0) return null;
                  
                  return (
                    <div key={action} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{action}</span>
                      <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                        {count}
                      </Badge>
                    </div>
                  );
                })}
              </div>

              {/* Blockchain Info */}
              <div className="pt-4 border-t border-slate-800">
                <div className="p-3 bg-blue-950/30 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Database className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-white text-sm mb-1">Blockchain Protected</p>
                      <p className="text-slate-400 text-xs">
                        All custody events are recorded in an immutable blockchain ledger
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Blockchain Modal */}
      {showBlockchain && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <Card className="bg-slate-900 border-slate-800 w-full max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
            <CardHeader className="border-b border-slate-800">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5 text-blue-400" />
                  Immutable Blockchain Ledger
                </CardTitle>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowBlockchain(false)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                {blockchainRecords.map((record, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-5 space-y-3">
                      {/* Block Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                            <span className="text-blue-400">#{index + 1}</span>
                          </div>
                          <span className="text-white">Block {index + 1}</span>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>

                      {/* Block Data */}
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-slate-400">Hash:</span>
                          <p className="text-slate-300 font-mono text-xs mt-1">{record.hash}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Previous Hash:</span>
                          <p className="text-slate-300 font-mono text-xs mt-1">{record.previousHash}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Timestamp:</span>
                          <p className="text-slate-300 text-xs mt-1">{record.timestamp}</p>
                        </div>
                        <div>
                          <span className="text-slate-400">Signature:</span>
                          <p className="text-slate-300 font-mono text-xs mt-1">{record.signature}</p>
                        </div>
                      </div>

                      {/* Transaction Data */}
                      <div className="pt-3 border-t border-slate-700">
                        <span className="text-slate-400 text-sm">Transaction Data:</span>
                        <div className="mt-2 p-3 bg-slate-900/50 rounded border border-slate-700">
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">Action:</span>
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                {record.data.action}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-slate-400">Actor:</span>
                              <span className="text-slate-300">{record.data.actor}</span>
                            </div>
                            <div>
                              <span className="text-slate-400">File Hash:</span>
                              <p className="text-slate-300 font-mono mt-1">{record.data.fileHash}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
