import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { CaseSummary } from './CaseSummary';
import { TaskCreation } from './TaskCreation';
import { KanbanBoard } from './KanbanBoard';
import { EvidenceDashboard } from './EvidenceDashboard';
import { EntitiesDashboard } from './EntitiesDashboard';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { FileText, Users, CheckSquare, Clock, AlertCircle, User, Plus, FolderOpen, Network, Lock, CheckCircle2 } from 'lucide-react';
import { CaseCloseModal } from './CaseCloseModal';

interface CaseDetailsViewProps {
  caseData: any;
  onTaskSelect?: (task: any) => void;
}

export function CaseDetailsView({ caseData, onTaskSelect }: CaseDetailsViewProps) {
  const [activeDetailsTab, setActiveDetailsTab] = useState('overview');
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(caseData.status);
  const [outcomeData, setOutcomeData] = useState<{ reason: string; summary: string } | null>(null);

  const handleCloseCase = (data: { reason: string; summary: string }) => {
    console.log('Closing case with data:', data);
    setOutcomeData(data);
    setCurrentStatus('Closed');
    setIsCloseModalOpen(false);
  };

  // Mock tasks data
  const tasks = [
    {
      id: 'T-001',
      title: 'Review financial records',
      status: 'In Progress',
      assignee: 'Det. Sarah Mitchell',
      priority: 'High',
      dueDate: '2025-10-30',
      progress: 65
    },
    {
      id: 'T-002',
      title: 'Interview suspect #2',
      status: 'Pending',
      assignee: 'Det. James Chen',
      priority: 'High',
      dueDate: '2025-10-29',
      progress: 0
    },
    {
      id: 'T-003',
      title: 'Analyze surveillance footage',
      status: 'Completed',
      assignee: 'Analyst Maria Garcia',
      priority: 'Medium',
      dueDate: '2025-10-25',
      progress: 100
    },
    {
      id: 'T-004',
      title: 'Coordinate with forensics',
      status: 'In Progress',
      assignee: 'Det. Sarah Mitchell',
      priority: 'Medium',
      dueDate: '2025-11-02',
      progress: 40
    },
    {
      id: 'T-005',
      title: 'Prepare evidence report',
      status: 'Pending',
      assignee: 'Analyst John Smith',
      priority: 'Low',
      dueDate: '2025-11-05',
      progress: 0
    }
  ];

  // Mock members data
  const members = [
    {
      id: 1,
      name: 'Det. Sarah Mitchell',
      role: 'Lead Investigator',
      department: 'Cyber Crime',
      email: 's.mitchell@dept.gov',
      phone: '+1 (555) 123-4567',
      avatar: 'SM'
    },
    {
      id: 2,
      name: 'Det. James Chen',
      role: 'Investigator',
      department: 'Cyber Crime',
      email: 'j.chen@dept.gov',
      phone: '+1 (555) 234-5678',
      avatar: 'JC'
    },
    {
      id: 3,
      name: 'Analyst Maria Garcia',
      role: 'Technical Analyst',
      department: 'Forensics',
      email: 'm.garcia@dept.gov',
      phone: '+1 (555) 345-6789',
      avatar: 'MG'
    },
    {
      id: 4,
      name: 'Analyst John Smith',
      role: 'Data Analyst',
      department: 'Intelligence',
      email: 'j.smith@dept.gov',
      phone: '+1 (555) 456-7890',
      avatar: 'JS'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'in progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'pending':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
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

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-blue-600',
      'bg-purple-600',
      'bg-cyan-600',
      'bg-green-600'
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-6">
      {/* Closed Case Banner */}
      {currentStatus === 'Closed' && (
        <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-5 flex items-center justify-between shadow-lg shadow-red-900/10">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center border border-red-500/30">
              <Lock className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h3 className="text-white font-semibold">Case Closed & Archived</h3>
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider border-red-500/30 text-red-400">Legal Retention Active</Badge>
              </div>
              <p className="text-slate-400 text-sm">This investigation is finalized. All records are locked for digital chain-of-custody compliance.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-white hover:bg-slate-200 text-slate-900 font-medium group">
              <FileText className="w-4 h-4 mr-2 text-slate-900 group-hover:scale-110 transition-transform" />
              View Final Report
            </Button>
            <Badge className="bg-red-600/20 text-red-400 border-red-500/30 px-3 py-1.5 h-10">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Finalized
            </Badge>
          </div>
        </div>
      )}

      {/* Case Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-white text-2xl">{caseData.name}</h2>
            <Badge className={`${getStatusColor(currentStatus)}`}>
              {currentStatus}
            </Badge>
          </div>
          <p className="text-slate-400 text-sm flex items-center gap-3">
            <span className="text-blue-400">{caseData.id}</span>
            <span className="text-slate-600">•</span>
            <span>Last updated {caseData.lastUpdated}</span>
          </p>
        </div>

        {currentStatus !== 'Closed' && (
          <Button
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-600/10"
            onClick={() => setIsCloseModalOpen(true)}
          >
            <Lock className="w-4 h-4 mr-2" />
            Close Case
          </Button>
        )}
      </div>

      <CaseCloseModal
        isOpen={isCloseModalOpen}
        onClose={() => setIsCloseModalOpen(false)}
        onConfirm={handleCloseCase}
        caseId={caseData.id}
        caseName={caseData.name}
      />

      {/* Sub-tabs for case details */}
      <Tabs value={activeDetailsTab} onValueChange={setActiveDetailsTab} className="w-full">
        <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-slate-900/50 p-1 border border-slate-800">
          <TabsTrigger
            value="overview"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            <FileText className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="tasks"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            <CheckSquare className="w-4 h-4 mr-2" />
            Tasks
          </TabsTrigger>
          <TabsTrigger
            value="evidence"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            <FolderOpen className="w-4 h-4 mr-2" />
            Evidence
          </TabsTrigger>
          <TabsTrigger
            value="entities"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            <Network className="w-4 h-4 mr-2" />
            Entities
          </TabsTrigger>
          <TabsTrigger
            value="members"
            className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm transition-all text-slate-300 hover:text-slate-100 data-[state=active]:bg-blue-600/20 data-[state=active]:text-blue-400 data-[state=active]:shadow-sm"
          >
            <Users className="w-4 h-4 mr-2" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {currentStatus === 'Closed' && outcomeData && (
            <Card className="bg-slate-950/80 border-slate-800 border-l-4 border-l-red-500 overflow-hidden">
              <CardHeader className="pb-3 bg-red-500/5">
                <CardTitle className="text-white flex items-center gap-2 text-base">
                  <FileText className="w-4 h-4 text-red-400" />
                  Official Record of Outcome
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Disposition</p>
                    <p className="text-white text-sm capitalize">{outcomeData.reason.replace(/-/g, ' ')}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Closed By</p>
                    <p className="text-white text-sm">Det. Sarah Mitchell</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1.5">Executive Summary</p>
                  <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <p className="text-slate-300 text-sm leading-relaxed italic">
                      "{outcomeData.summary}"
                    </p>
                  </div>
                </div>
                <div className="flex justify-end border-t border-slate-800 pt-3 mt-2">
                  <p className="text-[10px] text-slate-500">Electronically signed and timestamped: {new Date().toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          )}
          <CaseSummary status={currentStatus} />
        </TabsContent>

        <TabsContent value="tasks" className="mt-6">
          <div className="space-y-6">
            {/* Tasks Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white">Case Tasks</h3>
                <p className="text-slate-400 text-sm mt-1">AI-powered task management with real-time SLA tracking</p>
              </div>
              <Button
                onClick={() => setShowCreateTask(!showCreateTask)}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Task
              </Button>
            </div>

            {/* Create Task Section */}
            {showCreateTask && (
              <TaskCreation
                caseData={caseData}
                onTaskCreated={() => setShowCreateTask(false)}
                onCancel={() => setShowCreateTask(false)}
              />
            )}

            {/* Kanban Board */}
            {!showCreateTask && (
              <KanbanBoard caseData={caseData} onTaskSelect={onTaskSelect} />
            )}
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="mt-6">
          <EvidenceDashboard caseData={caseData} />
        </TabsContent>

        <TabsContent value="entities" className="mt-6">
          <EntitiesDashboard />
        </TabsContent>

        <TabsContent value="members" className="mt-6">
          <div className="space-y-6">
            {/* Members Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white">Case Team Members</h3>
                <p className="text-slate-400 text-sm mt-1">View all team members assigned to this case</p>
              </div>
              <div className="text-sm text-slate-400">
                {members.length} members
              </div>
            </div>

            {/* Members Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {members.map((member, index) => (
                <Card key={member.id} className="bg-slate-900/50 border-slate-800 hover:border-blue-600/50 transition-all">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Avatar */}
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className={`${getAvatarColor(index)} text-white`}>
                          {member.avatar}
                        </AvatarFallback>
                      </Avatar>

                      {/* Member Info */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <h4 className="text-white">{member.name}</h4>
                          <p className="text-blue-400 text-sm">{member.role}</p>
                        </div>

                        <div className="space-y-1 text-sm text-slate-400">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Department:</span>
                            <span>{member.department}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Email:</span>
                            <span>{member.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-500">Phone:</span>
                            <span>{member.phone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
