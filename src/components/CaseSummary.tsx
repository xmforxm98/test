import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Sparkles, RefreshCw, Clock, MessageCircle, CheckCircle } from 'lucide-react';
import { Textarea } from './ui/textarea';
import { CompactEvidenceLinkGraph } from './CompactEvidenceLinkGraph';

interface CaseSummaryProps {
  onFinalize?: () => void;
  status?: string;
}

export function CaseSummary({ onFinalize, status = 'Active' }: CaseSummaryProps) {
  const [summaryType, setSummaryType] = useState('brief');
  const [showChat, setShowChat] = useState(false);
  const [regenerateOption, setRegenerateOption] = useState('');

  const handleRegenerate = () => {
    // Mock regeneration logic
    console.log('Regenerating with option:', regenerateOption);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Case View */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-900/50 border-slate-800 shadow-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-white">Case 4521 - Cyber Fraud Investigation</CardTitle>
                <p className="text-slate-400 text-sm mt-1">Created: Oct 15, 2025 • Status: <span className={status === 'Closed' ? 'text-red-400' : 'text-green-400'}>{status}</span></p>
              </div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                Medium Priority
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Case Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Department</p>
                <p className="text-white mt-1">Cyber Crime</p>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Lead Investigator</p>
                <p className="text-white mt-1">Det. Sarah Mitchell</p>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Case Type</p>
                <p className="text-white mt-1">Financial Crime</p>
              </div>
              <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                <p className="text-slate-400 text-sm">Opened</p>
                <p className="text-white mt-1">15 days ago</p>
              </div>
            </div>

            {/* Original Description */}
            <div className="p-4 bg-slate-950/50 rounded-lg border border-slate-700">
              <h3 className="text-white mb-2">Case Description</h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Multiple accounts were used for unauthorized transfers across two banks. 3 suspects identified.
                Awaiting financial report from CID. Investigation involves tracking digital footprints, analyzing
                transaction patterns, and coordinating with financial institutions.
              </p>
            </div>

            {/* Optional Chat Feature */}
            {showChat && (
              <Card className="bg-blue-950/20 border-blue-500/30">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3 p-3 bg-slate-950/50 rounded-lg mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-blue-300 text-sm">
                        "Hey! New evidence was added. Would you like me to refresh the summary?"
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-blue-500/30 text-blue-400">
                      Yes, refresh
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400">
                      Not now
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Button
              onClick={() => setShowChat(!showChat)}
              variant="outline"
              size="sm"
              className="border-slate-700 text-slate-400"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {showChat ? 'Hide' : 'Show'} AI Chat
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - AI-Generated Summaries */}
      <div className="lg:col-span-1">
        <Card className="bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30 shadow-xl shadow-blue-500/10 sticky top-24">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2 text-lg">
              <Sparkles className="w-5 h-5" />
              AI-Generated Summary
            </CardTitle>
            <div className="flex items-center gap-2 text-xs text-slate-400 mt-2">
              <Clock className="w-3 h-3" />
              Generated 5 mins ago
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Toggle for Summary Type */}
            <Tabs value={summaryType} onValueChange={setSummaryType} className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-950/50">
                <TabsTrigger value="brief" className="text-xs text-slate-300 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  Brief
                </TabsTrigger>
                <TabsTrigger value="detailed" className="text-xs text-slate-300 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  Detailed
                </TabsTrigger>
                <TabsTrigger value="analytical" className="text-xs text-slate-300 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
                  Analytical
                </TabsTrigger>
              </TabsList>

              <TabsContent value="brief" className="mt-4 space-y-4">
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                  <h4 className="text-white text-sm mb-2">Overview</h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    Cyber fraud case involving unauthorized bank transfers across multiple accounts.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="detailed" className="mt-4 space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <h4 className="text-white text-sm mb-2">Overview</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Complex cyber fraud investigation targeting financial institutions. Multiple unauthorized
                      transfers detected across two major banks with coordinated suspect activity.
                    </p>
                  </div>

                  {/* Compact Evidence Link Graph */}
                  <CompactEvidenceLinkGraph />

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <h4 className="text-white text-sm mb-2">Key Entities</h4>
                    <div className="space-y-2">
                      <div>
                        <p className="text-slate-400 text-xs">People</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            Ali Hussain
                          </Badge>
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            John Chen
                          </Badge>
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">
                            Maria Garcia
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Locations</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                            First National Bank
                          </Badge>
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">
                            Global Trust Bank
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-xs">Organizations</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">
                            CID Financial Crimes
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <h4 className="text-white text-sm mb-2">Evidence Summary</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">📄</span>
                        Bank statements (23 documents)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">🔗</span>
                        Transaction logs (Database dump)
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-400 mt-0.5">📧</span>
                        Email correspondence (15 threads)
                      </li>
                    </ul>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <h4 className="text-white text-sm mb-2">Pending Actions</h4>
                    <ul className="space-y-1 text-xs text-slate-300">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">⏳</span>
                        Forensic analysis of digital devices
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">⏳</span>
                        Interview remaining suspects
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-400 mt-0.5">⏳</span>
                        Subpoena additional bank records
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytical" className="mt-4 space-y-4">
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <h4 className="text-white text-sm mb-2">Pattern Analysis</h4>
                    <p className="text-slate-300 text-xs leading-relaxed mb-2">
                      Transaction patterns suggest coordinated activity with transfers occurring in
                      clustered timeframes across multiple accounts.
                    </p>
                    <div className="flex items-center gap-2 p-2 bg-red-950/30 rounded border border-red-500/30">
                      <Badge className="bg-red-500/20 text-red-400 text-xs">High Risk</Badge>
                      <span className="text-xs text-red-300">Potential money laundering indicators</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <h4 className="text-white text-sm mb-2">Connection Analysis</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      All three suspects share common IP addresses and device fingerprints. Strong evidence
                      of collaboration detected through network analysis.
                    </p>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <h4 className="text-white text-sm mb-2">Predictive Insights</h4>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Based on similar cases, expect additional accounts to be discovered. Recommend expanding
                      investigation to related financial institutions within 50-mile radius.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            {/* Regenerate Controls */}
            <div className="pt-4 border-t border-slate-700 space-y-3">
              <div className="space-y-2">
                <label className="text-slate-300 text-xs">Regenerate Options</label>
                <Select value={regenerateOption} onValueChange={setRegenerateOption}>
                  <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white text-xs">
                    <SelectValue placeholder="Select option..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="new-evidence">Include new evidence</SelectItem>
                    <SelectItem value="exclude-closed">Exclude closed tasks</SelectItem>
                    <SelectItem value="focus-suspects">Focus on suspects</SelectItem>
                    <SelectItem value="timeline">Emphasize timeline</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleRegenerate}
                disabled={!regenerateOption}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs"
                size="sm"
              >
                <RefreshCw className="w-3 h-3 mr-2" />
                Regenerate Summary
              </Button>
            </div>

            {/* Visual Tags */}
            <div className="pt-4 border-t border-slate-700">
              <h4 className="text-slate-300 text-xs mb-2">Urgency Indicators</h4>
              <div className="flex gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                  Low Risk
                </Badge>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                  Medium Urgency
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Finalize Button - Full Width at Bottom */}
      {onFinalize && status !== 'Closed' && (
        <div className="lg:col-span-3 flex justify-end pt-4 border-t border-slate-700">
          <Button
            onClick={onFinalize}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-500/20"
            size="lg"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Finalize and Submit
          </Button>
        </div>
      )}
    </div>
  );
}
