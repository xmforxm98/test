
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Brain, Clock, Shield, AlertTriangle, MessageSquare, History, ArrowRight, UserPlus, CheckCircle2 } from "lucide-react";
import { Case } from "./CaseTableView";

interface CaseSideDrawerProps {
    caseData: Case | null;
    isOpen: boolean;
    onClose: () => void;
    onOpenFullDetail: (caseData: Case) => void;
}

export function CaseSideDrawer({ caseData, isOpen, onClose, onOpenFullDetail }: CaseSideDrawerProps) {
    if (!caseData) return null;

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent className="w-[450px] sm:w-[540px] bg-slate-950 border-l border-slate-800 p-0 text-slate-200">
                <div className="h-full flex flex-col">
                    {/* Header */}
                    <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-mono text-blue-400">{caseData.id}</span>
                            <div className="flex gap-2">
                                <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-400">
                                    {caseData.status}
                                </Badge>
                                <Badge variant="outline" className="text-[10px] border-red-500/30 text-red-400 bg-red-500/5">
                                    {caseData.priority}
                                </Badge>
                            </div>
                        </div>
                        <SheetTitle className="text-xl text-white font-semibold mb-2 leading-snug">
                            {caseData.name}
                        </SheetTitle>
                        <SheetDescription className="text-slate-400 text-sm">
                            Quick preview of case status, AI insights, and recent activity.
                        </SheetDescription>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* AI Insights - Actionable Section */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-cyan-400">
                                <Brain className="w-5 h-5" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">AI Intelligence Insights</h3>
                            </div>
                            <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-xl p-4 space-y-4">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="w-5 h-5 text-cyan-400 mt-0.5" />
                                    <div>
                                        <p className="text-sm text-slate-200 leading-relaxed font-medium">
                                            Resource Bottleneck Detected
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1">
                                            Lead investigator {caseData.leadInvestigator.name} is currently handling 8 high-priority cases. SLA expiration is in 48 hours.
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 pt-2">
                                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500 text-white text-xs gap-2">
                                        <UserPlus className="w-3.5 h-3.5" />
                                        Reassign Investigator
                                    </Button>
                                    <Button variant="outline" size="sm" className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 text-xs">
                                        Extend SLA
                                    </Button>
                                </div>
                            </div>
                        </section>

                        {/* Case Snapshot */}
                        <section className="space-y-4">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Shield className="w-5 h-5 border-slate-700" />
                                <h3 className="text-sm font-semibold uppercase tracking-wider">Case Snapshot</h3>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Lead Investigator</span>
                                    <div className="flex items-center gap-2">
                                        <Avatar className="w-5 h-5 border border-slate-700">
                                            <AvatarFallback className="bg-blue-600 text-white text-[8px] uppercase">
                                                {caseData.leadInvestigator.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm text-slate-300">{caseData.leadInvestigator.name}</span>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-3">
                                    <span className="text-[10px] text-slate-500 uppercase block mb-1">Days Open</span>
                                    <span className="text-sm text-slate-300">{caseData.daysOpen} days</span>
                                </div>
                            </div>
                        </section>

                        {/* Recent Timeline Log */}
                        <section className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <History className="w-5 h-5" />
                                    <h3 className="text-sm font-semibold uppercase tracking-wider">Recent Activity</h3>
                                </div>
                                <Button variant="link" className="text-blue-400 text-xs p-0 h-auto">View all logs</Button>
                            </div>
                            <div className="space-y-4 relative before:absolute before:left-[9px] before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-800">
                                {[
                                    { time: '2h ago', user: 'SC', action: 'Added digital forensic evidence #442', color: 'bg-blue-500' },
                                    { time: '5h ago', user: 'MK', action: 'Case status moved to Under Investigation', color: 'bg-green-500' },
                                    { time: '1d ago', user: 'AI', action: 'Cross-linked with Incident #992 (Pattern Match)', color: 'bg-cyan-500' },
                                ].map((log, i) => (
                                    <div key={i} className="flex gap-4 relative pl-7 group">
                                        <div className={`absolute left-0 top-1.5 w-5 h-5 rounded-full border border-slate-900 z-10 flex items-center justify-center ${log.color} shadow-lg shadow-white/10`}>
                                            <span className="text-[8px] text-white font-bold">{log.user}</span>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-200 font-medium group-hover:text-blue-400 transition-colors">{log.action}</p>
                                            <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                {log.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 border-t border-slate-800 bg-slate-900/30 flex items-center gap-3">
                        <Button
                            className="flex-1 bg-blue-600 hover:bg-blue-500 text-white gap-2"
                            onClick={() => onOpenFullDetail(caseData)}
                        >
                            Open Full Case File
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Add Note
                        </Button>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}
