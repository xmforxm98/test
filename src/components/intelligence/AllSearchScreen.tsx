import { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Search, Globe, Shield, Radio, User, MapPin, Car, FileText, Hash, AlignLeft, ExternalLink, Twitter, Facebook, Instagram, Linkedin, Youtube, MessageCircle, Phone, Mail, Building, Database, Signal, Wifi, Sparkles, TrendingUp, AlertTriangle, CheckCircle, Clock, Heart, MessageSquare, Share2, Eye, BarChart3, MapPinned, AlertCircle, Maximize2 } from 'lucide-react';
import { UnifiedProfileView } from './UnifiedProfileView';
import { ProfileIntelligenceScreen } from './ProfileIntelligenceScreen';

interface ChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

function Chip({ label, selected, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full text-sm transition-all
        ${selected 
          ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20' 
          : 'bg-slate-900/50 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
        }
      `}
    >
      {label}
    </button>
  );
}

export function AllSearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');
  const [queryTypes, setQueryTypes] = useState<string[]>(['person']);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<'individual' | 'unified'>('individual');
  const [showFullProfile, setShowFullProfile] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setHasSearched(true);
    
    // Check if searching for InvestProGlobal (fraud investigation case)
    const normalizedQuery = searchQuery.toLowerCase().replace(/[@_\-\.]/g, '');
    const isInvestProGlobal = normalizedQuery.includes('investproglobal') || 
                               normalizedQuery.includes('investglobal') ||
                               searchQuery.toLowerCase().includes('invest.global') ||
                               searchQuery.toLowerCase().includes('investpro');
    
    // Simulate search results based on query
    const results = isInvestProGlobal ? [
      {
        platform: 'Twitter',
        icon: Twitter,
        username: '@InvestProGlobal',
        fullName: 'Global Invest Trader',
        bio: 'Helping you flip $500 to $5000 weekly 💰 | 98% success rate',
        followers: '12,400',
        following: '234',
        posts: '1,456',
        verified: false,
        lastActive: '1 hour ago',
        color: 'cyan',
        source: 'OSINT'
      },
      {
        platform: 'Instagram',
        icon: Instagram,
        username: 'invest.global.pro',
        fullName: 'Investment Coach',
        bio: 'DM for crypto signals 📈 | Referral bonuses available',
        followers: '8,900',
        following: '156',
        posts: '234',
        verified: false,
        lastActive: '3 hours ago',
        color: 'pink',
        source: 'OSINT'
      },
      {
        platform: 'Facebook',
        icon: Facebook,
        username: 'investment.coach.global',
        fullName: 'Investment Coach Global',
        bio: 'Join our VIP group for exclusive trading signals',
        friends: '4,532',
        lastActive: '2 hours ago',
        color: 'blue',
        source: 'OSINT'
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        username: 'global-invest-trader',
        fullName: 'Global Investment Solutions',
        bio: 'Financial Advisor | Crypto Trading Expert | CEO at InvestPro',
        connections: '2,400+',
        lastActive: '1 day ago',
        color: 'blue',
        source: 'OSINT'
      },
      {
        platform: 'National ID Database',
        icon: Database,
        username: 'ID: #73821-4592',
        fullName: 'Marcus David Chen',
        bio: 'DOB: 1992-08-22 | SSN: ***-**-7821',
        address: '456 Oak Street, Miami, FL 33101',
        lastActive: 'Record updated 3 months ago',
        color: 'blue',
        source: 'Government'
      },
      {
        platform: 'Telecom Records',
        icon: Phone,
        username: '+1-305-XXX-4829',
        fullName: 'Marcus Chen',
        bio: 'Carrier: T-Mobile | Type: Mobile',
        callRecords: '892 outgoing, 456 incoming (last 30 days)',
        lastActive: '30 minutes ago',
        color: 'purple',
        source: 'SIGINT'
      },
      {
        platform: 'TikTok',
        icon: MessageCircle,
        username: '@investpro_global',
        fullName: 'Crypto Investment Guide',
        bio: 'Follow for daily crypto tips 🚀 | Link in bio for free course',
        followers: '15,200',
        following: '89',
        posts: '178',
        verified: false,
        lastActive: '4 hours ago',
        color: 'purple',
        source: 'OSINT'
      },
      {
        platform: 'Telegram',
        icon: MessageSquare,
        username: '@InvestProVIP',
        fullName: 'InvestPro VIP Signals',
        bio: 'Premium signals group | $99/month subscription',
        followers: '3,456',
        lastActive: '2 hours ago',
        color: 'cyan',
        source: 'OSINT'
      }
    ] : [
      {
        platform: 'Twitter',
        icon: Twitter,
        username: searchQuery.startsWith('@') ? searchQuery : `@${searchQuery}`,
        fullName: 'John Doe',
        bio: 'Software Engineer | Tech Enthusiast | Coffee Lover',
        followers: '1,234',
        following: '567',
        posts: '890',
        verified: true,
        lastActive: '2 hours ago',
        color: 'cyan',
        source: 'OSINT'
      },
      {
        platform: 'Instagram',
        icon: Instagram,
        username: searchQuery.replace('@', ''),
        fullName: 'John Doe',
        bio: 'Living life one adventure at a time 🌍',
        followers: '3,456',
        following: '234',
        posts: '127',
        verified: false,
        lastActive: '5 hours ago',
        color: 'pink',
        source: 'OSINT'
      },
      {
        platform: 'Facebook',
        icon: Facebook,
        username: 'john.doe.1234',
        fullName: 'John Doe',
        bio: 'Lives in New York, NY',
        friends: '892',
        lastActive: '1 day ago',
        color: 'blue',
        source: 'OSINT'
      },
      {
        platform: 'LinkedIn',
        icon: Linkedin,
        username: 'john-doe-tech',
        fullName: 'John Doe',
        bio: 'Senior Software Engineer at TechCorp',
        connections: '500+',
        lastActive: '3 days ago',
        color: 'blue',
        source: 'OSINT'
      },
      {
        platform: 'National ID Database',
        icon: Database,
        username: 'ID: #94582-2847',
        fullName: 'John Michael Doe',
        bio: 'DOB: 1985-03-15 | SSN: ***-**-4829',
        address: '123 Main St, New York, NY 10001',
        lastActive: 'Record updated 6 months ago',
        color: 'blue',
        source: 'Government'
      },
      {
        platform: 'Telecom Records',
        icon: Phone,
        username: '+1-555-0123',
        fullName: 'John Doe',
        bio: 'Carrier: Verizon | Type: Mobile',
        callRecords: '234 outgoing, 189 incoming (last 30 days)',
        lastActive: '1 hour ago',
        color: 'purple',
        source: 'SIGINT'
      }
    ];
    
    setSearchResults(results);
  };

  const toggleQueryType = (type: string) => {
    if (queryTypes.includes(type)) {
      setQueryTypes(queryTypes.filter(t => t !== type));
    } else {
      setQueryTypes([...queryTypes, type]);
    }
  };

  const recentSearches = [
    {
      query: '@darkwolf92, john.doe@mail.com',
      type: 'Person of Interest',
      time: '2 days ago',
      sources: ['OSINT', 'Gov', 'SIGINT'],
      icon: User
    },
    {
      query: '+9715XXXXXXX',
      type: 'Telecom Query',
      time: '4 days ago',
      sources: ['SIGINT'],
      icon: Radio
    },
    {
      query: 'Case #4510-A',
      type: 'Case File',
      time: '1 week ago',
      sources: ['Gov'],
      icon: FileText
    }
  ];

  const resultPreviews = [
    {
      title: 'OSINT Hits',
      description: '3 social profiles, 2 darknet mentions matched to query',
      tags: ['Twitter', 'Instagram', 'Darknet Forum'],
      color: 'cyan'
    },
    {
      title: 'Government Records',
      description: 'Identity + travel records found in national database',
      tags: ['National ID DB', 'Border Control', 'Passport Registry'],
      color: 'blue'
    },
    {
      title: 'SIGINT / Telecom',
      description: 'Device matches: 1 phone number, 3 CDR interactions',
      tags: ['CDR', 'Device Metadata', 'Cell Tower'],
      color: 'purple'
    }
  ];

  // If showing full profile, render ProfileIntelligenceScreen
  if (showFullProfile) {
    return (
      <ProfileIntelligenceScreen
        searchQuery={searchQuery}
        searchResults={searchResults}
        onBack={() => setShowFullProfile(false)}
      />
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-white uppercase tracking-wider text-sm mb-2">All Search</h1>
          <p className="text-xs text-slate-500">Cross-platform intelligence search across OSINT, Government, and SIGINT sources</p>
        </div>

        {/* Main Search Bar - Large Pill Shape */}
        <div className="relative">
          <div className="flex items-center gap-3 bg-slate-900/50 border border-slate-800 rounded-full p-2 pr-3 hover:border-slate-700 transition-all">
            <div className="flex-1 flex items-center gap-3 px-4">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, ID, handle, alias, email, phone, location, or keyword…"
                className="flex-1 bg-transparent text-white placeholder:text-slate-500 outline-none"
              />
            </div>
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-full px-8 shadow-lg shadow-blue-500/20" onClick={handleSearch}>
              Search
            </Button>
          </div>
        </div>

        {/* Row A - Source Filters */}
        <div className="space-y-2">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Source Filters</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Chip
              label="All Sources"
              selected={sourceFilter === 'all'}
              onClick={() => setSourceFilter('all')}
            />
            <Chip
              label="OSINT / Open Web"
              selected={sourceFilter === 'osint'}
              onClick={() => setSourceFilter('osint')}
            />
            <Chip
              label="Government Databases"
              selected={sourceFilter === 'government'}
              onClick={() => setSourceFilter('government')}
            />
            <Chip
              label="SIGINT / Telecom"
              selected={sourceFilter === 'sigint'}
              onClick={() => setSourceFilter('sigint')}
            />
          </div>
        </div>

        {/* Row B - Query Type */}
        <div className="space-y-2">
          <p className="text-xs text-slate-500 uppercase tracking-wide">Query Type (Multi-Select)</p>
          <div className="flex items-center gap-2 flex-wrap">
            <Chip
              label="Person / Handle / Alias"
              selected={queryTypes.includes('person')}
              onClick={() => toggleQueryType('person')}
            />
            <Chip
              label="Email / Phone"
              selected={queryTypes.includes('contact')}
              onClick={() => toggleQueryType('contact')}
            />
            <Chip
              label="Location / Address"
              selected={queryTypes.includes('location')}
              onClick={() => toggleQueryType('location')}
            />
            <Chip
              label="Vehicle / Plate"
              selected={queryTypes.includes('vehicle')}
              onClick={() => toggleQueryType('vehicle')}
            />
            <Chip
              label="Case / File ID"
              selected={queryTypes.includes('case')}
              onClick={() => toggleQueryType('case')}
            />
            <Chip
              label="Free Text Keyword"
              selected={queryTypes.includes('keyword')}
              onClick={() => toggleQueryType('keyword')}
            />
          </div>
        </div>

        {/* Source Summary Strip */}
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-lg p-4">
          <div className="flex items-center gap-6 flex-wrap">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <div className="text-xs">
                <span className="text-slate-400">OSINT:</span>
                <span className="text-slate-500 ml-1">Social Media, Darknet, Forums, Paste Sites</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <div className="text-xs">
                <span className="text-slate-400">Government:</span>
                <span className="text-slate-500 ml-1">National DBs, Watchlists, Identity Records</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-purple-400" />
              <div className="text-xs">
                <span className="text-slate-400">SIGINT:</span>
                <span className="text-slate-500 ml-1">CDR, Device Metadata, Movement Logs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid - Results Preview + Recent Searches */}
        <div className="grid grid-cols-3 gap-6">
          {/* Results Section (Left - 2 columns) */}
          <div className="col-span-2 space-y-3">
            {hasSearched ? (
              <>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Search Results for "{searchQuery}"</p>
                    <p className="text-xs text-slate-400">{searchResults.length} matches found</p>
                  </div>
                  
                  {/* View Mode Toggle */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant={viewMode === 'individual' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('individual')}
                      className={viewMode === 'individual' ? 'bg-blue-600 hover:bg-blue-700' : 'text-slate-400 hover:text-white'}
                    >
                      Individual Results
                    </Button>
                    <Button
                      variant={viewMode === 'unified' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('unified')}
                      className={viewMode === 'unified' ? 'bg-blue-600 hover:bg-blue-700' : 'text-slate-400 hover:text-white'}
                    >
                      <User className="w-3 h-3 mr-1" />
                      Unified Profile
                    </Button>
                  </div>
                </div>
                
                {viewMode === 'individual' ? (
                  <div className="grid grid-cols-1 gap-4">
                    {searchResults.map((result, index) => {
                      const Icon = result.icon;
                      const sourceColor = result.source === 'OSINT' ? 'cyan' : result.source === 'Government' ? 'blue' : 'purple';
                      
                      return (
                        <Card
                          key={index}
                          className="bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer"
                        >
                          <CardContent className="p-5">
                            <div className="space-y-3">
                              {/* Header with Platform Icon and Name */}
                              <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`w-10 h-10 rounded-lg bg-${sourceColor}-500/10 border border-${sourceColor}-500/20 flex items-center justify-center`}>
                                    <Icon className={`w-5 h-5 text-${sourceColor}-400`} />
                                  </div>
                                  <div>
                                    <h3 className="text-white">{result.platform}</h3>
                                    <p className="text-xs text-slate-500">{result.username}</p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-1 bg-${sourceColor}-500/10 border border-${sourceColor}-500/20 rounded text-xs text-${sourceColor}-400`}>
                                    {result.source}
                                  </span>
                                  {result.verified && (
                                    <span className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400">
                                      ✓ Verified
                                    </span>
                                  )}
                                </div>
                              </div>
                              
                              {/* Profile Info */}
                              <div>
                                <p className="text-sm text-white mb-1">{result.fullName}</p>
                                <p className="text-sm text-slate-400">{result.bio}</p>
                              </div>
                              
                              {/* Stats */}
                              <div className="flex items-center gap-3 flex-wrap">
                                {result.followers && (
                                  <div className="text-xs">
                                    <span className="text-slate-500">Followers: </span>
                                    <span className="text-white">{result.followers}</span>
                                  </div>
                                )}
                                {result.following && (
                                  <div className="text-xs">
                                    <span className="text-slate-500">Following: </span>
                                    <span className="text-white">{result.following}</span>
                                  </div>
                                )}
                                {result.posts && (
                                  <div className="text-xs">
                                    <span className="text-slate-500">Posts: </span>
                                    <span className="text-white">{result.posts}</span>
                                  </div>
                                )}
                                {result.connections && (
                                  <div className="text-xs">
                                    <span className="text-slate-500">Connections: </span>
                                    <span className="text-white">{result.connections}</span>
                                  </div>
                                )}
                                {result.friends && (
                                  <div className="text-xs">
                                    <span className="text-slate-500">Friends: </span>
                                    <span className="text-white">{result.friends}</span>
                                  </div>
                                )}
                              </div>
                              
                              {/* Additional Info */}
                              {result.address && (
                                <div className="text-xs">
                                  <span className="text-slate-500">Address: </span>
                                  <span className="text-slate-400">{result.address}</span>
                                </div>
                              )}
                              {result.callRecords && (
                                <div className="text-xs">
                                  <span className="text-slate-500">Call Records: </span>
                                  <span className="text-slate-400">{result.callRecords}</span>
                                </div>
                              )}
                              
                              {/* Footer */}
                              <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                                <span className="text-xs text-slate-500">Last Active: {result.lastActive}</span>
                                <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  View Profile
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Action to Open Full Profile */}
                    <div className="flex items-center justify-between p-4 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                          <Maximize2 className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <h3 className="text-white text-sm">Want a full intelligence analysis?</h3>
                          <p className="text-xs text-slate-400">Open the comprehensive full-page profile view with all investigative widgets</p>
                        </div>
                      </div>
                      <Button
                        onClick={() => setShowFullProfile(true)}
                        className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                      >
                        <Maximize2 className="w-4 h-4 mr-2" />
                        Open Full Profile
                      </Button>
                    </div>
                    
                    <UnifiedProfileView searchResults={searchResults} />
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-96">
                <div className="text-center space-y-3">
                  <Search className="w-12 h-12 text-slate-700 mx-auto" />
                  <p className="text-slate-500">Enter a search query to begin</p>
                  <p className="text-xs text-slate-600">Search across OSINT, Government, and SIGINT sources</p>
                </div>
              </div>
            )}
          </div>

          {/* Recent Searches (Right - 1 column) */}
          <div className="col-span-1 space-y-3">
            <p className="text-xs text-slate-500 uppercase tracking-wide">Recent Searches</p>
            
            {recentSearches.map((search, index) => (
              <Card
                key={index}
                className="bg-slate-900/30 border-slate-800 hover:border-slate-700 hover:shadow-lg hover:shadow-blue-500/10 transition-all cursor-pointer"
                onClick={() => {
                  setSearchQuery(search.query);
                  handleSearch();
                }}
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <search.icon className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{search.query}</p>
                        <p className="text-xs text-slate-500 mt-1">{search.type}</p>
                      </div>
                    </div>
                    
                    {/* Source Coverage */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {search.sources.map((source, sourceIndex) => (
                          <div
                            key={sourceIndex}
                            className={`
                              w-2 h-2 rounded-full
                              ${source === 'OSINT' ? 'bg-cyan-400' : ''}
                              ${source === 'Gov' ? 'bg-blue-400' : ''}
                              ${source === 'SIGINT' ? 'bg-purple-400' : ''}
                            `}
                          ></div>
                        ))}
                        <span className="text-xs text-slate-500 ml-1">{search.sources.join(' + ')}</span>
                      </div>
                      <span className="text-xs text-slate-600">{search.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Search Results - REMOVED FROM HERE */}
      </div>
    </div>
  );
}