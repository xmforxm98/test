import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import {
    Search, Twitter, Instagram, Facebook, Linkedin, Database, Phone,
    MessageCircle, ExternalLink, MessageSquare, Globe, Shield, Radio,
    User, MapPin, Car, FileText, Hash, AlignLeft, Sparkles, TrendingUp
} from 'lucide-react';

interface ChipProps {
    label: string;
    selected: boolean;
    onClick: () => void;
    icon?: any;
}

function Chip({ label, selected, onClick, icon: Icon }: ChipProps) {
    return (
        <button
            onClick={onClick}
            className={`
        px-3 py-1.5 rounded-full text-[11px] transition-all flex items-center gap-1.5 whitespace-nowrap
        ${selected
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20'
                    : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }
      `}
        >
            {Icon && <Icon className="w-3 h-3" />}
            {label}
        </button>
    );
}

export function CopilotAllSearch() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sourceFilter, setSourceFilter] = useState('all');
    const [queryTypes, setQueryTypes] = useState<string[]>(['person']);
    const [hasSearched, setHasSearched] = useState(false);
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const toggleQueryType = (type: string) => {
        setQueryTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleSearch = () => {
        if (!searchQuery.trim()) return;

        setHasSearched(true);

        // Check if searching for InvestProGlobal (fraud investigation case)
        const normalizedQuery = searchQuery.toLowerCase().replace(/[@_\-\.]/g, '');
        const isInvestProGlobal = normalizedQuery.includes('investproglobal') ||
            normalizedQuery.includes('investglobal') ||
            searchQuery.toLowerCase().includes('invest.global') ||
            searchQuery.toLowerCase().includes('investpro');

        const allResults = isInvestProGlobal ? [
            {
                platform: 'Twitter',
                icon: Twitter,
                username: '@InvestProGlobal',
                fullName: 'Global Invest Trader',
                source: 'OSINT',
                type: 'person',
                details: 'Helping you flip $500 to $5000 weekly 💰',
                color: 'cyan'
            },
            {
                platform: 'National ID',
                icon: Database,
                username: 'ID: #73821-4592',
                fullName: 'Marcus David Chen',
                source: 'Government',
                type: 'person',
                details: 'Verified Citizens Registry',
                color: 'blue'
            },
            {
                platform: 'Telecom',
                icon: Phone,
                username: '+1-305-XXX-4829',
                fullName: 'Marcus Chen',
                source: 'SIGINT',
                type: 'person',
                details: 'High-frequency communication patterns detected',
                color: 'purple'
            },
            {
                platform: 'InvestPro HQ',
                icon: Database,
                username: 'Dubai, UAE',
                fullName: 'InvestPro Global Services',
                source: 'Government',
                type: 'organization',
                details: 'Commercial license #339210-AX',
                color: 'blue'
            },
            {
                platform: 'Telegram',
                icon: MessageSquare,
                username: '@InvestProVIP',
                fullName: 'InvestPro VIP Channel',
                source: 'OSINT',
                type: 'social',
                details: 'Encrypted communication group',
                color: 'cyan'
            }
        ] : [
            {
                platform: 'Twitter',
                icon: Twitter,
                username: '@johndoe',
                fullName: 'John Doe',
                source: 'OSINT',
                type: 'person',
                details: 'Public profile',
                color: 'cyan'
            },
            {
                platform: 'National ID',
                icon: Database,
                username: 'ID: #99281-1122',
                fullName: 'John Doe',
                source: 'Government',
                type: 'person',
                details: 'Citizen record',
                color: 'blue'
            }
        ];

        // Filter results
        const filtered = allResults.filter(item => {
            const matchesSource = sourceFilter === 'all' || item.source.toLowerCase() === sourceFilter.toLowerCase();
            const matchesType = queryTypes.length === 0 || queryTypes.includes(item.type);
            return matchesSource && matchesType;
        });

        setSearchResults(filtered);
    };

    return (
        <div className="h-full flex flex-col p-4 space-y-4">
            {/* Search Input Area */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Globe className="w-4 h-4 text-blue-400" />
                        <h3 className="text-white text-sm font-semibold uppercase tracking-wider">Global Search</h3>
                    </div>
                    {hasSearched && (
                        <span className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">
                            {searchResults.length} results
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
                            placeholder="Search name, ID, handle..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                        />
                    </div>
                    <Button
                        size="icon"
                        className="bg-blue-600 hover:bg-blue-700 w-11 h-11 shrink-0 shadow-lg shadow-blue-600/20"
                        onClick={handleSearch}
                    >
                        <Search className="w-4 h-4" />
                    </Button>
                </div>

                {/* Source Filters */}
                <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-slate-500 px-1">Source Systems</p>
                    <div className="flex flex-wrap gap-2">
                        <Chip label="All Systems" selected={sourceFilter === 'all'} onClick={() => setSourceFilter('all')} icon={Globe} />
                        <Chip label="OSINT" selected={sourceFilter === 'osint'} onClick={() => setSourceFilter('osint')} icon={Radio} />
                        <Chip label="Government" selected={sourceFilter === 'government'} onClick={() => setSourceFilter('government')} icon={Shield} />
                        <Chip label="SIGINT" selected={sourceFilter === 'sigint'} onClick={() => setSourceFilter('sigint')} icon={TrendingUp} />
                    </div>
                </div>

                {/* Query Type Filters */}
                <div className="space-y-2">
                    <p className="text-[10px] uppercase font-bold text-slate-500 px-1">Query Type</p>
                    <div className="flex flex-wrap gap-2">
                        <Chip label="Person" selected={queryTypes.includes('person')} onClick={() => toggleQueryType('person')} icon={User} />
                        <Chip label="Organization" selected={queryTypes.includes('organization')} onClick={() => toggleQueryType('organization')} icon={AlignLeft} />
                        <Chip label="Social" selected={queryTypes.includes('social')} onClick={() => toggleQueryType('social')} icon={MessageCircle} />
                    </div>
                </div>
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto min-h-0 space-y-3 pr-1 custom-scrollbar">
                {hasSearched ? (
                    searchResults.length > 0 ? (
                        searchResults.map((result, index) => {
                            const Icon = result.icon;
                            let sourceColorClass = 'blue';
                            if (result.source === 'OSINT') sourceColorClass = 'cyan';
                            if (result.source === 'SIGINT') sourceColorClass = 'purple';

                            return (
                                <Card key={index} className="bg-slate-900/40 border-slate-800/60 hover:border-blue-500/30 transition-all group">
                                    <CardContent className="p-3">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-10 h-10 rounded-xl bg-${sourceColorClass}-500/10 border border-${sourceColorClass}-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                                                <Icon className={`w-5 h-5 text-${sourceColorClass}-400`} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center justify-between gap-2">
                                                    <p className="text-white text-sm font-semibold truncate group-hover:text-blue-400 transition-colors uppercase tracking-tight">{result.fullName}</p>
                                                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded bg-${sourceColorClass}-500/10 text-${sourceColorClass}-400 border border-${sourceColorClass}-500/20 whitespace-nowrap`}>
                                                        {result.source}
                                                    </span>
                                                </div>
                                                <p className="text-xs text-slate-400 font-mono mt-0.5 truncate">{result.username}</p>
                                                <div className="flex items-center gap-1.5 mt-1.5">
                                                    <p className="text-[10px] text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50 flex items-center gap-1">
                                                        <Sparkles className="w-2.5 h-2.5" />
                                                        {result.platform}
                                                    </p>
                                                </div>
                                                <p className="text-[11px] text-slate-500 mt-2 line-clamp-2 leading-relaxed italic">
                                                    "{result.details}"
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })
                    ) : (
                        <div className="flex flex-col items-center justify-center py-12 text-slate-600 bg-slate-900/20 rounded-xl border border-dashed border-slate-800">
                            <AlertCircle className="w-8 h-8 mb-2 opacity-20" />
                            <p className="text-sm">No intelligence found matching criteria</p>
                            <p className="text-[10px] mt-1 opacity-50">Try broadening your search or filters</p>
                        </div>
                    )
                ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-500 text-center space-y-4">
                        <div className="relative">
                            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                            <Search className="w-12 h-12 relative text-slate-700" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-400">Ready for Intelligence Query</p>
                            <p className="text-[11px] px-8 opacity-60">Enter a target name, identifier, or digital trace to begin scanning cross-border systems.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

import { AlertCircle } from 'lucide-react';
