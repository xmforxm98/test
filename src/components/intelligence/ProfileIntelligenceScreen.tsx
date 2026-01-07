import { Button } from '../ui/button';
import { ArrowLeft, Download, Share2, Flag, AlertTriangle } from 'lucide-react';
import { UnifiedProfileView } from './UnifiedProfileView';

interface ProfileIntelligenceScreenProps {
  searchQuery: string;
  searchResults: any[];
  onBack: () => void;
}

export function ProfileIntelligenceScreen({ searchQuery, searchResults, onBack }: ProfileIntelligenceScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header with Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onBack}
              variant="ghost"
              className="text-slate-400 hover:text-white hover:bg-slate-800/50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Search
            </Button>
            <div className="h-6 w-px bg-slate-800"></div>
            <div>
              <h1 className="text-white text-xl">Intelligence Profile</h1>
              <p className="text-xs text-slate-500">Comprehensive analysis for: {searchQuery}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share Report
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-300 hover:bg-slate-800/50 hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Flag className="w-4 h-4 mr-2" />
              Flag for Review
            </Button>
          </div>
        </div>

        {/* Alert Banner if high risk */}
        <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-white text-sm mb-1">High-Risk Profile Detected</h3>
              <p className="text-xs text-slate-400">This profile has been flagged with 6 anomalies including impossible travel, darknet mentions, and suspicious financial activity patterns. Recommend escalation to fraud investigation unit.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded text-xs text-red-400">
                Risk Score: 87/100
              </span>
            </div>
          </div>
        </div>

        {/* Main Unified Profile Content */}
        <UnifiedProfileView searchResults={searchResults} />
      </div>
    </div>
  );
}
