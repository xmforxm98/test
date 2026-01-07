import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import {
  Search,
  Plus,
  History,
  Shield,
  FileText,
  Users,
  TrendingUp,
  AlertTriangle,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  GitBranch,
  User,
  UserPlus,
  Edit,
  RefreshCw,
  ChevronLeft,
  Building2,
  BarChart3,
  Activity,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { ManageServices } from './ManageServices';
import { WorkflowBuilder } from './WorkflowBuilder';
import { WorkflowLibrary } from './WorkflowLibrary';
import { ServiceTemplateEditor } from './ServiceTemplateEditor';

export function DeptAdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'dashboard' | 'services' | 'workflow' | 'createService'>('dashboard');
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);

  // Mock data for SLA trends
  const slaTrendData = [
    { month: 'Jan', sla: 94 },
    { month: 'Feb', sla: 92 },
    { month: 'Mar', sla: 95 },
    { month: 'Apr', sla: 91 },
    { month: 'May', sla: 93 },
    { month: 'Jun', sla: 92 },
  ];

  // Mock data for workload distribution
  const workloadData = [
    { role: 'Case Leads', count: 8, color: '#3B82F6' },
    { role: 'Investigators', count: 15, color: '#06B6D4' },
    { role: 'Analysts', count: 12, color: '#8B5CF6' },
    { role: 'Specialists', count: 7, color: '#10B981' },
  ];

  // Mock data for service usage
  const serviceUsageData = [
    { service: 'Forensics Report', requests: 45 },
    { service: 'DNA Analysis', requests: 32 },
    { service: 'Ballistics', requests: 28 },
    { service: 'Digital Forensics', requests: 38 },
    { service: 'Toxicology', requests: 22 },
  ];

  // Mock alerts data
  const alerts = [
    {
      id: 1,
      type: 'SLA Breach',
      description: 'Forensics Report Service exceeded 24h SLA',
      priority: 'High',
      time: '15 min ago',
    },
    {
      id: 2,
      type: 'Role Mapping',
      description: 'Role "Digital Analyst" missing System Role mapping',
      priority: 'Medium',
      time: '1h ago',
    },
    {
      id: 3,
      type: 'Permission Issue',
      description: 'Member "Sarah Ahmed" missing required permissions',
      priority: 'Medium',
      time: '2h ago',
    },
    {
      id: 4,
      type: 'Cross-Dept Request',
      description: 'Pending cross-department service publication request',
      priority: 'Low',
      time: '3h ago',
    },
    {
      id: 5,
      type: 'SLA Warning',
      description: 'DNA Analysis service approaching SLA threshold',
      priority: 'Medium',
      time: '4h ago',
    },
  ];

  // Mock activity feed
  const activities = [
    { id: 1, action: 'Workflow updated', user: 'Admin', detail: 'Workflow "Cross-Dept Approval" configuration updated', time: '5 min ago', icon: Zap },
    { id: 2, action: 'New member added', user: 'Admin', detail: 'Omar Khan joined as Investigator', time: '10 min ago', icon: UserPlus },
    { id: 3, action: 'Service template edited', user: 'F. Ali', detail: 'Updated "Forensics Report" SLA to 18h', time: '45 min ago', icon: Edit },
    { id: 4, action: 'Workflow activated', user: 'Admin', detail: 'Workflow "Auto-Assign High Priority" is now active', time: '1h ago', icon: Zap },
    { id: 5, action: 'Role mapping updated', user: 'Admin', detail: 'Mapped "Lab Technician" to System Role', time: '2h ago', icon: Shield },
    { id: 6, action: 'Cross-dept request approved', user: 'Dept Admin', detail: 'Approved CID access to DNA Analysis', time: '3h ago', icon: CheckCircle },
    { id: 7, action: 'IAM sync completed', user: 'System', detail: 'Synced 42 members from Heimdall', time: '5h ago', icon: RefreshCw },
    { id: 8, action: 'Service created', user: 'Admin', detail: 'Created "Digital Forensics" service', time: '6h ago', icon: Plus },
  ];

  // Show Manage Services view
  if (currentView === 'services') {
    return (
      <div className="space-y-6">
        {/* Back button */}
        <Button
          onClick={() => setCurrentView('dashboard')}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
        <ManageServices />
      </div>
    );
  }

  // Show Workflow Builder
  if (showWorkflowBuilder) {
    return <WorkflowBuilder onClose={() => setShowWorkflowBuilder(false)} />;
  }

  // Show Workflow Library view
  if (currentView === 'workflow') {
    return <WorkflowLibrary onClose={() => setCurrentView('dashboard')} />;
  }

  // Show Service Template Editor view
  if (currentView === 'createService') {
    return <ServiceTemplateEditor onClose={() => setCurrentView('dashboard')} />;
  }

  return (
    <div className="space-y-6">
      {/* 1. Header / Top Bar */}
      <div className="flex items-center justify-between gap-4">
        {/* Left: Department Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-white text-xl">Forensics Department</h1>
            <p className="text-slate-400 text-sm">Department Administration</p>
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Members, Roles, Services..."
              className="w-full pl-9 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => setCurrentView('workflow')}
          >
            <Zap className="w-4 h-4 mr-2" />
            Workflow Builder
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
            <Shield className="w-4 h-4 mr-2" />
            Create Role
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700" onClick={() => setCurrentView('createService')}>
            <FileText className="w-4 h-4 mr-2" />
            Create Service
          </Button>
          <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
            <History className="w-4 h-4 mr-2" />
            View Audit Log
          </Button>
        </div>
      </div>

      {/* 2. KPI Overview Row (6 Cards) */}
      <div className="grid grid-cols-6 gap-4">
        {/* Total Members */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-blue-400" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-400" />
            </div>
            <p className="text-2xl text-white mb-1">42</p>
            <p className="text-slate-400 text-sm mb-2">Total Members</p>
            <div className="text-xs text-slate-500 space-y-0.5">
              <div>8 Case Leads</div>
              <div>15 Investigators</div>
              <div>12 Analysts, 7 Others</div>
            </div>
          </CardContent>
        </Card>

        {/* Active Department Roles */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-400" />
              </div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                2 Unmapped
              </Badge>
            </div>
            <p className="text-2xl text-white mb-1">12</p>
            <p className="text-slate-400 text-sm mb-2">Active Dept Roles</p>
            <div className="text-xs text-amber-400">
              2 roles need System mapping
            </div>
          </CardContent>
        </Card>

        {/* Active Services */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                <FileText className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="text-xs text-slate-400">8 Total</div>
            </div>
            <p className="text-2xl text-white mb-1">8</p>
            <p className="text-slate-400 text-sm mb-2">Active Services</p>
            <div className="text-xs text-slate-500 space-y-0.5">
              <div>5 Internal</div>
              <div>3 Published Cross-Dept</div>
            </div>
          </CardContent>
        </Card>

        {/* SLA Compliance */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-green-500/50 transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div className="w-10 h-10 relative">
                <svg className="w-10 h-10 -rotate-90">
                  <circle cx="20" cy="20" r="16" fill="none" stroke="#1e293b" strokeWidth="3" />
                  <circle
                    cx="20"
                    cy="20"
                    r="16"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="3"
                    strokeDasharray={`${92 * 1.005} ${(100 - 92) * 1.005}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xs text-green-400">92</div>
              </div>
            </div>
            <p className="text-2xl text-white mb-1">92%</p>
            <p className="text-slate-400 text-sm mb-2">SLA Compliance</p>
            <div className="text-xs text-green-400">
              Within target range
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-600/20 flex items-center justify-center">
                <Clock className="w-5 h-5 text-amber-400" />
              </div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                Action Needed
              </Badge>
            </div>
            <p className="text-2xl text-white mb-1">7</p>
            <p className="text-slate-400 text-sm mb-2">Pending Approvals</p>
            <div className="text-xs text-slate-500">
              Require admin action
            </div>
          </CardContent>
        </Card>

        {/* Workflow Builder */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                Open
              </Badge>
            </div>
            <p className="text-2xl text-white mb-1">Workflow Builder</p>
            <p className="text-slate-400 text-sm mb-2">Automate Processes</p>
            <div className="text-xs text-purple-400">
              Streamline workflows
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 3. Quick Action Cards */}
      <div className="grid grid-cols-4 gap-4">
        {/* Workflow Builder - MOST IMPORTANT */}
        <Card className="bg-gradient-to-br from-purple-900/30 to-slate-900/50 border-purple-500/50 hover:border-purple-500 transition-all shadow-lg shadow-purple-500/10">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-600/30 flex items-center justify-center border border-purple-500/50">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/40 text-xs animate-pulse">
                7 Active
              </Badge>
            </div>
            <h3 className="text-white mb-2 flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-purple-400" />
              Workflow Builder
            </h3>
            <p className="text-slate-400 text-sm mb-4">Create automations, routing, approvals, and SLA workflows</p>
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => setCurrentView('workflow')}
            >
              <Zap className="w-4 h-4 mr-2" />
              Workflow Builder
            </Button>
          </CardContent>
        </Card>

        {/* People Management */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
            <h3 className="text-white mb-2">People Management</h3>
            <p className="text-slate-400 text-sm mb-4">5 new members added this month</p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Manage Members
            </Button>
          </CardContent>
        </Card>

        {/* Department Roles */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-purple-400" />
              </div>
              <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                Attention
              </Badge>
            </div>
            <h3 className="text-white mb-2">Department Roles</h3>
            <p className="text-slate-400 text-sm mb-4">2 unmapped roles require attention</p>
            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Manage Roles
            </Button>
          </CardContent>
        </Card>

        {/* Services & Templates */}
        <Card className="bg-slate-900/50 border-slate-800 hover:border-cyan-500/50 transition-all">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-cyan-400" />
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                SLA Issues
              </Badge>
            </div>
            <h3 className="text-white mb-2">Services & Templates</h3>
            <p className="text-slate-400 text-sm mb-4">3 services breached SLA this week</p>
            <Button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white" onClick={() => setCurrentView('services')}>
              Manage Services
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 4. Alerts & Issues Section */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-600/20 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <CardTitle className="text-white">Alerts & Issues</CardTitle>
                <CardDescription className="text-slate-500">High priority items requiring attention</CardDescription>
              </div>
            </div>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              {alerts.filter(a => a.priority === 'High').length} High Priority
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border border-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-800/50 border-b border-slate-700">
                <tr>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Alert Type</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Description</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Priority</th>
                  <th className="text-left px-4 py-3 text-sm text-slate-400">Time</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {alerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {alert.type === 'SLA Breach' && <AlertCircle className="w-4 h-4 text-red-400" />}
                        {alert.type === 'Role Mapping' && <Shield className="w-4 h-4 text-amber-400" />}
                        {alert.type === 'Permission Issue' && <User className="w-4 h-4 text-amber-400" />}
                        {alert.type === 'Cross-Dept Request' && <GitBranch className="w-4 h-4 text-blue-400" />}
                        {alert.type === 'SLA Warning' && <Clock className="w-4 h-4 text-amber-400" />}
                        <span className="text-sm text-white">{alert.type}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{alert.description}</td>
                    <td className="px-4 py-3">
                      <Badge
                        className={
                          alert.priority === 'High'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : alert.priority === 'Medium'
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                            : 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        }
                      >
                        {alert.priority}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-500">{alert.time}</td>
                    <td className="px-4 py-3">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs">
                        Review
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 5. Analytics Section (Charts & Graphs) */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Chart: Member Workload Distribution */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-white text-base">Member Workload Distribution</CardTitle>
                <CardDescription className="text-slate-500">Active members by role</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={workloadData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="count"
                  label={(entry) => `${entry.count}`}
                >
                  {workloadData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #334155',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 mt-4">
              {workloadData.map((entry) => (
                <div key={entry.role} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-xs text-slate-400">{entry.role}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Chart: Service Usage & SLA Trends */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <CardTitle className="text-white text-base">Service Usage & SLA Trends</CardTitle>
                <CardDescription className="text-slate-500">SLA performance over time</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={slaTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="month" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[85, 100]} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #334155',
                      borderRadius: '8px',
                      color: '#fff',
                    }}
                  />
                  <Line type="monotone" dataKey="sla" stroke="#10B981" strokeWidth={2} dot={{ fill: '#10B981', r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <Separator className="bg-slate-800 mb-4" />
            <div>
              <p className="text-xs text-slate-400 mb-3">Most Used Services (This Month)</p>
              <div className="space-y-2">
                {serviceUsageData.slice(0, 3).map((service, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-slate-300">{service.service}</span>
                        <span className="text-xs text-slate-400">{service.requests}</span>
                      </div>
                      <Progress value={(service.requests / 50) * 100} className="h-1.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 6. Activity & Audit Feed */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
              <History className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <CardTitle className="text-white">Activity & Audit Feed</CardTitle>
              <CardDescription className="text-slate-500">Recent system activities and changes</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {activities.map((activity, idx) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      {idx < activities.length - 1 && (
                        <div className="w-px h-full bg-slate-800 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <div className="flex items-start justify-between mb-1">
                        <p className="text-sm text-white">{activity.action}</p>
                        <span className="text-xs text-slate-500">{activity.time}</span>
                      </div>
                      <p className="text-xs text-slate-400 mb-1">{activity.detail}</p>
                      <div className="flex items-center gap-2">
                        <User className="w-3 h-3 text-slate-500" />
                        <span className="text-xs text-slate-500">{activity.user}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}