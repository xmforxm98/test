import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Search, X, Plus, Sparkles, Brain, ArrowRight, Database, Network, FileText, Users, MapPin, Calendar, TrendingUp, AlertTriangle, Filter, SlidersHorizontal } from 'lucide-react';
import { KeywordSearchDashboard } from './KeywordSearchDashboard';

export function KeywordSearchScreen() {
  const [keywords, setKeywords] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [searchExecuted, setSearchExecuted] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleAddKeyword = () => {
    if (currentInput.trim() && !keywords.includes(currentInput.trim())) {
      setKeywords([...keywords, currentInput.trim()]);
      setCurrentInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter(k => k !== keyword));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddKeyword();
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

  const handleClearSearch = () => {
    setSearchExecuted(false);
    setKeywords([]);
    setCurrentInput('');
  };

  if (searchExecuted) {
    return <KeywordSearchDashboard keywords={keywords} onNewSearch={handleClearSearch} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-8">
      <Card className="bg-gradient-to-br from-slate-900/90 to-purple-950/30 border-purple-500/30 max-w-3xl w-full">
        <CardHeader className="text-center pb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/20">
            <Search className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-white text-3xl mb-3">
            Keyword Intelligence Search
          </CardTitle>
          <CardDescription className="text-slate-300 text-lg">
            Search across all databases using single or multiple keywords
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Keyword Input */}
          <div className="space-y-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter keyword (e.g., suspect name, location, vehicle...)"
                  className="bg-slate-950/80 border-2 border-purple-500/30 text-white placeholder:text-slate-500 h-12 pr-10 focus:border-purple-500"
                />
                {currentInput && (
                  <button
                    onClick={() => setCurrentInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button
                onClick={handleAddKeyword}
                disabled={!currentInput.trim()}
                className="bg-purple-600 hover:bg-purple-700 h-12 px-6"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add
              </Button>
            </div>

            {/* Keywords Display */}
            {keywords.length > 0 && (
              <div className="bg-purple-950/20 border border-purple-800/30 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-purple-300 text-sm flex items-center gap-2">
                    <Database className="w-4 h-4" />
                    Active Keywords ({keywords.length})
                  </span>
                  <button
                    onClick={() => setKeywords([])}
                    className="text-slate-400 hover:text-white text-xs"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 bg-purple-500/20 border border-purple-500/30 rounded-lg px-3 py-2"
                    >
                      <span className="text-purple-300">{keyword}</span>
                      <button
                        onClick={() => handleRemoveKeyword(keyword)}
                        className="text-purple-400 hover:text-purple-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Info */}
          <div className="bg-blue-950/30 border border-blue-800/30 rounded-xl p-6">
            <h4 className="text-blue-300 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Search Capabilities
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Database className="w-4 h-4 text-blue-400" />
                <span>Cross-database search</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Network className="w-4 h-4 text-blue-400" />
                <span>Pattern detection</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Document matching</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <Users className="w-4 h-4 text-blue-400" />
                <span>Entity relationships</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span>Location intelligence</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300 text-sm">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <span>Trend analysis</span>
              </div>
            </div>
          </div>

          {/* Search Sources */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-center">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2">
                <Database className="w-5 h-5 text-cyan-400" />
              </div>
              <p className="text-white text-sm mb-1">Criminal Records</p>
              <p className="text-slate-400 text-xs">2.4M records</p>
            </div>
            <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-center">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
                <FileText className="w-5 h-5 text-purple-400" />
              </div>
              <p className="text-white text-sm mb-1">Case Files</p>
              <p className="text-slate-400 text-xs">850K cases</p>
            </div>
            <div className="bg-slate-950/50 border border-slate-700 rounded-lg p-3 text-center">
              <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center mx-auto mb-2">
                <Network className="w-5 h-5 text-orange-400" />
              </div>
              <p className="text-white text-sm mb-1">Intelligence</p>
              <p className="text-slate-400 text-xs">1.8M entries</p>
            </div>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            disabled={keywords.length === 0 || isSearching}
            className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 disabled:opacity-50"
          >
            {isSearching ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                Searching Intelligence...
              </>
            ) : (
              <>
                <Search className="w-6 h-6 mr-3" />
                Execute Keyword Search
                <ArrowRight className="w-6 h-6 ml-3" />
              </>
            )}
          </Button>

          {/* Tips */}
          <div className="pt-4 border-t border-slate-700">
            <p className="text-slate-400 text-sm mb-2">💡 Search Tips:</p>
            <ul className="space-y-1 text-slate-500 text-xs">
              <li>• Use multiple keywords for more precise results</li>
              <li>• Keywords are searched across all connected databases</li>
              <li>• AI will identify patterns and connections automatically</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
