import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Loader2, Sparkles, Link2, GitMerge, X, TrendingUp, AlertCircle, Brain, CheckCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Progress } from './ui/progress';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { CaseSummary } from './CaseSummary';
import { EvidenceUpload } from './EvidenceUpload';
import { MergeConfirmationModal } from './MergeConfirmationModal';
import { LinkConfirmationModal } from './LinkConfirmationModal';
import { RelationshipGraphPage } from './RelationshipGraphPage';
import { toast } from 'sonner@2.0.3';

interface CaseCreationProps {
  onCaseCreated?: () => void;
}

export function CaseCreation({ onCaseCreated }: CaseCreationProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [caseTitle, setCaseTitle] = useState('');
  const [caseDescription, setCaseDescription] = useState('');
  const [casePriority, setCasePriority] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);
  
  // Modal and view states
  const [mergeModalOpen, setMergeModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [showGraphView, setShowGraphView] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [linkedCases, setLinkedCases] = useState<any[]>([]);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setAiSuggestions({
        caseType: 'Financial Crime',
        department: 'Economic Offenses Unit',
        confidence: 92,
        linkedDept: 'Economic Offenses Unit'
      });
      setHasAnalyzed(true);
      setIsAnalyzing(false);
    }, 2500);
  };

  const handleSubmit = () => {
    if (caseTitle && caseDescription && casePriority) {
      setCurrentStep(2);
    }
  };

  const handleCreateNewCase = () => {
    setCurrentStep(3);
  };

  const navigateToStep = (step: number) => {
    if (step <= currentStep) {
      setCurrentStep(step);
    }
  };

  const handleMergeClick = (case_: any) => {
    setSelectedCase(case_);
    setMergeModalOpen(true);
  };

  const handleLinkClick = (case_: any) => {
    setSelectedCase(case_);
    setLinkModalOpen(true);
  };

  const handleMergeConfirm = (masterCase: string, archiveMerged: boolean) => {
    toast.success('Cases merged successfully!', {
      description: `Case #${selectedCase.id} has been merged. Master case: #${masterCase}`,
    });
    setMergeModalOpen(false);
  };

  const handleLinkConfirm = (relationshipType: string) => {
    const newLink = {
      id: selectedCase.id,
      title: selectedCase.title,
      status: 'Active',
      relationshipType,
      sharedEntities: selectedCase.sharedEntities.map((name: string) => ({
        name,
        type: 'person',
      })),
      confidence: selectedCase.similarity,
    };
    setLinkedCases([...linkedCases, newLink]);
    
    toast.success('Case successfully linked!', {
      description: `Linked as ${relationshipType.replace('-', ' ')} relationship`,
    });
    
    setLinkModalOpen(false);
    
    // Navigate to graph view after linking
    setTimeout(() => {
      setShowGraphView(true);
    }, 500);
  };

  const handleNavigateToCase = (caseId: string) => {
    toast.info(`Navigating to Case #${caseId}...`);
    setShowGraphView(false);
  };

  const handleBackFromGraph = () => {
    setShowGraphView(false);
  };

  const relatedCases = [
    {
      id: 'C-1084',
      title: 'Jewelry Store Robbery',
      similarity: 87,
      sharedEntities: ['Ali Hussain', 'Muraqabat Road', 'Dubai Mall', 'Account #84723'],
      location: 'Downtown Mall',
      suspect: 'John Doe',
      taskCount: 5,
      evidenceCount: 3
    },
    {
      id: 'C-0892',
      title: 'Bank Fraud Investigation',
      similarity: 94,
      sharedEntities: ['Ali Hussain', 'First National Bank', 'Account #84723', 'Bank of Emirates'],
      location: 'City Center',
      suspect: 'Jane Smith',
      taskCount: 7,
      evidenceCount: 4
    },
    {
      id: 'C-1156',
      title: 'Wire Transfer Fraud',
      similarity: 76,
      sharedEntities: ['Economic Offenses Unit', 'Bank of Emirates'],
      location: 'Financial District',
      suspect: 'Mike Johnson',
      taskCount: 4,
      evidenceCount: 2
    }
  ];

  // If showing graph view, render only that
  if (showGraphView) {
    return (
      <RelationshipGraphPage
        primaryCase={{
          id: 'NEW',
          title: caseTitle || 'New Case',
          status: 'Draft',
        }}
        linkedCases={linkedCases}
        onNavigateToCase={handleNavigateToCase}
        onBack={handleBackFromGraph}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              onClick={() => navigateToStep(1)}
              className={currentStep === 1 ? 'text-blue-400 cursor-pointer' : 'text-slate-400 cursor-pointer hover:text-slate-300'}
            >
              Case Information
            </BreadcrumbLink>
          </BreadcrumbItem>
          {currentStep >= 2 && (
            <>
              <BreadcrumbSeparator className="text-slate-600" />
              <BreadcrumbItem>
                {currentStep === 2 ? (
                  <BreadcrumbPage className="text-blue-400">Related Cases</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    onClick={() => navigateToStep(2)}
                    className="text-slate-400 cursor-pointer hover:text-slate-300"
                  >
                    Related Cases
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </>
          )}
          {currentStep >= 3 && (
            <>
              <BreadcrumbSeparator className="text-slate-600" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-blue-400">Case Summary</BreadcrumbPage>
              </BreadcrumbItem>
            </>
          )}
        </BreadcrumbList>
      </Breadcrumb>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Panel - Case Information Form */}
      <div className="lg:col-span-2">
        <Card className="bg-slate-900/50 border-slate-800 shadow-xl">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              New Case Creation
            </CardTitle>
            <CardDescription className="text-slate-400">
              AI will automatically classify and analyze your case
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-slate-300">Case Title</Label>
              <Input
                id="title"
                placeholder="e.g., Suspicious Bank Transfers"
                value={caseTitle}
                onChange={(e) => setCaseTitle(e.target.value)}
                className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-slate-300">Case Description</Label>
              <Textarea
                id="description"
                placeholder="Provide detailed information about the case..."
                value={caseDescription}
                onChange={(e) => setCaseDescription(e.target.value)}
                rows={6}
                className="bg-slate-950/50 border-slate-700 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-blue-500/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="department" className="text-slate-300 flex items-center gap-2">
                  Department
                  {hasAnalyzed && (
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      AI Suggested
                    </Badge>
                  )}
                </Label>
                <Select defaultValue={hasAnalyzed ? aiSuggestions?.department : undefined}>
                  <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="Economic Offenses Unit">Economic Offenses Unit</SelectItem>
                    <SelectItem value="Cyber Crime">Cyber Crime</SelectItem>
                    <SelectItem value="Homicide">Homicide</SelectItem>
                    <SelectItem value="Fraud Investigation">Fraud Investigation</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-slate-300">Priority</Label>
                <Select value={casePriority} onValueChange={setCasePriority}>
                  <SelectTrigger className="bg-slate-950/50 border-slate-700 text-white focus:border-blue-500 focus:ring-blue-500/20">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Evidence Upload Section */}
            <div className="pt-6 border-t border-slate-800">
              <h4 className="text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                Upload Initial Evidence
                <Badge className="bg-slate-700 text-slate-300 border-slate-600 text-xs">
                  Optional
                </Badge>
              </h4>
              <div className="bg-slate-950/30 rounded-lg p-4 border border-slate-800">
                <p className="text-slate-400 text-sm mb-3">
                  Upload evidence files for AI-powered analysis and entity extraction
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    // This will be handled by a state to show the evidence upload component
                    const evidenceSection = document.getElementById('evidence-upload-section');
                    if (evidenceSection) {
                      evidenceSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="border-slate-700 text-slate-300 hover:bg-slate-800"
                >
                  Add Evidence Files
                </Button>
              </div>
            </div>

            {isAnalyzing && (
              <Card className="bg-blue-950/20 border-blue-500/30">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                    <span className="text-blue-300">Analyzing case details...</span>
                  </div>
                  <Progress value={66} className="h-2" />
                </CardContent>
              </Card>
            )}

            <div className="flex gap-3">
              <Button
                onClick={handleAnalyze}
                disabled={isAnalyzing || !caseTitle || !caseDescription}
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Analyze with AI
                  </>
                )}
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!caseTitle || !caseDescription || !casePriority}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/20 disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400 disabled:shadow-none"
              >
                Submit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel - AI Insights */}
      <div className="lg:col-span-1">
        <Card className="bg-gradient-to-br from-blue-950/40 to-slate-900/40 border-blue-500/30 shadow-xl shadow-blue-500/10">
          <CardHeader>
            <CardTitle className="text-blue-300 flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              AI Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {!hasAnalyzed ? (
              <p className="text-slate-400 text-sm">
                Click "Analyze with AI" to get intelligent suggestions and classifications.
              </p>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-400 text-sm">Case Type</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                              {aiSuggestions?.confidence}% match
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent className="bg-slate-800 border-slate-700">
                            <p className="text-sm">Case Type: Financial Crime</p>
                            <p className="text-sm">Confidence: 92%</p>
                            <p className="text-sm text-slate-400 mt-1">
                              Similar to past case: "Unauthorized Wire Transfers - C-0956"
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <p className="text-white">{aiSuggestions?.caseType}</p>
                  </div>

                  <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-700">
                    <span className="text-slate-400 text-sm block mb-2">Linked Department</span>
                    <p className="text-white">{aiSuggestions?.linkedDept}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-slate-300 text-sm mb-3">Keywords Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Bank Transfer
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Unauthorized
                    </Badge>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                      Financial Crime
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-slate-300 text-sm mb-3">Suggested Next Steps</h4>
                  <ul className="space-y-2 text-sm text-slate-400">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      Request financial records from involved banks
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      Interview account holders
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      Check for similar patterns in database
                    </li>
                  </ul>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      </div>
      )}

      {/* Evidence Upload Section - Shown in Step 1 */}
      {currentStep === 1 && (
        <div id="evidence-upload-section">
          <EvidenceUpload 
            context="case-creation"
            caseData={{ 
              id: 'NEW',
              title: caseTitle,
              description: caseDescription 
            }}
          />
        </div>
      )}

      {/* Step 2: Related Cases Detection */}
      {currentStep === 2 && (
        <div className="space-y-6">
          <Card className="bg-slate-900/50 border-slate-800 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <AlertCircle className="w-7 h-7 text-amber-400" />
                Detected Potentially Related Cases
              </CardTitle>
              <CardDescription className="text-slate-400 text-base mt-2">
                AI has identified {relatedCases.length} existing cases with similar characteristics. Review and take action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-6">
                {relatedCases.map((case_) => (
                  <Card
                    key={case_.id}
                    className="bg-slate-950/50 border-slate-700 hover:border-amber-500/50 transition-all duration-200 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <CardTitle className="text-slate-300 mb-1">{case_.id}</CardTitle>
                          <CardDescription className="text-white">{case_.title}</CardDescription>
                        </div>
                        <Badge
                          variant="secondary"
                          className={
                            case_.similarity >= 80
                              ? 'bg-green-500/20 text-green-400 border-green-500/30 px-2.5 py-1'
                              : case_.similarity >= 70
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/30 px-2.5 py-1'
                              : 'bg-slate-500/20 text-slate-400 border-slate-500/30 px-2.5 py-1'
                          }
                        >
                          {case_.similarity}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-xs text-slate-400 mb-1.5">Shared Entities</p>
                        <div className="flex flex-wrap gap-1.5">
                          {case_.sharedEntities.map((entity, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30"
                              style={{ boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)' }}
                            >
                              {entity}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm space-y-1">
                        <p className="text-slate-400">
                          Suspect: <span className="text-white">{case_.suspect}</span>
                        </p>
                        <p className="text-slate-400">
                          Location: <span className="text-white">{case_.location}</span>
                        </p>
                      </div>

                      {/* AI Similarity Analysis - Expanded */}
                      <div className="p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/30">
                        <div className="flex items-center gap-2 mb-2.5">
                          <Brain className="w-3.5 h-3.5 text-blue-400" />
                          <p className="text-blue-400 text-xs">AI Similarity Analysis</p>
                        </div>
                        <div className="text-xs text-slate-300 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Match Score:</span>
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                                  style={{ width: `${case_.similarity}%` }}
                                />
                              </div>
                              <span className="text-white">{case_.similarity}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Shared Entities:</span>
                            <span className="text-white">{case_.sharedEntities.length} common</span>
                          </div>
                          <div className="flex items-start gap-2 pt-1">
                            <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300 leading-tight">Similar suspect profiles & geographic overlap detected</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <TooltipProvider>
                        <div className="grid grid-cols-3 gap-2">
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                onClick={() => handleLinkClick(case_)}
                                className="bg-blue-500/20 border border-blue-500/40 text-blue-300 hover:bg-blue-500/30 hover:border-blue-500/60 hover:text-blue-200 text-xs h-8"
                              >
                                <Link2 className="w-3.5 h-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-900 border-blue-500/30">
                              <p className="text-xs">Link Cases - Create relationship</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                onClick={() => handleMergeClick(case_)}
                                className="bg-purple-500/20 border border-purple-500/40 text-purple-300 hover:bg-purple-500/30 hover:border-purple-500/60 hover:text-purple-200 text-xs h-8"
                              >
                                <GitMerge className="w-3.5 h-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-900 border-purple-500/30">
                              <p className="text-xs">Merge Cases - Combine into one</p>
                            </TooltipContent>
                          </Tooltip>
                          
                          <Tooltip delayDuration={200}>
                            <TooltipTrigger asChild>
                              <Button 
                                size="sm" 
                                className="bg-slate-700/50 border border-slate-600 text-slate-300 hover:bg-slate-600/50 hover:border-slate-500 hover:text-slate-200 text-xs h-8"
                              >
                                <X className="w-3.5 h-3.5" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-slate-900 border-slate-600">
                              <p className="text-xs">Dismiss - Hide suggestion</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                      </TooltipProvider>

                      <Button
                        size="sm"
                        variant="link"
                        className="w-full text-xs text-blue-400 hover:text-blue-300 h-auto py-1"
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-slate-700">
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-800"
                >
                  Back to Form
                </Button>
                <Button
                  onClick={handleCreateNewCase}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/20"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 3: Case Summary */}
      {currentStep === 3 && (
        <CaseSummary onFinalize={onCaseCreated} />
      )}

      {/* Modals */}
      {selectedCase && (
        <>
          <MergeConfirmationModal
            open={mergeModalOpen}
            onOpenChange={setMergeModalOpen}
            sourceCase={{
              id: 'NEW',
              title: caseTitle || 'New Case',
              taskCount: 3,
              evidenceCount: 2,
            }}
            targetCase={{
              id: selectedCase.id,
              title: selectedCase.title,
              taskCount: 4,
              evidenceCount: 2,
            }}
            similarity={selectedCase.similarity}
            onConfirm={handleMergeConfirm}
          />

          <LinkConfirmationModal
            open={linkModalOpen}
            onOpenChange={setLinkModalOpen}
            sourceCase={{
              id: 'NEW',
              title: caseTitle || 'New Case',
            }}
            targetCase={{
              id: selectedCase.id,
              title: selectedCase.title,
            }}
            sharedEntities={selectedCase.sharedEntities.map((name: string) => ({
              type: name.includes('Bank') || name.includes('Unit') ? 'organization' : name.startsWith('Account') ? 'account' : 'person',
              name,
            }))}
            onConfirm={handleLinkConfirm}
          />
        </>
      )}
    </div>
  );
}
