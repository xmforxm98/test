import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Progress } from './ui/progress';
import { BorderCrossingWidget } from './BorderCrossingWidget';
import { HotelStayWidget } from './HotelStayWidget';
import { RelatedEventsWidget } from './RelatedEventsWidget';
import { 
  ArrowLeft, 
  AlertTriangle, 
  Brain, 
  UserPlus, 
  GitCompare, 
  Map, 
  Target,
  FileText,
  User,
  MapPin,
  DollarSign,
  TrendingUp,
  Shield,
  AlertCircle,
  CheckCircle,
  XCircle,
  Users,
  Building2,
  Plane,
  CreditCard,
  Activity,
  Globe,
  Network,
  ArrowUpRight,
  ArrowDownLeft,
  Scale,
  Car,
  CarFront,
  Hotel,
  Flag,
  AlertOctagon,
  Key,
  BanknoteIcon
} from 'lucide-react';

interface PersonProfileProps {
  entityData: any;
  onBack: () => void;
}

export function PersonProfile({ entityData, onBack }: PersonProfileProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for the profile
  const profileData = {
    name: entityData.name || 'Ali Hussain',
    aliases: ['A.K.', 'Ghost', 'AH-47'],
    dateOfBirth: 'Oct 1989',
    currentStatus: 'Free, Under Surveillance',
    tags: ['Vehicle Theft', 'Repeat Offender', 'MO'],
    riskLevel: 'High',
    aiConfidence: 92,
    linkedCases: [
      { id: '#54', type: 'Vehicle Theft', date: 'Mar 2019', status: 'Active', count: 5 },
      { id: '#48', type: 'Prior arrest in same area', date: 'Jun 2020', status: 'Closed' },
      { id: '#42', type: 'Accomplice', date: 'Dec 2021', status: 'Review' }
    ],
    intelligence: {
      blacklisted: false,
      pepStatus: false,
      firRegistered: false,
      highRiskNationality: false,
      highRiskCountryTraveled: true,
      unusualCharity: false,
      multiAccountRisk: true,
      lowActivity: false,
      highCashWithdraw: true
    },
    transactions: {
      monthlySpent: '25,000 AED',
      monthlyReceived: '15,000 AED',
      totalVolume: '1.2M'
    }
  };

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const IntelligenceStatusBadge = ({ label, status }: { label: string; status: boolean }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-800">
      <div className="flex items-center gap-2">
        {status ? (
          <AlertCircle className="w-4 h-4 text-red-400" />
        ) : (
          <CheckCircle className="w-4 h-4 text-green-400" />
        )}
        <span className="text-slate-300 text-sm">{label}</span>
      </div>
      <span className={`text-xs ${status ? 'text-red-400' : 'text-green-400'}`}>
        {status ? 'Yes' : 'No'}
      </span>
    </div>
  );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-3">
      {/* Header with Tabs */}
      <div className="flex items-center gap-4">
        <Button
          onClick={onBack}
          variant="ghost"
          className="text-slate-400 hover:text-slate-100 hover:bg-slate-800"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        <TabsList className="inline-flex h-11 items-center justify-start rounded-lg bg-slate-900/50 p-1 border border-slate-800 flex-1">
          <TabsTrigger 
            value="overview"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-blue-500/30"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="govt"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-blue-500/30"
          >
            Govt
          </TabsTrigger>
          <TabsTrigger 
            value="transactions"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-blue-500/30"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="tracking"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-blue-500/30"
          >
            Link Analysis
          </TabsTrigger>
          <TabsTrigger 
            value="map"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-4 py-2 transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm data-[state=active]:border data-[state=active]:border-blue-500/30"
          >
            Map
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Tab Content */}
      <TabsContent value="overview" className="mt-3">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column - Profile Card */}
          <div className="col-span-3 space-y-3">
          {/* Profile Photo & Name */}
          <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center py-6">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-cyan-600 text-white text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="p-3 text-center border-t border-slate-800">
                <h3 className="text-white">{profileData.name.toUpperCase()}</h3>
              </div>
            </CardContent>
          </Card>

          {/* Basic Info */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-4 space-y-3">
              <div>
                <label className="text-slate-400 text-sm">Date of Birth</label>
                <div className="mt-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                  <p className="text-white">{profileData.dateOfBirth}</p>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm">Aliases</label>
                <div className="mt-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                  <p className="text-white">{profileData.aliases.join(', ')}</p>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm">Current Status</label>
                <div className="mt-1 px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700">
                  <p className="text-white">{profileData.currentStatus}</p>
                </div>
              </div>

              <div>
                <label className="text-slate-400 text-sm">Tags</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {profileData.tags.map((tag, index) => (
                    <Badge key={index} className="bg-slate-800 text-slate-300 border border-slate-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Main Content */}
        <div className="col-span-6 space-y-3">
          {/* AI Summary */}
          <Card className="bg-gradient-to-br from-slate-900/90 to-slate-800/50 border-blue-500/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Brain className="w-5 h-5 text-blue-400" />
                <h3 className="text-white">AI Summary</h3>
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-slate-300 text-sm leading-relaxed">
                  "{profileData.name} is a repeat offender with a strong probability of involvement in the current vehicle theft based on:"
                </p>
                <ul className="list-disc list-inside text-slate-300 text-sm space-y-1 ml-2">
                  <li>CCTV Match at 93.6%: Previously seen vehicle at 5:33 AM</li>
                  <li>Pattern Match with Prior Thefts: Consistent with vehicle model and silent entry methods observed in previous incidents</li>
                  <li>Digital Footprint Correlation: Social media accounts and phone numbers show correlation with known associate</li>
                </ul>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/30">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-xs text-slate-400">Risk Profile</p>
                    <p className="text-white">{profileData.riskLevel}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <Brain className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-xs text-slate-400">AI Confidence Score</p>
                    <p className="text-white">{profileData.aiConfidence}%</p>
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-xs mt-3">
                Recommend elevating to primary suspect and initiating formal inquiry.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Quick Stats */}
        <div className="col-span-3">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <h4 className="text-white mb-4">Quick Stats</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Risk Score</span>
                    <span className="text-red-400">{profileData.aiConfidence}%</span>
                  </div>
                  <Progress value={profileData.aiConfidence} className="h-2" />
                </div>

                <div className="pt-4 border-t border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Total Cases</span>
                    <span className="text-white">{profileData.linkedCases.length}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-400 text-sm">Active Cases</span>
                    <span className="text-red-400">
                      {profileData.linkedCases.filter(c => c.status === 'Active').length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-sm">Closed Cases</span>
                    <span className="text-green-400">
                      {profileData.linkedCases.filter(c => c.status === 'Closed').length}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 mt-4 space-y-4">
          {/* Linked Cases */}
          <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <h4 className="text-white mb-4">Linked Cases</h4>
                  <div className="space-y-3">
                    {profileData.linkedCases.map((linkedCase, index) => (
                      <div 
                        key={index}
                        className="p-4 rounded-lg bg-slate-800/50 border border-slate-700 hover:border-blue-500/50 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg ${
                              linkedCase.status === 'Active' ? 'bg-red-500/20' : 
                              linkedCase.status === 'Closed' ? 'bg-green-500/20' : 'bg-orange-500/20'
                            } flex items-center justify-center`}>
                              <AlertCircle className={`w-5 h-5 ${
                                linkedCase.status === 'Active' ? 'text-red-400' : 
                                linkedCase.status === 'Closed' ? 'text-green-400' : 'text-orange-400'
                              }`} />
                            </div>
                            <div>
                              <p className="text-white">{linkedCase.type}</p>
                              {linkedCase.count && (
                                <p className="text-blue-400 text-sm">{linkedCase.count} confirmed vehicle theft cases</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className={`mb-2 ${
                              linkedCase.status === 'Active' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 
                              linkedCase.status === 'Closed' ? 'bg-green-500/20 text-green-400 border-green-500/30' : 
                              'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            }`}>
                              {linkedCase.status}
                            </Badge>
                            <p className="text-slate-400 text-xs">{linkedCase.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Intelligence & Relationships */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <h4 className="text-white mb-3">Intelligence & Relationships</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <IntelligenceStatusBadge label="Blacklisted" status={profileData.intelligence.blacklisted} />
                    <IntelligenceStatusBadge label="PEP Status" status={profileData.intelligence.pepStatus} />
                    <IntelligenceStatusBadge label="FIR Registered" status={profileData.intelligence.firRegistered} />
                    <IntelligenceStatusBadge label="High Risk Nationality" status={profileData.intelligence.highRiskNationality} />
                    <IntelligenceStatusBadge label="High Risk Country Traveled" status={profileData.intelligence.highRiskCountryTraveled} />
                    <IntelligenceStatusBadge label="Unusual Charity" status={profileData.intelligence.unusualCharity} />
                    <IntelligenceStatusBadge label="Multi-Account Risk" status={profileData.intelligence.multiAccountRisk} />
                    <IntelligenceStatusBadge label="Low Activity Account" status={profileData.intelligence.lowActivity} />
                    <IntelligenceStatusBadge label="High Cash Withdraw" status={profileData.intelligence.highCashWithdraw} />
                  </div>
                </CardContent>
              </Card>

              {/* Risk Event Timeline */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white">Risk Event Timeline</h4>
                    <div className="flex items-center gap-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-red-500"></div>
                        <span className="text-slate-400">STR</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-orange-500"></div>
                        <span className="text-slate-400">Alert</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-green-500"></div>
                        <span className="text-slate-400">Transaction</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-purple-500"></div>
                        <span className="text-slate-400">Investigation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-500"></div>
                        <span className="text-slate-400">Travel</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeline Grid */}
                  <div className="space-y-2">
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'].map((month) => (
                      <div key={month} className="flex items-center gap-3">
                        <span className="text-slate-400 text-xs w-8">{month}</span>
                        <div className="flex-1 grid grid-cols-4 gap-1">
                          {[...Array(4)].map((_, weekIndex) => (
                            <div key={weekIndex} className="h-8 rounded bg-slate-800/50 border border-slate-700 flex items-center justify-center gap-1">
                              {Math.random() > 0.7 && (
                                <div className={`w-2 h-2 rounded ${
                                  Math.random() > 0.5 ? 'bg-red-500' : 
                                  Math.random() > 0.5 ? 'bg-green-500' : 
                                  Math.random() > 0.5 ? 'bg-orange-500' : 'bg-purple-500'
                                }`}></div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-red-400 text-sm">
                      <strong>Critical Pattern Detected:</strong> 5 alerts and 1 STR triggered within 14 days after travel to Nigeria (Feb 8-22). 
                      Feb 9: Travel to Nigeria (7-day business trip). Feb 12-22: Rapid sequence of high-value transactions and alerts. 
                      Feb 25: STR filed citing suspicious pattern correlation with travel.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
      </TabsContent>

      <TabsContent value="govt" className="mt-3">
        <div className="space-y-4">
          {/* Hero Stats Section */}
          <div className="grid grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-red-500/20 via-slate-900/50 to-slate-900/50 border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                    <Scale className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 text-2xl">3</p>
                    <p className="text-slate-400 text-xs">Criminal Cases</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/20 via-slate-900/50 to-slate-900/50 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                    <AlertOctagon className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-orange-400 text-2xl">9</p>
                    <p className="text-slate-400 text-xs">Traffic Incidents</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/20 via-slate-900/50 to-slate-900/50 border-cyan-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                    <Car className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-cyan-400 text-2xl">6</p>
                    <p className="text-slate-400 text-xs">Vehicle Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-500/20 via-slate-900/50 to-slate-900/50 border-blue-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                    <Plane className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-blue-400 text-2xl">13</p>
                    <p className="text-slate-400 text-xs">Travel Records</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 via-slate-900/50 to-slate-900/50 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                    <Brain className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-purple-400 text-2xl">HIGH</p>
                    <p className="text-slate-400 text-xs">Risk Profile</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Travel Intelligence Timeline */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white">Travel Intelligence Timeline</h4>
                    <p className="text-slate-400 text-xs">Border crossings synchronized with hotel stays and vehicle rentals</p>
                  </div>
                </div>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  <Brain className="w-3 h-3 mr-1" />
                  AI Pattern Analysis
                </Badge>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Central Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-green-500"></div>

                {/* Timeline Events */}
                <div className="space-y-6">
                  {/* Feb 2025 Trip */}
                  <div className="relative pl-20">
                    <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-blue-500 border-4 border-slate-900 flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-blue-400">Feb 9, 2025 - Exit to Nigeria 🇳🇬</p>
                          <p className="text-slate-400 text-sm">Dubai International Airport • Air Travel</p>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">High Risk</Badge>
                      </div>
                      <div className="ml-4 border-l-2 border-blue-500/30 pl-4 space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Key className="w-4 h-4 text-purple-400" />
                          <span className="text-slate-300">Rented Nissan Altima - Budget (Feb 10-17)</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Hotel className="w-4 h-4 text-cyan-400" />
                          <span className="text-slate-300">Stayed at multiple locations (7 nights)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowDownLeft className="w-4 h-4 text-green-400" />
                        <p className="text-green-400 text-sm">Feb 16, 2025 - Return Entry to UAE 🇦🇪</p>
                      </div>
                      <div className="mt-3 p-3 bg-red-500/10 border border-red-500/30 rounded">
                        <p className="text-red-400 text-xs">
                          <AlertTriangle className="w-3 h-3 inline mr-1" />
                          AI ALERT: High-value cross-border transactions detected during this trip period
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Jan 2025 Trip */}
                  <div className="relative pl-20">
                    <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-cyan-500 border-4 border-slate-900"></div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <p className="text-cyan-400 mb-2">Jan 15-18, 2025 - Domestic Stay</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Hotel className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300">Burj Al Arab, Dubai (3 nights)</span>
                      </div>
                    </div>
                  </div>

                  {/* Dec 2024 Trip */}
                  <div className="relative pl-20">
                    <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-blue-500 border-4 border-slate-900 flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-orange-400">Dec 20, 2024 - Exit to Pakistan 🇵🇰</p>
                          <p className="text-slate-400 text-sm">Dubai International Airport • Air Travel</p>
                        </div>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">High Risk</Badge>
                      </div>
                      <div className="ml-4 border-l-2 border-orange-500/30 pl-4 space-y-2 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Key className="w-4 h-4 text-purple-400" />
                          <span className="text-slate-300">Rented Toyota Corolla - Hertz (Dec 5-8)</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <ArrowDownLeft className="w-4 h-4 text-green-400" />
                        <p className="text-green-400 text-sm">Dec 28, 2024 - Return Entry to UAE 🇦🇪</p>
                      </div>
                    </div>
                  </div>

                  {/* Nov 2024 */}
                  <div className="relative pl-20">
                    <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-cyan-500 border-4 border-slate-900"></div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <p className="text-cyan-400 mb-2">Nov 22-25, 2024 - Domestic Stay</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Hotel className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-300">Emirates Palace, Abu Dhabi (3 nights)</span>
                      </div>
                    </div>
                  </div>

                  {/* Aug 2024 */}
                  <div className="relative pl-20">
                    <div className="absolute left-5 top-2 w-6 h-6 rounded-full bg-green-500 border-4 border-slate-900 flex items-center justify-center">
                      <ArrowUpRight className="w-3 h-3 text-white" />
                    </div>
                    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <p className="text-green-400">Aug 12, 2024 - Land Crossing to Oman 🇴🇲</p>
                          <p className="text-slate-400 text-sm">Hatta Border • Own Vehicle (DXB-K-1473)</p>
                        </div>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Low Risk</Badge>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <ArrowDownLeft className="w-4 h-4 text-green-400" />
                        <p className="text-green-400 text-sm">Aug 14, 2024 - Return Entry (2-day trip)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column - Criminal & Traffic */}
            <div className="space-y-4">
              {/* Criminal Record Intelligence */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                        <Scale className="w-5 h-5 text-red-400" />
                      </div>
                      <h4 className="text-white">Criminal Record</h4>
                    </div>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      3 Cases • Pattern Detected
                    </Badge>
                  </div>

                  {/* Visual Pattern Indicator */}
                  <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-red-400" />
                      <p className="text-red-400 text-sm">AI Pattern Recognition</p>
                    </div>
                    <p className="text-slate-300 text-sm mb-2">Repeat offense pattern identified:</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-[66%] bg-gradient-to-r from-red-500 to-orange-500"></div>
                      </div>
                      <span className="text-red-400 text-xs">66% similarity</span>
                    </div>
                    <p className="text-slate-400 text-xs mt-2">2 out of 3 cases involve vehicle theft in similar locations</p>
                  </div>

                  {/* Case Timeline */}
                  <div className="space-y-4">
                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-slate-900"></div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-white text-sm">CR-2021-4892</p>
                            <p className="text-red-400 text-xs">Vehicle Theft</p>
                          </div>
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                            Under Review
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-slate-400">
                          <p>• Dec 2021 - Dubai Marina area</p>
                          <p>• Status: Pending court decision</p>
                          <p>• Linked to case CR-2019-2341</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-slate-600 border-2 border-slate-900"></div>
                      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-white text-sm">CR-2020-3456</p>
                            <p className="text-slate-400 text-xs">Prior Arrest - Same Area</p>
                          </div>
                          <Badge className="bg-slate-700 text-slate-300 border-slate-600 text-xs">
                            Closed
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-slate-400">
                          <p>• Jun 2020 - Dubai Marina area</p>
                          <p>• Verdict: 6 months probation (served)</p>
                        </div>
                      </div>
                    </div>

                    <div className="relative pl-6">
                      <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-red-500 border-2 border-slate-900 animate-pulse"></div>
                      <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-white text-sm">CR-2019-2341</p>
                            <p className="text-red-400 text-xs">Vehicle Theft</p>
                          </div>
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                            Active Trial
                          </Badge>
                        </div>
                        <div className="space-y-1 text-xs text-slate-400">
                          <p>• Mar 2019 - Dubai Marina area</p>
                          <p>• Next hearing: Mar 15, 2025</p>
                          <p>• Prosecution witness testimony pending</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driving Profile */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-500/20 border border-orange-500/30 flex items-center justify-center">
                        <AlertOctagon className="w-5 h-5 text-orange-400" />
                      </div>
                      <h4 className="text-white">Driving Profile</h4>
                    </div>
                  </div>

                  {/* Risk Score Gauge */}
                  <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/30">
                    <div className="text-center mb-3">
                      <p className="text-slate-400 text-xs mb-2">Driver Risk Score</p>
                      <div className="relative inline-block">
                        <div className="w-32 h-32 rounded-full border-8 border-slate-800 relative">
                          <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-red-500 border-r-orange-500 border-b-yellow-500" style={{ transform: 'rotate(45deg)' }}></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                              <p className="text-3xl text-orange-400">72</p>
                              <p className="text-xs text-slate-400">/ 100</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-orange-400 text-sm mt-2">High Risk Driver</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="text-center">
                        <p className="text-slate-400">Violations</p>
                        <p className="text-orange-400">7</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-400">Accidents</p>
                        <p className="text-orange-400">2</p>
                      </div>
                      <div className="text-center">
                        <p className="text-slate-400">Outstanding</p>
                        <p className="text-red-400">800 AED</p>
                      </div>
                    </div>
                  </div>

                  {/* Violation Heatmap */}
                  <div className="mb-4">
                    <p className="text-white text-sm mb-3">Violation Pattern (2022-2024)</p>
                    <div className="grid grid-cols-12 gap-1">
                      {Array.from({ length: 36 }).map((_, i) => {
                        const intensity = Math.random();
                        return (
                          <div
                            key={i}
                            className={`h-6 rounded ${
                              intensity > 0.7 ? 'bg-red-500' :
                              intensity > 0.4 ? 'bg-orange-500' :
                              intensity > 0.2 ? 'bg-yellow-500' :
                              'bg-slate-800'
                            }`}
                            title={`Month ${i + 1}`}
                          ></div>
                        );
                      })}
                    </div>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                      <span>2022</span>
                      <span>2023</span>
                      <span>2024</span>
                    </div>
                  </div>

                  {/* Recent Incidents */}
                  <div className="space-y-2">
                    <p className="text-white text-sm mb-2">Recent Incidents</p>
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-red-400 text-sm">Red Light Violation</p>
                        <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">1,000 AED</Badge>
                      </div>
                      <p className="text-slate-400 text-xs">Sep 2024 • Sheikh Zayed Road</p>
                    </div>
                    <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-orange-400 text-sm">Traffic Accident - Moderate</p>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">Insurance</Badge>
                      </div>
                      <p className="text-slate-400 text-xs">Aug 2023 • Sheikh Zayed Road</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Vehicles & Assets */}
            <div className="space-y-4">
              {/* Vehicle Ownership & Usage */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                        <Car className="w-5 h-5 text-cyan-400" />
                      </div>
                      <h4 className="text-white">Vehicle Intelligence</h4>
                    </div>
                  </div>

                  {/* Ownership vs Rental Pattern */}
                  <div className="mb-6 p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                    <p className="text-white text-sm mb-3">Ownership vs Rental Pattern</p>
                    <div className="space-y-2">
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-cyan-400">Owned Vehicles</span>
                          <span className="text-slate-400">2 active</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-[33%] bg-cyan-500"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-purple-400">Short-term Rentals</span>
                          <span className="text-slate-400">4 rentals in 12 months</span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full w-[67%] bg-purple-500"></div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                      <p className="text-purple-400 text-xs">
                        <Brain className="w-3 h-3 inline mr-1" />
                        Pattern: Frequent rentals during international travel periods
                      </p>
                    </div>
                  </div>

                  {/* Owned Vehicles */}
                  <div className="mb-4">
                    <p className="text-white text-sm mb-3">Registered Vehicles</p>
                    <div className="space-y-3">
                      <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-500/10 to-slate-800/50 border border-cyan-500/30">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                            <CarFront className="w-6 h-6 text-cyan-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white">DXB-K-1473</p>
                            <p className="text-cyan-400 text-sm">Toyota Camry 2021</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Active</Badge>
                        </div>
                        <div className="ml-15 space-y-1 text-xs text-slate-400">
                          <p>VIN: JT2BF18K6X0123456</p>
                          <p>Registered: Mar 2021 • Dubai RTA</p>
                          <p className="text-orange-400">⚠ 3 fines recorded with this vehicle</p>
                        </div>
                      </div>

                      <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-12 h-12 rounded bg-slate-700 border border-slate-600 flex items-center justify-center">
                            <CarFront className="w-6 h-6 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white">SHJ-M-8892</p>
                            <p className="text-slate-400 text-sm">Honda Accord 2019</p>
                          </div>
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Active</Badge>
                        </div>
                        <div className="ml-15 space-y-1 text-xs text-slate-400">
                          <p>VIN: 1HGBH41JXMN109876</p>
                          <p>Registered: Jun 2019 • Sharjah RTA</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Rentals */}
                  <div>
                    <p className="text-white text-sm mb-3">Recent Vehicle Rentals</p>
                    <div className="space-y-2">
                      {[
                        { vehicle: 'Nissan Altima', company: 'Budget', period: 'Feb 10-17, 2025', location: 'Dubai Airport', linked: 'Nigeria trip' },
                        { vehicle: 'Toyota Corolla', company: 'Hertz', period: 'Dec 5-8, 2024', location: 'Abu Dhabi', linked: 'Pakistan trip' }
                      ].map((rental, i) => (
                        <div key={i} className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Key className="w-4 h-4 text-purple-400" />
                              <p className="text-white text-sm">{rental.vehicle}</p>
                            </div>
                            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                              {rental.company}
                            </Badge>
                          </div>
                          <p className="text-slate-400 text-xs">{rental.period} • {rental.location}</p>
                          <p className="text-purple-400 text-xs mt-1">
                            <Plane className="w-3 h-3 inline mr-1" />
                            Linked to {rental.linked}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AI Risk Assessment Summary */}
              <Card className="bg-gradient-to-br from-purple-500/20 via-slate-900/50 to-slate-900/50 border-purple-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                      <Brain className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-white">AI Risk Assessment</h4>
                      <p className="text-slate-400 text-xs">Cross-referenced government records analysis</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <p className="text-red-400">Critical Pattern Identified</p>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Travel to high-risk countries (Nigeria, Pakistan) immediately precedes spikes in suspicious financial activity and cross-border transactions.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-orange-400" />
                        <p className="text-orange-400">Behavioral Pattern</p>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Consistent use of rental vehicles during international trips suggests potential operational security awareness.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Scale className="w-4 h-4 text-yellow-400" />
                        <p className="text-yellow-400">Criminal Pattern Analysis</p>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Multiple vehicle theft cases in same geographical area over 5-year period indicates targeted operational zone.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-4 h-4 text-blue-400" />
                        <p className="text-blue-400">Risk Recommendation</p>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Enhanced monitoring recommended for all cross-border movements and financial transactions during travel periods.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-purple-500/30">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-sm">Overall Risk Score</span>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        HIGH RISK (87/100)
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Border Crossing Widget - Full Width */}
          <BorderCrossingWidget />

          {/* Hotel Stay Widget - Full Width */}
          <HotelStayWidget />

          {/* Related Events Widget - Full Width */}
          <RelatedEventsWidget />
        </div>
      </TabsContent>

      <TabsContent value="transactions" className="mt-3">
        <div className="space-y-4">
          {/* Hero Financial Stats */}
          <div className="grid grid-cols-5 gap-4">
            <Card className="bg-gradient-to-br from-green-500/20 via-slate-900/50 to-slate-900/50 border-green-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 border border-green-500/40 flex items-center justify-center">
                    <ArrowDownLeft className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-400 text-2xl">1.8M</p>
                    <p className="text-slate-400 text-xs">Total Inflow</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-500/20 via-slate-900/50 to-slate-900/50 border-red-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                    <ArrowUpRight className="w-6 h-6 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 text-2xl">2.3M</p>
                    <p className="text-slate-400 text-xs">Total Outflow</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-500/20 via-slate-900/50 to-slate-900/50 border-orange-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-orange-400 text-2xl">47</p>
                    <p className="text-slate-400 text-xs">Cross-Border</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-500/20 via-slate-900/50 to-slate-900/50 border-purple-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                    <Activity className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-purple-400 text-2xl">892</p>
                    <p className="text-slate-400 text-xs">Total Txns</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/20 via-slate-900/50 to-slate-900/50 border-cyan-500/30">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-cyan-400 text-2xl">-500K</p>
                    <p className="text-slate-400 text-xs">Net Balance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Financial Flow Intelligence */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white">Financial Flow Intelligence</h4>
                    <p className="text-slate-400 text-xs">12-month inflow vs outflow pattern analysis</p>
                  </div>
                </div>
                <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Negative Net Flow Detected
                </Badge>
              </div>

              {/* Flow Chart */}
              <div className="space-y-3">
                {[
                  { month: 'Feb 25', inflow: 145000, outflow: 285000, alert: true },
                  { month: 'Jan 25', inflow: 98000, outflow: 156000, alert: false },
                  { month: 'Dec 24', inflow: 212000, outflow: 298000, alert: true },
                  { month: 'Nov 24', inflow: 167000, outflow: 134000, alert: false },
                  { month: 'Oct 24', inflow: 189000, outflow: 223000, alert: false },
                  { month: 'Sep 24', inflow: 134000, outflow: 187000, alert: false },
                  { month: 'Aug 24', inflow: 156000, outflow: 145000, alert: false },
                  { month: 'Jul 24', inflow: 178000, outflow: 201000, alert: false },
                  { month: 'Jun 24', inflow: 143000, outflow: 167000, alert: false },
                  { month: 'May 24', inflow: 192000, outflow: 189000, alert: false },
                ].map((data, index) => {
                  const maxAmount = 300000;
                  const inflowWidth = (data.inflow / maxAmount) * 100;
                  const outflowWidth = (data.outflow / maxAmount) * 100;
                  const netFlow = data.inflow - data.outflow;
                  
                  return (
                    <div key={index} className={`p-3 rounded-lg border transition-all ${
                      data.alert ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-800/50 border-slate-700'
                    }`}>
                      <div className="flex items-center gap-4">
                        <div className="w-16">
                          <p className="text-slate-400 text-xs">{data.month}</p>
                        </div>
                        
                        <div className="flex-1 space-y-2">
                          {/* Inflow Bar */}
                          <div className="flex items-center gap-2">
                            <ArrowDownLeft className="w-4 h-4 text-green-400 flex-shrink-0" />
                            <div className="flex-1 h-6 bg-slate-800 rounded overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-green-500 to-green-400 flex items-center justify-end pr-2"
                                style={{ width: `${inflowWidth}%` }}
                              >
                                {inflowWidth > 20 && (
                                  <span className="text-white text-xs">{(data.inflow / 1000).toFixed(0)}K</span>
                                )}
                              </div>
                            </div>
                            {inflowWidth <= 20 && (
                              <span className="text-green-400 text-xs w-12">{(data.inflow / 1000).toFixed(0)}K</span>
                            )}
                          </div>

                          {/* Outflow Bar */}
                          <div className="flex items-center gap-2">
                            <ArrowUpRight className="w-4 h-4 text-red-400 flex-shrink-0" />
                            <div className="flex-1 h-6 bg-slate-800 rounded overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-end pr-2"
                                style={{ width: `${outflowWidth}%` }}
                              >
                                {outflowWidth > 20 && (
                                  <span className="text-white text-xs">{(data.outflow / 1000).toFixed(0)}K</span>
                                )}
                              </div>
                            </div>
                            {outflowWidth <= 20 && (
                              <span className="text-red-400 text-xs w-12">{(data.outflow / 1000).toFixed(0)}K</span>
                            )}
                          </div>
                        </div>

                        <div className="w-24 text-right">
                          <p className={`text-sm ${netFlow >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                            {netFlow >= 0 ? '+' : ''}{(netFlow / 1000).toFixed(0)}K
                          </p>
                          <p className="text-slate-500 text-xs">Net</p>
                        </div>

                        {data.alert && (
                          <AlertTriangle className="w-5 h-5 text-red-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Insights */}
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 text-xs mb-1">Negative Flow Months</p>
                  <p className="text-red-400 text-xl">7/10</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <p className="text-orange-400 text-xs mb-1">Avg Monthly Deficit</p>
                  <p className="text-orange-400 text-xl">-42K AED</p>
                </div>
                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <p className="text-purple-400 text-xs mb-1">Funding Gap</p>
                  <p className="text-purple-400 text-xl">500K AED</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cross Border Transaction Map */}
          <Card className="bg-slate-900/50 border-slate-800">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-white">Cross-Border Transaction Intelligence</h4>
                    <p className="text-slate-400 text-xs">Geographic flow analysis with risk correlation</p>
                  </div>
                </div>
                <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                  <Brain className="w-3 h-3 mr-1" />
                  3 High-Risk Corridors
                </Badge>
              </div>

              <div className="grid grid-cols-12 gap-4">
                {/* Map Visualization */}
                <div className="col-span-7">
                  <div className="h-[500px] rounded-lg bg-slate-950/50 border border-slate-800 relative overflow-hidden">
                    {/* Simplified World Map Background */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Globe className="w-48 h-48 text-slate-800" />
                    </div>

                    {/* UAE - Central Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-cyan-500/30 border-2 border-cyan-500 flex items-center justify-center animate-pulse">
                          <span className="text-2xl">🇦🇪</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <p className="text-cyan-400 text-xs">UAE (Hub)</p>
                        </div>
                      </div>
                    </div>

                    {/* Nigeria - Top Right (High Risk) */}
                    <div className="absolute top-[15%] right-[20%]">
                      <div className="relative">
                        {/* Animated connection line */}
                        <svg className="absolute top-8 right-8 w-64 h-64 pointer-events-none" style={{ transform: 'translate(50%, 50%)' }}>
                          <line x1="0" y1="0" x2="128" y2="128" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
                            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                          </line>
                        </svg>
                        <div className="w-12 h-12 rounded-full bg-red-500/30 border-2 border-red-500 flex items-center justify-center relative z-10">
                          <span className="text-xl">🇳🇬</span>
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                            78.5K OUT
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Pakistan - Top Left (High Risk) */}
                    <div className="absolute top-[20%] left-[15%]">
                      <div className="relative">
                        <svg className="absolute top-8 left-8 w-64 h-64 pointer-events-none" style={{ transform: 'translate(-50%, 50%)' }}>
                          <line x1="256" y1="0" x2="128" y2="128" stroke="#ef4444" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
                            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1s" repeatCount="indefinite" />
                          </line>
                        </svg>
                        <div className="w-12 h-12 rounded-full bg-red-500/30 border-2 border-red-500 flex items-center justify-center relative z-10">
                          <span className="text-xl">🇵🇰</span>
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                            27.1K OUT
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Russia - Top Center (Medium Risk) */}
                    <div className="absolute top-[10%] left-[40%]">
                      <div className="relative">
                        <svg className="absolute top-8 left-8 w-48 h-48 pointer-events-none" style={{ transform: 'translate(-25%, 50%)' }}>
                          <line x1="192" y1="0" x2="96" y2="96" stroke="#f97316" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
                            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.2s" repeatCount="indefinite" />
                          </line>
                        </svg>
                        <div className="w-10 h-10 rounded-full bg-orange-500/30 border-2 border-orange-500 flex items-center justify-center relative z-10">
                          <span className="text-lg">🇷🇺</span>
                        </div>
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                            13.1K
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* UK - Bottom Left (Low Risk - Incoming) */}
                    <div className="absolute bottom-[25%] left-[25%]">
                      <div className="relative">
                        <svg className="absolute bottom-8 left-8 w-48 h-48 pointer-events-none" style={{ transform: 'translate(-25%, -50%)' }}>
                          <line x1="96" y1="192" x2="96" y2="96" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,5" opacity="0.5">
                            <animate attributeName="stroke-dashoffset" from="0" to="10" dur="1.5s" repeatCount="indefinite" />
                          </line>
                        </svg>
                        <div className="w-10 h-10 rounded-full bg-green-500/30 border-2 border-green-500 flex items-center justify-center relative z-10">
                          <span className="text-lg">🇬🇧</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            10.2K IN
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Germany - Bottom Right (Low Risk - Incoming) */}
                    <div className="absolute bottom-[28%] right-[28%]">
                      <div className="relative">
                        <div className="w-9 h-9 rounded-full bg-green-500/30 border-2 border-green-500 flex items-center justify-center">
                          <span className="text-base">🇩🇪</span>
                        </div>
                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                          <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                            4.2K IN
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Turkey - Middle Right */}
                    <div className="absolute top-[35%] right-[15%]">
                      <div className="w-9 h-9 rounded-full bg-orange-500/30 border-2 border-orange-500 flex items-center justify-center">
                        <span className="text-base">🇹🇷</span>
                      </div>
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                          9.8K OUT
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Country Breakdown List */}
                <div className="col-span-5 space-y-3 max-h-[500px] overflow-y-auto">
                  <h5 className="text-white text-sm mb-3">Country Transaction Summary</h5>
                  {[
                    { country: 'Nigeria', flag: '🇳🇬', total: 78500, txns: 18, incoming: 0, outgoing: 78500, risk: 'high' },
                    { country: 'Pakistan', flag: '🇵🇰', total: 27100, txns: 7, incoming: 0, outgoing: 27100, risk: 'high' },
                    { country: 'Russia', flag: '🇷🇺', total: 13100, txns: 5, incoming: 5200, outgoing: 7900, risk: 'medium' },
                    { country: 'UK', flag: '🇬🇧', total: 10200, txns: 4, incoming: 10200, outgoing: 0, risk: 'low' },
                    { country: 'Turkey', flag: '🇹🇷', total: 9800, txns: 3, incoming: 0, outgoing: 9800, risk: 'medium' },
                    { country: 'France', flag: '🇫🇷', total: 6800, txns: 2, incoming: 6800, outgoing: 0, risk: 'low' },
                    { country: 'Germany', flag: '🇩🇪', total: 4200, txns: 2, incoming: 4200, outgoing: 0, risk: 'low' },
                  ].map((country, i) => (
                    <div key={i} className={`p-4 rounded-lg border ${
                      country.risk === 'high' ? 'bg-red-500/10 border-red-500/30' :
                      country.risk === 'medium' ? 'bg-orange-500/10 border-orange-500/30' :
                      'bg-slate-800/50 border-slate-700'
                    }`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{country.flag}</span>
                          <div>
                            <p className="text-white">{country.country}</p>
                            <p className="text-slate-400 text-xs">{country.txns} transactions</p>
                          </div>
                        </div>
                        <Badge className={`text-xs ${
                          country.risk === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          country.risk === 'medium' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                          'bg-green-500/20 text-green-400 border-green-500/30'
                        }`}>
                          {country.risk.toUpperCase()}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="p-2 rounded bg-green-500/10 border border-green-500/30">
                          <p className="text-slate-400 mb-1">Incoming</p>
                          <p className="text-green-400">{(country.incoming / 1000).toFixed(1)}K AED</p>
                        </div>
                        <div className="p-2 rounded bg-red-500/10 border border-red-500/30">
                          <p className="text-slate-400 mb-1">Outgoing</p>
                          <p className="text-red-400">{(country.outgoing / 1000).toFixed(1)}K AED</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Pattern Detection */}
              <div className="mt-4 p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-red-400 mt-0.5" />
                  <div>
                    <p className="text-red-400 mb-2">AI-Detected Pattern: High-Risk Corridor Activity</p>
                    <p className="text-slate-300 text-sm">
                      85% of outgoing cross-border transactions (105.6K AED) directed to high-risk jurisdictions (Nigeria, Pakistan). 
                      Pattern suggests potential trade-based money laundering or value transfer to conflict zones.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Money Laundering Typology Detection */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-red-400" />
                    </div>
                    <h4 className="text-white">ML Typology Detection</h4>
                  </div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                    4 Patterns
                  </Badge>
                </div>

                <div className="space-y-3">
                  {/* Structuring */}
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400" />
                        <p className="text-red-400">Structuring (Smurfing)</p>
                      </div>
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                        HIGH
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">
                      73 transactions just below 50K AED reporting threshold
                    </p>
                    <div className="h-16 flex items-end gap-1">
                      {[45, 47, 49, 51, 48, 46, 49, 47, 50, 48, 49, 51].map((val, i) => (
                        <div key={i} className="flex-1 bg-slate-800 rounded-t relative">
                          <div 
                            className={`absolute bottom-0 left-0 right-0 rounded-t ${val > 50 ? 'bg-red-500' : 'bg-cyan-500'}`}
                            style={{ height: `${(val / 55) * 100}%` }}
                          ></div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-xs text-slate-500 mt-1">
                      <span>Jan</span>
                      <span className="text-red-400">50K Threshold</span>
                      <span>Feb</span>
                    </div>
                  </div>

                  {/* Trade-Based ML */}
                  <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-400" />
                        <p className="text-orange-400 text-sm">Trade-Based ML</p>
                      </div>
                      <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
                        MEDIUM
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-xs">
                      Cross-border payments to high-risk countries coincide with travel records. 
                      Possible over/under-invoicing scheme.
                    </p>
                  </div>

                  {/* Layering */}
                  <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Network className="w-4 h-4 text-yellow-400" />
                        <p className="text-yellow-400 text-sm">Rapid Movement (Layering)</p>
                      </div>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        MEDIUM
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-xs">
                      Multiple transactions within 24-hour periods across different channels (Bank, Cash, Crypto).
                    </p>
                  </div>

                  {/* Crypto Conversion */}
                  <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-4 h-4 text-purple-400" />
                        <p className="text-purple-400 text-sm">Crypto Conversion</p>
                      </div>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                        HIGH
                      </Badge>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">
                      600K AED (50% of total volume) through cryptocurrency channels
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full w-[50%] bg-purple-500"></div>
                      </div>
                      <span className="text-purple-400 text-xs">50%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Transaction Channel Analysis */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-blue-400" />
                    </div>
                    <h4 className="text-white">Channel Distribution</h4>
                  </div>
                </div>

                {/* Channel Breakdown */}
                <div className="space-y-4 mb-6">
                  {[
                    { channel: 'Cryptocurrency', amount: 600000, percent: 50, color: 'purple', icon: '₿', txns: 234 },
                    { channel: 'Bank Transfer', amount: 300000, percent: 25, color: 'blue', icon: '🏦', txns: 178 },
                    { channel: 'Cash', amount: 300000, percent: 25, color: 'green', icon: '💵', txns: 480 },
                  ].map((channel, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{channel.icon}</span>
                          <div>
                            <p className="text-white text-sm">{channel.channel}</p>
                            <p className="text-slate-400 text-xs">{channel.txns} transactions</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white">{(channel.amount / 1000).toFixed(0)}K AED</p>
                          <p className={`text-xs text-${channel.color}-400`}>{channel.percent}%</p>
                        </div>
                      </div>
                      <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-${channel.color}-500 rounded-full transition-all`}
                          style={{ width: `${channel.percent}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Temporal Heatmap */}
                <div className="mb-4">
                  <p className="text-white text-sm mb-3">Transaction Activity Heatmap</p>
                  <div className="space-y-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, dayIndex) => (
                      <div key={day} className="flex items-center gap-2">
                        <span className="text-slate-400 text-xs w-8">{day}</span>
                        <div className="flex-1 grid grid-cols-24 gap-1">
                          {Array.from({ length: 24 }).map((_, hour) => {
                            const intensity = Math.random();
                            return (
                              <div
                                key={hour}
                                className={`h-4 rounded-sm ${
                                  intensity > 0.7 ? 'bg-red-500' :
                                  intensity > 0.5 ? 'bg-orange-500' :
                                  intensity > 0.3 ? 'bg-yellow-500' :
                                  intensity > 0.1 ? 'bg-green-500' :
                                  'bg-slate-800'
                                }`}
                                title={`${day} ${hour}:00`}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
                    <span>00:00</span>
                    <span>12:00</span>
                    <span>23:00</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 mt-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-slate-800"></div>
                      <span className="text-slate-400">Low</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-green-500"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-yellow-500"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-orange-500"></div>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded bg-red-500"></div>
                      <span className="text-slate-400">High</span>
                    </div>
                  </div>
                </div>

                {/* AI Insight */}
                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
                  <div className="flex items-start gap-2">
                    <Brain className="w-4 h-4 text-blue-400 mt-0.5" />
                    <p className="text-blue-400 text-xs">
                      Peak transaction activity occurs late night (22:00-02:00) and during weekends, 
                      atypical for legitimate business operations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Risk Summary */}
          <Card className="bg-gradient-to-br from-red-500/20 via-slate-900/50 to-slate-900/50 border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-500/20 border border-red-500/40 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h4 className="text-white">AI Financial Crime Risk Assessment</h4>
                  <p className="text-slate-400 text-xs">Integrated analysis across transaction patterns, channels, and geography</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <p className="text-red-400 text-sm">Structuring Risk</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-red-400 text-2xl">92%</p>
                      <p className="text-slate-400 text-xs">Confidence</p>
                    </div>
                    <div className="text-xs text-slate-300">
                      <p>• 73 txns below threshold</p>
                      <p>• Consistent pattern</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-orange-400" />
                    <p className="text-orange-400 text-sm">Geographic Risk</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-orange-400 text-2xl">87%</p>
                      <p className="text-slate-400 text-xs">Confidence</p>
                    </div>
                    <div className="text-xs text-slate-300">
                      <p>• High-risk corridors</p>
                      <p>• Travel correlation</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-purple-400" />
                    <p className="text-purple-400 text-sm">Overall ML Risk</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <p className="text-purple-400 text-2xl">HIGH</p>
                      <p className="text-slate-400 text-xs">94/100</p>
                    </div>
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                      STR Required
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-lg bg-slate-950/50 border border-slate-700">
                <p className="text-white text-sm mb-2">Recommendation:</p>
                <p className="text-slate-300 text-xs">
                  Immediate filing of Suspicious Transaction Report (STR) recommended based on convergence of multiple high-confidence ML typologies: 
                  systematic structuring behavior, high-volume crypto usage (50% of transactions), suspicious geographic patterns to sanctioned/high-risk 
                  jurisdictions, and temporal anomalies suggesting deliberate evasion tactics. Case escalation to Financial Intelligence Unit advised.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="tracking" className="mt-3">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-white">Link Analysis & Network</h4>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        12 Entities
                      </Badge>
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        18 Connections
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Network Graph */}
                  <div className="h-[500px] rounded-lg bg-slate-950/50 border border-slate-800 relative overflow-hidden">
                    {/* Central Node - Ali Hussain */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <div className="relative flex flex-col items-center">
                        <div className="absolute inset-0 bg-blue-500/30 rounded-full blur-2xl animate-pulse"></div>
                        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 border-4 border-blue-400 flex flex-col items-center justify-center shadow-xl shadow-blue-500/50">
                          <User className="w-12 h-12 text-white mb-1" />
                          <p className="text-white text-sm">Ali Hussain</p>
                          <p className="text-blue-200 text-xs">Primary</p>
                        </div>
                        <Badge className="mt-3 bg-blue-500/20 text-blue-400 border-blue-500/30">
                          Central Entity
                        </Badge>
                      </div>
                    </div>

                    {/* Connected Entities - Arranged in a circle */}
                    {[
                      { name: 'Sarah Khan', type: 'person', icon: User, angle: 0, risk: 'medium', connection: 'Associate' },
                      { name: 'Ahmad Motors', type: 'organization', icon: Building2, angle: 40, risk: 'high', connection: 'Business' },
                      { name: 'Dubai Trip', type: 'location', icon: Plane, angle: 80, risk: 'low', connection: 'Travel' },
                      { name: 'Card *4532', type: 'transaction', icon: CreditCard, angle: 120, risk: 'high', connection: 'Payment' },
                      { name: 'Fatima Ali', type: 'person', icon: User, angle: 160, risk: 'low', connection: 'Family' },
                      { name: 'Case #54', type: 'case', icon: FileText, angle: 200, risk: 'high', connection: 'Linked Case' },
                      { name: 'Mohamed R.', type: 'person', icon: User, angle: 240, risk: 'high', connection: 'Accomplice' },
                      { name: 'IP 192.168...', type: 'digital', icon: Globe, angle: 280, risk: 'medium', connection: 'Digital' },
                      { name: 'Bank Acc', type: 'transaction', icon: DollarSign, angle: 320, risk: 'high', connection: 'Financial' }
                    ].map((entity, index) => {
                      const radius = 35; // Percentage radius from center
                      const x = 50 + Math.cos((entity.angle * Math.PI) / 180) * radius;
                      const y = 50 + Math.sin((entity.angle * Math.PI) / 180) * radius;
                      const Icon = entity.icon;
                      
                      return (
                        <div key={index}>
                          {/* Connection Line */}
                          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
                            <line
                              x1="50%"
                              y1="50%"
                              x2={`${x}%`}
                              y2={`${y}%`}
                              stroke={entity.risk === 'high' ? '#ef4444' : entity.risk === 'medium' ? '#f59e0b' : '#3b82f6'}
                              strokeWidth="2"
                              strokeDasharray={entity.risk === 'high' ? '0' : '4 4'}
                              opacity="0.3"
                            />
                          </svg>
                          
                          {/* Entity Node */}
                          <div 
                            className="absolute z-10 group"
                            style={{
                              left: `${x}%`,
                              top: `${y}%`,
                              transform: 'translate(-50%, -50%)'
                            }}
                          >
                            <div className="relative flex flex-col items-center">
                              {/* Glow Effect for High Risk */}
                              {entity.risk === 'high' && (
                                <div className="absolute inset-0 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
                              )}
                              {entity.risk === 'medium' && (
                                <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-lg"></div>
                              )}
                              
                              {/* Entity Circle */}
                              <div className={`relative w-20 h-20 rounded-full border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-110 ${
                                entity.risk === 'high' 
                                  ? 'bg-gradient-to-br from-red-600/30 to-red-800/30 border-red-500 hover:shadow-lg hover:shadow-red-500/50' 
                                  : entity.risk === 'medium'
                                  ? 'bg-gradient-to-br from-orange-600/30 to-orange-800/30 border-orange-500 hover:shadow-lg hover:shadow-orange-500/50'
                                  : 'bg-gradient-to-br from-slate-700 to-slate-800 border-slate-600 hover:shadow-lg hover:shadow-blue-500/50'
                              }`}>
                                <Icon className={`w-8 h-8 ${
                                  entity.risk === 'high' ? 'text-red-400' :
                                  entity.risk === 'medium' ? 'text-orange-400' :
                                  'text-blue-400'
                                }`} />
                              </div>
                              
                              {/* Entity Label */}
                              <div className="mt-2 text-center">
                                <p className={`text-xs whitespace-nowrap ${
                                  entity.risk === 'high' ? 'text-red-400' :
                                  entity.risk === 'medium' ? 'text-orange-400' :
                                  'text-slate-300'
                                }`}>{entity.name}</p>
                                <p className="text-slate-500 text-xs mt-0.5">{entity.connection}</p>
                              </div>
                              
                              {/* Enhanced Tooltip */}
                              <div className="absolute top-full mt-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                <div className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 shadow-xl">
                                  <div className="flex items-center gap-2 mb-1">
                                    <Icon className={`w-4 h-4 ${
                                      entity.risk === 'high' ? 'text-red-400' :
                                      entity.risk === 'medium' ? 'text-orange-400' :
                                      'text-blue-400'
                                    }`} />
                                    <p className="text-white text-xs">{entity.name}</p>
                                  </div>
                                  <p className="text-slate-400 text-xs mb-1">{entity.connection}</p>
                                  <Badge className={`text-xs ${
                                    entity.risk === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                    entity.risk === 'medium' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                                    'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                  }`}>
                                    {entity.risk.charAt(0).toUpperCase() + entity.risk.slice(1)} Risk
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-slate-400 text-sm">High Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                      <span className="text-slate-400 text-sm">Medium Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-600"></div>
                      <span className="text-slate-400 text-sm">Low Risk</span>
                    </div>
                  </div>

                  {/* Entity Details */}
                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-slate-400 text-xs">People</p>
                            <p className="text-white">4 Connections</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-slate-400 text-xs">Organizations</p>
                            <p className="text-white">2 Connections</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-800/50 border-slate-700">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Activity className="w-5 h-5 text-red-400" />
                          <div>
                            <p className="text-slate-400 text-xs">High Risk Links</p>
                            <p className="text-white">5 Detected</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
      </TabsContent>

      <TabsContent value="map" className="mt-3">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-0">
            <div className="flex h-[600px]">
              {/* Left Sidebar - Location List */}
              <div className="w-48 bg-slate-950/80 border-r border-slate-800 p-4">
                <h4 className="text-white mb-4 text-sm">Cross Border Transactions</h4>
                <div className="space-y-2">
                  {[
                    { country: 'USA', count: '52 Tx', risk: 'low', flag: '🇺🇸' },
                    { country: 'Russia', count: '169 Tx', risk: 'medium', flag: '🇷🇺' },
                    { country: 'Pakistan', count: '33 Tx', risk: 'low', flag: '🇵🇰' },
                    { country: 'USA', count: '15 Tx', risk: 'low', flag: '🇺🇸' },
                    { country: 'India', count: '35 Tx', risk: 'low', flag: '🇮🇳' },
                    { country: 'China', count: '10 Tx', risk: 'high', flag: '🇨🇳' }
                  ].map((location, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 p-2 rounded bg-slate-800/50 hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      <div className={`w-2 h-2 rounded-full ${
                        location.risk === 'high' ? 'bg-red-500' :
                        location.risk === 'medium' ? 'bg-orange-500' :
                        'bg-cyan-500'
                      }`}></div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs">{location.flag}</span>
                          <span className="text-white text-xs">{location.country}</span>
                        </div>
                        <span className="text-slate-400 text-xs">{location.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map Area */}
              <div className="flex-1 relative bg-slate-950/90 overflow-hidden">
                {/* World Map Background */}
                <div className="absolute inset-0 opacity-30">
                  <svg viewBox="0 0 1000 500" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
                    {/* North America */}
                    <path
                      d="M 50 150 L 80 120 L 120 125 L 140 115 L 160 120 L 170 135 L 165 155 L 175 165 L 185 160 L 195 170 L 190 185 L 180 195 L 165 190 L 155 200 L 145 195 L 135 205 L 120 200 L 110 210 L 95 205 L 85 215 L 70 210 L 60 200 L 55 185 L 45 175 L 50 160 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* South America */}
                    <path
                      d="M 140 240 L 155 235 L 165 245 L 170 260 L 175 280 L 170 300 L 160 315 L 150 325 L 140 330 L 130 325 L 125 310 L 120 290 L 125 270 L 130 250 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* Europe */}
                    <path
                      d="M 380 110 L 400 105 L 420 110 L 435 105 L 450 115 L 460 125 L 455 140 L 445 145 L 430 140 L 415 145 L 400 140 L 385 135 L 375 125 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* Africa */}
                    <path
                      d="M 400 180 L 425 175 L 445 180 L 460 190 L 470 210 L 475 235 L 470 260 L 460 280 L 445 295 L 425 300 L 405 295 L 390 280 L 385 260 L 390 235 L 395 210 L 400 190 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* Russia/Northern Asia */}
                    <path
                      d="M 475 80 L 520 75 L 570 80 L 620 75 L 670 85 L 710 90 L 740 95 L 750 105 L 745 120 L 730 125 L 710 120 L 680 125 L 650 120 L 610 125 L 570 120 L 530 125 L 500 120 L 480 110 L 475 95 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* Middle East */}
                    <path
                      d="M 500 160 L 530 155 L 555 160 L 570 170 L 575 185 L 565 200 L 545 205 L 520 200 L 505 190 L 495 175 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* India */}
                    <path
                      d="M 610 185 L 630 180 L 645 185 L 655 200 L 660 220 L 655 240 L 645 255 L 630 260 L 615 255 L 605 240 L 600 220 L 605 200 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* China */}
                    <path
                      d="M 700 140 L 740 135 L 775 145 L 800 155 L 810 170 L 805 190 L 790 200 L 765 205 L 740 200 L 715 190 L 695 175 L 690 160 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* Southeast Asia */}
                    <path
                      d="M 730 220 L 755 215 L 775 225 L 785 240 L 780 255 L 765 260 L 745 255 L 725 245 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* Japan */}
                    <path
                      d="M 840 165 L 850 160 L 860 165 L 865 180 L 860 195 L 850 200 L 840 195 L 835 180 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                    {/* Australia */}
                    <path
                      d="M 770 310 L 810 305 L 845 315 L 870 330 L 875 350 L 865 370 L 840 380 L 805 375 L 775 360 L 760 340 L 765 325 Z"
                      fill="#334155"
                      stroke="#475569"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {/* USA to Asia flow */}
                  <line
                    x1="15%"
                    y1="35%"
                    x2="85%"
                    y2="38%"
                    stroke="#3b82f6"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                  {/* Europe to Middle East */}
                  <line
                    x1="45%"
                    y1="25%"
                    x2="65%"
                    y2="35%"
                    stroke="#f59e0b"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    opacity="0.4"
                  />
                  {/* Asia internal */}
                  <line
                    x1="75%"
                    y1="40%"
                    x2="85%"
                    y2="35%"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    opacity="0.5"
                  />
                </svg>

                {/* Location Markers */}
                {[
                  { name: 'New York', x: '15%', y: '35%', risk: 'low', amount: '$52K' },
                  { name: 'London', x: '45%', y: '25%', risk: 'low', amount: '$33K' },
                  { name: 'Moscow', x: '55%', y: '20%', risk: 'medium', amount: '$169K' },
                  { name: 'Dubai', x: '60%', y: '40%', risk: 'medium', amount: '$89K' },
                  { name: 'Mumbai', x: '70%', y: '45%', risk: 'low', amount: '$35K' },
                  { name: 'Beijing', x: '82%', y: '35%', risk: 'high', amount: '$10K' },
                  { name: 'Hong Kong', x: '85%', y: '40%', risk: 'high', amount: '$127K' },
                  { name: 'Singapore', x: '85%', y: '50%', risk: 'medium', amount: '$45K' },
                  { name: 'Tokyo', x: '90%', y: '38%', risk: 'medium', amount: '$78K' }
                ].map((location, index) => (
                  <div
                    key={index}
                    className="absolute group cursor-pointer"
                    style={{ left: location.x, top: location.y, transform: 'translate(-50%, -50%)' }}
                  >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 rounded-full blur-lg ${
                      location.risk === 'high' ? 'bg-red-500/40' :
                      location.risk === 'medium' ? 'bg-orange-500/40' :
                      'bg-cyan-500/40'
                    } animate-pulse`}></div>
                    
                    {/* Marker */}
                    <div className={`relative w-3 h-3 rounded-full border-2 ${
                      location.risk === 'high' ? 'bg-red-500 border-red-400' :
                      location.risk === 'medium' ? 'bg-orange-500 border-orange-400' :
                      'bg-cyan-500 border-cyan-400'
                    } shadow-lg`}></div>

                    {/* Tooltip on Hover */}
                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                      <div className="bg-slate-900 border border-slate-700 rounded-lg p-2 whitespace-nowrap shadow-xl">
                        <p className="text-white text-xs mb-1">{location.name}</p>
                        <p className="text-slate-400 text-xs">{location.amount}</p>
                        <Badge className={`mt-1 text-xs ${
                          location.risk === 'high' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          location.risk === 'medium' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                          'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                        }`}>
                          {location.risk.charAt(0).toUpperCase() + location.risk.slice(1)} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Legend */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/90 border border-slate-800 rounded-lg px-6 py-3">
                  <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                      <span className="text-slate-400">Low Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="text-slate-400">Medium Risk</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <span className="text-slate-400">High Risk</span>
                    </div>
                    <div className="h-4 w-px bg-slate-700"></div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-px bg-blue-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #3b82f6 0, #3b82f6 4px, transparent 4px, transparent 8px)' }}></div>
                      <span className="text-slate-400">Normal Flow</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-0.5 bg-red-500" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #ef4444 0, #ef4444 4px, transparent 4px, transparent 8px)' }}></div>
                      <span className="text-slate-400">Suspicious</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
