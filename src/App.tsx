import React, { useState } from "react";
import { CaseCreationPhase1Smart } from "./components/CaseCreationPhase1Smart";
import { PowerAICaseCreation } from "./components/PowerAICaseCreation";
import { SupervisorApprovalScreen } from "./components/SupervisorApprovalScreen";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./components/ui/tabs";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";
import { Login } from "./components/Login";
import { CaseLeadDashboard } from "./components/CaseLeadDashboard";
import { CaseLead2Dashboard } from "./components/CaseLead2Dashboard";
import { IntelligenceHubLayout } from "./components/IntelligenceHubLayout";
import { DeptAdminDashboard } from "./components/DeptAdminDashboard";
import { CaseCreation } from "./components/CaseCreation";
import { CaseSummary } from "./components/CaseSummary";
import { RiskDashboard } from "./components/RiskDashboard";
import { CasesView } from "./components/CasesView";
import { AICopilot } from "./components/AICopilot";
import { ActionsView } from "./components/ActionsView";
import { UserMenu } from "./components/UserMenu";
import { AllSearchScreen } from "./components/intelligence/AllSearchScreen";
import { GeoIntelligenceScreen } from "./components/intelligence/GeoIntelligenceScreen";
import { TaskDetailsView } from "./components/TaskDetailsView";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./components/ui/tooltip";
import {
  Brain,
  FileText,
  AlertTriangle,
  Plus,
  LogOut,
  User,
  X,
  Home,
  FolderOpen,
  Settings,
  Search,
  Network,
  Map,
  Target,
  ClipboardList,
  CheckSquare,
  Shield,
  Sparkles,
  Zap,
  Activity,
  Type,
} from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const [activeTab, setActiveTab] = useState("creation");
  const [caseLeadActiveTab, setCaseLeadActiveTab] = useState("dashboard");
  const [intelligenceSubTab, setIntelligenceSubTab] = useState("all-search");
  const [isAICopilotOpen, setIsAICopilotOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const handleLogin = (role: string, name: string) => {
    setUserRole(role);
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole("");
    setUsername("");
    setActiveTab("creation");
    setCaseLeadActiveTab("dashboard");
    setIntelligenceSubTab("all-search");
  };

  const handleCaseCreated = () => {
    setActiveTab("summary");
  };

  const handleCreateNewCase = () => {
    setActiveTab("creation");
  };

  const handleCaseLeadCreateCase = () => {
    setCaseLeadActiveTab("create-case");
  };

  const handleCloseCreateCaseTab = () => {
    setCaseLeadActiveTab("dashboard");
  };

  const handleTaskSelect = (task: any) => {
    setSelectedTask(task);
    setCaseLeadActiveTab("task-details");
  };

  const handleBackToCases = () => {
    setCaseLeadActiveTab("cases");
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toaster />
      </>
    );
  }

  const getRoleName = (role: string) => {
    const roleMap: Record<string, string> = {
      "case-lead": "Case Lead",
      "case-lead-2": "Case Lead 2",
      analyst: "Analyst",
      "dept-admin": "Dept Admin",
      "dept-head": "Dept Head",
    };
    return roleMap[role] || role;
  };

  // Show Case Lead Dashboard for case-lead role (Epic 2)
  if (userRole === "case-lead") {
    return (
      <TooltipProvider delayDuration={0}>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
          {/* Left Sidebar - Simplified */}
          <div className="w-20 border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm flex flex-col items-center py-6 gap-4">
            {/* Logo */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>

            {caseLeadActiveTab === "intelligence" && (
              <>
                {/* Divider */}
                <div className="w-10 h-px bg-slate-800"></div>

                {/* Intelligence Tools */}
                <div className="flex flex-col gap-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setIntelligenceSubTab("link-analysis")}
                        className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all ${intelligenceSubTab === "link-analysis"
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                      >
                        <Network className="w-5 h-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-slate-900 border-slate-800 text-white">
                      <p>Link Analysis</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setIntelligenceSubTab("geo-analysis")}
                        className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all ${intelligenceSubTab === "geo-analysis"
                          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                          : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                          }`}
                      >
                        <Map className="w-5 h-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-slate-900 border-slate-800 text-white">
                      <p>Geo Analysis</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation Bar - Redesigned */}
            <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
              <div className="px-6 py-3">
                <div className="flex items-center justify-between">
                  {/* Left - Primary Navigation */}
                  <nav className="flex items-center gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setCaseLeadActiveTab("dashboard")}
                          className={`px-4 py-2 rounded-lg transition-all relative ${caseLeadActiveTab === "dashboard"
                            ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:shadow-lg after:shadow-blue-500/50"
                            : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                          Dashboard
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white">
                        <p>Command & situational awareness</p>
                      </TooltipContent>
                    </Tooltip>


                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setCaseLeadActiveTab("cases")}
                          className={`px-4 py-2 rounded-lg transition-all relative ${caseLeadActiveTab === "cases"
                            ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:shadow-lg after:shadow-blue-500/50"
                            : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                          Cases
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white">
                        <p>Operational investigation & evidence management</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setCaseLeadActiveTab("map")}
                          className={`px-4 py-2 rounded-lg transition-all relative ${caseLeadActiveTab === "map"
                            ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:shadow-lg after:shadow-blue-500/50"
                            : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                          Map
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white">
                        <p>Geospatial intelligence & risk mapping</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setCaseLeadActiveTab("actions")}
                          className={`px-4 py-2 rounded-lg transition-all relative ${caseLeadActiveTab === "actions"
                            ? "text-blue-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-blue-500 after:to-cyan-500 after:shadow-lg after:shadow-blue-500/50"
                            : "text-slate-400 hover:text-slate-200"
                            }`}
                        >
                          Actions
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white">
                        <p>Tasks, approvals & execution</p>
                      </TooltipContent>
                    </Tooltip>
                  </nav>

                  {/* Right Side Actions */}
                  <div className="flex items-center gap-3">
                    {/* Create Case Button */}
                    <Button
                      onClick={handleCaseLeadCreateCase}
                      className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-full shadow-lg shadow-blue-500/20 transition-all"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Case
                    </Button>

                    {/* AI Assistant Icon */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => setIsAICopilotOpen(!isAICopilotOpen)}
                          className={`relative w-10 h-10 rounded-full bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center hover:from-blue-600/30 hover:to-cyan-600/30 transition-all ${isAICopilotOpen ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : ''}`}
                        >
                          <Sparkles className="w-4 h-4 text-blue-400" />
                          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white">
                        <p>{isAICopilotOpen ? 'Close AI Assistant' : 'AI Assistant – Available'}</p>
                      </TooltipContent>
                    </Tooltip>

                    {/* User Menu */}
                    <UserMenu
                      username={username}
                      roleName={getRoleName(userRole)}
                      onLogout={handleLogout}
                    />
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className={caseLeadActiveTab === "map" ? "flex-1" : "px-6 py-6 flex-1 overflow-auto"}>
                {caseLeadActiveTab === "dashboard" && <CaseLeadDashboard />}
                {caseLeadActiveTab === "map" && <GeoIntelligenceScreen />}
                {caseLeadActiveTab === "cases" && <CasesView onTaskSelect={handleTaskSelect} />}
                {caseLeadActiveTab === "actions" && <ActionsView />}
                {caseLeadActiveTab === "task-details" && (
                  <TaskDetailsView
                    task={selectedTask}
                    onBack={handleBackToCases}
                  />
                )}
                {caseLeadActiveTab === "create-case" && (
                  <CaseCreation onCaseCreated={handleCloseCreateCaseTab} />
                )}
              </div>
            </div>
          </div>

          {/* AI Copilot - Global */}
          <AICopilot
            userRole="Case Lead"
            currentCaseId="#4521"
            isOpen={isAICopilotOpen}
            onClose={() => setIsAICopilotOpen(false)}
          />
        </div>
        <Toaster />
      </TooltipProvider>
    );
  }

  // Show Case Lead 2 Dashboard for case-lead-2 role
  if (userRole === "case-lead-2") {
    return (
      <>
        <IntelligenceHubLayout
          username={username}
          onLogout={handleLogout}
        />
        <Toaster />
      </>
    );
  }

  // Show Risk Dashboard for Dept Head
  if (userRole === "dept-head") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
          {/* Left Sidebar */}
          <div className="w-16 border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm flex flex-col items-center py-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
              <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                  {/* Navigation */}
                  <div className="flex items-center gap-1">
                    <div className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Command Summary
                    </div>
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex items-center gap-3">
                    {/* User Info */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
                      <User className="w-4 h-4 text-blue-400" />
                      <div className="text-sm">
                        <p className="text-white">{username}</p>
                        <p className="text-slate-400 text-xs">
                          {getRoleName(userRole)}
                        </p>
                      </div>
                    </div>
                    {/* Logout Button */}
                    <Button
                      onClick={handleLogout}
                      className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="container mx-auto px-4 py-4">
                <RiskDashboard />
              </div>
            </div>
          </div>

          {/* AI Copilot - Global */}
          <AICopilot userRole="Dept Head" />
        </div>
        <Toaster />
      </>
    );
  }

  // Show Department Admin Dashboard for Dept Admin
  if (userRole === "dept-admin") {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
          {/* Left Sidebar */}
          <div className="w-16 border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm flex flex-col items-center py-6">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
              <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                  {/* Navigation */}
                  <div className="flex items-center gap-1">
                    <div className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Admin Dashboard
                    </div>
                  </div>

                  {/* Right Side Actions */}
                  <div className="flex items-center gap-3">
                    {/* User Info */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
                      <User className="w-4 h-4 text-blue-400" />
                      <div className="text-sm">
                        <p className="text-white">{username}</p>
                        <p className="text-slate-400 text-xs">
                          {getRoleName(userRole)}
                        </p>
                      </div>
                    </div>
                    {/* Logout Button */}
                    <Button
                      onClick={handleLogout}
                      className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
              <div className="container mx-auto px-4 py-4">
                <DeptAdminDashboard />
              </div>
            </div>
          </div>

          {/* AI Copilot - Global */}
          <AICopilot userRole="Dept Admin" />
        </div>
        <Toaster />
      </>
    );
  }

  // Show Epic 1 for other roles (Analyst)
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
        {/* Left Sidebar */}
        <div className="w-16 border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm flex flex-col items-center py-6">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Brain className="w-6 h-6 text-white" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation Bar */}
          <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
            <div className="px-4 py-2">
              <div className="flex items-center justify-between">
                {/* Navigation */}
                <div className="flex items-center gap-1">
                  <div className="px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {!activeTab
                      ? "Create Case"
                      : "Case Summary"}
                  </div>
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3">
                  {/* User Info */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900/50 border border-slate-800">
                    <User className="w-4 h-4 text-blue-400" />
                    <div className="text-sm">
                      <p className="text-white">{username}</p>
                      <p className="text-slate-400 text-xs">
                        {getRoleName(userRole)}
                      </p>
                    </div>
                  </div>
                  {activeTab === "summary" && (
                    <Button
                      onClick={handleCreateNewCase}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/20"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create New Case
                    </Button>
                  )}
                  {/* Logout Button */}
                  <Button
                    onClick={handleLogout}
                    className="bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <div className="container mx-auto px-4 py-4">
              <div>
                {!activeTab ? (
                  <CaseCreation
                    onCaseCreated={handleCaseCreated}
                  />
                ) : (
                  <CaseSummary />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* AI Copilot - Global */}
        <AICopilot
          userRole={
            getRoleName(userRole) as
            | "Case Lead"
            | "Investigator"
            | "Dept Admin"
            | "Dept Head"
          }
        />
      </div>
      <Toaster />
    </>
  );
}
