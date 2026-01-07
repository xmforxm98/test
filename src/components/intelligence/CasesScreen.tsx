import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { FolderOpen, Clock, AlertCircle } from 'lucide-react';

export function CasesScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white uppercase tracking-wider text-sm mb-2">Cases</h1>
            <p className="text-xs text-slate-500">Active investigations and case management</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create New Case
          </Button>
        </div>

        {/* Case List */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Active Cases</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-red-900/30 flex items-center justify-center border border-red-800/50">
                    <FolderOpen className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white">Case #129 - Organized Fraud Network</p>
                      <span className="px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-800/50">
                        Critical
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Lead: Det. Williams • Opened: Nov 10, 2025</p>
                    <p className="text-xs text-slate-400">5 suspects, 12 evidence items, interview pending in 2 hours</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-amber-900/30 flex items-center justify-center border border-amber-800/50">
                    <FolderOpen className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white">Case #4521 - Identity Theft Ring</p>
                      <span className="px-2 py-0.5 rounded text-xs bg-amber-900/30 text-amber-400 border border-amber-800/50">
                        High Priority
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Lead: Det. Johnson • Opened: Nov 5, 2025</p>
                    <p className="text-xs text-slate-400">3 suspects, 8 evidence items, awaiting forensic results</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-blue-900/30 flex items-center justify-center border border-blue-800/50">
                    <FolderOpen className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white">Case #7892 - Financial Misconduct</p>
                      <span className="px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-400 border border-blue-800/50">
                        Active
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">Lead: Det. Chen • Opened: Oct 28, 2025</p>
                    <p className="text-xs text-slate-400">2 suspects, 15 evidence items, under review</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
