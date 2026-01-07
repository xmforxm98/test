import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { FileText, Download, Calendar, User } from 'lucide-react';

export function ReportsScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white uppercase tracking-wider text-sm mb-2">Reports</h1>
            <p className="text-xs text-slate-500">Generated intelligence reports and analytics</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Generate New Report
          </Button>
        </div>

        {/* Report List */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Recent Reports</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Weekly Intelligence Summary</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Nov 18, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        System Generated
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Case #129 Investigation Report</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Nov 17, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Det. Williams
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Monthly Threat Assessment</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Nov 15, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Intelligence Unit
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Critical Alert Analysis - Sector 7</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Nov 14, 2025
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        Ops Commander
                      </span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  <Download className="w-3 h-3 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
