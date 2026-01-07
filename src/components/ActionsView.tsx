import { useState } from 'react';
import { CheckSquare, ClipboardCheck, Hourglass, Brain, Users } from 'lucide-react';
import { SupervisorApprovalScreen } from './SupervisorApprovalScreen';

export function ActionsView() {
  const [activeActionTool, setActiveActionTool] = useState('approvals');

  return (
    <div className="space-y-4">
      {/* Actions Tools Selector */}
      <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setActiveActionTool('approvals')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeActionTool === 'approvals'
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
              : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
          >
            <CheckSquare className="w-4 h-4" />
            Approvals
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 font-bold">2</span>
          </button>

          <button
            onClick={() => setActiveActionTool('sla')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeActionTool === 'sla'
              ? 'bg-red-600/20 text-red-400 border border-red-500/30'
              : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
          >
            <Hourglass className="w-4 h-4" />
            SLA Alerts
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-red-500/20 text-red-400 border border-red-500/30 font-bold">3</span>
          </button>

          <button
            onClick={() => setActiveActionTool('intelligence')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeActionTool === 'intelligence'
              ? 'bg-cyan-600/20 text-cyan-400 border border-cyan-500/30'
              : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
          >
            <Brain className="w-4 h-4" />
            Intel Flags
            <span className="ml-1 px-1.5 py-0.5 text-[10px] rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold">5</span>
          </button>

          <button
            onClick={() => setActiveActionTool('resource')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activeActionTool === 'resource'
              ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30'
              : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-700/50'
              }`}
          >
            <Users className="w-4 h-4" />
            Resource Routing
          </button>
        </div>
      </div>

      {/* Actions Tool Content */}
      <div className="flex-1 overflow-hidden">
        {activeActionTool === 'approvals' && <SupervisorApprovalScreen category="Approvals" />}
        {activeActionTool === 'sla' && <SupervisorApprovalScreen category="SLA Alerts" />}
        {activeActionTool === 'intelligence' && <SupervisorApprovalScreen category="Intelligence Flags" />}
        {activeActionTool === 'resource' && <SupervisorApprovalScreen category="Resource Management" />}
      </div>
    </div>
  );
}
