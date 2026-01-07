import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  User,
  MapPin,
  Building2,
  Calendar,
  FileText,
  Search,
  Filter,
  TrendingUp,
  Network,
  ExternalLink,
  Users,
  Sparkles,
  Eye,
  Link2,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { PersonProfile } from './PersonProfile';

interface Entity {
  id: string;
  name: string;
  type: 'Person' | 'Location' | 'Organization' | 'Event' | 'Evidence';
  description?: string;
  confidence: number;
  connections: number;
  sources: string[];
  relatedEvidence: string[];
  relatedTasks: string[];
  extractedFrom: string;
  metadata?: Record<string, any>;
  verified: boolean;
}

export function EntitiesDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [showPersonProfile, setShowPersonProfile] = useState(false);

  // Mock data - in real app, this would come from API
  const entities: Entity[] = [
    {
      id: 'p1',
      name: 'Ali Hussain',
      type: 'Person',
      description: 'Primary suspect in cyber fraud case',
      confidence: 0.95,
      connections: 8,
      sources: ['Evidence #001', 'Evidence #003', 'Task #005'],
      relatedEvidence: ['Bank Statement.pdf', 'Email Thread.msg', 'Phone Records.xlsx'],
      relatedTasks: ['Interview Suspect', 'Verify Identity'],
      extractedFrom: 'Bank Statement.pdf',
      metadata: {
        role: 'Suspect',
        aliases: ['A. Hussain', 'Ali H.'],
        contact: '+1-555-0123'
      },
      verified: true
    },
    {
      id: 'p2',
      name: 'John Chen',
      type: 'Person',
      description: 'Financial analyst, potential accomplice',
      confidence: 0.87,
      connections: 5,
      sources: ['Evidence #002', 'Evidence #007'],
      relatedEvidence: ['Email Thread.msg', 'Meeting Notes.docx'],
      relatedTasks: ['Background Check'],
      extractedFrom: 'Email Thread.msg',
      metadata: {
        role: 'Person of Interest',
        company: 'TechCorp Ltd'
      },
      verified: false
    },
    {
      id: 'p3',
      name: 'Maria Garcia',
      type: 'Person',
      description: 'Witness, bank employee',
      confidence: 0.92,
      connections: 3,
      sources: ['Evidence #005'],
      relatedEvidence: ['Witness Statement.pdf'],
      relatedTasks: ['Schedule Interview'],
      extractedFrom: 'Witness Statement.pdf',
      metadata: {
        role: 'Witness',
        position: 'Senior Teller'
      },
      verified: true
    },
    {
      id: 'l1',
      name: 'Downtown Financial Center',
      type: 'Location',
      description: 'Primary transaction location',
      confidence: 0.98,
      connections: 6,
      sources: ['Evidence #001', 'Evidence #004'],
      relatedEvidence: ['CCTV Footage.mp4', 'Transaction Log.xlsx'],
      relatedTasks: ['Site Visit', 'Collect CCTV'],
      extractedFrom: 'Transaction Log.xlsx',
      metadata: {
        address: '123 Main St, Downtown',
        coordinates: '40.7128° N, 74.0060° W'
      },
      verified: true
    },
    {
      id: 'l2',
      name: 'Server Farm - Building 42',
      type: 'Location',
      description: 'Data breach origin point',
      confidence: 0.85,
      connections: 4,
      sources: ['Evidence #003'],
      relatedEvidence: ['Server Logs.txt', 'Network Diagram.pdf'],
      relatedTasks: ['Forensic Analysis'],
      extractedFrom: 'Server Logs.txt',
      metadata: {
        address: '456 Tech Park, Silicon Valley',
        ipAddress: '192.168.1.100'
      },
      verified: false
    },
    {
      id: 'o1',
      name: 'TechCorp Ltd',
      type: 'Organization',
      description: 'Technology company involved in transactions',
      confidence: 0.93,
      connections: 7,
      sources: ['Evidence #002', 'Evidence #006'],
      relatedEvidence: ['Corporate Records.pdf', 'Email Thread.msg'],
      relatedTasks: ['Corporate Background Check', 'Subpoena Records'],
      extractedFrom: 'Corporate Records.pdf',
      metadata: {
        registration: 'DE-12345',
        founded: '2015',
        ceo: 'Sarah Johnson'
      },
      verified: true
    },
    {
      id: 'o2',
      name: 'Global Payment Systems',
      type: 'Organization',
      description: 'Payment processor used in fraud',
      confidence: 0.88,
      connections: 5,
      sources: ['Evidence #001'],
      relatedEvidence: ['Transaction Log.xlsx'],
      relatedTasks: ['Request Transaction Records'],
      extractedFrom: 'Transaction Log.xlsx',
      metadata: {
        type: 'Payment Processor',
        headquarters: 'New York, NY'
      },
      verified: true
    },
    {
      id: 'e1',
      name: 'Unauthorized Wire Transfer',
      type: 'Event',
      description: 'Primary fraudulent transaction',
      confidence: 0.96,
      connections: 9,
      sources: ['Evidence #001', 'Evidence #004', 'Evidence #005'],
      relatedEvidence: ['Bank Statement.pdf', 'Transaction Log.xlsx'],
      relatedTasks: ['Trace Funds', 'Interview Witnesses'],
      extractedFrom: 'Bank Statement.pdf',
      metadata: {
        date: '2024-10-15',
        amount: '$250,000',
        time: '14:32:15'
      },
      verified: true
    },
    {
      id: 'e2',
      name: 'System Access Breach',
      type: 'Event',
      description: 'Unauthorized system access detected',
      confidence: 0.91,
      connections: 6,
      sources: ['Evidence #003'],
      relatedEvidence: ['Server Logs.txt', 'Security Report.pdf'],
      relatedTasks: ['Forensic Analysis'],
      extractedFrom: 'Server Logs.txt',
      metadata: {
        date: '2024-10-14',
        time: '03:45:22',
        duration: '47 minutes'
      },
      verified: true
    },
    {
      id: 'ev1',
      name: 'Bank Statement.pdf',
      type: 'Evidence',
      description: 'Primary financial evidence',
      confidence: 1.0,
      connections: 12,
      sources: ['Evidence Dashboard'],
      relatedEvidence: ['Transaction Log.xlsx'],
      relatedTasks: ['Review Evidence', 'Extract Entities'],
      extractedFrom: 'Evidence Upload',
      metadata: {
        fileSize: '2.4 MB',
        pages: 45,
        uploadDate: '2024-10-20'
      },
      verified: true
    }
  ];

  const getEntityIcon = (type: string) => {
    switch (type) {
      case 'Person':
        return User;
      case 'Location':
        return MapPin;
      case 'Organization':
        return Building2;
      case 'Event':
        return Calendar;
      case 'Evidence':
        return FileText;
      default:
        return FileText;
    }
  };

  const getEntityColor = (type: string) => {
    switch (type) {
      case 'Person':
        return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'Location':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'Organization':
        return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
      case 'Event':
        return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'Evidence':
        return 'text-cyan-400 bg-cyan-500/20 border-cyan-500/30';
      default:
        return 'text-slate-400 bg-slate-500/20 border-slate-500/30';
    }
  };

  const filteredEntities = entities.filter(entity => {
    const matchesSearch = entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entity.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || entity.type === selectedType;
    return matchesSearch && matchesType;
  });

  const entityStats = {
    total: entities.length,
    persons: entities.filter(e => e.type === 'Person').length,
    locations: entities.filter(e => e.type === 'Location').length,
    organizations: entities.filter(e => e.type === 'Organization').length,
    events: entities.filter(e => e.type === 'Event').length,
    evidence: entities.filter(e => e.type === 'Evidence').length,
    verified: entities.filter(e => e.verified).length,
    avgConfidence: (entities.reduce((acc, e) => acc + e.confidence, 0) / entities.length * 100).toFixed(1)
  };

  // Show person profile if a person entity is selected
  if (showPersonProfile && selectedEntity?.type === 'Person') {
    return (
      <PersonProfile 
        entityData={selectedEntity} 
        onBack={() => {
          setShowPersonProfile(false);
          setSelectedEntity(null);
        }} 
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white text-2xl flex items-center gap-2">
            <Network className="w-7 h-7 text-cyan-400" />
            Case Entities Dashboard
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            AI-extracted entities from case evidence and tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500/30">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Powered
          </Badge>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Network className="w-4 h-4 text-slate-400" />
              <p className="text-slate-400 text-xs">Total</p>
            </div>
            <p className="text-white text-2xl">{entityStats.total}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-4 h-4 text-blue-400" />
              <p className="text-slate-400 text-xs">Persons</p>
            </div>
            <p className="text-white text-2xl">{entityStats.persons}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-green-400" />
              <p className="text-slate-400 text-xs">Locations</p>
            </div>
            <p className="text-white text-2xl">{entityStats.locations}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-purple-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-purple-400" />
              <p className="text-slate-400 text-xs">Orgs</p>
            </div>
            <p className="text-white text-2xl">{entityStats.organizations}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-orange-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-orange-400" />
              <p className="text-slate-400 text-xs">Events</p>
            </div>
            <p className="text-white text-2xl">{entityStats.events}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-cyan-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <FileText className="w-4 h-4 text-cyan-400" />
              <p className="text-slate-400 text-xs">Evidence</p>
            </div>
            <p className="text-white text-2xl">{entityStats.evidence}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <p className="text-slate-400 text-xs">Verified</p>
            </div>
            <p className="text-white text-2xl">{entityStats.verified}</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-blue-500/30">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <p className="text-slate-400 text-xs">Avg Conf</p>
            </div>
            <p className="text-white text-2xl">{entityStats.avgConfidence}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search entities by name or description..."
                className="bg-slate-800/50 border-slate-700 text-white pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedType('all')}
                className={selectedType === 'all' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-700 text-slate-300'}
              >
                All
              </Button>
              <Button
                variant={selectedType === 'Person' ? 'default' : 'outline'}
                onClick={() => setSelectedType('Person')}
                className={selectedType === 'Person' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-700 text-slate-300'}
              >
                <User className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedType === 'Location' ? 'default' : 'outline'}
                onClick={() => setSelectedType('Location')}
                className={selectedType === 'Location' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-700 text-slate-300'}
              >
                <MapPin className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedType === 'Organization' ? 'default' : 'outline'}
                onClick={() => setSelectedType('Organization')}
                className={selectedType === 'Organization' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-700 text-slate-300'}
              >
                <Building2 className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedType === 'Event' ? 'default' : 'outline'}
                onClick={() => setSelectedType('Event')}
                className={selectedType === 'Event' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-700 text-slate-300'}
              >
                <Calendar className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedType === 'Evidence' ? 'default' : 'outline'}
                onClick={() => setSelectedType('Evidence')}
                className={selectedType === 'Evidence' ? 'bg-blue-600 hover:bg-blue-700' : 'border-slate-700 text-slate-300'}
              >
                <FileText className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Entities Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredEntities.map((entity, index) => {
          const Icon = getEntityIcon(entity.type);
          return (
            <motion.div
              key={entity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all group cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg ${getEntityColor(entity.type)} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 
                            className={`text-white truncate ${entity.type === 'Person' ? 'hover:text-blue-400 cursor-pointer underline decoration-transparent hover:decoration-blue-400 transition-all' : ''}`}
                            onClick={(e) => {
                              if (entity.type === 'Person') {
                                e.stopPropagation();
                                setSelectedEntity(entity);
                                setShowPersonProfile(true);
                              }
                            }}
                          >
                            {entity.name}
                          </h3>
                          {entity.verified && (
                            <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-slate-400 text-sm">{entity.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Metadata */}
                  {entity.metadata && Object.keys(entity.metadata).length > 0 && (
                    <div className="bg-slate-950/50 rounded-lg p-3 mb-3 space-y-1">
                      {Object.entries(entity.metadata).slice(0, 3).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between text-xs">
                          <span className="text-slate-500 capitalize">{key}:</span>
                          <span className="text-slate-300">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Link2 className="w-3 h-3 text-cyan-400" />
                      <span className="text-slate-400 text-xs">{entity.connections} connections</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-slate-400 text-xs">{(entity.confidence * 100).toFixed(0)}% confidence</span>
                    </div>
                  </div>

                  {/* Source Badge */}
                  <div className="mb-3">
                    <Badge className="bg-slate-800 text-slate-300 border-slate-700 text-xs">
                      <FileText className="w-3 h-3 mr-1" />
                      Extracted from: {entity.extractedFrom}
                    </Badge>
                  </div>

                  {/* Related Items */}
                  <div className="space-y-2">
                    {entity.relatedEvidence.length > 0 && (
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Related Evidence:</p>
                        <div className="flex flex-wrap gap-1">
                          {entity.relatedEvidence.slice(0, 3).map((evidence, idx) => (
                            <Badge key={idx} className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30 text-xs">
                              {evidence}
                            </Badge>
                          ))}
                          {entity.relatedEvidence.length > 3 && (
                            <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-xs">
                              +{entity.relatedEvidence.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}

                    {entity.relatedTasks.length > 0 && (
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Related Tasks:</p>
                        <div className="flex flex-wrap gap-1">
                          {entity.relatedTasks.slice(0, 2).map((task, idx) => (
                            <Badge key={idx} className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
                              {task}
                            </Badge>
                          ))}
                          {entity.relatedTasks.length > 2 && (
                            <Badge className="bg-slate-800 text-slate-400 border-slate-700 text-xs">
                              +{entity.relatedTasks.length - 2} more
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Button
                    onClick={() => {
                      setSelectedEntity(entity);
                      if (entity.type === 'Person') {
                        setShowPersonProfile(true);
                      }
                    }}
                    className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filteredEntities.length === 0 && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <p className="text-slate-400">No entities found matching your search criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
