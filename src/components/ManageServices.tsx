import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Search,
  Filter,
  Plus,
  History,
  Briefcase,
  Globe,
  AlertCircle,
  CheckCircle2,
  Clock,
  Shield,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  MoreVertical,
  Edit,
  Copy,
  Power,
  Settings,
  X,
  Sparkles,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { ServiceTemplateEditor } from './ServiceTemplateEditor';
import { ServiceAIBuilder } from './ServiceAIBuilder';

interface Service {
  id: string;
  name: string;
  type: 'Internal' | 'Published';
  template: string;
  templateComplete: boolean;
  sla: string;
  approvalRule: string;
  assignedRole: string;
  status: 'Active' | 'Inactive';
  description?: string;
  category?: string;
}

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'upload' | 'dropdown' | 'date';
  required: boolean;
}

export function ManageServices() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'All' | 'Internal' | 'Published'>('All');
  const [selectedStatus, setSelectedStatus] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [selectedSLA, setSelectedSLA] = useState<'All' | '≤24h' | '24-48h' | '>48h'>('All');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'list' | 'editor' | 'ai-builder'>('list');

  // Mock services data
  const services: Service[] = [
    {
      id: '1',
      name: 'Witness Interview Service',
      type: 'Internal',
      template: 'Interview Template',
      templateComplete: true,
      sla: '24 hours',
      approvalRule: 'Dept Head Approval Required',
      assignedRole: 'Senior Investigator',
      status: 'Active',
      description: 'Structured witness interview and documentation',
      category: 'Investigation',
    },
    {
      id: '2',
      name: 'Digital Forensics Extraction',
      type: 'Published',
      template: 'Digital Forensics Template',
      templateComplete: true,
      sla: '48 hours',
      approvalRule: 'Auto-Assign to Forensics Analyst Role',
      assignedRole: 'Forensics Analyst',
      status: 'Active',
      description: 'Digital evidence extraction and analysis',
      category: 'Forensics',
    },
    {
      id: '3',
      name: 'Vehicle Data Lookup',
      type: 'Published',
      template: 'Vehicle Lookup Template',
      templateComplete: false,
      sla: '12 hours',
      approvalRule: 'Auto-Assign to Data Analyst Role',
      assignedRole: 'Data Analyst',
      status: 'Active',
      description: 'Vehicle registration and history lookup',
      category: 'Data Services',
    },
    {
      id: '4',
      name: 'Lab Analysis Service',
      type: 'Internal',
      template: 'Lab Analysis Template',
      templateComplete: false,
      sla: '72 hours',
      approvalRule: 'Dept Head Approval Required',
      assignedRole: 'Lab Technician',
      status: 'Active',
      description: 'Laboratory testing and analysis',
      category: 'Forensics',
    },
    {
      id: '5',
      name: 'Background Check Service',
      type: 'Published',
      template: 'Background Check Template',
      templateComplete: true,
      sla: '24 hours',
      approvalRule: 'Auto-Assign to Background Investigator Role',
      assignedRole: 'Background Investigator',
      status: 'Active',
      description: 'Comprehensive background investigation',
      category: 'Investigation',
    },
    {
      id: '6',
      name: 'Evidence Chain of Custody',
      type: 'Internal',
      template: 'Chain of Custody Template',
      templateComplete: true,
      sla: '6 hours',
      approvalRule: 'Auto-Assign to Evidence Manager Role',
      assignedRole: 'Evidence Manager',
      status: 'Inactive',
      description: 'Track evidence handling and transfers',
      category: 'Evidence',
    },
  ];

  // Mock template fields
  const templateFields: TemplateField[] = [
    { id: '1', label: 'Suspect ID', type: 'text', required: true },
    { id: '2', label: 'Evidence File', type: 'upload', required: true },
    { id: '3', label: 'Location', type: 'dropdown', required: false },
    { id: '4', label: 'Incident Date', type: 'date', required: true },
  ];

  // Mock analytics data
  const usageTrendData = [
    { day: 'Mon', witness: 12, forensics: 8, vehicle: 15, lab: 5, background: 10 },
    { day: 'Tue', witness: 15, forensics: 11, vehicle: 18, lab: 7, background: 12 },
    { day: 'Wed', witness: 10, forensics: 9, vehicle: 14, lab: 6, background: 9 },
    { day: 'Thu', witness: 18, forensics: 13, vehicle: 20, lab: 8, background: 15 },
    { day: 'Fri', witness: 14, forensics: 10, vehicle: 16, lab: 6, background: 11 },
    { day: 'Sat', witness: 8, forensics: 5, vehicle: 10, lab: 3, background: 6 },
    { day: 'Sun', witness: 6, forensics: 4, vehicle: 8, lab: 2, background: 5 },
  ];

  const slaPerformanceData = [
    { week: 'W1', compliance: 94 },
    { week: 'W2', compliance: 91 },
    { week: 'W3', compliance: 95 },
    { week: 'W4', compliance: 89 },
  ];

  // Filter services
  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'All' || service.type === selectedType;
    const matchesStatus = selectedStatus === 'All' || service.status === selectedStatus;
    const matchesSLA =
      selectedSLA === 'All' ||
      (selectedSLA === '≤24h' && parseInt(service.sla) <= 24) ||
      (selectedSLA === '24-48h' && parseInt(service.sla) > 24 && parseInt(service.sla) <= 48) ||
      (selectedSLA === '>48h' && parseInt(service.sla) > 48);
    return matchesSearch && matchesType && matchesStatus && matchesSLA;
  });

  // Calculate KPIs
  const activeServices = services.filter((s) => s.status === 'Active').length;
  const publishedServices = services.filter((s) => s.type === 'Published').length;
  const templatesNeedingUpdates = services.filter((s) => !s.templateComplete).length;
  const avgSLACompliance = 91;

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
    setIsPanelOpen(true);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    setTimeout(() => setSelectedService(null), 300);
  };

  // Show template editor view
  if (currentView === 'editor') {
    return <ServiceTemplateEditor onClose={() => setCurrentView('list')} />;
  }

  // Show AI builder view
  if (currentView === 'ai-builder') {
    return <ServiceAIBuilder onClose={() => setCurrentView('list')} />;
  }

  return (
    <div className="space-y-6">
      {/* 1. Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-white text-2xl">Services & Service Templates</h1>
            <p className="text-slate-400 text-sm">Manage department services, templates, SLAs, and publication rules.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              <History className="w-4 h-4 mr-2" />
              View Service Change Log
            </Button>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              onClick={() => setCurrentView('ai-builder')}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create with AI
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              onClick={() => setCurrentView('editor')}
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Service
            </Button>
          </div>
        </div>
        <Separator className="bg-slate-800 mt-4" />
      </div>

      {/* 2. KPI Summary Row */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-2xl text-white mb-1">{activeServices}</p>
            <p className="text-slate-400 text-sm">Active Services</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-2xl text-white mb-1">{publishedServices}</p>
            <p className="text-slate-400 text-sm">Published Services</p>
            <p className="text-xs text-slate-500 mt-1">To other departments</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <p className="text-2xl text-white mb-1">{templatesNeedingUpdates}</p>
            <p className="text-slate-400 text-sm">Templates Needing Updates</p>
            <p className="text-xs text-amber-400 mt-1">Missing required fields</p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900/50 border-slate-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-2xl text-white mb-1">{avgSLACompliance}%</p>
            <p className="text-slate-400 text-sm">SLA Compliance</p>
            <Progress value={avgSLACompliance} className="h-1.5 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* 3. Search + Filters Row */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search services or templates..."
                  className="pl-9 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              
              {/* Service Type Filter */}
              <Select value={selectedType} onValueChange={(value: any) => setSelectedType(value)}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="All" className="text-white">All Types</SelectItem>
                  <SelectItem value="Internal" className="text-white">Internal</SelectItem>
                  <SelectItem value="Published" className="text-white">Published</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={selectedStatus} onValueChange={(value: any) => setSelectedStatus(value)}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="All" className="text-white">All Status</SelectItem>
                  <SelectItem value="Active" className="text-white">Active</SelectItem>
                  <SelectItem value="Inactive" className="text-white">Inactive</SelectItem>
                </SelectContent>
              </Select>

              {/* SLA Filter */}
              <Select value={selectedSLA} onValueChange={(value: any) => setSelectedSLA(value)}>
                <SelectTrigger className="w-[140px] bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-700">
                  <SelectItem value="All" className="text-white">All SLA</SelectItem>
                  <SelectItem value="≤24h" className="text-white">≤ 24h</SelectItem>
                  <SelectItem value="24-48h" className="text-white">24-48h</SelectItem>
                  <SelectItem value=">48h" className="text-white">&gt; 48h</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 6. Alerts & Issues Panel */}
      <Card className="bg-slate-900/50 border-amber-500/30">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <CardTitle className="text-white text-base">Service Configuration Alerts</CardTitle>
              <CardDescription className="text-slate-400 text-sm">Issues requiring attention</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-white">Template fields missing for 'Lab Analysis Service'</p>
                <p className="text-xs text-slate-400 mt-1">2 required fields not configured</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-white">SLA too high for 'Vehicle Lookup Service'</p>
                <p className="text-xs text-slate-400 mt-1">Consider reducing from 12h to match industry standards</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-white">4 active requests breaching SLA this week</p>
                <p className="text-xs text-slate-400 mt-1">Forensics and Lab services affected</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 4. Main Table – Services List */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white">All Services ({filteredServices.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700">
                <tr>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Service Name</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Service Type</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Linked Template</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">SLA</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Approval Rule</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Assigned Role</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Status</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service, idx) => (
                  <tr
                    key={service.id}
                    className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer ${
                      idx % 2 === 0 ? 'bg-slate-900/20' : ''
                    }`}
                    onClick={() => handleServiceClick(service)}
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                          {service.category === 'Investigation' && <Users className="w-4 h-4 text-blue-400" />}
                          {service.category === 'Forensics' && <Shield className="w-4 h-4 text-purple-400" />}
                          {service.category === 'Data Services' && <FileText className="w-4 h-4 text-cyan-400" />}
                          {service.category === 'Evidence' && <Briefcase className="w-4 h-4 text-green-400" />}
                        </div>
                        <span className="text-sm text-white">{service.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          service.type === 'Published'
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }
                      >
                        {service.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-300">{service.template}</span>
                        {!service.templateComplete && (
                          <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                            Incomplete
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span className="text-sm text-slate-300">{service.sla}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{service.approvalRule}</td>
                    <td className="px-4 py-3">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {service.assignedRole}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {service.status === 'Active' ? (
                          <>
                            <div className="w-2 h-2 rounded-full bg-green-400" />
                            <span className="text-sm text-green-400">Active</span>
                          </>
                        ) : (
                          <>
                            <div className="w-2 h-2 rounded-full bg-slate-500" />
                            <span className="text-sm text-slate-500">Inactive</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-white hover:bg-slate-700">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700">
                          <DropdownMenuItem className="text-white hover:bg-slate-800">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Service
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-800">
                            <FileText className="w-4 h-4 mr-2" />
                            Edit Template
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-800">
                            <Copy className="w-4 h-4 mr-2" />
                            Clone
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-800">
                            <Power className="w-4 h-4 mr-2" />
                            Deactivate
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-white hover:bg-slate-800">
                            <Globe className="w-4 h-4 mr-2" />
                            {service.type === 'Published' ? 'Unpublish' : 'Publish'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 7. Bottom Section — Analytics */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Service Usage Trends */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white text-base">Service Usage Trends</CardTitle>
                <CardDescription className="text-slate-400 text-sm">Last 7 days</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usageTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Bar dataKey="witness" stackId="a" fill="#3B82F6" />
                <Bar dataKey="forensics" stackId="a" fill="#8B5CF6" />
                <Bar dataKey="vehicle" stackId="a" fill="#06B6D4" />
                <Bar dataKey="lab" stackId="a" fill="#F59E0B" />
                <Bar dataKey="background" stackId="a" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-xs text-slate-400">Witness Interview</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-xs text-slate-400">Forensics</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-cyan-500" />
                <span className="text-xs text-slate-400">Vehicle Lookup</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-xs text-slate-400">Lab Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-slate-400">Background Check</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right: SLA Performance */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-white text-base">SLA Performance</CardTitle>
                <CardDescription className="text-slate-400 text-sm">Last 4 weeks compliance trend</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={slaPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="week" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[85, 100]} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Line type="monotone" dataKey="compliance" stroke="#10B981" strokeWidth={3} dot={{ fill: '#10B981', r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-3">
              <p className="text-xs text-slate-400 mb-2">Per-Service Breakdown (Current Week)</p>
              {[
                { name: 'Witness Interview', compliance: 96 },
                { name: 'Digital Forensics', compliance: 92 },
                { name: 'Vehicle Lookup', compliance: 88 },
                { name: 'Lab Analysis', compliance: 85 },
              ].map((service) => (
                <div key={service.name}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-slate-300">{service.name}</span>
                    <span className="text-xs text-slate-400">{service.compliance}%</span>
                  </div>
                  <Progress value={service.compliance} className="h-1.5" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 5. Right-Hand Slide-In Panel */}
      <Sheet open={isPanelOpen} onOpenChange={setIsPanelOpen}>
        <SheetContent className="w-[600px] bg-white border-l border-slate-200 overflow-y-auto" side="right">
          {selectedService && (
            <>
              <SheetHeader className="border-b border-slate-200 pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <SheetTitle className="text-slate-900 text-xl">{selectedService.name}</SheetTitle>
                    <SheetDescription className="text-slate-600 mt-1">
                      Configure service settings and templates
                    </SheetDescription>
                  </div>
                  <Button variant="ghost" size="icon" onClick={handleClosePanel} className="text-slate-600 hover:text-slate-900">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </SheetHeader>

              <ScrollArea className="h-[calc(100vh-120px)] pr-4">
                <div className="space-y-6 py-6">
                  {/* Service Overview */}
                  <div>
                    <h3 className="text-slate-900 font-medium mb-4 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Service Overview
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-700">Service Name</Label>
                        <Input value={selectedService.name} className="mt-1 bg-slate-50 border-slate-300 text-slate-900" />
                      </div>
                      <div>
                        <Label className="text-slate-700">Service Type</Label>
                        <div className="flex items-center gap-4 mt-2">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={selectedService.type === 'Internal'} className="text-blue-600" />
                            <span className="text-sm text-slate-700">Internal</span>
                          </label>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" checked={selectedService.type === 'Published'} className="text-blue-600" />
                            <span className="text-sm text-slate-700">Published</span>
                          </label>
                        </div>
                      </div>
                      <div>
                        <Label className="text-slate-700">Description</Label>
                        <Textarea value={selectedService.description} className="mt-1 bg-slate-50 border-slate-300 text-slate-900" rows={3} />
                      </div>
                      <div>
                        <Label className="text-slate-700">Assigned Role</Label>
                        <Select value={selectedService.assignedRole}>
                          <SelectTrigger className="mt-1 bg-slate-50 border-slate-300 text-slate-900">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-300">
                            <SelectItem value="Senior Investigator">Senior Investigator</SelectItem>
                            <SelectItem value="Forensics Analyst">Forensics Analyst</SelectItem>
                            <SelectItem value="Data Analyst">Data Analyst</SelectItem>
                            <SelectItem value="Lab Technician">Lab Technician</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-200" />

                  {/* Template Configuration */}
                  <div>
                    <h3 className="text-slate-900 font-medium mb-4 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Template Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <Label className="text-slate-700">Linked Template: {selectedService.template}</Label>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              setIsPanelOpen(false);
                              setCurrentView('editor');
                            }}
                          >
                            Edit Template
                          </Button>
                        </div>
                        {!selectedService.templateComplete && (
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                            <div className="flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5" />
                              <div>
                                <p className="text-sm text-amber-900 font-medium">Template Incomplete</p>
                                <p className="text-xs text-amber-700 mt-1">2 required fields not configured</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        <Label className="text-slate-700 mb-2 block">Required Input Fields</Label>
                        <div className="space-y-2">
                          {templateFields.map((field) => (
                            <div key={field.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm text-slate-900">{field.label}</p>
                                  <p className="text-xs text-slate-600 mt-0.5">Type: {field.type}</p>
                                </div>
                                {field.required && (
                                  <Badge className="bg-red-100 text-red-700 border-red-300 text-xs">
                                    Required
                                  </Badge>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-200" />

                  {/* SLA Configuration */}
                  <div>
                    <h3 className="text-slate-900 font-medium mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      SLA Configuration
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-700">SLA Duration</Label>
                        <Input value={selectedService.sla} className="mt-1 bg-slate-50 border-slate-300 text-slate-900" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <Label className="text-slate-700 text-sm">SLA depends on request priority</Label>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-200" />

                  {/* Approval & Routing */}
                  <div>
                    <h3 className="text-slate-900 font-medium mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Approval & Routing
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                        <Label className="text-slate-700 text-sm">Department Head Approval Required</Label>
                        <Switch checked={selectedService.approvalRule.includes('Dept Head')} />
                      </div>
                      <div>
                        <Label className="text-slate-700">Auto-Assign Rule</Label>
                        <Select value={selectedService.assignedRole}>
                          <SelectTrigger className="mt-1 bg-slate-50 border-slate-300 text-slate-900">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-slate-300">
                            <SelectItem value="Senior Investigator">Senior Investigator Role</SelectItem>
                            <SelectItem value="Forensics Analyst">Forensics Analyst Role</SelectItem>
                            <SelectItem value="Data Analyst">Data Analyst Role</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-slate-200" />

                  {/* Service Lifecycle */}
                  <div>
                    <h3 className="text-slate-900 font-medium mb-4 flex items-center gap-2">
                      <Power className="w-4 h-4" />
                      Service Lifecycle
                    </h3>
                    <div className="space-y-3">
                      <Button
                        className={`w-full ${
                          selectedService.status === 'Active'
                            ? 'bg-red-600 hover:bg-red-700 text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {selectedService.status === 'Active' ? 'Deactivate Service' : 'Activate Service'}
                      </Button>
                      <Button
                        className={`w-full ${
                          selectedService.type === 'Published'
                            ? 'bg-slate-600 hover:bg-slate-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        {selectedService.type === 'Published' ? 'Unpublish Service' : 'Publish Service'}
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}