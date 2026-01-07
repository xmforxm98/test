
import { Search, Filter, Calendar, Users, X, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FilterState {
    searchQuery: string;
    dateRange: string;
    investigator: string;
    priority: string;
}

interface CaseFilterBarProps {
    filters: FilterState;
    setFilters: (filters: FilterState) => void;
    onReset: () => void;
}

export function CaseFilterBar({ filters, setFilters, onReset }: CaseFilterBarProps) {
    return (
        <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-4 mb-6 backdrop-blur-md">
            <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Query */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search by case ID, title, or summary..."
                        className="w-full bg-slate-950/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        value={filters.searchQuery}
                        onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                    />
                    {filters.searchQuery && (
                        <button
                            onClick={() => setFilters({ ...filters, searchQuery: '' })}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Date Range Select */}
                <div className="w-full lg:w-48">
                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                        <Select value={filters.dateRange} onValueChange={(value: string) => setFilters({ ...filters, dateRange: value })}>
                            <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white pl-10 h-10 w-full rounded-lg">
                                <SelectValue placeholder="Date Range" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                                <SelectItem value="all">All Time</SelectItem>
                                <SelectItem value="today">Today</SelectItem>
                                <SelectItem value="last-7">Last 7 Days</SelectItem>
                                <SelectItem value="last-30">Last 30 Days</SelectItem>
                                <SelectItem value="this-month">This Month</SelectItem>
                                <SelectItem value="this-year">This Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Investigator Select */}
                <div className="w-full lg:w-48">
                    <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                        <Select value={filters.investigator} onValueChange={(value: string) => setFilters({ ...filters, investigator: value })}>
                            <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white pl-10 h-10 w-full rounded-lg">
                                <SelectValue placeholder="Investigator" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                                <SelectItem value="all">All Personnel</SelectItem>
                                <SelectItem value="SC">Sarah Chen</SelectItem>
                                <SelectItem value="MJ">Mike Johnson</SelectItem>
                                <SelectItem value="LP">Lisa Park</SelectItem>
                                <SelectItem value="SM">Sarah Mitchell</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Priority Select */}
                <div className="w-full lg:w-40">
                    <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none z-10" />
                        <Select value={filters.priority} onValueChange={(value: string) => setFilters({ ...filters, priority: value })}>
                            <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white pl-10 h-10 w-full rounded-lg">
                                <SelectValue placeholder="Priority" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                                <SelectItem value="all">Any Priority</SelectItem>
                                <SelectItem value="High">High / Critical</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Reset Button */}
                <Button
                    variant="ghost"
                    onClick={onReset}
                    className="text-slate-400 hover:text-white hover:bg-slate-800 h-10 px-4 flex items-center gap-2 rounded-lg"
                >
                    <Filter className="w-4 h-4" />
                    Reset
                </Button>
            </div>

            {/* Active Filter Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
                {filters.dateRange !== 'all' && (
                    <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 flex items-center gap-1 px-2 py-0.5">
                        Range: {filters.dateRange}
                        <button onClick={() => setFilters({ ...filters, dateRange: 'all' })}><X className="w-3 h-3 ml-1" /></button>
                    </Badge>
                )}
                {filters.investigator !== 'all' && (
                    <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30 flex items-center gap-1 px-2 py-0.5">
                        Investigator: {filters.investigator}
                        <button onClick={() => setFilters({ ...filters, investigator: 'all' })}><X className="w-3 h-3 ml-1" /></button>
                    </Badge>
                )}
                {filters.priority !== 'all' && (
                    <Badge variant="outline" className="bg-amber-500/10 text-amber-400 border-amber-500/30 flex items-center gap-1 px-2 py-0.5">
                        Priority: {filters.priority}
                        <button onClick={() => setFilters({ ...filters, priority: 'all' })}><X className="w-3 h-3 ml-1" /></button>
                    </Badge>
                )}
            </div>
        </div>
    );
}
