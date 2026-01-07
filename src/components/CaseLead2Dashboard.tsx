import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { AlertTriangle, FileText, Users, Shield, Clock, CheckCircle } from 'lucide-react';

export function CaseLead2Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center px-8">
      <div className="w-full max-w-6xl space-y-8">
        {/* Panel 1 - Situational Awareness */}
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <h2 className="text-white uppercase tracking-wider text-sm">Current Intelligence Overview</h2>
            <p className="text-xs text-slate-500">Last updated: 4 mins ago</p>
          </div>
          
          <div className="grid grid-cols-4 gap-6">
            {/* Critical Alerts */}
            <Card className="bg-slate-900/30 border-slate-800 hover:border-red-900/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <span className="text-3xl text-white">2</span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Critical Alerts</p>
              </CardContent>
            </Card>

            {/* High-Risk Entities */}
            <Card className="bg-slate-900/30 border-slate-800 hover:border-amber-900/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <Users className="w-5 h-5 text-amber-400" />
                  <span className="text-3xl text-white">5</span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">High-Risk Entities Monitored</p>
              </CardContent>
            </Card>

            {/* New Case Inputs */}
            <Card className="bg-slate-900/30 border-slate-800 hover:border-blue-900/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-3xl text-white">3</span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">New Case Inputs</p>
              </CardContent>
            </Card>

            {/* Pending Evidence */}
            <Card className="bg-slate-900/30 border-slate-800 hover:border-cyan-900/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-3">
                  <Shield className="w-5 h-5 text-cyan-400" />
                  <span className="text-3xl text-white">1</span>
                </div>
                <p className="text-xs text-slate-400 uppercase tracking-wide">Pending Evidence Verifications</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Panel 2 - Priority Actions */}
        <div className="space-y-4">
          <h2 className="text-white uppercase tracking-wider text-sm">Your Priority Actions</h2>
          
          <Card className="bg-slate-900/30 border-slate-800">
            <CardContent className="p-0">
              <div className="divide-y divide-slate-800">
                {/* Priority Item 1 */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-red-500 rounded-full"></div>
                    <div>
                      <p className="text-sm text-white mb-1">Task: Review forensic report</p>
                      <p className="text-xs text-slate-500">Due today</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  >
                    Open
                  </Button>
                </div>

                {/* Priority Item 2 */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-amber-500 rounded-full"></div>
                    <div>
                      <p className="text-sm text-white mb-1">Case: Follow-up interview for Case #129</p>
                      <p className="text-xs text-slate-500">Assigned to you</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  >
                    Open
                  </Button>
                </div>

                {/* Priority Item 3 */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="text-sm text-white mb-1">Evidence: Approve AI auto-enrichment results</p>
                      <p className="text-xs text-slate-500">3 items pending</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  >
                    Open
                  </Button>
                </div>

                {/* Priority Item 4 */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <div>
                        <p className="text-sm text-white mb-1">SLA: Task nearing breach</p>
                        <p className="text-xs text-orange-400">2 hours left</p>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  >
                    Open
                  </Button>
                </div>

                {/* Priority Item 5 */}
                <div className="flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-1 h-12 bg-cyan-500 rounded-full"></div>
                    <div>
                      <p className="text-sm text-white mb-1">Workflow: Review automated link analysis</p>
                      <p className="text-xs text-slate-500">Ready for approval</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600"
                  >
                    Open
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
