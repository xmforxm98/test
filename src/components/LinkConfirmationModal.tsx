import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Link2, User, Building2, DollarSign, AlertCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface LinkConfirmationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceCase: {
    id: string;
    title: string;
  };
  targetCase: {
    id: string;
    title: string;
  };
  sharedEntities: Array<{
    type: 'person' | 'organization' | 'location' | 'account';
    name: string;
  }>;
  onConfirm: (relationshipType: string) => void;
}

export function LinkConfirmationModal({
  open,
  onOpenChange,
  sourceCase,
  targetCase,
  sharedEntities,
  onConfirm,
}: LinkConfirmationModalProps) {
  const [relationshipType, setRelationshipType] = useState('shared-entities');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleConfirm = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onConfirm(relationshipType);
      setIsAnimating(false);
      onOpenChange(false);
    }, 1000);
  };

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'person':
        return <User className="w-4 h-4 text-blue-400" />;
      case 'organization':
        return <Building2 className="w-4 h-4 text-purple-400" />;
      case 'account':
        return <DollarSign className="w-4 h-4 text-green-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-slate-400" />;
    }
  };

  const relationshipOptions = [
    { value: 'related-case', label: 'Related Case', description: 'General relationship between cases' },
    { value: 'shared-entities', label: 'Shared Entities', description: 'Person/Organization/Location/Event' },
    { value: 'parent-subcase', label: 'Parent/Sub-case', description: 'Hierarchical case relationship' },
    { value: 'follow-up', label: 'Follow-up Investigation', description: 'Sequential investigation flow' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl">
            <Link2 className="w-6 h-6 text-blue-400" />
            Link Case
          </DialogTitle>
          <DialogDescription className="text-slate-300 text-base mt-2">
            You are linking{' '}
            <span className="text-blue-400 font-medium">Case #{sourceCase.id}</span>{' '}
            <ArrowRight className="inline w-4 h-4 mx-1" />{' '}
            <span className="text-blue-400 font-medium">Case #{targetCase.id}</span>.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Link Animation */}
          {isAnimating && (
            <div className="flex items-center justify-center py-8">
              <div className="relative w-64 h-24">
                <div className="absolute left-8 top-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-blue-400 shadow-lg shadow-blue-500/50 flex items-center justify-center">
                    <span className="text-xs text-white">#{sourceCase.id}</span>
                  </div>
                </div>
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="absolute left-20 top-1/2 -translate-y-1/2 w-24 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 origin-left"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-blue-500 border-2 border-blue-400 shadow-lg shadow-blue-500/50 flex items-center justify-center">
                    <span className="text-xs text-white">#{targetCase.id}</span>
                  </div>
                </div>
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                  <div className="px-2 py-1 bg-cyan-500 text-white text-xs rounded shadow-lg">
                    Linked
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {!isAnimating && (
            <>
              {/* Relationship Type Selection */}
              <div className="space-y-3">
                <Label className="text-slate-200">Select Relationship Type</Label>
                <Select value={relationshipType} onValueChange={setRelationshipType}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700 text-white">
                    {relationshipOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div>
                          <div className="text-white">{option.label}</div>
                          <div className="text-xs text-slate-400">{option.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Shared Entities Preview */}
              {sharedEntities.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-slate-200">
                    Preview of Shared Entities ({sharedEntities.length})
                  </Label>
                  <Card className="bg-slate-950/50 border-slate-700 p-4">
                    <div className="space-y-2">
                      {sharedEntities.map((entity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-2 rounded bg-slate-800/50 border border-slate-700/50 hover:border-blue-500/30 transition-colors"
                        >
                          {getEntityIcon(entity.type)}
                          <span className="text-slate-200 text-sm">{entity.name}</span>
                          <span className="text-xs text-slate-400 ml-auto capitalize">
                            {entity.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              )}

              {/* Case Info Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 border-blue-500/30 p-4">
                  <div className="text-xs text-slate-400 mb-1">Source Case</div>
                  <div className="text-blue-400 mb-1">#{sourceCase.id}</div>
                  <div className="text-sm text-slate-300">{sourceCase.title}</div>
                </Card>
                <Card className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border-cyan-500/30 p-4">
                  <div className="text-xs text-slate-400 mb-1">Target Case</div>
                  <div className="text-cyan-400 mb-1">#{targetCase.id}</div>
                  <div className="text-sm text-slate-300">{targetCase.title}</div>
                </Card>
              </div>

              {/* Info Note */}
              <div className="flex items-start gap-3 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-blue-300">
                    Both cases will remain independent but contextually connected. You can view linked cases and their relationships in the Relationship Graph View.
                  </p>
                </div>
              </div>

              {/* AI Copilot Tooltip */}
              <div className="flex items-start gap-3 p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">AI</span>
                </div>
                <p className="text-sm text-slate-300 italic">
                  "Linking cases helps track related investigations while keeping them separate. I'll notify both Case Leads of the connection."
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
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
            >
              {isAnimating ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-2"
                  >
                    <Link2 className="w-4 h-4" />
                  </motion.div>
                  Linking...
                </>
              ) : (
                <>
                  <Link2 className="w-4 h-4 mr-2" />
                  Confirm Link
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
