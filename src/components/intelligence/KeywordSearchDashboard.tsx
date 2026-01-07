import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Search, X, Calendar, TrendingUp, Globe2, MessageSquare, Users, MapPin, Languages, AlertTriangle, Heart, Share2, Eye, Play, Image, FileText, Link2, Target, Network, Clock, Download, Plus, Filter, ChevronRight, ExternalLink, Zap, Shield, Flag, Activity, BarChart3, PieChart, Hash, Music, Twitter, Facebook as FacebookIcon, Linkedin, Send, Instagram, Youtube, Radio } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';

interface KeywordSearchDashboardProps {
  keywords: string[];
  onNewSearch: () => void;
}

export function KeywordSearchDashboard({ keywords, onNewSearch }: KeywordSearchDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSources, setSelectedSources] = useState<string[]>(['tiktok', 'twitter', 'facebook', 'linkedin', 'telegram']);
  const [dateRange, setDateRange] = useState('7days');

  const sources = [
    { id: 'tiktok', name: 'TikTok', color: 'pink', icon: Music },
    { id: 'twitter', name: 'Twitter/X', color: 'blue', icon: Twitter },
    { id: 'instagram', name: 'Instagram', color: 'purple', icon: Instagram },
    { id: 'facebook', name: 'Facebook', color: 'blue', icon: FacebookIcon },
    { id: 'youtube', name: 'YouTube', color: 'red', icon: Youtube },
    { id: 'linkedin', name: 'LinkedIn', color: 'blue', icon: Linkedin },
    { id: 'reddit', name: 'Reddit', color: 'orange', icon: MessageSquare },
    { id: 'telegram', name: 'Telegram', color: 'cyan', icon: Send },
    { id: 'govdb', name: 'Gov DB', color: 'green', icon: Shield },
    { id: 'sigint', name: 'SIGINT', color: 'slate', icon: Radio }
  ];

  const toggleSource = (sourceId: string) => {
    if (selectedSources.includes(sourceId)) {
      setSelectedSources(selectedSources.filter(s => s !== sourceId));
    } else {
      setSelectedSources([...selectedSources, sourceId]);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'tiktok': return Music;
      case 'twitter': return Twitter;
      case 'facebook': return FacebookIcon;
      case 'linkedin': return Linkedin;
      case 'telegram': return Send;
      case 'instagram': return Instagram;
      case 'youtube': return Youtube;
      default: return MessageSquare;
    }
  };

  const viralPosts = [
    {
      platform: 'tiktok',
      thumbnail: 'https://images.unsplash.com/photo-1551817958-bd9ee611f19c?w=400',
      caption: 'Abu Dhabi Police conduct safety drill at international school - ensuring student protection',
      playCount: 2847293,
      likes: 148592,
      shares: 12847,
      comments: 8493,
      sentiment: 'positive'
    },
    {
      platform: 'twitter',
      thumbnail: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400',
      caption: 'Breaking: Abu Dhabi Police arrest reckless driver endangering public safety on Sheikh Zayed Road',
      playCount: 0,
      likes: 45283,
      shares: 8392,
      comments: 2847,
      sentiment: 'neutral'
    },
    {
      platform: 'facebook',
      thumbnail: 'https://images.unsplash.com/photo-1590650046871-92c887180603?w=400',
      caption: 'Abu Dhabi Police recognized for outstanding community policing initiatives - building trust with residents',
      playCount: 0,
      likes: 23847,
      shares: 3928,
      comments: 1847,
      sentiment: 'positive'
    },
    {
      platform: 'tiktok',
      thumbnail: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400',
      caption: 'Taiwanese man detained at Abu Dhabi Airport - immigration investigation ongoing',
      playCount: 1293847,
      likes: 82947,
      shares: 15283,
      comments: 12847,
      sentiment: 'negative'
    },
    {
      platform: 'linkedin',
      thumbnail: 'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=400',
      caption: 'Abu Dhabi Police showcase advanced technology at International Defence Exhibition',
      playCount: 0,
      likes: 8472,
      shares: 1283,
      comments: 472,
      sentiment: 'positive'
    },
    {
      platform: 'telegram',
      thumbnail: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?w=400',
      caption: 'Abu Dhabi Police crack down on hate speech accounts targeting immigrants',
      playCount: 0,
      likes: 3847,
      shares: 2183,
      comments: 1928,
      sentiment: 'neutral'
    }
  ];

  const timelineEvents = [
    { time: '2 hours ago', platform: 'tiktok', title: 'Viral video: Police fire safety drill at school', sentiment: 'positive' },
    { time: '5 hours ago', platform: 'twitter', title: 'Breaking: Reckless driving arrest on Sheikh Zayed Road', sentiment: 'neutral' },
    { time: '8 hours ago', platform: 'facebook', title: 'Community policing recognition ceremony', sentiment: 'positive' },
    { time: '12 hours ago', platform: 'telegram', title: 'Discussion: Immigrant detention procedures', sentiment: 'negative' },
    { time: '1 day ago', platform: 'tiktok', title: 'Taiwanese traveler incident at airport', sentiment: 'negative' },
    { time: '2 days ago', platform: 'linkedin', title: 'Defence exhibition showcase announcement', sentiment: 'positive' },
    { time: '3 days ago', platform: 'twitter', title: 'Hate speech account suspended by authorities', sentiment: 'neutral' },
    { time: '5 days ago', platform: 'facebook', title: 'Traffic safety campaign launch', sentiment: 'positive' }
  ];

  return (
    <div className="space-y-6">
      {/* KEYWORD OVERVIEW STATS - Matching CaseLeadDashboard Pattern */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Total OSINT Hits</p>
                <p className="text-white">148,492</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <TrendingUp className="w-3 h-3 text-green-400" />
              <span className="text-green-400">+247% increase</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Sentiment Score</p>
                <p className="text-white">62% Positive</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-green-600/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-green-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400">
              62% Positive • 28% Neutral • 10% Negative
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Top Location</p>
                <p className="text-white">Abu Dhabi</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400">
              89K mentions • UAE 47K • Taiwan 12K
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm mb-1">Languages</p>
                <p className="text-white">3 Active</p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-orange-600/20 flex items-center justify-center">
                <Languages className="w-6 h-6 text-orange-400" />
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-400">
              English 58% • Arabic 32% • Urdu 10%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MAIN DASHBOARD GRID - Matching CaseLeadDashboard lg:grid-cols-3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT COLUMN - 2 COLS */}
        <div className="lg:col-span-2 space-y-6">
          {/* SENTIMENT ANALYSIS */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-800 bg-gradient-to-r from-green-950/50 to-cyan-950/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-green-500/20">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-white">Sentiment Analysis</CardTitle>
                    <CardDescription>Real-time sentiment breakdown</CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={[
                        { name: 'Positive', value: 62, color: '#4ade80' },
                        { name: 'Neutral', value: 28, color: '#fbbf24' },
                        { name: 'Negative', value: 10, color: '#ef4444' }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {[
                        { name: 'Positive', value: 62, color: '#4ade80' },
                        { name: 'Neutral', value: 28, color: '#fbbf24' },
                        { name: 'Negative', value: 10, color: '#ef4444' }
                      ].map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                      labelStyle={{ color: '#e2e8f0' }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-6 text-sm mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-slate-300">Positive</span>
                  <span className="text-green-400">62%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <span className="text-slate-300">Neutral</span>
                  <span className="text-yellow-400">28%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <span className="text-slate-300">Negative</span>
                  <span className="text-red-400">10%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CROSS-PLATFORM ACTIVITY HEATMAP */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Cross-Platform Activity Heatmap
              </CardTitle>
              <CardDescription>Intelligence SOC activity matrix</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="min-w-[600px]">
                  {/* Header Row */}
                  <div className="grid grid-cols-[140px_repeat(4,1fr)] gap-2 mb-2">
                    <div></div>
                    <div className="text-center text-xs text-slate-400">24h</div>
                    <div className="text-center text-xs text-slate-400">48h</div>
                    <div className="text-center text-xs text-slate-400">7 days</div>
                    <div className="text-center text-xs text-slate-400">30 days</div>
                  </div>
                  
                  {/* Data Rows */}
                  <div className="space-y-2">
                    {[
                      { name: 'TikTok', icon: Music, color: 'pink', data: [2847, 4982, 12483, 28472] },
                      { name: 'Twitter/X', icon: Twitter, color: 'blue', data: [1829, 3847, 9284, 24839] },
                      { name: 'Facebook', icon: FacebookIcon, color: 'blue', data: [1248, 2839, 7482, 19283] },
                      { name: 'LinkedIn', icon: Linkedin, color: 'blue', data: [847, 1829, 4829, 12847] },
                      { name: 'Telegram', icon: Send, color: 'cyan', data: [482, 1284, 3847, 9482] }
                    ].map((platform, pIdx) => {
                      const Icon = platform.icon;
                      const intensities = [95, 87, 78, 62];
                      return (
                        <div key={platform.name} className="grid grid-cols-[140px_repeat(4,1fr)] gap-2 items-center">
                          <div className="flex items-center gap-2 text-slate-300 text-sm">
                            <Icon className={`w-4 h-4 ${
                              platform.color === 'pink' ? 'text-pink-400' :
                              platform.color === 'cyan' ? 'text-cyan-400' :
                              'text-blue-400'
                            }`} />
                            <span>{platform.name}</span>
                          </div>
                          {platform.data.map((count, idx) => (
                            <div
                              key={idx}
                              className="h-12 rounded-lg flex items-center justify-center text-white text-sm transition-all hover:scale-105 cursor-pointer"
                              style={{
                                background: `rgba(59, 130, 246, ${intensities[idx] / 100})`,
                                boxShadow: `0 0 ${intensities[idx] / 10}px rgba(59, 130, 246, ${intensities[idx] / 100})`
                              }}
                            >
                              {count.toLocaleString()}
                            </div>
                          ))}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ENTITY EXTRACTION INTELLIGENCE */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  People Entities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Taiwanese traveler (victim)', 'Social media influencer', 'Police Chief Abdullah', 'School principal', 'Hate speech account @xyz123'].map(person => (
                  <div key={person} className="flex items-center justify-between p-2 bg-blue-950/20 border border-blue-800/30 rounded-lg">
                    <span className="text-slate-300 text-sm">{person}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  Organizations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Abu Dhabi Police', 'MOFA Taiwan', 'Dubai Police', 'ADNEC Exhibition', 'Defence contractors'].map(org => (
                  <div key={org} className="flex items-center justify-between p-2 bg-purple-950/20 border border-purple-800/30 rounded-lg">
                    <span className="text-slate-300 text-sm">{org}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-cyan-400" />
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {['Abu Dhabi Airport', 'Ruwais', 'Dubai', 'Taiwan', 'ADNEC Center'].map(location => (
                  <div key={location} className="flex items-center justify-between p-2 bg-cyan-950/20 border border-cyan-800/30 rounded-lg">
                    <span className="text-slate-300 text-sm">{location}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* RIGHT COLUMN - 1 COL */}
        <div className="space-y-6">
          {/* TOP THEMES */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden">
            <CardHeader className="border-b border-slate-800 bg-gradient-to-r from-purple-950/50 to-pink-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Hash className="w-5 h-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-white">Top Themes</CardTitle>
                  <CardDescription>Trending topics</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">Crime</Badge>
                <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">Safety</Badge>
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">Defence</Badge>
                <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Community</Badge>
                <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Traffic</Badge>
              </div>
            </CardContent>
          </Card>

          {/* ACTIVITY TIMELINE */}
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                Activity Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {timelineEvents.slice(0, 8).map((event, idx) => {
                const PlatformIcon = getPlatformIcon(event.platform);
                return (
                  <div key={idx} className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-800/50 transition-all">
                    <div className="w-8 h-8 rounded-lg bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                      <PlatformIcon className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-slate-300 text-sm line-clamp-2">{event.title}</p>
                      <p className="text-slate-500 text-xs mt-1">{event.time}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-2 ${
                      event.sentiment === 'positive' ? 'bg-green-400' :
                      event.sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                    }`}></div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* NARRATIVE CLASSIFICATION PANEL */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-950/40 to-slate-900/40 border-green-500/30 hover:border-green-500/50 transition-all cursor-pointer">
          <CardContent className="pt-6">
            <Shield className="w-10 h-10 text-green-400 mb-3" />
            <h3 className="text-white mb-2">Public Safety Alerts</h3>
            <p className="text-slate-400 text-sm mb-3">Fire drills, traffic safety campaigns, emergency preparedness</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-3/4"></div>
              </div>
              <span className="text-green-400 text-xs">+32%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-950/40 to-slate-900/40 border-red-500/30 hover:border-red-500/50 transition-all cursor-pointer">
          <CardContent className="pt-6">
            <AlertTriangle className="w-10 h-10 text-red-400 mb-3" />
            <h3 className="text-white mb-2">Crime / Suspicious Activity</h3>
            <p className="text-slate-400 text-sm mb-3">Arrests, investigations, reckless behavior reports</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-400 w-2/3"></div>
              </div>
              <span className="text-red-400 text-xs">+18%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30 hover:border-blue-500/50 transition-all cursor-pointer">
          <CardContent className="pt-6">
            <Flag className="w-10 h-10 text-blue-400 mb-3" />
            <h3 className="text-white mb-2">Government & Defence</h3>
            <p className="text-slate-400 text-sm mb-3">Official announcements, defence exhibitions, policy updates</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-400 w-1/2"></div>
              </div>
              <span className="text-blue-400 text-xs">+24%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-950/40 to-slate-900/40 border-purple-500/30 hover:border-purple-500/50 transition-all cursor-pointer">
          <CardContent className="pt-6">
            <MessageSquare className="w-10 h-10 text-purple-400 mb-3" />
            <h3 className="text-white mb-2">Social Reactions</h3>
            <p className="text-slate-400 text-sm mb-3">Community feedback, complaints, public discourse</p>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-400" />
              <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-400 w-4/5"></div>
              </div>
              <span className="text-purple-400 text-xs">+45%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MOST VIRAL CONTENT */}
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            Most Viral Content
          </CardTitle>
          <CardDescription>Top performing posts across platforms</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {viralPosts.map((post, idx) => {
              const PlatformIcon = getPlatformIcon(post.platform);
              return (
                <Card key={idx} className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all group">
                  <CardContent className="p-4">
                    <div className="relative mb-3 rounded-lg overflow-hidden">
                      <img src={post.thumbnail} alt="" className="w-full h-40 object-cover" />
                      <div className="absolute top-2 left-2">
                        <Badge className={`flex items-center gap-1 ${
                          post.platform === 'tiktok' ? 'bg-pink-500/90' :
                          post.platform === 'twitter' ? 'bg-blue-500/90' :
                          post.platform === 'facebook' ? 'bg-blue-600/90' :
                          post.platform === 'linkedin' ? 'bg-blue-700/90' :
                          'bg-cyan-500/90'
                        } text-white border-0`}>
                          <PlatformIcon className="w-3 h-3" />
                          {post.platform}
                        </Badge>
                      </div>
                    {post.playCount > 0 && (
                      <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
                        <Play className="w-3 h-3 text-white" />
                        <span className="text-white text-xs">{(post.playCount / 1000000).toFixed(1)}M</span>
                      </div>
                    )}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 ${
                      post.sentiment === 'positive' ? 'bg-green-400' : post.sentiment === 'negative' ? 'bg-red-400' : 'bg-yellow-400'
                    }`}></div>
                  </div>
                  <p className="text-slate-300 text-sm mb-3 line-clamp-2">{post.caption}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3 h-3" />
                        {(post.likes / 1000).toFixed(1)}K
                      </span>
                      <span className="flex items-center gap-1">
                        <Share2 className="w-3 h-3" />
                        {(post.shares / 1000).toFixed(1)}K
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        {(post.comments / 1000).toFixed(1)}K
                      </span>
                    </div>
                  </div>
                    <Button variant="outline" className="w-full mt-3 border-slate-700 hover:bg-blue-500/20 hover:border-blue-500/50 text-slate-300 group-hover:text-white">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Open Post
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
