import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  Plus,
  Upload,
  History,
  Search,
  GitBranch,
  Zap,
  FileText,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  PlayCircle,
  MoreVertical,
  ChevronRight,
  ChevronDown,
  X,
  Edit,
  Copy,
  Download,
  Power,
  Eye,
  Activity,
  TrendingUp,
  AlertTriangle,
  Filter,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { WorkflowBuilder } from './WorkflowBuilder';
import { WorkflowAIGenerator } from './WorkflowAIGenerator';

interface WorkflowLibraryProps {
  onClose: () => void;
}

interface Workflow {
  id: string;
  name: string;
  type: 'Service' | 'Task' | 'SLA' | 'Evidence' | 'Approval' | 'Routing';
  trigger: string;
  linkedTo: string;
  status: 'Active' | 'Draft' | 'Inactive';
  lastRun: {
    time: string;
    status: 'Success' | 'Failed' | 'Warning' | 'Never';
    errorCount?: number;
  };
  description: string;
  version: string;
  runCount: number;
  createdBy: string;
  createdAt: string;
}

export function WorkflowLibrary({ onClose }: WorkflowLibraryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [showAIGenerator, setShowAIGenerator] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [createDropdownOpen, setCreateDropdownOpen] = useState(false);

  // Mock workflow data
  const workflows: Workflow[] = [
    {
      id: '1',
      name: 'Forensics Auto-Assign Workflow',
      type: 'Service',
      trigger: 'Service Request Created',
      linkedTo: 'Forensics Extraction Service',
      status: 'Active',
      lastRun: { time: '10 minutes ago', status: 'Success' },
      description: 'Automatically assigns forensics requests to available technicians based on workload and expertise.',
      version: 'v2.1',
      runCount: 134,
      createdBy: 'Admin',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'SLA Escalation Manager',
      type: 'SLA',
      trigger: 'SLA 80% Consumed',
      linkedTo: 'All Services',
      status: 'Active',
      lastRun: { time: '2 hours ago', status: 'Failed', errorCount: 2 },
      description: 'Escalates service requests when SLA consumption reaches 80% threshold.',
      version: 'v1.5',
      runCount: 89,
      createdBy: 'F. Ali',
      createdAt: '2024-02-01',
    },
    {
      id: '3',
      name: 'Cross-Dept Approval Flow',
      type: 'Approval',
      trigger: 'Service Request Created',
      linkedTo: 'DNA Analysis Service',
      status: 'Active',
      lastRun: { time: '1 day ago', status: 'Success' },
      description: 'Routes cross-department service requests through proper approval chain.',
      version: 'v1.0',
      runCount: 45,
      createdBy: 'Admin',
      createdAt: '2024-01-20',
    },
    {
      id: '4',
      name: 'Evidence Upload Validator',
      type: 'Evidence',
      trigger: 'Evidence Uploaded',
      linkedTo: 'All Case Types',
      status: 'Draft',
      lastRun: { time: 'Never', status: 'Never' },
      description: 'Validates evidence metadata and file integrity upon upload.',
      version: 'v0.3',
      runCount: 0,
      createdBy: 'Admin',
      createdAt: '2024-03-10',
    },
    {
      id: '5',
      name: 'High Priority Task Routing',
      type: 'Routing',
      trigger: 'Task Created',
      linkedTo: 'Cybercrime Case Type',
      status: 'Active',
      lastRun: { time: '30 minutes ago', status: 'Success' },
      description: 'Routes high-priority cybercrime tasks to senior investigators.',
      version: 'v1.2',
      runCount: 67,
      createdBy: 'S. Ahmed',
      createdAt: '2024-02-15',
    },
    {
      id: '6',
      name: 'Lab Report Auto-Notification',
      type: 'Service',
      trigger: 'Service Completed',
      linkedTo: 'Ballistics Analysis',
      status: 'Active',
      lastRun: { time: '5 hours ago', status: 'Warning' },
      description: 'Notifies case leads when lab reports are completed.',
      version: 'v1.1',
      runCount: 92,
      createdBy: 'F. Ali',
      createdAt: '2024-01-25',
    },
    {
      id: '7',
      name: 'Task Completion Validator',
      type: 'Task',
      trigger: 'Task Completed',
      linkedTo: 'All Tasks',
      status: 'Inactive',
      lastRun: { time: '3 days ago', status: 'Success' },
      description: 'Validates task completion requirements before marking as done.',
      version: 'v1.0',
      runCount: 28,
      createdBy: 'Admin',
      createdAt: '2024-03-01',
    },
    {
      id: '8',
      name: 'Evidence Chain-of-Custody Logger',
      type: 'Evidence',
      trigger: 'Evidence Accessed',
      linkedTo: 'All Evidence',
      status: 'Active',
      lastRun: { time: '15 minutes ago', status: 'Success' },
      description: 'Logs all evidence access events for chain-of-custody tracking.',
      version: 'v2.0',
      runCount: 156,
      createdBy: 'Admin',
      createdAt: '2024-01-10',
    },
    {
      id: '9',
      name: 'Urgent Case Escalation',
      type: 'Routing',
      trigger: 'Case Priority Changed',
      linkedTo: 'All Case Types',
      status: 'Draft',
      lastRun: { time: 'Never', status: 'Never' },
      description: 'Escalates urgent cases to department heads.',
      version: 'v0.5',
      runCount: 0,
      createdBy: 'S. Ahmed',
      createdAt: '2024-03-12',
    },
    {
      id: '10',
      name: 'Service Quality Feedback',
      type: 'Service',
      trigger: 'Service Completed',
      linkedTo: 'All Services',
      status: 'Active',
      lastRun: { time: '1 hour ago', status: 'Success' },
      description: 'Sends feedback request to service requesters after completion.',
      version: 'v1.3',
      runCount: 73,
      createdBy: 'F. Ali',
      createdAt: '2024-02-20',
    },
    {
      id: '11',
      name: 'Weekly Report Generator',
      type: 'Task',
      trigger: 'Schedule: Weekly',
      linkedTo: 'All Departments',
      status: 'Active',
      lastRun: { time: '2 days ago', status: 'Success' },
      description: 'Generates weekly activity reports for department admins.',
      version: 'v1.0',
      runCount: 12,
      createdBy: 'Admin',
      createdAt: '2024-02-05',
    },
    {
      id: '12',
      name: 'SLA Breach Notification',
      type: 'SLA',
      trigger: 'SLA Breached',
      linkedTo: 'All Services',
      status: 'Active',
      lastRun: { time: '6 hours ago', status: 'Success' },
      description: 'Notifies stakeholders when service SLAs are breached.',
      version: 'v1.4',
      runCount: 42,
      createdBy: 'Admin',
      createdAt: '2024-01-18',
    },
  ];

  // Mock run volume data
  const runVolumeData = [
    { day: 'Mon', success: 45, warning: 5, failed: 2 },
    { day: 'Tue', success: 52, warning: 3, failed: 1 },
    { day: 'Wed', success: 48, warning: 7, failed: 3 },
    { day: 'Thu', success: 61, warning: 4, failed: 0 },
    { day: 'Fri', success: 55, warning: 6, failed: 2 },
    { day: 'Sat', success: 38, warning: 2, failed: 1 },
    { day: 'Sun', success: 42, warning: 3, failed: 0 },
  ];

  // Mock top workflows data
  const topWorkflowsData = workflows
    .filter(w => w.runCount > 0)
    .sort((a, b) => b.runCount - a.runCount)
    .slice(0, 5)
    .map(w => ({ name: w.name, runs: w.runCount }));

  // Mock run history
  const runHistory = [
    { time: '10 minutes ago', status: 'Success', duration: '2.3s' },
    { time: '45 minutes ago', status: 'Success', duration: '1.8s' },
    { time: '2 hours ago', status: 'Failed', duration: '0.5s', error: 'Node timeout' },
    { time: '5 hours ago', status: 'Success', duration: '2.1s' },
    { time: '1 day ago', status: 'Success', duration: '2.0s' },
  ];

  // Mock alerts
  const alerts = [
    {
      id: 1,
      message: "Workflow 'SLA Escalation Manager' failed 2 times in last hour",
      severity: 'high',
      workflow: 'SLA Escalation Manager',
    },
    {
      id: 2,
      message: "Node missing assignment rule in 'Cross-Dept Approval Flow'",
      severity: 'medium',
      workflow: 'Cross-Dept Approval Flow',
    },
    {
      id: 3,
      message: "Workflow orphaned: 'Vehicle Lookup Service' was deleted",
      severity: 'medium',
      workflow: 'Vehicle Auto-Lookup',
    },
  ];

  // Filter workflows
  const filteredWorkflows = workflows.filter((workflow) => {
    const matchesSearch =
      searchQuery === '' ||
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.trigger.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.linkedTo.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || workflow.status === statusFilter;
    const matchesType = typeFilter === 'All' || workflow.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate KPIs
  const totalWorkflows = workflows.length;
  const activeWorkflows = workflows.filter((w) => w.status === 'Active').length;
  const draftWorkflows = workflows.filter((w) => w.status === 'Draft').length;
  const failedRuns = workflows.filter((w) => w.lastRun.status === 'Failed').length;
  const mostActiveWorkflow = workflows.reduce((max, w) => (w.runCount > max.runCount ? w : max), workflows[0]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Service':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Task':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'SLA':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Evidence':
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
      case 'Approval':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Routing':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Draft':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Inactive':
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getRunStatusIcon = (status: string) => {
    switch (status) {
      case 'Success':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Failed':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'Warning':
        return <AlertCircle className="w-4 h-4 text-amber-400" />;
      case 'Never':
        return <Clock className="w-4 h-4 text-slate-500" />;
      default:
        return <Clock className="w-4 h-4 text-slate-500" />;
    }
  };

  // If workflow builder is open, show it
  if (showWorkflowBuilder) {
    return <WorkflowBuilder onClose={() => setShowWorkflowBuilder(false)} />;
  }

  // If AI generator is open, show it
  if (showAIGenerator) {
    return (
      <WorkflowAIGenerator 
        onClose={() => setShowAIGenerator(false)} 
        onGenerate={() => {
          setShowAIGenerator(false);
          setShowWorkflowBuilder(true);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-800 bg-slate-900/30">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h1 className="text-3xl text-white mb-1">Workflows</h1>
                <p className="text-slate-400">
                  Manage automation workflows for services, tasks, routing, approvals, and SLAs.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button 
                  onClick={() => setShowWorkflowBuilder(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Workflow
                </Button>
                <Button 
                  onClick={() => setShowAIGenerator(true)}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  ✨ Generate with AI
                </Button>
                <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Workflow
                </Button>
                <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                  <History className="w-4 h-4 mr-2" />
                  View Audit Log
                </Button>
                <Button
                  onClick={onClose}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  <X className="w-4 h-4 mr-2" />
                  Exit
                </Button>
              </div>
            </div>
          </div>

          {/* KPI Summary Row */}
          <div className="px-8 py-6 bg-slate-900/20">
            <div className="grid grid-cols-4 gap-4">
              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                      <GitBranch className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl text-white">{activeWorkflows}</p>
                      <p className="text-xs text-slate-400">Active Workflows</p>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">{totalWorkflows} total workflows</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-2xl text-white">{draftWorkflows}</p>
                      <p className="text-xs text-slate-400">Draft Workflows</p>
                    </div>
                  </div>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                    Needs Review
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <p className="text-2xl text-white">{failedRuns}</p>
                      <p className="text-xs text-slate-400">Failed Runs (24h)</p>
                    </div>
                  </div>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                    Requires Attention
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-slate-900/50 border-slate-800">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-white truncate">{mostActiveWorkflow.name}</p>
                      <p className="text-xs text-slate-400">Most Active</p>
                    </div>
                  </div>
                  <p className="text-xs text-green-400">{mostActiveWorkflow.runCount} runs</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="px-8 py-4 bg-slate-900/10 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search workflows by name, service, or trigger..."
                  className="w-full pl-9 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <Button
                  onClick={() => setStatusFilter(statusFilter === 'All' ? 'Active' : 'All')}
                  className={`text-xs ${
                    statusFilter === 'Active'
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                  }`}
                >
                  Status: {statusFilter}
                </Button>
                <Button
                  onClick={() => {
                    const types = ['All', 'Service', 'Task', 'SLA', 'Evidence', 'Approval', 'Routing'];
                    const currentIndex = types.indexOf(typeFilter);
                    setTypeFilter(types[(currentIndex + 1) % types.length]);
                  }}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                >
                  Type: {typeFilter}
                </Button>
              </div>
            </div>
          </div>

          {/* Workflow Table */}
          <div className="flex-1 overflow-auto px-8 py-6">
            <Card className="bg-slate-900/30 border-slate-800">
              <div className="overflow-hidden rounded-lg">
                <table className="w-full">
                  <thead className="bg-slate-800/50 border-b border-slate-700">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm text-slate-400">Workflow Name</th>
                      <th className="text-left px-6 py-4 text-sm text-slate-400">Type</th>
                      <th className="text-left px-6 py-4 text-sm text-slate-400">Trigger</th>
                      <th className="text-left px-6 py-4 text-sm text-slate-400">Linked To</th>
                      <th className="text-left px-6 py-4 text-sm text-slate-400">Status</th>
                      <th className="text-left px-6 py-4 text-sm text-slate-400">Last Run</th>
                      <th className="w-16"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredWorkflows.map((workflow, idx) => (
                      <tr
                        key={workflow.id}
                        onClick={() => setSelectedWorkflow(workflow)}
                        className={`border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer ${
                          idx % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-900/40'
                        }`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center">
                              <Zap className="w-4 h-4 text-blue-400" />
                            </div>
                            <div>
                              <p className="text-sm text-white">{workflow.name}</p>
                              <p className="text-xs text-slate-500">Version {workflow.version}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getTypeColor(workflow.type)}>{workflow.type}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-300">{workflow.trigger}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-300">{workflow.linkedTo}</p>
                        </td>
                        <td className="px-6 py-4">
                          <Badge className={getStatusColor(workflow.status)}>{workflow.status}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getRunStatusIcon(workflow.lastRun.status)}
                            <div>
                              <p className="text-sm text-slate-300">{workflow.lastRun.time}</p>
                              {workflow.lastRun.errorCount && (
                                <p className="text-xs text-red-400">{workflow.lastRun.errorCount} errors</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-slate-900 border-slate-700">
                              <DropdownMenuItem
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShowWorkflowBuilder(true);
                                }}
                                className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800"
                              >
                                <Edit className="w-4 h-4 mr-2" />
                                Open in Builder
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">
                                <Copy className="w-4 h-4 mr-2" />
                                Clone Workflow
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">
                                <Power className="w-4 h-4 mr-2" />
                                Deactivate
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-slate-300 hover:bg-slate-800 focus:bg-slate-800">
                                <Eye className="w-4 h-4 mr-2" />
                                View Run History
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Analytics Section */}
          <div className="px-8 py-6 border-t border-slate-800 bg-slate-900/20">
            <div className="grid grid-cols-2 gap-6">
              {/* Workflow Run Volume */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-base flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-400" />
                    Workflow Run Volume (Last 7 Days)
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Daily execution counts by result status
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={runVolumeData}>
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
                      <Bar dataKey="success" stackId="a" fill="#10B981" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="warning" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                      <Bar dataKey="failed" stackId="a" fill="#EF4444" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-xs text-slate-400">Success</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-xs text-slate-400">Warning</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-xs text-slate-400">Failed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Workflows by Usage */}
              <Card className="bg-slate-900/50 border-slate-800">
                <CardHeader>
                  <CardTitle className="text-white text-base flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    Top Workflows by Usage
                  </CardTitle>
                  <CardDescription className="text-slate-500">
                    Most frequently executed workflows
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topWorkflowsData.map((workflow, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-slate-300 truncate flex-1">{workflow.name}</span>
                          <span className="text-sm text-blue-400 ml-2">{workflow.runs} runs</span>
                        </div>
                        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                            style={{
                              width: `${(workflow.runs / topWorkflowsData[0].runs) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Side Panel - Workflow Details */}
        {selectedWorkflow && (
          <div className="w-96 border-l border-slate-800 bg-slate-900/50 flex flex-col">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <h2 className="text-white">Workflow Details</h2>
              <Button
                size="sm"
                onClick={() => setSelectedWorkflow(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <ScrollArea className="flex-1">
              <div className="px-6 py-4 space-y-6">
                {/* Workflow Overview */}
                <div>
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-blue-400" />
                    Overview
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500">Name</label>
                      <p className="text-sm text-white">{selectedWorkflow.name}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Description</label>
                      <p className="text-sm text-slate-300">{selectedWorkflow.description}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-slate-500">Type</label>
                        <Badge className={`${getTypeColor(selectedWorkflow.type)} mt-1`}>
                          {selectedWorkflow.type}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500">Status</label>
                        <Badge className={`${getStatusColor(selectedWorkflow.status)} mt-1`}>
                          {selectedWorkflow.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Trigger</label>
                      <p className="text-sm text-slate-300">{selectedWorkflow.trigger}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Linked To</label>
                      <p className="text-sm text-slate-300">{selectedWorkflow.linkedTo}</p>
                    </div>
                  </div>
                </div>

                <Separator className="bg-slate-800" />

                {/* Status & Versioning */}
                <div>
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-purple-400" />
                    Status & Versioning
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-slate-500">Current Version</label>
                      <p className="text-sm text-white">{selectedWorkflow.version}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Total Runs</label>
                      <p className="text-sm text-white">{selectedWorkflow.runCount}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Created By</label>
                      <p className="text-sm text-slate-300">{selectedWorkflow.createdBy}</p>
                    </div>
                    <div>
                      <label className="text-xs text-slate-500">Created At</label>
                      <p className="text-sm text-slate-300">{selectedWorkflow.createdAt}</p>
                    </div>
                    <Button
                      onClick={() => setShowWorkflowBuilder(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Open in Workflow Builder
                    </Button>
                  </div>
                </div>

                <Separator className="bg-slate-800" />

                {/* Run History Preview */}
                <div>
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <History className="w-4 h-4 text-cyan-400" />
                    Run History
                  </h3>
                  <div className="space-y-2">
                    {runHistory.slice(0, 5).map((run, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 border border-slate-700"
                      >
                        <div className="flex items-center gap-2">
                          {getRunStatusIcon(run.status)}
                          <div>
                            <p className="text-xs text-slate-300">{run.time}</p>
                            {run.error && <p className="text-xs text-red-400">{run.error}</p>}
                          </div>
                        </div>
                        <span className="text-xs text-slate-500">{run.duration}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
                    View Full Run Logs
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>

                <Separator className="bg-slate-800" />

                {/* Mini Workflow Map */}
                <div>
                  <h3 className="text-white mb-3 flex items-center gap-2">
                    <GitBranch className="w-4 h-4 text-green-400" />
                    Workflow Preview
                  </h3>
                  <div className="p-4 rounded-lg bg-slate-800/30 border border-slate-700">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-lg bg-blue-600/20 border border-blue-500/50 flex items-center justify-center">
                        <PlayCircle className="w-5 h-5 text-blue-400" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                      <div className="w-12 h-12 rounded-lg bg-purple-600/20 border border-purple-500/50 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-400" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-600" />
                      <div className="w-12 h-12 rounded-lg bg-green-600/20 border border-green-500/50 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 text-center mt-2">Simplified workflow diagram</p>
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Alerts Sidebar */}
        <div className="w-80 border-l border-slate-800 bg-slate-900/30 flex flex-col">
          <div className="px-6 py-4 border-b border-slate-800">
            <h2 className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Alerts & Issues
            </h2>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-6 py-4 space-y-3">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`border ${
                    alert.severity === 'high'
                      ? 'bg-red-900/20 border-red-500/30'
                      : 'bg-amber-900/20 border-amber-500/30'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle
                        className={`w-5 h-5 flex-shrink-0 ${
                          alert.severity === 'high' ? 'text-red-400' : 'text-amber-400'
                        }`}
                      />
                      <div className="flex-1">
                        <p className="text-sm text-white mb-2">{alert.message}</p>
                        <Badge
                          className={
                            alert.severity === 'high'
                              ? 'bg-red-500/20 text-red-400 border-red-500/30 text-xs'
                              : 'bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs'
                          }
                        >
                          {alert.workflow}
                        </Badge>
                      </div>
                    </div>
                    <Button className="w-full mt-3 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}