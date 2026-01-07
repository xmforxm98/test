import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Clock, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react';

export function SLAScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-white uppercase tracking-wider text-sm mb-2">SLA Monitoring</h1>
          <p className="text-xs text-slate-500">Service level agreement tracking and compliance</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-3xl text-white">1</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">At Risk</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <Clock className="w-5 h-5 text-amber-400" />
                <span className="text-3xl text-white">3</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Due Today</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-3xl text-white">24</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">On Track</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="w-5 h-5 text-blue-400" />
                <span className="text-3xl text-white">94%</span>
              </div>
              <p className="text-xs text-slate-400 uppercase tracking-wide">Compliance Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* At Risk Items */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide">At Risk Items</p>

          <Card className="bg-slate-900/30 border-red-800/50 hover:border-red-700/50 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Evidence Approval - Case #129</p>
                    <div className="flex items-center gap-4 text-xs mb-2">
                      <span className="flex items-center gap-1 text-red-400">
                        <Clock className="w-3 h-3" />
                        2 hours remaining
                      </span>
                      <span className="text-slate-500">SLA: 24 hours</span>
                    </div>
                    <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[92%] bg-red-500"></div>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Take Action
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Due Today */}
        <div className="space-y-3 pt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Due Today</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-amber-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Forensic Report Review - Case #129</p>
                    <div className="flex items-center gap-4 text-xs mb-2">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Clock className="w-3 h-3" />
                        6 hours remaining
                      </span>
                      <span className="text-slate-500">SLA: 48 hours</span>
                    </div>
                    <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[75%] bg-amber-500"></div>
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

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-amber-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Interview Completion - Case #4521</p>
                    <div className="flex items-center gap-4 text-xs mb-2">
                      <span className="flex items-center gap-1 text-amber-400">
                        <Clock className="w-3 h-3" />
                        8 hours remaining
                      </span>
                      <span className="text-slate-500">SLA: 24 hours</span>
                    </div>
                    <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[67%] bg-amber-500"></div>
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

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Case Status Update - Case #7892</p>
                    <div className="flex items-center gap-4 text-xs mb-2">
                      <span className="flex items-center gap-1 text-blue-400">
                        <Clock className="w-3 h-3" />
                        10 hours remaining
                      </span>
                      <span className="text-slate-500">SLA: 72 hours</span>
                    </div>
                    <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full w-[86%] bg-blue-500"></div>
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
