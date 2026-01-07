import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Shield, Image, FileText, Video, CheckCircle } from 'lucide-react';

export function EvidenceScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white uppercase tracking-wider text-sm mb-2">Evidence</h1>
            <p className="text-xs text-slate-500">Evidence repository and verification</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Upload Evidence
          </Button>
        </div>

        {/* Evidence List */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Pending Verification</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-amber-900/30 flex items-center justify-center border border-amber-800/50">
                    <Image className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Surveillance Photo - Downtown Sector</p>
                    <p className="text-xs text-slate-500 mb-2">Case #129 • Uploaded: Nov 18, 2025 14:32</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-amber-900/30 text-amber-400 border border-amber-800/50">
                        AI Enrichment Complete
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-blue-900/30 flex items-center justify-center border border-blue-800/50">
                    <Video className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Security Camera Footage - 18:45</p>
                    <p className="text-xs text-slate-500 mb-2">Case #4521 • Uploaded: Nov 18, 2025 09:15</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-400 border border-blue-800/50">
                        Processing
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-cyan-900/30 flex items-center justify-center border border-cyan-800/50">
                    <FileText className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Financial Transaction Records</p>
                    <p className="text-xs text-slate-500 mb-2">Case #7892 • Uploaded: Nov 17, 2025 16:20</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-cyan-900/30 text-cyan-400 border border-cyan-800/50">
                        AI Analysis Complete
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verified Evidence */}
        <div className="space-y-3 pt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Verified Evidence</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-green-900/30 flex items-center justify-center border border-green-800/50">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Forensic Analysis Report</p>
                    <p className="text-xs text-slate-500 mb-2">Case #129 • Verified: Nov 16, 2025</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400 border border-green-800/50">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
