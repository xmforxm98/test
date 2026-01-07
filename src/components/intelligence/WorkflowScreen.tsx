import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Workflow, Play, CheckCircle, Clock } from 'lucide-react';

export function WorkflowScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white uppercase tracking-wider text-sm mb-2">Workflow</h1>
            <p className="text-xs text-slate-500">Automated workflow and process management</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Workflow
          </Button>
        </div>

        {/* Active Workflows */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Active Workflows</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-blue-900/30 flex items-center justify-center border border-blue-800/50">
                    <Play className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Evidence Auto-Enrichment Pipeline</p>
                    <p className="text-xs text-slate-500 mb-2">Running • 3 items in queue</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-400 border border-blue-800/50">
                        Active
                      </span>
                      <span className="text-xs text-slate-500">Last run: 15 mins ago</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Monitor
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-cyan-900/30 flex items-center justify-center border border-cyan-800/50">
                    <Play className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Automated Link Analysis</p>
                    <p className="text-xs text-slate-500 mb-2">Running • Processing Case #129</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-cyan-900/30 text-cyan-400 border border-cyan-800/50">
                        Active
                      </span>
                      <span className="text-xs text-slate-500">Last run: 1 hour ago</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Monitor
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scheduled Workflows */}
        <div className="space-y-3 pt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Scheduled Workflows</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Clock className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Daily Intelligence Report Generation</p>
                    <p className="text-xs text-slate-500 mb-2">Next run: Tomorrow 08:00</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-400 border border-slate-700">
                        Scheduled
                      </span>
                      <span className="text-xs text-slate-500">Runs daily</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-slate-800 flex items-center justify-center border border-slate-700">
                    <Clock className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Weekly Threat Assessment</p>
                    <p className="text-xs text-slate-500 mb-2">Next run: Monday 09:00</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-slate-800 text-slate-400 border border-slate-700">
                        Scheduled
                      </span>
                      <span className="text-xs text-slate-500">Runs weekly</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Completed Workflows */}
        <div className="space-y-3 pt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Recently Completed</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded bg-green-900/30 flex items-center justify-center border border-green-800/50">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-white mb-1">Case #4521 Evidence Processing</p>
                    <p className="text-xs text-slate-500 mb-2">Completed: 3 hours ago</p>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-xs bg-green-900/30 text-green-400 border border-green-800/50">
                        Complete
                      </span>
                      <span className="text-xs text-slate-500">Duration: 45 mins</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  View Results
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
