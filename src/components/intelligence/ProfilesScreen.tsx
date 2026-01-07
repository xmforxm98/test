import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Search, User, Shield, AlertTriangle } from 'lucide-react';

export function ProfilesScreen() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-white uppercase tracking-wider text-sm mb-2">Profiles</h1>
          <p className="text-xs text-slate-500">Person and entity profiles database</p>
        </div>

        {/* Search */}
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              placeholder="Search profiles..."
              className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20 h-11"
            />
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Search
          </Button>
        </div>

        {/* Profile List */}
        <div className="space-y-3">
          <p className="text-xs text-slate-500 uppercase tracking-wide">High-Priority Profiles</p>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white">Robert Martinez</p>
                      <span className="px-2 py-0.5 rounded text-xs bg-red-900/30 text-red-400 border border-red-800/50">
                        High Risk
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">ID: POI-2847 • Age: 34 • Location: Downtown</p>
                    <p className="text-xs text-slate-400">Linked to 3 active cases, 7 known associates</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white">Sarah Chen</p>
                      <span className="px-2 py-0.5 rounded text-xs bg-amber-900/30 text-amber-400 border border-amber-800/50">
                        Monitored
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">ID: POI-1923 • Age: 29 • Location: Harbor District</p>
                    <p className="text-xs text-slate-400">Linked to 1 active case, 4 known associates</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/30 border-slate-800 hover:border-slate-700 transition-colors cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded bg-slate-800 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-slate-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm text-white">Omega Corp LLC</p>
                      <span className="px-2 py-0.5 rounded text-xs bg-blue-900/30 text-blue-400 border border-blue-800/50">
                        Entity
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mb-2">ID: ENT-5621 • Type: Corporation • Status: Under Investigation</p>
                    <p className="text-xs text-slate-400">Linked to 2 active cases, 12 known connections</p>
                  </div>
                </div>
                <Button 
                  size="sm"
                  variant="outline"
                  className="bg-transparent border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
