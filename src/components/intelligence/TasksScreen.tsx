import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckSquare, Clock, AlertCircle } from 'lucide-react';

export function TasksScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white uppercase tracking-wider text-sm mb-2">Tasks</h1>
            <p className="text-xs text-slate-500">Task management and assignments</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            Create Task
          </Button>
        </div>

        {/* Urgent Tasks */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Urgent Tasks</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Review forensic report for Case #129</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-red-400" />
                        <span className="text-red-400">Due today 17:00</span>
                      </span>
                      <span>Case #129</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-orange-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Approve AI auto-enrichment results</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 text-orange-400" />
                        <span className="text-orange-400">SLA breach in 2 hours</span>
                      </span>
                      <span>Evidence Processing</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Tasks */}
        <div className="space-y-3 pt-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Today's Tasks</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-amber-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Conduct follow-up interview</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due today 19:00
                      </span>
                      <span>Case #129</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Complete
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
                    <p className="text-sm text-white mb-1">Review automated link analysis</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due today 20:00
                      </span>
                      <span>Workflow Automation</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-12 bg-cyan-500 rounded-full"></div>
                  <div>
                    <p className="text-sm text-white mb-1">Update case status report</p>
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due tomorrow
                      </span>
                      <span>Case #4521</span>
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Complete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
