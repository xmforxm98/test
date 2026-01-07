
import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronLeft, ChevronRight, Lock, Brain, AlertCircle } from 'lucide-react';
import { Case } from './CaseTableView';

interface CaseTimelineViewProps {
    cases: Case[];
    onCaseClick: (caseData: Case) => void;
}

export function CaseTimelineView({ cases, onCaseClick }: CaseTimelineViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Jan 2026

    // Generate days for the current view (simplified)
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

    // Mock duration calculation
    const getCaseDuration = (caseItem: any) => {
        // Random start day between 1 and 15, duration between 5 and 15 days
        const start = (parseInt(caseItem.id.replace('#', '')) % 15) + 1;
        const duration = (parseInt(caseItem.id.replace('#', '')) % 10) + 5;
        return { start, duration };
    };

    return (
        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-[600px]">
            {/* Header / Month Selector */}
            <div className="bg-slate-900/50 border-b border-slate-800 p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h3 className="text-white font-medium flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-blue-400" />
                        January 2026
                    </h3>
                    <div className="flex bg-slate-800 rounded-lg p-1">
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="p-1 hover:bg-slate-700 rounded transition-colors text-slate-400">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <button className="px-3 py-1.5 rounded-md bg-blue-600 text-white shadow-lg shadow-blue-600/20">Month</button>
                    <button className="px-3 py-1.5 rounded-md text-slate-400 hover:bg-slate-800 transition-all">Year</button>
                </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Sidebar: Cases List */}
                <div className="w-80 border-r border-slate-800 flex flex-col overflow-y-auto">
                    {cases.map((caseItem) => (
                        <div
                            key={caseItem.id}
                            onClick={() => onCaseClick(caseItem)}
                            className="p-4 border-b border-slate-800/50 hover:bg-slate-900/50 cursor-pointer transition-colors group relative"
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-1">
                                    {caseItem.status === 'Closed' ? (
                                        <Lock className="w-4 h-4 text-red-400" />
                                    ) : (
                                        <div className={`w-3 h-3 rounded-full ${caseItem.health === 'critical' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' :
                                            caseItem.health === 'high' ? 'bg-orange-500' : 'bg-green-500'
                                            }`} />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                        <span className="text-[10px] text-blue-400 font-mono tracking-wider">{caseItem.id}</span>
                                        <Badge variant="outline" className={`text-[10px] h-4 px-1 ${caseItem.priority === 'High' ? 'border-red-500/30 text-red-400 bg-red-500/5' : 'border-slate-700 text-slate-400'
                                            }`}>
                                            {caseItem.priority}
                                        </Badge>
                                    </div>
                                    <h4 className="text-sm text-slate-200 truncate group-hover:text-blue-400 transition-colors">
                                        {caseItem.name}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Avatar className="w-5 h-5 border border-slate-700">
                                            <AvatarFallback className="bg-blue-600 text-white text-[8px]">
                                                {caseItem.leadInvestigator.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-[10px] text-slate-500">{caseItem.leadInvestigator.name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Panel: Calendar Grid */}
                <div className="flex-1 overflow-auto relative bg-slate-950/20">
                    {/* Days Header */}
                    <div className="sticky top-0 z-20 flex bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
                        {days.map(day => (
                            <div key={day} className="w-12 h-10 flex-shrink-0 flex items-center justify-center border-r border-slate-800/30 text-[10px] font-mono text-slate-500">
                                {day < 10 ? `0${day}` : day}
                            </div>
                        ))}
                    </div>

                    {/* Timeline Grid Rows */}
                    <div className="relative">
                        {/* Background Grid Lines */}
                        <div className="absolute inset-0 flex">
                            {days.map(day => (
                                <div key={day} className="w-12 h-full flex-shrink-0 border-r border-slate-800/20" />
                            ))}
                        </div>

                        {/* Case Bars */}
                        <div className="relative z-10">
                            {cases.map((caseItem) => {
                                const { start, duration } = getCaseDuration(caseItem);
                                const barColor = caseItem.status === 'Closed' ? 'bg-slate-700' :
                                    caseItem.health === 'critical' ? 'bg-gradient-to-r from-red-600 to-red-500 shadow-[0_0_15px_rgba(220,38,38,0.2)]' :
                                        caseItem.health === 'high' ? 'bg-gradient-to-r from-orange-600 to-orange-500' :
                                            'bg-gradient-to-r from-blue-600 to-cyan-500';

                                return (
                                    <div key={caseItem.id} className="h-[81px] border-b border-white/[0.02] flex items-center relative overflow-hidden group">
                                        <div
                                            className={`absolute h-7 rounded-sm ${barColor} flex items-center px-2 transition-all group-hover:h-8 group-hover:shadow-lg`}
                                            style={{
                                                left: `${(start - 1) * 48}px`,
                                                width: `${duration * 48}px`
                                            }}
                                        >
                                            <span className="text-[10px] text-white font-medium truncate uppercase tracking-tighter shadow-sm">
                                                {caseItem.status} – ACTIVE
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CalendarIcon({ className }: { className?: string }) {
    return (
        <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
        </svg>
    );
}
