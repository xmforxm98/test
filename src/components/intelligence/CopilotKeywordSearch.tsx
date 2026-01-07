import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import {
    Search, Plus, X, ArrowRight, Database, Brain, Sparkles,
    Shield, Zap, Radio, Globe, TrendingUp, AlertCircle
} from 'lucide-react';

export function CopilotKeywordSearch() {
    const [keywords, setKeywords] = useState<string[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [searchExecuted, setSearchExecuted] = useState(false);

    const handleAddKeyword = () => {
        if (currentInput.trim() && !keywords.includes(currentInput.trim())) {
            setKeywords([...keywords, currentInput.trim()]);
            setCurrentInput('');
        }
    };

    const handleSearch = async () => {
        if (keywords.length === 0) return;

        setIsSearching(true);
        // Simulate search processing
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSearching(false);
        setSearchExecuted(true);
    };

    const handleClear = () => {
        setKeywords([]);
        setSearchExecuted(false);
    };

    return (
        <div className="h-full flex flex-col p-4 space-y-4">
            {/* Header Area */}
            <div className="space-y-4">
                <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-purple-400" />
                    <h3 className="text-white text-sm font-semibold uppercase tracking-wider">Semantic Keyword Intel</h3>
                </div>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Plus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <input
                            type="text"
                            value={currentInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentInput(e.target.value)}
                            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAddKeyword()}
                            placeholder="Add semantic keyword..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/20 transition-all"
                        />
                    </div>
                    <Button
                        size="icon"
                        className="bg-purple-600 hover:bg-purple-700 w-11 h-11 shrink-0 shadow-lg shadow-purple-600/20"
                        onClick={handleAddKeyword}
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>

                {/* Keywords Display */}
                {keywords.length > 0 && (
                    <div className="flex flex-wrap gap-2 p-3 bg-slate-900/30 border border-slate-800 rounded-xl">
                        {keywords.map((keyword, index) => (
                            <div key={index} className="flex items-center gap-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full px-3 py-1 group hover:border-purple-500/40 transition-colors">
                                <span className="text-[11px] text-purple-300 font-medium max-w-[120px] truncate">{keyword}</span>
                                <button onClick={() => setKeywords(keywords.filter(k => k !== keyword))} className="text-purple-400 hover:text-white transition-colors">
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ))}
                        <button onClick={handleClear} className="text-[10px] text-slate-500 hover:text-white underline px-1">
                            Clear all
                        </button>
                    </div>
                )}
            </div>

            {/* Info Cards or Results */}
            <div className="flex-1 overflow-y-auto min-h-0 space-y-4 pr-1 custom-scrollbar">
                {!searchExecuted ? (
                    <>
                        {/* Capabilities Info */}
                        <div className="bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-indigo-500/20 rounded-xl p-4 space-y-3">
                            <div className="flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-indigo-400" />
                                <span className="text-white text-[11px] font-bold uppercase tracking-tight">System Capabilities</span>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2">
                                    <Zap className="w-3 h-3 text-indigo-400 mt-0.5" />
                                    <p className="text-[10px] text-slate-400 leading-relaxed">
                                        Cross-correlation analysis handles phonetically similar names and aliases automatically.
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <Shield className="w-3 h-3 text-indigo-400 mt-0.5" />
                                    <p className="text-[10px] text-slate-400 leading-relaxed">
                                        Deep-web crawling capability for non-indexed forum and marketplace activity.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Connected Resources */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex flex-col items-center justify-center text-center gap-2 group hover:border-blue-500/30 transition-all">
                                <Database className="w-5 h-5 text-blue-400" />
                                <span className="text-[10px] text-slate-300 font-medium whitespace-nowrap">Central Registry</span>
                                <span className="text-[8px] text-slate-500 font-bold uppercase">Connected</span>
                            </div>
                            <div className="bg-slate-900/50 border border-slate-800 p-3 rounded-xl flex flex-col items-center justify-center text-center gap-2 group hover:border-purple-500/30 transition-all">
                                <Radio className="w-5 h-5 text-purple-400" />
                                <span className="text-[10px] text-slate-300 font-medium whitespace-nowrap">Digital Signals</span>
                                <span className="text-[8px] text-slate-500 font-bold uppercase">Active Scan</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-4 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <Brain className="w-12 h-12" />
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                <span className="text-white text-xs font-bold uppercase tracking-wider">AI Intelligence Summary</span>
                            </div>
                            <p className="text-xs text-blue-100 leading-relaxed">
                                Identified <span className="text-white font-bold underline decoration-blue-500/50">12 high-priority associations</span> linked to <span className="inline-flex gap-1">
                                    {keywords.map((k, i) => (
                                        <span key={i} className="text-blue-300 font-mono">"{k}"{i < keywords.length - 1 ? ',' : ''}</span>
                                    ))}
                                </span> across GCC and European jurisdictions.
                            </p>
                            <div className="mt-4 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center">
                                            <span className="text-[8px] text-slate-300">#{i}</span>
                                        </div>
                                    ))}
                                </div>
                                <span className="text-[10px] text-blue-400 font-medium">3 active files found</span>
                            </div>
                        </div>

                        {/* Result cards with detail */}
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="bg-slate-900/40 border-slate-800/80 hover:border-purple-500/30 transition-all group overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="flex">
                                        <div className="w-1 bg-purple-500/20 group-hover:bg-purple-500 transition-colors" />
                                        <div className="p-3 flex-1">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <p className="text-white text-xs font-bold uppercase tracking-tight group-hover:text-purple-400 transition-colors">Intelligence Report #{4500 + i}</p>
                                                    <div className="flex items-center gap-1.5 mt-0.5">
                                                        <span className="text-[9px] text-slate-500">Matched:</span>
                                                        <span className="text-[9px] text-purple-400 bg-purple-500/10 px-1.5 py-0 rounded border border-purple-500/20">{keywords[0]}</span>
                                                    </div>
                                                </div>
                                                <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20 text-[9px] px-1.5 py-0 uppercase font-bold shrink-0">High Conf.</Badge>
                                            </div>
                                            <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2 italic">
                                                Subject exhibits patterns consistent with previously identified risk profiles in Project Raven.
                                            </p>
                                            <div className="mt-3 flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-3 h-3 text-slate-600" />
                                                    <span className="text-[9px] text-slate-600 uppercase">Interpol Database</span>
                                                </div>
                                                <ArrowRight className="w-3 h-3 text-slate-700 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <Button
                className={`
                    w-full py-6 rounded-xl font-bold uppercase tracking-widest text-xs transition-all
                    ${isSearching
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-xl shadow-purple-600/20 hover:shadow-purple-600/40'
                    }
                `}
                disabled={keywords.length === 0 || isSearching}
                onClick={handleSearch}
            >
                {isSearching ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-slate-500 border-t-purple-400 rounded-full animate-spin" />
                        <span>Running AI Neural Analysis...</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        <span>Initiate Semantic Search</span>
                    </div>
                )}
            </Button>
        </div>
    );
}
