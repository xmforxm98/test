import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Card } from './ui/card';
import { AlertCircle, GitMerge, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';

interface MergeConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceCase: {
    id: string;
    title: string;
    taskCount: number;
    evidenceCount: number;
  };
  targetCase: {
    id: string;
    title: string;
    taskCount: number;
    evidenceCount: number;
  };
  similarity: number;
  onConfirm: (masterCase: string, archiveMerged: boolean) => void;
}

export function MergeConfirmationModal({
  open,
  onOpenChange,
  sourceCase,
  targetCase,
  similarity,
  onConfirm,
}: MergeConfirmationModalProps) {
  const [masterCase, setMasterCase] = useState(targetCase.id);
  const [archiveMerged, setArchiveMerged] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleConfirm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onConfirm(masterCase, archiveMerged);
      setIsAnimating(false);
      onOpenChange(false);
    }, 1500);
  };

  const totalTasks = sourceCase.taskCount + targetCase.taskCount;
  const totalEvidence = sourceCase.evidenceCount + targetCase.evidenceCount;
  const duplicateEvidence = 2; // Mock data
  const conflictingFields = 1; // Mock data

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <GitMerge className="w-6 h-6 text-purple-400" />
            Confirm Merge
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-base mt-2">
            You are merging <span className="text-blue-400 font-medium">Case #{sourceCase.id}</span> into{' '}
            <span className="text-blue-400 font-medium">Case #{targetCase.id}</span>{' '}
            <span className="text-green-400">({similarity}% Similarity)</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Merge Animation */}
          {isAnimating && (
            <div className="flex items-center justify-center py-8">
              <div className="relative w-64 h-24">
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: 80 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-blue-400 shadow-lg shadow-blue-500/50 flex items-center justify-center">
                    <span className="text-xs text-white">#{sourceCase.id}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: -80 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                  className="absolute right-0 top-1/2 -translate-y-1/2"
                >
                  <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-blue-400 shadow-lg shadow-blue-500/50 flex items-center justify-center">
                    <span className="text-xs text-white">#{targetCase.id}</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 border-2 border-white shadow-lg shadow-purple-500/50 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Data Preview Cards */}
          {!isAnimating && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30 p-4">
                  <div className="text-center">
                    <div className="text-3xl text-blue-400 mb-1">{totalTasks}</div>
                    <div className="text-sm text-slate-300">Total Tasks</div>
                    <div className="text-xs text-slate-400 mt-1">Combined</div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border-purple-500/30 p-4">
                  <div className="text-center">
                    <div className="text-3xl text-purple-400 mb-1">{totalEvidence}</div>
                    <div className="text-sm text-slate-300">Evidence Files</div>
                    <div className="text-xs text-amber-400 mt-1">{duplicateEvidence} duplicates</div>
                  </div>
                </Card>

                <Card className="bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/30 p-4">
                  <div className="text-center">
                    <div className="text-3xl text-amber-400 mb-1">{conflictingFields}</div>
                    <div className="text-sm text-slate-300">Conflicting Fields</div>
                    <div className="text-xs text-slate-400 mt-1">Suspect Address</div>
                  </div>
                </Card>
              </div>

              {/* Master Case Selection */}
              <div className="space-y-3">
                <Label className="text-slate-200">Select Master Case</Label>
                <RadioGroup value={masterCase} onValueChange={setMasterCase}>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <RadioGroupItem value={targetCase.id} id="target" />
                    <Label htmlFor="target" className="flex-1 cursor-pointer text-slate-200">
                      Keep Case #{targetCase.id} as master
                      <span className="block text-xs text-slate-400 mt-1">{targetCase.title}</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-3 rounded-lg border border-slate-700 hover:border-blue-500/50 transition-colors">
                    <RadioGroupItem value={sourceCase.id} id="source" />
                    <Label htmlFor="source" className="flex-1 cursor-pointer text-slate-200">
                      Keep Case #{sourceCase.id} as master
                      <span className="block text-xs text-slate-400 mt-1">{sourceCase.title}</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Archive Option */}
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-700">
                <div className="flex-1">
                  <Label htmlFor="archive" className="cursor-pointer text-slate-200">
                    Archive merged case record
                  </Label>
                  <p className="text-xs text-slate-400 mt-1">
                    Non-master case will be marked as archived and hidden from active view
                  </p>
                </div>
                <Switch
                  id="archive"
                  checked={archiveMerged}
                  onCheckedChange={setArchiveMerged}
                />
              </div>

              {/* Warning Note */}
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-300">
                    All data and audit logs will be preserved. This action consolidates both cases under one case ID while maintaining the complete audit trail.
                  </p>
                </div>
              </div>

              {/* AI Copilot Tooltip */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">AI</span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  "Merging consolidates all data under one case ID and preserves the full audit trail."
                </p>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isAnimating}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isAnimating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
            >
              {isAnimating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <GitMerge className="w-4 h-4" />
                  </motion.div>
                  Merging...
                </>
              ) : (
                <>
                  <GitMerge className="w-4 h-4 mr-2" />
                  Confirm Merge
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
