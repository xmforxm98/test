
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "./ui/table";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import {
    ArrowUpDown, MoreHorizontal, Shield, Clock, AlertTriangle,
    ExternalLink, User, Brain, Zap
} from "lucide-react";
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export interface Case {
    id: string;
    name: string;
    type: string;
    status: string;
    priority: string;
    health: 'critical' | 'high' | 'medium' | 'stable';
    healthScore: number;
    riskTrend: 'up' | 'down' | 'stable';
    momentum: 'advancing' | 'slowing' | 'stalled';
    sla: 'at-risk' | 'approaching' | 'on-track' | 'breached';
    aiFlagged: boolean;
    crossLinked: boolean;
    daysOpen: number;
    startDate: string;
    endDate: string;
    investigatorOverloaded: boolean;
    investigator: string;
    leadInvestigator: {
        name: string;
        initials: string;
        avatar?: string;
    };
    lastUpdated: string;
}

interface CaseTableProps {
    cases: Case[];
    selectedCases: string[];
    onSelectCase: (caseId: string) => void;
    onSelectAll: (checked: boolean) => void;
    onCaseClick: (caseId: string) => void;
    onOpenFullDetail: (caseId: string) => void;
    sortBy: string;
    onSort: (key: string) => void;
    getStatusColor: (status: string) => string;
    getPriorityColor: (priority: string) => string;
}

export function CaseTableView({
    cases,
    selectedCases,
    onSelectCase,
    onSelectAll,
    onCaseClick,
    onOpenFullDetail,
    sortBy,
    onSort,
    getStatusColor,
    getPriorityColor
}: CaseTableProps) {
    return (
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 overflow-hidden">
            <Table>
                <TableHeader className="bg-slate-900/50">
                    <TableRow className="border-slate-800 hover:bg-transparent">
                        <TableHead className="w-12">
                            <Checkbox
                                checked={selectedCases.length === cases.length && cases.length > 0}
                                onCheckedChange={(checked: boolean) => onSelectAll(!!checked)}
                            />
                        </TableHead>
                        <TableHead className="text-slate-400 font-bold text-xs uppercase cursor-pointer hover:text-white transition-colors" onClick={() => onSort('caseId')}>
                            <div className="flex items-center gap-2">
                                ID <ArrowUpDown className="w-3 h-3" />
                            </div>
                        </TableHead>
                        <TableHead className="text-slate-400 font-bold text-xs uppercase">Title & Details</TableHead>
                        <TableHead className="text-slate-400 font-bold text-xs uppercase cursor-pointer hover:text-white transition-colors" onClick={() => onSort('risk-level')}>
                            <div className="flex items-center gap-2">
                                Health <ArrowUpDown className="w-3 h-3" />
                            </div>
                        </TableHead>
                        <TableHead className="text-slate-400 font-bold text-xs uppercase cursor-pointer hover:text-white transition-colors" onClick={() => onSort('priority')}>
                            <div className="flex items-center gap-2">
                                Priority <ArrowUpDown className="w-3 h-3" />
                            </div>
                        </TableHead>
                        <TableHead className="text-slate-400 font-bold text-xs uppercase">Status</TableHead>
                        <TableHead className="text-slate-400 font-bold text-xs uppercase cursor-pointer hover:text-white transition-colors" onClick={() => onSort('days-open')}>
                            <div className="flex items-center gap-2">
                                Days Open <ArrowUpDown className="w-3 h-3" />
                            </div>
                        </TableHead>
                        <TableHead className="text-slate-400 font-bold text-xs uppercase cursor-pointer hover:text-white transition-colors" onClick={() => onSort('investigator')}>
                            <div className="flex items-center gap-2">
                                Investigator <ArrowUpDown className="w-3 h-3" />
                            </div>
                        </TableHead>
                        <TableHead className="w-12 text-right pr-6"></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cases.map((c) => (
                        <TableRow
                            key={c.id}
                            className={`border-slate-800 hover:bg-slate-800/40 cursor-pointer transition-colors group ${selectedCases.includes(c.id) ? 'bg-blue-600/5' : ''}`}
                            onClick={() => onCaseClick(c.id)}
                        >
                            <TableCell className="w-12" onClick={(e) => e.stopPropagation()}>
                                <Checkbox
                                    checked={selectedCases.includes(c.id)}
                                    onCheckedChange={() => onSelectCase(c.id)}
                                />
                            </TableCell>
                            <TableCell className="font-mono text-blue-400 text-xs">{c.id}</TableCell>
                            <TableCell>
                                <div className="flex flex-col gap-1">
                                    <span className="text-white text-sm font-medium line-clamp-1">{c.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] text-slate-500">{c.type}</span>
                                        {c.aiFlagged && (
                                            <Badge className="bg-red-500/10 text-red-400 border-red-500/20 text-[9px] py-0 h-4">
                                                <Zap className="w-2.5 h-2.5 mr-1" />
                                                AI Flag
                                            </Badge>
                                        )}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${c.healthScore > 80 ? 'bg-green-500' :
                                                c.healthScore > 50 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${c.healthScore}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] text-slate-400">{c.healthScore}%</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Badge variant="outline" className={`text-[10px] ${getPriorityColor(c.priority)}`}>
                                    {c.priority}
                                </Badge>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${getStatusColor(c.status).replace('text-', 'bg-').split(' ')[0]}`} />
                                    <span className="text-xs text-slate-300">{c.status}</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-1.5 text-slate-400">
                                    <Clock className="w-3 h-3" />
                                    <span className="text-xs">{c.daysOpen}d</span>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                        <User className="w-3 h-3 text-slate-400" />
                                    </div>
                                    <span className="text-xs text-slate-300">{c.investigator === 'Not Assigned' ? 'Unassigned' : c.investigator}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right pr-6" onClick={(e) => e.stopPropagation()}>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-white hover:bg-slate-800">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-300">
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer" onClick={() => onOpenFullDetail(c.id)}>
                                            <ExternalLink className="w-3.5 h-3.5 mr-2" /> Open Full Case
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer">
                                            <Brain className="w-3.5 h-3.5 mr-2" /> View AI Insights
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator className="bg-slate-800" />
                                        <DropdownMenuItem className="hover:bg-slate-800 cursor-pointer text-red-400">
                                            Mark as Suspicious
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
