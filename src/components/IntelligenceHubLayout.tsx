import { useState } from 'react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Brain, Search, Network, Map, Users, FileText, FolderOpen, Shield, CheckSquare, Workflow, Clock, LogOut, User, Sparkles, Home, Target, Briefcase, Type, Plus } from 'lucide-react';
import { CaseLead2Dashboard } from './CaseLead2Dashboard';
import { AICopilot } from './AICopilot';
import { AllSearchScreen } from './intelligence/AllSearchScreen';
import { LinkAnalysisScreen } from './intelligence/LinkAnalysisScreen';
import { GeoIntelligenceScreen } from './intelligence/GeoIntelligenceScreen';
import { KeywordSearchScreen } from './intelligence/KeywordSearchScreen';
import { ProfilesScreen } from './intelligence/ProfilesScreen';
import { ReportsScreen } from './intelligence/ReportsScreen';
import { CasesScreen } from './intelligence/CasesScreen';
import { EvidenceScreen } from './intelligence/EvidenceScreen';
import { TasksScreen } from './intelligence/TasksScreen';
import { WorkflowScreen } from './intelligence/WorkflowScreen';
import { SLAScreen } from './intelligence/SLAScreen';
import { ProfileIntelligenceScreen } from './intelligence/ProfileIntelligenceScreen';
import { PowerAICaseCreation } from './PowerAICaseCreation';

interface IntelligenceHubLayoutProps {
  username: string;
  onLogout: () => void;
}

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  screen: string;
  activeScreen: string;
  onClick: (screen: string) => void;
  badge?: number;
}

function NavItem({ icon: Icon, label, screen, activeScreen, onClick, badge }: NavItemProps) {
  const isActive = activeScreen === screen;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => onClick(screen)}
          className={`
            relative w-12 h-12 rounded-lg flex items-center justify-center transition-all
            ${isActive
              ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/20'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }
          `}
        >
          <Icon className="w-5 h-5" />
          {badge && badge > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              {badge}
            </span>
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-slate-900 border-slate-800 text-white">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

interface CategoryHeaderProps {
  icon: React.ElementType;
  label: string;
}

function CategoryHeader({ icon: Icon, label }: CategoryHeaderProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="w-12 h-8 flex items-center justify-center">
          <Icon className="w-4 h-4 text-blue-400/60" />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right" className="bg-slate-900 border-slate-800 text-white">
        <p className="uppercase tracking-wider">{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}

export function IntelligenceHubLayout({ username, onLogout }: IntelligenceHubLayoutProps) {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <CaseLead2Dashboard />;
      case 'all-search':
        return <AllSearchScreen />;
      case 'keyword-search':
        return <KeywordSearchScreen />;
      case 'link-analysis':
        return <LinkAnalysisScreen />;
      case 'geo-intelligence':
        return <GeoIntelligenceScreen />;
      case 'profiles':
        return <ProfilesScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'cases':
        return <CasesScreen />;
      case 'evidence':
        return <EvidenceScreen />;
      case 'tasks':
        return <TasksScreen />;
      case 'workflow':
        return <WorkflowScreen />;
      case 'sla':
        return <SLAScreen />;
      case 'profile-intelligence':
        return <ProfileIntelligenceScreen />;
      case 'power-ai-case-creation':
        return <PowerAICaseCreation onCaseCreated={() => setActiveScreen('cases')} />;
      default:
        return <CaseLead2Dashboard />;
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
        {/* Left Sidebar - Enhanced with Category Organization */}
        <div className="w-20 border-r border-slate-800 bg-slate-950/50 backdrop-blur-sm flex flex-col items-center py-6 gap-4">
          {/* Logo */}
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Brain className="w-7 h-7 text-white" />
          </div>

          {/* Divider */}
          <div className="w-10 h-px bg-slate-800"></div>

          {/* Dashboard Home */}
          <NavItem
            icon={Home}
            label="Dashboard"
            screen="dashboard"
            activeScreen={activeScreen}
            onClick={setActiveScreen}
          />

          {/* Operations Category */}
          <div className="w-full flex flex-col items-center gap-2 py-2">
            {/* Category Header */}
            <div className="w-10 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            <CategoryHeader icon={Briefcase} label="Operations" />

            {/* Operational Tools */}
            <div className="flex flex-col gap-2 bg-cyan-950/10 rounded-lg py-2 px-1">
              <NavItem
                icon={Plus}
                label="Create Case"
                screen="power-ai-case-creation"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
              />
              <NavItem
                icon={FolderOpen}
                label="Cases"
                screen="cases"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
                badge={3}
              />
              <NavItem
                icon={Map}
                label="Geo Analysis"
                screen="geo-intelligence"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
              />
              <NavItem
                icon={Shield}
                label="Evidence"
                screen="evidence"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
                badge={1}
              />
              <NavItem
                icon={CheckSquare}
                label="Tasks"
                screen="tasks"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
                badge={4}
              />
              <NavItem
                icon={Workflow}
                label="Workflow"
                screen="workflow"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
              />
              <NavItem
                icon={Clock}
                label="SLA"
                screen="sla"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
                badge={1}
              />
              <NavItem
                icon={Users}
                label="Profiles"
                screen="profiles"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
              />
              <NavItem
                icon={FileText}
                label="Reports"
                screen="reports"
                activeScreen={activeScreen}
                onClick={setActiveScreen}
              />
            </div>
          </div>

          {/* Spacer */}
          <div className="flex-1"></div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          {/* Top Navigation Bar - Simplified */}
          <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="px-6 py-3">
              <div className="flex items-center justify-between">
                {/* Center - Logo/Title */}
                <div className="flex-1 flex justify-center">
                  <button
                    onClick={() => setActiveScreen('dashboard')}
                    className="text-sm text-slate-400 hover:text-white uppercase tracking-widest transition-colors"
                  >
                    Unified Intelligence Hub
                  </button>
                </div>

                {/* AI Assistant Icon */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => setIsCopilotOpen(!isCopilotOpen)}
                        className={`relative w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 flex items-center justify-center hover:from-blue-600/30 hover:to-cyan-600/30 transition-all ${isCopilotOpen ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-950' : ''}`}
                      >
                        <Sparkles className="w-4 h-4 text-blue-400" />
                        <span className="absolute -top-0.5 -right-0.5 w-2 bg-cyan-400 rounded-full animate-pulse"></span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-slate-900 border-slate-800 text-white">
                      <p>{isCopilotOpen ? 'Close AI Assistant' : 'AI Assistant – Available'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* User Info */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-slate-900/50 border border-slate-800">
                  <User className="w-4 h-4 text-blue-400" />
                  <div className="text-[10px]">
                    <p className="text-white font-medium">{username}</p>
                    <p className="text-slate-400 uppercase tracking-tighter">Case Lead 2</p>
                  </div>
                </div>

                {/* Logout Button */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={onLogout}
                        variant="ghost"
                        size="sm"
                        className="text-slate-400 hover:text-white hover:bg-slate-800/50"
                      >
                        <LogOut className="w-4 h-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-slate-900 border-slate-800 text-white">
                      <p>Logout</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {renderScreen()}
          </div>
        </div>

        {/* AI Copilot - Dedicated Instance for Hub */}
        <AICopilot
          userRole="Case Lead"
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
        />
      </div>
    </TooltipProvider>
  );
}