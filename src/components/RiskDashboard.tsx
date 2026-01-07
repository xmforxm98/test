import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { AlertTriangle, TrendingUp, TrendingDown, Sparkles, Calendar, Filter, Shield } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ArrowRight, AlertCircle, Zap } from 'lucide-react';

export function RiskDashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedCaseType, setSelectedCaseType] = useState('all');
  const [dateRange, setDateRange] = useState('week');
  const [showRecommendations, setShowRecommendations] = useState(false);

  const riskCases = [
    {
      id: 'C-5621',
      title: 'Multi-State Drug Trafficking',
      riskScore: 95,
      reason: 'Pending Tasks / SLA Breaches / Evidence Gaps',
      department: 'Narcotics',
      type: 'Drug Crime',
      factors: ['5 overdue tasks', 'SLA breach: 3 days', 'Missing forensic report', 'Witness unavailable'],
      primaryRiskDriver: 'Forensic backlog (72% confidence)',
      recommendedAction: 'Approve temporary forensic resource reallocation'
    },
    {
      id: 'C-4892',
      title: 'Corporate Embezzlement Case',
      riskScore: 87,
      reason: 'Evidence Gaps / Delayed Forensic Analysis',
      department: 'Economic Offenses',
      type: 'Financial Crime',
      factors: ['Awaiting audit results', '2 key witnesses uncontacted', 'Digital forensics delayed'],
      primaryRiskDriver: 'External audit dependency (81% confidence)',
      recommendedAction: 'Escalate audit request to Finance Division head'
    },
    {
      id: 'C-5103',
      title: 'Identity Theft Ring',
      riskScore: 78,
      reason: 'SLA Breaches / Pending Tasks',
      department: 'Cyber Crime',
      type: 'Cyber Crime',
      factors: ['SLA breach: 2 days', '3 pending interviews', 'Cross-jurisdiction coordination needed'],
      primaryRiskDriver: 'Cross-jurisdiction coordination delays (68% confidence)',
      recommendedAction: 'Authorize direct outreach to District 3 supervisor'
    },
    {
      id: 'C-4721',
      title: 'Armed Robbery Investigation',
      riskScore: 72,
      reason: 'Delayed Forensic Analysis',
      department: 'Violent Crime',
      type: 'Robbery',
      factors: ['Ballistics report pending', 'Video enhancement in progress', '1 suspect not located'],
      primaryRiskDriver: 'Ballistics lab capacity constraint (76% confidence)',
      recommendedAction: 'Consider external lab partnership for expedited analysis'
    }
  ];

  const caseLoadData = [
    { month: 'Jun', cases: 45, sla: 38 },
    { month: 'Jul', cases: 52, sla: 44 },
    { month: 'Aug', cases: 48, sla: 41 },
    { month: 'Sep', cases: 61, sla: 49 },
    { month: 'Oct', cases: 58, sla: 47 }
  ];

  const performanceData = [
    { month: 'Jun', predicted: 85, actual: 82 },
    { month: 'Jul', predicted: 83, actual: 79 },
    { month: 'Aug', predicted: 87, actual: 85 },
    { month: 'Sep', predicted: 81, actual: 76 },
    { month: 'Oct', predicted: 84, actual: 81 }
  ];

  const getRiskColor = (score: number) => {
    if (score >= 90) return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
    if (score >= 75) return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' };
    return { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/30' };
  };

  return (
    <div className="space-y-6">
      {/* Command Summary - Executive Brief */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="w-7 h-7 text-blue-400" />
          <h1 className="text-white">Command Summary</h1>
        </div>

        {/* AI-Generated Executive Brief */}
        <Card className="bg-gradient-to-br from-cyan-950/30 via-slate-900/50 to-slate-950/30 border-cyan-500/30 shadow-lg shadow-cyan-500/5">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-cyan-100 leading-relaxed">
                  This week, <span className="text-cyan-300">6 cases across 3 departments</span> show elevated risk. 
                  <span className="text-orange-300"> Delayed forensic analysis</span> and <span className="text-orange-300">SLA breaches</span> are the primary contributors. 
                  Without intervention, <span className="text-red-300">2 cases are likely to escalate</span>.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters Bar */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="text-slate-300 text-sm">Department</label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="narcotics">Narcotics</SelectItem>
                  <SelectItem value="economic">Economic Offenses</SelectItem>
                  <SelectItem value="cyber">Cyber Crime</SelectItem>
                  <SelectItem value="violent">Violent Crime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="text-slate-300 text-sm">Case Type</label>
              <Select value={selectedCaseType} onValueChange={setSelectedCaseType}>
                <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="financial">Financial Crime</SelectItem>
                  <SelectItem value="cyber">Cyber Crime</SelectItem>
                  <SelectItem value="drug">Drug Crime</SelectItem>
                  <SelectItem value="violent">Violent Crime</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px] space-y-2">
              <label className="text-slate-300 text-sm">Date Range</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="bg-blue-600 hover:bg-blue-700">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* High Risk Cases Section */}
        <div className="lg:col-span-3 space-y-6">
          {/* Risk Case Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskCases.map((case_) => {
              const colors = getRiskColor(case_.riskScore);
              return (
                <TooltipProvider key={case_.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-slate-400 text-sm">{case_.id}</span>
                                <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                  {case_.department}
                                </Badge>
                              </div>
                              <CardTitle className="text-white text-base">{case_.title}</CardTitle>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <Badge className={`${colors.bg} ${colors.text} ${colors.border}`}>
                                {case_.riskScore}%
                              </Badge>
                              <AlertTriangle className={`w-5 h-5 ${colors.text}`} />
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          {/* Primary Risk Driver */}
                          <div className="pb-3 border-b border-slate-700/50">
                            <p className="text-xs text-slate-500 mb-1">Primary Risk Driver</p>
                            <p className="text-orange-300 text-sm">{case_.primaryRiskDriver}</p>
                          </div>

                          {/* Recommended Leadership Action */}
                          <div>
                            <p className="text-xs text-slate-500 mb-1.5">Suggested Action</p>
                            <div className="flex items-start gap-2 p-2.5 bg-blue-950/30 rounded-lg border border-blue-500/30">
                              <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="text-blue-300 text-sm leading-snug">{case_.recommendedAction}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-800 border-slate-700 max-w-xs" side="left">
                      <p className="text-white mb-2">Key Risk Factors (72% probability):</p>
                      <ul className="space-y-1">
                        {case_.factors.map((factor, i) => (
                          <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                            <span className="text-amber-400 mt-0.5">•</span>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">Case Load vs SLA Performance</CardTitle>
                <p className="text-slate-400 text-sm mt-1">Operational strain vs delivery effectiveness</p>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={caseLoadData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Bar dataKey="cases" fill="#3b82f6" name="Total Cases" />
                    <Bar dataKey="sla" fill="#10b981" name="Met SLA" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">Predicted vs Actual Breaches</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                    Prediction accuracy: 87%
                  </Badge>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    Model confidence: High
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="month" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                    <Legend wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="predicted" stroke="#f59e0b" strokeWidth={2} name="Predicted" />
                    <Line type="monotone" dataKey="actual" stroke="#ef4444" strokeWidth={2} name="Actual" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Insights Sidebar */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30 shadow-xl shadow-blue-500/10 sticky top-24">
            <CardHeader>
              <CardTitle className="text-blue-300 flex items-center gap-2 text-base">
                <Sparkles className="w-5 h-5" />
                Decision Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* 1️⃣ Key Risk Drivers (Why things are going wrong) */}
              <div>
                <h4 className="text-white text-sm mb-3">Key Risk Drivers</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-xs">Delayed Forensic Analysis</span>
                      <span className="text-red-400 text-xs">72%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-red-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-xs">SLA Breaches</span>
                      <span className="text-amber-400 text-xs">65%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-xs">Evidence Gaps</span>
                      <span className="text-amber-400 text-xs">58%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '58%' }}></div>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-300 text-xs">Resource Constraints</span>
                      <span className="text-yellow-400 text-xs">42%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5">
                      <div className="bg-yellow-500 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2️⃣ Intervention Scenarios (What happens if...) */}
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-white text-sm mb-3">Intervention Scenarios</h4>
                <div className="p-3 bg-red-950/20 rounded-lg border border-red-500/30">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-red-300 text-xs">If no action is taken:</p>
                  </div>
                  <ul className="space-y-1.5 ml-6">
                    <li className="text-slate-300 text-xs flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>3 cases likely to breach SLA within 7 days</span>
                    </li>
                    <li className="text-slate-300 text-xs flex items-start gap-2">
                      <span className="text-red-400 mt-0.5">•</span>
                      <span>Avg resolution time may increase by 2.1 days</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* 3️⃣ Recommended Leadership Actions */}
              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-white text-sm mb-3">Recommended Leadership Actions</h4>
                <div className="space-y-3">
                  {/* Action 1: Approve overtime for forensics */}
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-blue-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-blue-200 text-sm flex-1">Approve overtime for forensics</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs ml-2">
                        High confidence
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-300 text-xs">Impact: Reduce backlog by 40% in 5 days</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs h-7 border-blue-500/50 text-blue-300 hover:bg-blue-950/50"
                    >
                      Simulate Impact
                    </Button>
                  </div>

                  {/* Action 2: Temporarily reassign investigators */}
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-blue-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-blue-200 text-sm flex-1">Temporarily reassign investigators</p>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs ml-2">
                        High confidence
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-300 text-xs">Impact: Balance capacity, reduce SLA risk 35%</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs h-7 border-blue-500/50 text-blue-300 hover:bg-blue-950/50"
                    >
                      Simulate Impact
                    </Button>
                  </div>

                  {/* Action 3: Escalate to inter-department task force */}
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-blue-500/30">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-blue-200 text-sm flex-1">Escalate 2 cases to inter-department task force</p>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs ml-2">
                        Med confidence
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span className="text-amber-300 text-xs">Impact: Accelerate resolution by 3-4 days</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full text-xs h-7 border-blue-500/50 text-blue-300 hover:bg-blue-950/50"
                    >
                      Simulate Impact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Recommendations Modal */}
      <Dialog open={showRecommendations} onOpenChange={setShowRecommendations}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Sparkles className="w-6 h-6 text-blue-400" />
              AI Recommendation Summary
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              AI-generated recommendations to mitigate risks and improve case outcomes
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <Card className="bg-slate-950/50 border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-base text-blue-300">Priority Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-red-950/30 rounded-lg border border-red-500/30">
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 mt-0.5">Urgent</Badge>
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">Expedite forensic analysis for Case C-5621</p>
                    <p className="text-slate-400 text-xs">SLA breach imminent in 8 hours. Recommend reassigning to available analyst.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-amber-950/30 rounded-lg border border-amber-500/30">
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mt-0.5">High</Badge>
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">Schedule witness interviews for Cases C-4892, C-5103</p>
                    <p className="text-slate-400 text-xs">Prevents further delays. Auto-suggest available time slots to witnesses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-950/30 rounded-lg border border-blue-500/30">
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 mt-0.5">Medium</Badge>
                  <div className="flex-1">
                    <p className="text-white text-sm mb-1">Request additional resources for Narcotics department</p>
                    <p className="text-slate-400 text-xs">Department at 140% capacity. Consider temporary reassignment from Violent Crime (85% capacity).</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-950/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-base text-white">Mitigation Strategies</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Implement automated reminders 48h before SLA deadlines
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Create task dependency alerts to prevent bottlenecks
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 mt-0.5">•</span>
                    Enable cross-department resource sharing for high-risk cases
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}