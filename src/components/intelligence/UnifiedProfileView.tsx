import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { 
  User, Shield, Phone, Database, Globe, CheckCircle, AlertTriangle, TrendingUp, 
  Twitter, Instagram, Facebook, Linkedin, Youtube, Heart, MessageSquare, Share2, 
  Eye, Clock, MapPin, Radio, Sparkles, BarChart3, AlertCircle, ExternalLink, Hash
} from 'lucide-react';

export function UnifiedProfileView() {
  const platformStats = [
    { platform: 'Twitter', icon: Twitter, followers: '12.4k', posts: '890', lastActive: '2h ago', engagement: 'High', color: 'cyan' },
    { platform: 'Instagram', icon: Instagram, followers: '3.4k', posts: '127', lastActive: '5h ago', engagement: 'Medium', color: 'pink' },
    { platform: 'YouTube', icon: Youtube, followers: '5.6k subs', posts: '34 videos', lastActive: '4d ago', engagement: 'High', color: 'red' },
    { platform: 'TikTok', icon: MessageSquare, followers: '7.2k', posts: '62', lastActive: '1d ago', engagement: 'Very High', color: 'purple' },
  ];

  const timelineEvents = [
    { time: '2h ago', type: 'post', platform: 'Twitter', icon: Twitter, content: 'New tweet: "Excited about the upcoming tech conference! #AI #ML"', sentiment: 'positive', flagged: false },
    { time: '3h ago', type: 'anomaly', platform: 'SIGINT', icon: Phone, content: 'CDR Anomaly: 15 calls to unknown number +971-XXX-XXXX', sentiment: 'neutral', flagged: true },
    { time: '5h ago', type: 'post', platform: 'Instagram', icon: Instagram, content: 'Posted photo from Dubai Marina with location tag', sentiment: 'positive', flagged: false },
    { time: '8h ago', type: 'profile', platform: 'LinkedIn', icon: Linkedin, content: 'Updated job title to "Senior Engineer"', sentiment: 'neutral', flagged: false },
    { time: '12h ago', type: 'mention', platform: 'Darknet', icon: AlertTriangle, content: 'Mentioned in forum "DarkMarket" discussing encryption tools', sentiment: 'negative', flagged: true },
    { time: '1d ago', type: 'spike', platform: 'TikTok', icon: TrendingUp, content: 'Follower spike: +2,300 followers in 6 hours', sentiment: 'neutral', flagged: true },
    { time: '2d ago', type: 'location', platform: 'Device', icon: MapPin, content: 'Device location changed: New York → Dubai (8,000 km)', sentiment: 'neutral', flagged: true },
    { time: '3d ago', type: 'keyword', platform: 'Twitter', icon: Hash, content: 'High-risk keywords detected: "encryption", "offshore", "VPN"', sentiment: 'negative', flagged: true },
  ];

  const twitterContent = [
    { tweet: 'Excited about the upcoming tech conference! #AI #ML', likes: 234, retweets: 45, replies: 12, sentiment: 'Positive', time: '2h ago' },
    { tweet: 'Just finished a great project at TechCorp. Team effort!', likes: 189, retweets: 23, replies: 8, sentiment: 'Positive', time: '1d ago' },
    { tweet: 'Privacy is a fundamental right. We need better encryption standards.', likes: 456, retweets: 89, replies: 34, sentiment: 'Neutral', time: '3d ago' },
  ];

  const instagramContent = [
    { caption: 'Dubai Marina sunset 🌅', location: 'Dubai Marina, UAE', likes: 567, comments: 23, sentiment: 'Positive', tags: ['Vacation', 'Lifestyle'] },
    { caption: 'Coffee and code ☕💻', location: 'New York, NY', likes: 234, comments: 12, sentiment: 'Positive', tags: ['Work', 'Technology'] },
    { caption: 'Weekend vibes', location: 'Central Park, NY', likes: 345, comments: 18, sentiment: 'Positive', tags: ['Leisure', 'Outdoors'] },
  ];

  const anomalies = [
    { type: 'Follower Spike', severity: 'high', description: 'TikTok followers increased by 2,300 in 6 hours', badge: '🟥' },
    { type: 'Geo Change', severity: 'high', description: 'Device location: NY → Dubai in < 24h (Impossible travel)', badge: '🟥' },
    { type: 'Phone Reuse', severity: 'moderate', description: 'Same phone number linked to 7 different social accounts', badge: '🟧' },
    { type: 'Darknet Mention', severity: 'high', description: 'Username mentioned in "DarkMarket" forum discussing encryption', badge: '🟥' },
    { type: 'Keyword Alert', severity: 'moderate', description: 'High-risk keywords: "offshore", "VPN", "encryption" in 5 posts', badge: '🟧' },
    { type: 'CDR Pattern', severity: 'moderate', description: 'Unusual calling pattern: 15 calls to unknown international number', badge: '🟧' },
  ];

  return (
    <div className="space-y-4">
      {/* 1. Identity Summary Widget */}
      <Card className="bg-gradient-to-br from-slate-900/80 to-slate-900/40 border-blue-500/30">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center shadow-xl shadow-blue-500/30">
              <User className="w-14 h-14 text-white" />
            </div>
            
            <div className="flex-1 space-y-4">
              {/* Name, Aliases & Scores */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-white text-2xl">John Michael Doe</h2>
                  <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded text-xs text-green-400 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></div>
                    Active Now
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-1">Also known as: @JohnDoe, @darkwolf92, JDoe85</p>
                
                {/* Verification Scores */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-xs text-slate-400">Verified Identity: </span>
                    <span className="text-sm text-green-400">94%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs text-slate-400">OSINT Match: </span>
                    <span className="text-sm text-cyan-400">87%</span>
                  </div>
                </div>
              </div>
              
              {/* Government & Telecom Info Grid */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Database className="w-3 h-3 text-blue-400" />
                    <p className="text-xs text-slate-500">National ID</p>
                  </div>
                  <p className="text-sm text-white">#94582-2847</p>
                </div>
                
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <User className="w-3 h-3 text-blue-400" />
                    <p className="text-xs text-slate-500">DOB</p>
                  </div>
                  <p className="text-sm text-white">Mar 15, 1985</p>
                </div>
                
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Phone className="w-3 h-3 text-purple-400" />
                    <p className="text-xs text-slate-500">Primary Phone</p>
                  </div>
                  <p className="text-sm text-white">+1-555-0123</p>
                </div>
                
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Radio className="w-3 h-3 text-purple-400" />
                    <p className="text-xs text-slate-500">IMSI</p>
                  </div>
                  <p className="text-sm text-white">****4829</p>
                </div>
              </div>
              
              {/* Additional IDs */}
              <div className="grid grid-cols-3 gap-3">
                <div className="text-xs">
                  <span className="text-slate-500">SSN: </span>
                  <span className="text-white">***-**-4829</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-500">Device Type: </span>
                  <span className="text-white">iPhone 14 Pro</span>
                </div>
                <div className="text-xs">
                  <span className="text-slate-500">Address: </span>
                  <span className="text-white">123 Main St, NYC</span>
                </div>
              </div>
              
              {/* Data Sources */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500">Data Sources:</span>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  <span className="text-xs text-slate-400">OSINT (4)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                  <span className="text-xs text-slate-400">Gov (1)</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                  <span className="text-xs text-slate-400">SIGINT (1)</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. Cross-Platform Influence Strip */}
      <Card className="bg-slate-900/30 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <BarChart3 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-white uppercase text-xs tracking-wide">Cross-Platform Influence Comparison</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="text-left text-xs text-slate-500 pb-2 pr-4">Platform</th>
                  <th className="text-left text-xs text-slate-500 pb-2 pr-4">Followers</th>
                  <th className="text-left text-xs text-slate-500 pb-2 pr-4">Posts</th>
                  <th className="text-left text-xs text-slate-500 pb-2 pr-4">Last Active</th>
                  <th className="text-left text-xs text-slate-500 pb-2">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {platformStats.map((platform, idx) => {
                  const Icon = platform.icon;
                  return (
                    <tr key={idx} className="border-b border-slate-800/50">
                      <td className="py-2 pr-4">
                        <div className="flex items-center gap-2">
                          <Icon className={`w-4 h-4 text-${platform.color}-400`} />
                          <span className="text-white">{platform.platform}</span>
                        </div>
                      </td>
                      <td className="py-2 pr-4 text-white">{platform.followers}</td>
                      <td className="py-2 pr-4 text-white">{platform.posts}</td>
                      <td className="py-2 pr-4 text-slate-400">{platform.lastActive}</td>
                      <td className="py-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          platform.engagement === 'Very High' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                          platform.engagement === 'High' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                        }`}>
                          {platform.engagement}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 3. OSINT Behaviour Timeline */}
      <Card className="bg-slate-900/30 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-blue-400" />
            <h3 className="text-white uppercase text-xs tracking-wide">Unified Behaviour Timeline</h3>
            <span className="text-xs text-slate-500">(Last 3 days)</span>
          </div>
          
          <div className="space-y-3">
            {timelineEvents.map((event, idx) => {
              const Icon = event.icon;
              return (
                <div 
                  key={idx} 
                  className={`flex items-start gap-3 p-3 rounded-lg border transition-all ${
                    event.flagged 
                      ? 'bg-red-500/5 border-red-500/20 hover:border-red-500/40' 
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    event.flagged ? 'bg-red-500/10 border border-red-500/20' : 'bg-slate-700/50 border border-slate-600'
                  }`}>
                    <Icon className={`w-4 h-4 ${event.flagged ? 'text-red-400' : 'text-slate-400'}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-sm text-white">{event.content}</p>
                        <p className="text-xs text-slate-500 mt-1">{event.platform} · {event.time}</p>
                      </div>
                      {event.flagged && (
                        <span className="px-2 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
                          Flagged
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        event.sentiment === 'positive' ? 'bg-green-500/10 text-green-400' :
                        event.sentiment === 'negative' ? 'bg-red-500/10 text-red-400' :
                        'bg-slate-500/10 text-slate-400'
                      }`}>
                        {event.sentiment}
                      </span>
                      <span className="text-xs text-slate-600">{event.type}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 4. Multi-Platform Content Widget */}
      <div className="grid grid-cols-2 gap-4">
        {/* Twitter Content */}
        <Card className="bg-slate-900/30 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Twitter className="w-4 h-4 text-cyan-400" />
              <h3 className="text-white uppercase text-xs tracking-wide">Twitter - Top Tweets</h3>
            </div>
            
            <div className="space-y-3">
              {twitterContent.map((tweet, idx) => (
                <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                  <p className="text-sm text-white mb-2">{tweet.tweet}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {tweet.likes}</span>
                      <span className="flex items-center gap-1"><Share2 className="w-3 h-3" /> {tweet.retweets}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {tweet.replies}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      tweet.sentiment === 'Positive' ? 'bg-green-500/10 text-green-400' : 'bg-slate-500/10 text-slate-400'
                    }`}>
                      {tweet.sentiment}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">{tweet.time}</p>
                </div>
              ))}
              
              <div className="bg-slate-800/20 border border-slate-700/30 rounded-lg p-2">
                <p className="text-xs text-slate-500">Top Hashtags: #AI, #ML, #TechConf, #Privacy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Instagram Content */}
        <Card className="bg-slate-900/30 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <Instagram className="w-4 h-4 text-pink-400" />
              <h3 className="text-white uppercase text-xs tracking-wide">Instagram - Recent Posts</h3>
            </div>
            
            <div className="space-y-3">
              {instagramContent.map((post, idx) => (
                <div key={idx} className="bg-slate-800/30 border border-slate-700/50 rounded-lg p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <MapPin className="w-3 h-3 text-slate-500 mt-0.5" />
                    <p className="text-xs text-slate-400">{post.location}</p>
                  </div>
                  <p className="text-sm text-white mb-2">{post.caption}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Heart className="w-3 h-3" /> {post.likes}</span>
                      <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> {post.comments}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400`}>
                      {post.sentiment}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {post.tags.map((tag, tagIdx) => (
                      <span key={tagIdx} className="px-2 py-0.5 bg-slate-700/50 rounded text-xs text-slate-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-2">
                <p className="text-xs text-blue-400">AI Detection: Faces (3), Objects (beach, phone, coffee)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Unified Risk & Anomaly Widget */}
      <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <h3 className="text-white uppercase text-xs tracking-wide">Risk & Anomaly Detection</h3>
            <span className="ml-auto px-3 py-1 bg-red-500/10 border border-red-500/20 rounded text-xs text-red-400">
              {anomalies.filter(a => a.severity === 'high').length} High Risk Alerts
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {anomalies.map((anomaly, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-lg border ${
                  anomaly.severity === 'high' 
                    ? 'bg-red-500/5 border-red-500/20' 
                    : 'bg-orange-500/5 border-orange-500/20'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span className="text-lg">{anomaly.badge}</span>
                  <div className="flex-1">
                    <p className="text-sm text-white mb-1">{anomaly.type}</p>
                    <p className="text-xs text-slate-400">{anomaly.description}</p>
                    <span className={`inline-block mt-2 px-2 py-0.5 rounded text-xs ${
                      anomaly.severity === 'high' 
                        ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                        : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                    }`}>
                      {anomaly.severity === 'high' ? 'High Risk' : 'Moderate Risk'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Intelligence Summary Footer */}
      <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardContent className="p-5">
          <h3 className="text-white text-sm mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            Aggregate Intelligence Summary
          </h3>
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <p className="text-2xl text-cyan-400">4</p>
              <p className="text-xs text-slate-500">Social Accounts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-white">28.4k</p>
              <p className="text-xs text-slate-500">Total Reach</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-blue-400">1</p>
              <p className="text-xs text-slate-500">Gov Records</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-purple-400">423</p>
              <p className="text-xs text-slate-500">CDR Interactions</p>
            </div>
            <div className="text-center">
              <p className="text-2xl text-red-400">6</p>
              <p className="text-xs text-slate-500">Risk Flags</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
