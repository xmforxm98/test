import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { Checkbox } from './ui/checkbox';
import {
  X,
  Save,
  GripVertical,
  Trash2,
  Plus,
  Type,
  AlignLeft,
  Hash,
  ChevronDown,
  CheckSquare,
  Calendar,
  Upload,
  Circle,
  List,
  Heading,
  Clock,
  AlertTriangle,
  Shield,
  FileText,
  ArrowRight,
  History,
  Edit,
  Settings,
  Eye,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

interface FormField {
  id: string;
  type: 'shortText' | 'longText' | 'number' | 'dropdown' | 'multiSelect' | 'date' | 'file' | 'checkbox' | 'radio' | 'section';
  label: string;
  required: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  validation?: string;
}

interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  icon: any;
}

const fieldTypes = [
  { id: 'shortText', label: 'Short Text', icon: Type },
  { id: 'longText', label: 'Long Text', icon: AlignLeft },
  { id: 'number', label: 'Number', icon: Hash },
  { id: 'dropdown', label: 'Dropdown / Select', icon: ChevronDown },
  { id: 'multiSelect', label: 'Multi-Select', icon: List },
  { id: 'date', label: 'Date / Time picker', icon: Calendar },
  { id: 'file', label: 'File Upload', icon: Upload },
  { id: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { id: 'radio', label: 'Radio group', icon: Circle },
  { id: 'section', label: 'Section header', icon: Heading },
];

export function ServiceTemplateEditor() {
  const [serviceName, setServiceName] = useState('Digital Forensics Extraction');
  const [serviceType, setServiceType] = useState<'Internal' | 'Published'>('Published');
  const [description, setDescription] = useState('Digital evidence extraction and analysis service for cross-department requests.');
  const [assignedRole, setAssignedRole] = useState('Forensics Analyst');
  const [versionTag, setVersionTag] = useState('v1.2');
  
  const [slaTarget, setSlaTarget] = useState('48');
  const [slaUnit, setSlaUnit] = useState('hours');
  const [priorityBasedSLA, setPriorityBasedSLA] = useState(false);
  const [allowSLAOverride, setAllowSLAOverride] = useState(true);
  const [escalationThreshold, setEscalationThreshold] = useState('80');
  
  const [deptHeadApproval, setDeptHeadApproval] = useState(false);
  const [autoAssignType, setAutoAssignType] = useState<'role' | 'member'>('role');
  const [autoAssignRole, setAutoAssignRole] = useState('Forensics Analyst');
  
  const [requiresEvidence, setRequiresEvidence] = useState(true);
  const [allowedFileTypes, setAllowedFileTypes] = useState(['PDF', 'JPG', 'MP4', 'ZIP']);
  const [minFiles, setMinFiles] = useState('1');
  const [maxFileSize, setMaxFileSize] = useState('100');
  const [autoChainOfCustody, setAutoChainOfCustody] = useState(true);
  
  const [isActivityLogOpen, setIsActivityLogOpen] = useState(false);
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>(null);

  const [formFields, setFormFields] = useState<FormField[]>([
    {
      id: '1',
      type: 'shortText',
      label: 'Suspect ID',
      required: true,
      placeholder: 'Enter suspect identification number',
      helpText: 'Official suspect ID from case management system',
    },
    {
      id: '2',
      type: 'dropdown',
      label: 'Location of Incident',
      required: true,
      options: ['North District', 'South District', 'East District', 'West District', 'Central'],
      helpText: 'Select the district where incident occurred',
    },
    {
      id: '3',
      type: 'file',
      label: 'Evidence Upload',
      required: true,
      helpText: 'Upload all relevant digital evidence files',
      validation: 'Max 100MB per file',
    },
    {
      id: '4',
      type: 'longText',
      label: 'Additional Notes',
      required: false,
      placeholder: 'Enter any additional context or notes',
      helpText: 'Optional field for extra information',
    },
  ]);

  const activityLogs: ActivityLog[] = [
    { id: '1', action: 'Template saved', user: 'Admin', timestamp: '2 min ago', icon: Save },
    { id: '2', action: 'Field added: Suspect ID', user: 'Admin', timestamp: '15 min ago', icon: Plus },
    { id: '3', action: 'SLA changed to 48 hours', user: 'F. Ali', timestamp: '1 hour ago', icon: Clock },
    { id: '4', action: 'Approval rule updated', user: 'Admin', timestamp: '2 hours ago', icon: Shield },
    { id: '5', action: 'Field removed: Legacy ID', user: 'Admin', timestamp: '3 hours ago', icon: Trash2 },
    { id: '6', action: 'Description updated', user: 'Admin', timestamp: '5 hours ago', icon: Edit },
  ];

  const handleAddField = (type: string) => {
    const newField: FormField = {
      id: Date.now().toString(),
      type: type as any,
      label: `New ${type} field`,
      required: false,
      placeholder: '',
      helpText: '',
    };
    setFormFields([...formFields, newField]);
  };

  const handleDeleteField = (id: string) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const handleMoveField = (id: string, direction: 'up' | 'down') => {
    const index = formFields.findIndex(f => f.id === id);
    if (index === -1) return;
    
    if (direction === 'up' && index > 0) {
      const newFields = [...formFields];
      [newFields[index], newFields[index - 1]] = [newFields[index - 1], newFields[index]];
      setFormFields(newFields);
    } else if (direction === 'down' && index < formFields.length - 1) {
      const newFields = [...formFields];
      [newFields[index], newFields[index + 1]] = [newFields[index + 1], newFields[index]];
      setFormFields(newFields);
    }
  };

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    setFormFields(formFields.map(field => 
      field.id === id ? { ...field, ...updates } : field
    ));
  };

  const getFieldIcon = (type: string) => {
    const fieldType = fieldTypes.find(ft => ft.id === type);
    return fieldType?.icon || Type;
  };

  return (
    <div className="space-y-6">
      {/* 1. Header Bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-white text-2xl">Service Template Editor</h1>
            <p className="text-slate-400 text-sm">Configure required fields, inputs, SLAs, approvals, and auto-assignment rules.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700">
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Template
            </Button>
          </div>
        </div>
        <Separator className="bg-slate-800 mt-4" />
      </div>

      {/* 2. Template Summary Card */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Template Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-slate-400 mb-2 block">Service Name</Label>
                <Input
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                />
              </div>
              <div>
                <Label className="text-slate-400 mb-2 block">Service Type</Label>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={serviceType === 'Internal'}
                      onChange={() => setServiceType('Internal')}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-slate-300">Internal</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={serviceType === 'Published'}
                      onChange={() => setServiceType('Published')}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-slate-300">Published</span>
                  </label>
                </div>
              </div>
              <div>
                <Label className="text-slate-400 mb-2 block">Assigned Role</Label>
                <Select value={assignedRole} onValueChange={setAssignedRole}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="Forensics Analyst" className="text-white">Forensics Analyst</SelectItem>
                    <SelectItem value="Senior Investigator" className="text-white">Senior Investigator</SelectItem>
                    <SelectItem value="Data Analyst" className="text-white">Data Analyst</SelectItem>
                    <SelectItem value="Lab Technician" className="text-white">Lab Technician</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-400 mb-2 block">Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  rows={5}
                />
              </div>
              <div>
                <Label className="text-slate-400 mb-2 block">Version Tag</Label>
                <div className="flex items-center gap-2">
                  <Input
                    value={versionTag}
                    onChange={(e) => setVersionTag(e.target.value)}
                    className="bg-slate-800/50 border-slate-700 text-white w-32"
                  />
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                    {versionTag}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 3. Template Builder Section */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Pane: Field Library */}
        <div className="col-span-3">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white text-base">Field Library</CardTitle>
              <CardDescription className="text-slate-500">Drag fields to add them</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-3">
                <div className="space-y-2">
                  {fieldTypes.map((fieldType) => {
                    const Icon = fieldType.icon;
                    return (
                      <button
                        key={fieldType.id}
                        onClick={() => handleAddField(fieldType.id)}
                        className="w-full flex items-center gap-3 p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-500/50 rounded-lg transition-all text-left group"
                      >
                        <div className="w-8 h-8 rounded bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                          <Icon className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                          {fieldType.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        {/* Center Pane: Editable Template Form */}
        <div className="col-span-9">
          <Card className="bg-slate-900/50 border-slate-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Template Form Builder</CardTitle>
                  <CardDescription className="text-slate-500">Configure form fields and validation</CardDescription>
                </div>
                <Button
                  onClick={() => setIsActivityLogOpen(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700"
                >
                  <History className="w-4 h-4 mr-2" />
                  Activity Log
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                <div className="space-y-4">
                  {formFields.map((field, index) => {
                    const FieldIcon = getFieldIcon(field.type);
                    const isSelected = selectedFieldId === field.id;
                    
                    return (
                      <Card
                        key={field.id}
                        className={`bg-slate-800/30 border-slate-700 hover:border-blue-500/50 transition-all ${
                          isSelected ? 'border-blue-500 shadow-lg shadow-blue-500/20' : ''
                        }`}
                        onClick={() => setSelectedFieldId(field.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            {/* Drag Handle */}
                            <div className="flex flex-col gap-1 mt-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMoveField(field.id, 'up');
                                }}
                                disabled={index === 0}
                                className="text-slate-500 hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <GripVertical className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Field Content */}
                            <div className="flex-1 space-y-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-blue-600/20 flex items-center justify-center">
                                  <FieldIcon className="w-4 h-4 text-blue-400" />
                                </div>
                                <div className="flex-1">
                                  <Input
                                    value={field.label}
                                    onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-slate-900/50 border-slate-600 text-white"
                                    placeholder="Field label"
                                  />
                                </div>
                                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                  {field.type}
                                </Badge>
                                <div className="flex items-center gap-2">
                                  <Switch
                                    checked={field.required}
                                    onCheckedChange={(checked) => handleUpdateField(field.id, { required: checked })}
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <Label className="text-slate-400 text-sm">Required</Label>
                                </div>
                              </div>

                              {field.type !== 'section' && (
                                <div className="grid grid-cols-2 gap-3 ml-11">
                                  <div>
                                    <Label className="text-slate-500 text-xs mb-1 block">Placeholder</Label>
                                    <Input
                                      value={field.placeholder || ''}
                                      onChange={(e) => handleUpdateField(field.id, { placeholder: e.target.value })}
                                      onClick={(e) => e.stopPropagation()}
                                      className="bg-slate-900/50 border-slate-600 text-white text-sm"
                                      placeholder="Enter placeholder text"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-slate-500 text-xs mb-1 block">Validation</Label>
                                    <Input
                                      value={field.validation || ''}
                                      onChange={(e) => handleUpdateField(field.id, { validation: e.target.value })}
                                      onClick={(e) => e.stopPropagation()}
                                      className="bg-slate-900/50 border-slate-600 text-white text-sm"
                                      placeholder="e.g., min 3 chars"
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="ml-11">
                                <Label className="text-slate-500 text-xs mb-1 block">Help Text</Label>
                                <Input
                                  value={field.helpText || ''}
                                  onChange={(e) => handleUpdateField(field.id, { helpText: e.target.value })}
                                  onClick={(e) => e.stopPropagation()}
                                  className="bg-slate-900/50 border-slate-600 text-white text-sm"
                                  placeholder="Enter help text for users"
                                />
                              </div>

                              {(field.type === 'dropdown' || field.type === 'multiSelect' || field.type === 'radio') && (
                                <div className="ml-11">
                                  <Label className="text-slate-500 text-xs mb-1 block">Options (comma-separated)</Label>
                                  <Input
                                    value={field.options?.join(', ') || ''}
                                    onChange={(e) => handleUpdateField(field.id, { options: e.target.value.split(',').map(o => o.trim()) })}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-slate-900/50 border-slate-600 text-white text-sm"
                                    placeholder="Option 1, Option 2, Option 3"
                                  />
                                </div>
                              )}
                            </div>

                            {/* Delete Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteField(field.id);
                              }}
                              className="text-slate-500 hover:text-red-400 transition-colors mt-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}

                  {formFields.length === 0 && (
                    <div className="text-center py-12">
                      <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-500">No fields added yet</p>
                      <p className="text-slate-600 text-sm">Click on field types from the left to add them</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section: 3 Panels Side by Side */}
      <div className="grid grid-cols-3 gap-6">
        {/* 4. SLA Configuration Panel */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              SLA Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-slate-400 mb-2 block">SLA Target</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={slaTarget}
                  onChange={(e) => setSlaTarget(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  type="number"
                />
                <Select value={slaUnit} onValueChange={setSlaUnit}>
                  <SelectTrigger className="w-24 bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="hours" className="text-white">hours</SelectItem>
                    <SelectItem value="days" className="text-white">days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-slate-800" />

            <div className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700 rounded-lg">
              <Label className="text-slate-300 text-sm">Priority-based SLA</Label>
              <Switch checked={priorityBasedSLA} onCheckedChange={setPriorityBasedSLA} />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700 rounded-lg">
              <Label className="text-slate-300 text-sm">Allow SLA override</Label>
              <Switch checked={allowSLAOverride} onCheckedChange={setAllowSLAOverride} />
            </div>

            <div>
              <Label className="text-slate-400 mb-2 block flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Escalation Threshold
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  value={escalationThreshold}
                  onChange={(e) => setEscalationThreshold(e.target.value)}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  type="number"
                />
                <span className="text-slate-400">%</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Notify Dept Head at this SLA consumption</p>
            </div>
          </CardContent>
        </Card>

        {/* 5. Approval Workflow Panel */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-400" />
              Approval Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700 rounded-lg">
              <Label className="text-slate-300 text-sm">Dept Head Approval Required</Label>
              <Switch checked={deptHeadApproval} onCheckedChange={setDeptHeadApproval} />
            </div>

            <Separator className="bg-slate-800" />

            <div>
              <Label className="text-slate-400 mb-2 block">Auto-Assign Request To</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={autoAssignType === 'role'}
                      onChange={() => setAutoAssignType('role')}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-slate-300">Role</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={autoAssignType === 'member'}
                      onChange={() => setAutoAssignType('member')}
                      className="text-blue-600"
                    />
                    <span className="text-sm text-slate-300">Specific Member</span>
                  </label>
                </div>
                <Select value={autoAssignRole} onValueChange={setAutoAssignRole}>
                  <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700">
                    <SelectItem value="Forensics Analyst" className="text-white">Forensics Analyst</SelectItem>
                    <SelectItem value="Senior Investigator" className="text-white">Senior Investigator</SelectItem>
                    <SelectItem value="Data Analyst" className="text-white">Data Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Separator className="bg-slate-800" />

            <div>
              <Label className="text-slate-400 mb-3 block text-xs">Flow Preview</Label>
              <div className="flex items-center justify-between text-xs">
                <div className="flex-1 text-center">
                  <div className="w-full py-2 px-2 bg-blue-600/20 border border-blue-500/30 rounded text-blue-400">
                    Case Lead
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 mx-1" />
                {deptHeadApproval && (
                  <>
                    <div className="flex-1 text-center">
                      <div className="w-full py-2 px-2 bg-purple-600/20 border border-purple-500/30 rounded text-purple-400">
                        Dept Head
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600 mx-1" />
                  </>
                )}
                <div className="flex-1 text-center">
                  <div className="w-full py-2 px-2 bg-green-600/20 border border-green-500/30 rounded text-green-400">
                    {autoAssignRole}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 6. Evidence Requirements Panel */}
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white text-base flex items-center gap-2">
              <Upload className="w-4 h-4 text-green-400" />
              Evidence Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-800/30 border border-slate-700 rounded-lg">
              <Label className="text-slate-300 text-sm">Requires evidence upload</Label>
              <Switch checked={requiresEvidence} onCheckedChange={setRequiresEvidence} />
            </div>

            {requiresEvidence && (
              <>
                <Separator className="bg-slate-800" />

                <div>
                  <Label className="text-slate-400 mb-2 block">Allowed File Types</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['PDF', 'JPG', 'PNG', 'MP4', 'ZIP', 'DOC'].map((type) => (
                      <label key={type} className="flex items-center gap-2 cursor-pointer">
                        <Checkbox
                          checked={allowedFileTypes.includes(type)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setAllowedFileTypes([...allowedFileTypes, type]);
                            } else {
                              setAllowedFileTypes(allowedFileTypes.filter(t => t !== type));
                            }
                          }}
                        />
                        <span className="text-sm text-slate-300">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-slate-400 mb-2 block text-xs">Min Files</Label>
                    <Input
                      value={minFiles}
                      onChange={(e) => setMinFiles(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-400 mb-2 block text-xs">Max Size (MB)</Label>
                    <Input
                      value={maxFileSize}
                      onChange={(e) => setMaxFileSize(e.target.value)}
                      className="bg-slate-800/50 border-slate-700 text-white"
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-600/10 border border-green-500/30 rounded-lg">
                  <Label className="text-green-300 text-sm flex items-center gap-2">
                    <CheckSquare className="w-4 h-4" />
                    Auto chain-of-custody
                  </Label>
                  <Switch checked={autoChainOfCustody} onCheckedChange={setAutoChainOfCustody} />
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 7. Right-Side Activity Log Panel (Slide-In) */}
      <Sheet open={isActivityLogOpen} onOpenChange={setIsActivityLogOpen}>
        <SheetContent className="w-[400px] bg-slate-900 border-l border-slate-800" side="right">
          <SheetHeader className="border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-600/20 flex items-center justify-center">
                <History className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <SheetTitle className="text-white">Activity Log</SheetTitle>
                <SheetDescription className="text-slate-400">Recent template edits</SheetDescription>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="h-[calc(100vh-120px)] pr-4 mt-6">
            <div className="space-y-4">
              {activityLogs.map((log, idx) => {
                const Icon = log.icon;
                return (
                  <div key={log.id} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30">
                        <Icon className="w-4 h-4 text-blue-400" />
                      </div>
                      {idx < activityLogs.length - 1 && (
                        <div className="w-px h-full bg-slate-800 mt-2" />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className="text-sm text-white mb-1">{log.action}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{log.user}</span>
                        <span>•</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
}
