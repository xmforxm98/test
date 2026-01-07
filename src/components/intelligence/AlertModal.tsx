import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { AlertTriangle, MapPin, Clock, User } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AlertModal({ isOpen, onClose }: AlertModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-900 border-slate-800 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white uppercase tracking-wider text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            Critical Alert Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Alert Header */}
          <div className="p-4 bg-red-900/20 border border-red-800/50 rounded">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white mb-1">High-Risk Activity Detected</p>
                <p className="text-xs text-slate-400">Alert ID: ALT-2847 • Priority: Critical</p>
              </div>
              <span className="px-2 py-1 rounded text-xs bg-red-900/30 text-red-400 border border-red-800/50">
                ACTIVE
              </span>
            </div>
            <p className="text-sm text-slate-300">
              Suspicious financial transaction pattern detected involving known person of interest Robert Martinez. 
              Multiple large cash transfers observed across 3 different accounts in the past 24 hours.
            </p>
          </div>

          {/* Alert Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Location</p>
              <div className="flex items-center gap-2 text-sm text-white">
                <MapPin className="w-4 h-4 text-blue-400" />
                Downtown Financial District
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Timestamp</p>
              <div className="flex items-center gap-2 text-sm text-white">
                <Clock className="w-4 h-4 text-blue-400" />
                Nov 20, 2025 14:23
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Linked Entity</p>
              <div className="flex items-center gap-2 text-sm text-white">
                <User className="w-4 h-4 text-blue-400" />
                Robert Martinez (POI-2847)
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-slate-500 uppercase tracking-wide">Related Case</p>
              <div className="flex items-center gap-2 text-sm text-white">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Case #129
              </div>
            </div>
          </div>

          {/* AI Analysis */}
          <div className="p-4 bg-slate-800/50 border border-slate-700 rounded">
            <p className="text-xs text-slate-500 uppercase tracking-wide mb-2">AI Analysis</p>
            <p className="text-sm text-slate-300">
              Pattern matches known money laundering indicators. Confidence: 87%. 
              Recommended action: Immediate investigation and account freeze consideration.
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <Button 
              variant="outline"
              onClick={onClose}
              className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
            >
              Dismiss
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline"
                className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                Assign to Case
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Escalate Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
