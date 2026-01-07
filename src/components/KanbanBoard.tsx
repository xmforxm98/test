import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';
import {
  Clock,
  User,
  AlertTriangle,
  TrendingUp,
  Users,
  Sparkles,
  Calendar,
  CheckCircle2,
  XCircle,
  Paperclip
} from 'lucide-react';

interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed';
  assignee: string;
  assigneeAvatar: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  slaStatus: 'on-track' | 'at-risk' | 'breached';
  daysRemaining: number;
  aiLabels?: {
    type: 'delay' | 'cross-department' | 'resource-conflict' | 'dependency';
    text: string;
    percentage?: number;
  }[];
  department?: string;
  isMyTask?: boolean;
  hasEvidence?: boolean;
  evidenceCount?: number;
}

interface KanbanBoardProps {
  caseData: any;
  onTaskSelect?: (task: any) => void;
}

export function KanbanBoard({ caseData, onTaskSelect }: KanbanBoardProps) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // Mock tasks data
  const allTasks: Task[] = [
    {
      id: 'T-001',
      title: 'Review financial records',
      status: 'in-progress',
      assignee: 'Det. Sarah Mitchell',
      assigneeAvatar: 'SM',
      priority: 'high',
      dueDate: '2025-10-30',
      slaStatus: 'at-risk',
      daysRemaining: 1,
      aiLabels: [
        { type: 'delay', text: 'Predicted Delay', percentage: 75 },
        { type: 'resource-conflict', text: 'Resource conflict detected' }
      ],
      department: 'Cyber Crime',
      isMyTask: true,
      hasEvidence: true,
      evidenceCount: 5
    },
    {
      id: 'T-002',
      title: 'Interview suspect #2',
      status: 'todo',
      assignee: 'Det. James Chen',
      assigneeAvatar: 'JC',
      priority: 'high',
      dueDate: '2025-10-29',
      slaStatus: 'breached',
      daysRemaining: -1,
      aiLabels: [
        { type: 'delay', text: 'Critical - SLA Breached' }
      ],
      department: 'Investigations',
      isMyTask: false,
      hasEvidence: false,
      evidenceCount: 0
    },
    {
      id: 'T-003',
      title: 'Analyze surveillance footage',
      status: 'completed',
      assignee: 'Analyst Maria Garcia',
      assigneeAvatar: 'MG',
      priority: 'medium',
      dueDate: '2025-10-25',
      slaStatus: 'on-track',
      daysRemaining: 0,
      department: 'Forensics',
      isMyTask: false,
      hasEvidence: true,
      evidenceCount: 3
    },
    {
      id: 'T-004',
      title: 'Coordinate with forensics',
      status: 'review',
      assignee: 'Det. Sarah Mitchell',
      assigneeAvatar: 'SM',
      priority: 'medium',
      dueDate: '2025-11-02',
      slaStatus: 'on-track',
      daysRemaining: 4,
      aiLabels: [
        { type: 'cross-department', text: 'Cross-department - Pending approval' }
      ],
      department: 'Forensics',
      isMyTask: true,
      hasEvidence: false,
      evidenceCount: 0
    },
    {
      id: 'T-005',
      title: 'Prepare evidence report',
      status: 'todo',
      assignee: 'Analyst John Smith',
      assigneeAvatar: 'JS',
      priority: 'low',
      dueDate: '2025-11-05',
      slaStatus: 'on-track',
      daysRemaining: 7,
      department: 'Intelligence',
      isMyTask: false,
      hasEvidence: true,
      evidenceCount: 1
    },
    {
      id: 'T-006',
      title: 'Background check - John Doe',
      status: 'in-progress',
      assignee: 'Analyst Maria Garcia',
      assigneeAvatar: 'MG',
      priority: 'high',
      dueDate: '2025-10-31',
      slaStatus: 'at-risk',
      daysRemaining: 2,
      aiLabels: [
        { type: 'delay', text: 'Predicted Delay', percentage: 65 },
        { type: 'dependency', text: 'Blocked by T-002' }
      ],
      department: 'Intelligence',
      isMyTask: false,
      hasEvidence: true,
      evidenceCount: 2
    },
    {
      id: 'T-007',
      title: 'Site inspection - 1234 Main St',
      status: 'in-progress',
      assignee: 'Det. James Chen',
      assigneeAvatar: 'JC',
      priority: 'medium',
      dueDate: '2025-11-01',
      slaStatus: 'on-track',
      daysRemaining: 3,
      department: 'Forensics',
      isMyTask: false,
      hasEvidence: false,
      evidenceCount: 0
    },
    {
      id: 'T-008',
      title: 'Analyze transaction patterns',
      status: 'review',
      assignee: 'Analyst John Smith',
      assigneeAvatar: 'JS',
      priority: 'high',
      dueDate: '2025-10-30',
      slaStatus: 'at-risk',
      daysRemaining: 1,
      aiLabels: [
        { type: 'cross-department', text: 'Cross-department - Pending approval' },
        { type: 'delay', text: 'Predicted Delay', percentage: 45 }
      ],
      department: 'Financial',
      isMyTask: false,
      hasEvidence: true,
      evidenceCount: 4
    }
  ];

  // Filter tasks
  const filteredTasks = allTasks.filter(task => {
    switch (activeFilter) {
      case 'my-tasks':
        return task.isMyTask;
      case 'ai-flagged':
        return task.aiLabels && task.aiLabels.length > 0;
      case 'sla-risk':
        return task.slaStatus === 'at-risk' || task.slaStatus === 'breached';
      default:
        return true;
    }
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: 'border-slate-700' },
    { id: 'in-progress', title: 'In Progress', color: 'border-blue-500/30' },
    { id: 'review', title: 'Review', color: 'border-purple-500/30' },
    { id: 'completed', title: 'Completed', color: 'border-green-500/30' }
  ];

  const getSLAColor = (status: Task['slaStatus']) => {
    switch (status) {
      case 'on-track':
        return 'bg-green-500';
      case 'at-risk':
        return 'bg-amber-500';
      case 'breached':
        return 'bg-red-500';
      default:
        return 'bg-slate-500';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'low':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getAILabelColor = (type: string) => {
    switch (type) {
      case 'delay':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'cross-department':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'resource-conflict':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'dependency':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  // Calculate AI insights
  const totalTasks = filteredTasks.length;
  const atRiskTasks = filteredTasks.filter(t => t.slaStatus === 'at-risk').length;
  const breachedTasks = filteredTasks.filter(t => t.slaStatus === 'breached').length;
  const aiFlaggedTasks = filteredTasks.filter(t => t.aiLabels && t.aiLabels.length > 0).length;

  // Department workload
  const departmentWorkload = filteredTasks.reduce((acc, task) => {
    const dept = task.department || 'Unknown';
    acc[dept] = (acc[dept] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const maxWorkload = Math.max(...Object.values(departmentWorkload));

  return (
    <div className="space-y-6">
      {/* Filter Bar */}
      <div className="flex items-center justify-between gap-4">
        <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-slate-900/50 p-1 border border-slate-800">
            <TabsTrigger
              value="all"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
            >
              All Tasks
              <Badge className="ml-2 bg-slate-700 text-slate-300 border-slate-600">
                {allTasks.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="my-tasks"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
            >
              <User className="w-4 h-4 mr-2" />
              My Tasks
              <Badge className="ml-2 bg-slate-700 text-slate-300 border-slate-600">
                {allTasks.filter(t => t.isMyTask).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="ai-flagged"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Flagged
              <Badge className="ml-2 bg-red-500/20 text-red-400 border-red-500/30">
                {allTasks.filter(t => t.aiLabels && t.aiLabels.length > 0).length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="sla-risk"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-4 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
            >
              <AlertTriangle className="w-4 h-4 mr-2" />
              SLA Risk
              <Badge className="ml-2 bg-amber-500/20 text-amber-400 border-amber-500/30">
                {allTasks.filter(t => t.slaStatus === 'at-risk' || t.slaStatus === 'breached').length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* AI Insights Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Real-time Risk Summary */}
        <Card className="bg-gradient-to-br from-red-950/30 to-slate-900/50 border-red-500/30 col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              Real-time Risk Summary
              <Badge className="ml-auto bg-blue-500/20 text-blue-400 border-blue-500/30">
                <Sparkles className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              {/* Total Tasks */}
              <div className="space-y-1">
                <p className="text-slate-400 text-xs">Total Tasks</p>
                <p className="text-white text-2xl">{totalTasks}</p>
              </div>

              {/* At Risk */}
              <div className="space-y-1">
                <p className="text-slate-400 text-xs">At Risk</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-amber-400 text-2xl">{atRiskTasks}</p>
                  <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                    {totalTasks > 0 ? Math.round((atRiskTasks / totalTasks) * 100) : 0}%
                  </Badge>
                </div>
              </div>

              {/* Breached */}
              <div className="space-y-1">
                <p className="text-slate-400 text-xs">Breached</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-red-400 text-2xl">{breachedTasks}</p>
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                    {totalTasks > 0 ? Math.round((breachedTasks / totalTasks) * 100) : 0}%
                  </Badge>
                </div>
              </div>

              {/* AI Flagged */}
              <div className="space-y-1">
                <p className="text-slate-400 text-xs">AI Flagged</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-blue-400 text-2xl">{aiFlaggedTasks}</p>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                    {totalTasks > 0 ? Math.round((aiFlaggedTasks / totalTasks) * 100) : 0}%
                  </Badge>
                </div>
              </div>
            </div>

            {/* Risk Indicators */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">SLA Health Score</span>
                <span className="text-white">
                  {totalTasks > 0 ? Math.round(((totalTasks - atRiskTasks - breachedTasks) / totalTasks) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-green-500"
                  style={{ width: `${totalTasks > 0 ? ((totalTasks - atRiskTasks - breachedTasks) / totalTasks) * 100 : 0}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workload Distribution Heatmap */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-4 h-4 text-purple-400" />
              </div>
              Workload Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {Object.entries(departmentWorkload)
              .sort(([, a], [, b]) => b - a)
              .map(([dept, count]) => (
                <div key={dept} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{dept}</span>
                    <span className="text-white">{count}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${count === maxWorkload ? 'bg-red-500' :
                        count > maxWorkload * 0.6 ? 'bg-amber-500' :
                          'bg-green-500'
                        }`}
                      style={{ width: `${(count / maxWorkload) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((column) => {
          const columnTasks = filteredTasks.filter(task => task.status === column.id);

          return (
            <div key={column.id} className="space-y-3">
              {/* Column Header */}
              <div className={`bg-slate-900/50 border ${column.color} rounded-lg p-3`}>
                <div className="flex items-center justify-between">
                  <h4 className="text-white">{column.title}</h4>
                  <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                    {columnTasks.length}
                  </Badge>
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-3 min-h-[400px]">
                {columnTasks.map((task) => (
                  <Card
                    key={task.id}
                    className="bg-slate-900/50 border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer group"
                    onClick={() => {
                      if (onTaskSelect) {
                        onTaskSelect(task);
                      }
                    }}
                  >
                    <CardContent className="p-4 space-y-3">
                      {/* SLA Indicator */}
                      <div className="flex items-start gap-2">
                        <div
                          className={`w-1 h-full absolute left-0 top-0 bottom-0 rounded-l-lg ${getSLAColor(task.slaStatus)}`}
                        />
                        <div className="flex-1 space-y-2 ml-2">
                          {/* Task ID and Priority */}
                          <div className="flex items-center gap-2">
                            <span className="text-blue-400 text-xs">{task.id}</span>
                            <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </Badge>
                          </div>

                          {/* Task Title */}
                          <h5 className="text-white text-sm group-hover:text-blue-400 transition-colors">
                            {task.title}
                          </h5>

                          {/* AI Labels */}
                          {task.aiLabels && task.aiLabels.length > 0 && (
                            <div className="space-y-1">
                              {task.aiLabels.map((label, idx) => (
                                <div
                                  key={idx}
                                  className={`flex items-center gap-1 text-xs px-2 py-1 rounded border ${getAILabelColor(label.type)}`}
                                >
                                  <Sparkles className="w-3 h-3" />
                                  <span>{label.text}</span>
                                  {label.percentage && (
                                    <span className="ml-auto">{label.percentage}%</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Evidence Indicator */}
                          {task.hasEvidence && task.evidenceCount && task.evidenceCount > 0 && (
                            <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-xs text-blue-400">
                              <Paperclip className="w-3 h-3" />
                              <span>{task.evidenceCount} {task.evidenceCount === 1 ? 'attachment' : 'attachments'}</span>
                            </div>
                          )}

                          {/* Assignee and Due Date */}
                          <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                            <div className="flex items-center gap-2">
                              <Avatar className="w-6 h-6">
                                <AvatarFallback className="bg-blue-600 text-white text-xs">
                                  {task.assigneeAvatar}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-slate-400 text-xs">{task.assignee.split(' ')[1]}</span>
                            </div>

                            <div className="flex items-center gap-1 text-xs">
                              {task.slaStatus === 'breached' ? (
                                <XCircle className="w-3 h-3 text-red-400" />
                              ) : task.slaStatus === 'at-risk' ? (
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
                              ) : (
                                <CheckCircle2 className="w-3 h-3 text-green-400" />
                              )}
                              <span className={
                                task.slaStatus === 'breached' ? 'text-red-400' :
                                  task.slaStatus === 'at-risk' ? 'text-amber-400' :
                                    'text-green-400'
                              }>
                                {task.daysRemaining > 0 ? `${task.daysRemaining}d` :
                                  task.daysRemaining < 0 ? `${Math.abs(task.daysRemaining)}d overdue` :
                                    'Today'}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {columnTasks.length === 0 && (
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-slate-800 rounded-lg">
                    <p className="text-slate-600 text-sm">No tasks</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
