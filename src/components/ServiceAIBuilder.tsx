import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import {
  X,
  Sparkles,
  ChevronLeft,
  FileText,
  Upload,
  Shield,
  Users,
  Lightbulb,
  Loader2,
  Briefcase,
  Check,
  RefreshCw,
  MapPin,
  Calendar,
  Type,
  ListIcon,
  Settings,
  Globe2,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface ServiceAIBuilderProps {
  onClose: () => void;
}

interface TemplateField {
  id: string;
  label: string;
  type: 'text' | 'dropdown' | 'file' | 'date' | 'number';
  required: boolean;
  icon: any;
}

interface AIRule {
  id: string;
  description: string;
  enabled: boolean;
}

export function ServiceAIBuilder({ onClose }: ServiceAIBuilderProps) {
  const [servicePrompt, setServicePrompt] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [aiRules, setAIRules] = useState<AIRule[]>([]);
  const [recommendedSLA, setRecommendedSLA] = useState<string>('24');

  const templates = [
    {
      id: 'evidence-upload',
      title: 'Evidence Upload Service',
      description: 'Collect and validate digital or physical evidence',
      icon: Upload,
      color: 'blue',
      prompt: 'Create a service template for digital evidence upload requiring device type, evidence ID, mandatory file upload, chain-of-custody number, and location.',
    },
    {
      id: 'forensics',
      title: 'Forensics Request Service',
      description: 'Capture required fields for lab/forensics tasks',
      icon: Shield,
      color: 'purple',
      prompt: 'Create a service template for digital forensics extraction requiring: device type, evidence ID, mandatory file upload, chain-of-custody number, priority, and a default 24-hour SLA.',
    },
    {
      id: 'cross-dept',
      title: 'Cross-Department Request Service',
      description: 'Standardized input for interdepartmental task execution',
      icon: Users,
      color: 'green',
      prompt: 'Build a template for cross-department request requiring case ID, requesting department, service type, priority level, and detailed description.',
    },
    {
      id: 'citizen',
      title: 'Citizen Interaction / Intake Form',
      description: 'Capture structured inputs from public or external sources',
      icon: Globe2,
      color: 'cyan',
      prompt: 'Create a citizen intake form service requiring name, contact details, incident date, location, description, and optional file attachments.',
    },
    {
      id: 'case-action',
      title: 'Case Action Service',
      description: 'Trigger internal investigative actions with required parameters',
      icon: Briefcase,
      color: 'amber',
      prompt: 'Create a case action service template requiring case ID, action type, assigned investigator, priority, deadline, and supporting documentation.',
    },
    {
      id: 'custom',
      title: 'Custom Service Template',
      description: 'Describe your own service requirements',
      icon: Lightbulb,
      color: 'slate',
      prompt: '',
    },
  ];

  const examplePrompts = [
    'Create a service template for chain-of-custody verification with mandatory attachments.',
    'Build a template for cross-department request requiring case ID and location details.',
    'Generate a service for officer field-report submission including geotag, evidence, and notes.',
  ];

  // Mock generated fields
  const generatedFields: TemplateField[] = [
    { id: '1', label: 'Device Type', type: 'dropdown', required: true, icon: Type },
    { id: '2', label: 'Evidence ID', type: 'text', required: true, icon: FileText },
    { id: '3', label: 'Upload Evidence File', type: 'file', required: true, icon: Upload },
    { id: '4', label: 'Chain-of-Custody Number', type: 'text', required: true, icon: Shield },
    { id: '5', label: 'Priority Level', type: 'dropdown', required: false, icon: AlertCircle },
    { id: '6', label: 'Incident Date', type: 'date', required: false, icon: Calendar },
  ];

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setSelectedTemplate(template.id);
    if (template.prompt) {
      setServicePrompt(template.prompt);
    }
  };

  const handleExampleClick = (example: string) => {
    setServicePrompt(example);
    setSelectedTemplate('custom');
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      setAIRules([
        {
          id: '1',
          description: 'Evidence file upload is required.',
          enabled: true,
        },
        {
          id: '2',
          description: 'Chain-of-custody must be a numeric value.',
          enabled: true,
        },
        {
          id: '3',
          description: 'Priority defaults to High if case type is Cybercrime.',
          enabled: true,
        },
        {
          id: '4',
          description: 'Assign this service to Forensics Department by default.',
          enabled: true,
        },
      ]);
      setRecommendedSLA('24');
    }, 2000);
  };

  const handleClear = () => {
    setServicePrompt('');
    setHasGenerated(false);
    setAIRules([]);
    setSelectedTemplate(null);
  };

  const toggleRule = (ruleId: string) => {
    setAIRules(aiRules.map(rule =>
      rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
    ));
  };

  const getFieldTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
      case 'number':
        return Type;
      case 'dropdown':
        return ListIcon;
      case 'file':
        return Upload;
      case 'date':
        return Calendar;
      default:
        return FileText;
    }
  };

  return (
    <div className="h-screen bg-slate-950 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:text-white hover:bg-slate-800"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-white text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-400" />
                AI Service Template Builder
              </h1>
              <p className="text-slate-400 text-sm">Describe your service and let AI build the template for you</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasGenerated && (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Check className="w-4 h-4 mr-2" />
                Save Template
              </Button>
            )}
            <Button
              onClick={onClose}
              variant="outline"
              className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700"
            >
              Cancel / Exit
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex gap-6 p-6">
          {/* Left Panel - Quick Start Templates */}
          <div className="w-80 flex-shrink-0">
            <Card className="bg-slate-900/50 border-slate-800 h-full">
              <CardHeader>
                <CardTitle className="text-white text-base">Quick Start Templates</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Choose a common service template to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-250px)]">
                  <div className="space-y-2 pr-4">
                    {templates.map((template) => {
                      const Icon = template.icon;
                      const isSelected = selectedTemplate === template.id;

                      return (
                        <button
                          key={template.id}
                          onClick={() => handleTemplateSelect(template)}
                          className={`w-full text-left p-4 rounded-lg border transition-all ${
                            isSelected
                              ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50'
                              : 'bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 hover:border-slate-600'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              isSelected ? 'bg-blue-600/30' : 'bg-slate-700/50'
                            }`}>
                              <Icon className={`w-5 h-5 ${isSelected ? 'text-blue-400' : 'text-slate-400'}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm mb-1">{template.title}</p>
                              <p className="text-slate-400 text-xs line-clamp-2">{template.description}</p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          {/* Center Panel - Natural Language Input */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Input Card */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">Describe Your Service Template</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Be specific about required fields, field types, validation rules, SLAs, and evidence requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300 mb-2 block">Service Description</Label>
                  <Textarea
                    value={servicePrompt}
                    onChange={(e) => setServicePrompt(e.target.value)}
                    placeholder="Create a service template for digital forensics extraction requiring: device type, evidence ID, mandatory file upload, chain-of-custody number, priority, and a default 24-hour SLA."
                    className="min-h-[150px] bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500 resize-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                {/* AI Tips */}
                <div className="p-4 bg-blue-600/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-300 mb-2">Tips for Better AI Generation</p>
                      <ul className="text-xs text-blue-200/80 space-y-1">
                        <li>• List the fields the user must fill (e.g., device type, case number, priority)</li>
                        <li>• Specify required vs optional fields</li>
                        <li>• Mention validation rules (e.g., must upload at least one file)</li>
                        <li>• Include SLA expectations if needed</li>
                        <li>• Mention if service is internal or cross-department</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={!servicePrompt.trim() || isGenerating}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating Template...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      ✨ Generate Service Template
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Example AI Prompts */}
            <Card className="bg-slate-900/50 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-base">Example AI Prompts</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  Click to use these examples
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {examplePrompts.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleExampleClick(example)}
                      className="w-full text-left p-4 bg-slate-800/30 border border-slate-700 rounded-lg hover:bg-slate-800/50 hover:border-slate-600 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <FileText className="w-4 h-4 text-slate-400 group-hover:text-blue-400 mt-0.5 flex-shrink-0 transition-colors" />
                        <p className="text-slate-300 text-sm">{example}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - AI Template Preview */}
          <div className="w-[480px] flex-shrink-0">
            <Card className="bg-slate-900/50 border-slate-800 h-full flex flex-col">
              <CardHeader className="border-b border-slate-800 bg-slate-900/70">
                <CardTitle className="text-white text-base">Template Preview</CardTitle>
                <CardDescription className="text-slate-400 text-sm">
                  AI-generated service template
                </CardDescription>
              </CardHeader>

              {!hasGenerated ? (
                <CardContent className="flex-1 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-8 h-8 text-slate-600" />
                    </div>
                    <p className="text-slate-400 text-sm">
                      Template preview will appear here
                    </p>
                    <p className="text-slate-500 text-xs mt-1">
                      Generate a template to see auto-generated fields and rules
                    </p>
                  </div>
                </CardContent>
              ) : (
                <>
                  <ScrollArea className="flex-1">
                    <CardContent className="p-6 space-y-6">
                      {/* Auto-Generated Form Fields */}
                      <div>
                        <h3 className="text-white text-sm mb-3 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-blue-400" />
                          Auto-Generated Form Fields
                        </h3>
                        <div className="space-y-2">
                          {generatedFields.map((field) => {
                            const Icon = getFieldTypeIcon(field.type);
                            return (
                              <div key={field.id} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg group hover:border-blue-500/50 transition-all">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3 flex-1">
                                    <Icon className="w-4 h-4 text-slate-400" />
                                    <div>
                                      <p className="text-sm text-white">{field.label}</p>
                                      <div className="flex items-center gap-2 mt-1">
                                        <Badge className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                                          {field.type}
                                        </Badge>
                                        {field.required && (
                                          <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                                            Required
                                          </Badge>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <Button
                                    size="sm"
                                    className="w-7 h-7 p-0 bg-slate-700 hover:bg-slate-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                  >
                                    <Settings className="w-3.5 h-3.5" />
                                  </Button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <Separator className="bg-slate-800" />

                      {/* AI-Detected Rules */}
                      <div>
                        <h3 className="text-white text-sm mb-3 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          AI-Detected Rules
                        </h3>
                        <div className="space-y-2">
                          {aiRules.map((rule) => (
                            <div key={rule.id} className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg flex items-start justify-between gap-3">
                              <p className="text-sm text-slate-300 flex-1">{rule.description}</p>
                              <Switch
                                checked={rule.enabled}
                                onCheckedChange={() => toggleRule(rule.id)}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Separator className="bg-slate-800" />

                      {/* SLA Suggestions */}
                      <div>
                        <h3 className="text-white text-sm mb-3 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-amber-400" />
                          SLA Suggestions
                        </h3>
                        <div className="p-4 bg-amber-600/10 border border-amber-500/30 rounded-lg">
                          <p className="text-sm text-amber-200 mb-3">
                            Recommended SLA: {recommendedSLA} hours (based on similar forensics templates)
                          </p>
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              value={recommendedSLA}
                              onChange={(e) => setRecommendedSLA(e.target.value)}
                              className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded text-white text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                              placeholder="Hours"
                            />
                            <span className="text-slate-400 text-sm">hours</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </ScrollArea>

                  {/* Action Buttons */}
                  <div className="border-t border-slate-800 p-4 space-y-2">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      <Check className="w-4 h-4 mr-2" />
                      Insert into Service Template Editor
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleGenerate}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Regenerate
                      </Button>
                      <Button
                        onClick={handleClear}
                        className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                      >
                        Clear Preview
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
