import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Network, User, Phone, MapPin, Building } from 'lucide-react';

export function LinkAnalysisScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-white uppercase tracking-wider text-sm mb-2">Link Analysis</h1>
            <p className="text-xs text-slate-500">Visualize connections between entities</p>
          </div>
          <Button 
            variant="outline"
            className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
          >
            Generate New Analysis
          </Button>
        </div>

        {/* Canvas Area */}
        <Card className="bg-slate-900/30 border-slate-800">
          <CardContent className="p-8">
            <div className="aspect-video rounded border border-slate-700 border-dashed flex items-center justify-center bg-slate-950/50">
              <div className="text-center">
                <Network className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-500">Network visualization canvas</p>
                <p className="text-xs text-slate-600 mt-1">Select entities to begin analysis</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Entity Selection */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Primary Entities</p>
            
            <Card className="bg-slate-900/30 border-slate-800 hover:border-blue-800/50 transition-colors cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-blue-400" />
                  <div>
                    <p className="text-sm text-white">Robert Martinez</p>
                    <p className="text-xs text-slate-500">Suspect #1</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-slate-800 hover:border-blue-800/50 transition-colors cursor-pointer">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Building className="w-4 h-4 text-amber-400" />
                  <div>
                    <p className="text-sm text-white">Omega Corp LLC</p>
                    <p className="text-xs text-slate-500">Entity of Interest</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Connected Entities</p>
            
            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-cyan-400" />
                  <div>
                    <p className="text-sm text-white">+1 (555) 0142-8901</p>
                    <p className="text-xs text-slate-500">Linked Phone</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/30 border-slate-800">
              <CardContent className="p-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-sm text-white">1247 Harbor Blvd</p>
                    <p className="text-xs text-slate-500">Known Address</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
