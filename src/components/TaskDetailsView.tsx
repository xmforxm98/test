import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
    Clock,
    Calendar,
    User,
    AlertCircle,
    CheckCircle2,
    FileText,
    Image as ImageIcon,
    Video,
    Music,
    File,
    Paperclip,
    MapPin,
    Building2,
    Hash,
    Shield,
    Sparkles,
    Users,
    Activity,
    Download,
    Eye,
    ChevronRight,
    ChevronDown,
    ChevronUp,
    FileCheck,
    Send,
    RefreshCw,
    Flag,
    Scan,
    Type,
    Upload,
    ListIcon,
    X,
    Play,
    AlertTriangle,
    CheckCircle,
    XCircle,
    Zap,
    Save,
    Loader2,
    MessageSquare,
    Brain,
    ArrowLeft,
} from 'lucide-react';

interface TaskDetailsViewProps {
    task: any;
    onBack: () => void;
}

interface ServiceField {
    id: string;
    label: string;
    type: 'text' | 'dropdown' | 'file' | 'date' | 'number' | 'textarea';
    required: boolean;
    value?: any;
    options?: string[];
    validation?: {
        message: string;
        isValid: boolean;
    };
}

interface Evidence {
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedBy: string;
    uploadedAt: string;
    thumbnail?: string;
    aiAnalysis?: {
        classification: string;
        validations: {
            type: 'success' | 'warning' | 'error' | 'info';
            message: string;
        }[];
        detections?: string[];
    };
}

interface CompletionCheck {
    id: string;
    label: string;
    status: 'completed' | 'needs-review' | 'required' | 'optional';
    message?: string;
}

export function TaskDetailsView({ task, onBack }: TaskDetailsViewProps) {
    const [taskStatus, setTaskStatus] = useState('todo');
    const [isAIAssistantExpanded, setIsAIAssistantExpanded] = useState(true);
    const [aiQuestion, setAiQuestion] = useState('');
    const [isAskingAI, setIsAskingAI] = useState(false);
    const [aiResponse, setAiResponse] = useState('');
    const [activeEvidenceTab, setActiveEvidenceTab] = useState('all');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showValidationErrors, setShowValidationErrors] = useState(false);

    const [serviceFields, setServiceFields] = useState<ServiceField[]>([
        {
            id: 'device-type',
            label: 'Device Type',
            type: 'dropdown',
            required: true,
            options: ['Mobile Phone', 'Laptop', 'Desktop', 'Tablet', 'External Drive'],
            value: '',
            validation: { message: 'Device type is required', isValid: false },
        },
        {
            id: 'evidence-id',
            label: 'Evidence ID',
            type: 'text',
            required: true,
            value: '',
            validation: { message: 'Evidence ID is required', isValid: false },
        },
        {
            id: 'evidence-file',
            label: 'Upload Evidence File',
            type: 'file',
            required: true,
            value: null,
            validation: { message: 'Evidence file must be uploaded', isValid: false },
        },
        {
            id: 'chain-of-custody',
            label: 'Chain-of-Custody Number',
            type: 'text',
            required: true,
            value: '',
            validation: { message: 'Chain-of-custody ID is required', isValid: false },
        },
        {
            id: 'priority',
            label: 'Priority Level',
            type: 'dropdown',
            required: false,
            options: ['Low', 'Medium', 'High', 'Critical'],
            value: 'Medium',
            validation: { message: '', isValid: true },
        },
        {
            id: 'notes',
            label: 'Additional Notes',
            type: 'textarea',
            required: false,
            value: '',
            validation: { message: '', isValid: true },
        },
    ]);

    useEffect(() => {
        if (task?.status) {
            setTaskStatus(task.status);
        }
    }, [task?.status]);

    if (!task) return null;

    const safeTask = {
        title: task.title || 'Untitled Task',
        id: task.id || 'N/A',
        priority: task.priority || 'medium',
        status: task.status || 'todo',
        slaStatus: task.slaStatus || 'on-track',
        dueDate: task.dueDate || 'N/A',
        daysRemaining: task.daysRemaining ?? 0,
        assignee: task.assignee || 'Unassigned',
        assigneeAvatar: task.assigneeAvatar || 'NA',
        department: task.department || 'General',
        ...task,
    };

    const evidenceFiles: Evidence[] = [
        {
            id: 'ev-1',
            name: 'surveillance_footage_001.mp4',
            type: 'video/mp4',
            size: '24.5 MB',
            uploadedBy: 'Det. Sarah Mitchell',
            uploadedAt: '2025-10-28 14:30',
            aiAnalysis: {
                classification: 'Video',
                validations: [
                    { type: 'success', message: 'File type correct' },
                    { type: 'warning', message: 'Resolution 720p - Recommended: 1080p+' },
                    { type: 'success', message: 'Chain-of-custody file attached' },
                ],
                detections: ['2 faces detected', '1 vehicle detected', 'License plate: JBK-59211'],
            },
        },
        {
            id: 'ev-2',
            name: 'suspect_photo_001.jpg',
            type: 'image/jpeg',
            size: '2.3 MB',
            uploadedBy: 'Det. James Chen',
            uploadedAt: '2025-10-29 10:15',
            aiAnalysis: {
                classification: 'Image',
                validations: [
                    { type: 'success', message: 'File type correct' },
                    { type: 'success', message: 'Resolution: 1920x1080 ✓' },
                    { type: 'info', message: 'Detected 2 faces in the image - tap to review' },
                ],
                detections: ['Person detected: John Doe (92% confidence)', 'Location: 1234 Main St'],
            },
        },
    ];

    const completionChecks: CompletionCheck[] = [
        {
            id: 'device-type-check',
            label: 'Device Type selected',
            status: serviceFields.find(f => f.id === 'device-type')?.value ? 'completed' : 'required',
            message: serviceFields.find(f => f.id === 'device-type')?.value ? undefined : 'Required field missing',
        },
        {
            id: 'evidence-id-check',
            label: 'Evidence ID provided',
            status: serviceFields.find(f => f.id === 'evidence-id')?.value ? 'completed' : 'required',
            message: serviceFields.find(f => f.id === 'evidence-id')?.value ? undefined : 'Required field missing',
        },
        {
            id: 'evidence-file-check',
            label: 'Evidence file uploaded',
            status: serviceFields.find(f => f.id === 'evidence-file')?.value ? 'completed' : 'required',
            message: serviceFields.find(f => f.id === 'evidence-file')?.value ? undefined : 'Evidence file must be uploaded',
        },
        {
            id: 'chain-custody-check',
            label: 'Chain-of-Custody ID provided',
            status: serviceFields.find(f => f.id === 'chain-of-custody')?.value ? 'completed' : 'required',
            message: serviceFields.find(f => f.id === 'chain-of-custody')?.value ? undefined : 'Chain-of-custody ID missing',
        },
        {
            id: 'sla-check',
            label: 'Within SLA deadline',
            status: task?.slaStatus === 'breached' ? 'needs-review' : 'completed',
            message: task?.slaStatus === 'breached' ? 'SLA already breached' : undefined,
        },
    ];

    const requiredIssuesCount = completionChecks.filter(c => c.status === 'required').length;

    const handleFieldChange = (fieldId: string, value: any) => {
        setServiceFields(serviceFields.map(field => {
            if (field.id === fieldId) {
                const isValid = field.required ? !!value : true;
                return {
                    ...field,
                    value,
                    validation: {
                        message: isValid ? '' : field.validation?.message || 'This field is required',
                        isValid,
                    },
                };
            }
            return field;
        }));
    };

    const handleAskAI = () => {
        setIsAskingAI(true);
        setTimeout(() => {
            setAiResponse(
                `Based on the task "${task.title}", you need to complete the following service form and upload the relevant evidence records. The AI has detected that cross-department approval from Forensics will be required upon submission.`
            );
            setIsAskingAI(false);
        }, 1500);
    };

    const handleStartTask = () => {
        setTaskStatus('in-progress');
    };

    const handleSubmitTask = () => {
        if (requiredIssuesCount > 0) {
            setShowValidationErrors(true);
            return;
        }
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onBack();
        }, 2000);
    };

    const getSLAColor = (status: string) => {
        switch (status) {
            case 'on-track': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'at-risk': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            case 'breached': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
            case 'low': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
            case 'in-progress': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
            case 'review': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
            case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
            default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
        }
    };

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return ImageIcon;
        if (type.startsWith('video/')) return Video;
        if (type.startsWith('audio/')) return Music;
        if (type.includes('pdf') || type.includes('document')) return FileText;
        return File;
    };

    const filteredEvidence = evidenceFiles.filter(file => {
        if (activeEvidenceTab === 'all') return true;
        if (activeEvidenceTab === 'images') return file.type.startsWith('image/');
        if (activeEvidenceTab === 'videos') return file.type.startsWith('video/');
        if (activeEvidenceTab === 'audio') return file.type.startsWith('audio/');
        if (activeEvidenceTab === 'documents') return file.type.includes('pdf') || file.type.includes('document');
        return true;
    });

    return (
        <div className="flex flex-col h-full bg-slate-950">
            {/* Top Header / Breadcrumb */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={onBack} className="text-slate-400 hover:text-white">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div className="h-6 w-px bg-slate-800" />
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-white text-lg font-bold">{safeTask.title}</h2>
                            <Badge className={getPriorityColor(safeTask.priority)}>
                                {safeTask.priority.toUpperCase()}
                            </Badge>
                        </div>
                        <p className="text-slate-500 text-xs mt-1">
                            Task ID: <span className="text-blue-400">{safeTask.id}</span> • {safeTask.department}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-slate-800">
                        Export Report
                    </Button>
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                        onClick={handleSubmitTask}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        Complete Task
                    </Button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Form and Evidence */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Task Info Card */}
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardContent className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                                    <div className="space-y-1.5">
                                        <label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Status</label>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${taskStatus === 'completed' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`} />
                                            <span className="text-white text-sm font-bold uppercase">{taskStatus.replace('-', ' ')}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Assigned To</label>
                                        <div className="flex items-center gap-2">
                                            <Avatar className="w-6 h-6">
                                                <AvatarFallback className="bg-blue-600 text-[10px] text-white">
                                                    {safeTask.assigneeAvatar}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="text-white text-sm">{safeTask.assignee}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-slate-400 text-xs uppercase tracking-wider font-bold">Due Date</label>
                                        <div className="flex items-center gap-2 text-white text-sm">
                                            <Calendar className="w-4 h-4 text-slate-500" />
                                            {safeTask.dueDate}
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-slate-400 text-xs uppercase tracking-wider font-bold">SLA Timeline</label>
                                        <Badge className={getSLAColor(safeTask.slaStatus)}>
                                            {safeTask.slaStatus.toUpperCase()}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-xl">
                                    <p className="text-slate-300 text-sm leading-relaxed">
                                        This investigative task requires the collection and documentation of testimonial evidence from primary suspects.
                                        Ensure all digital recordings are processed through the AI validator for compliance.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Service Form */}
                        <Card className="bg-slate-900/50 border-slate-800 overflow-hidden">
                            <div className="p-4 bg-slate-800/30 border-b border-slate-800 flex items-center justify-between">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-400" />
                                    Service Execution Form
                                </h3>
                                <Badge className="bg-blue-600/10 text-blue-400 border-none text-[10px]">VERIFIED TEMPLATE</Badge>
                            </div>
                            <CardContent className="p-6 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {serviceFields.map((field) => (
                                        <div key={field.id} className={`${field.type === 'textarea' || field.type === 'file' ? 'md:col-span-2' : ''} space-y-2`}>
                                            <div className="flex items-center justify-between">
                                                <Label className="text-slate-300 text-xs font-bold uppercase tracking-wide">{field.label}</Label>
                                                {field.required && <span className="text-[10px] text-red-400 font-bold uppercase tracking-tighter">Required</span>}
                                            </div>

                                            {field.type === 'text' && (
                                                <Input
                                                    value={field.value}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className="bg-slate-950 border-slate-800 text-white focus:ring-blue-500/50"
                                                />
                                            )}

                                            {field.type === 'dropdown' && (
                                                <Select value={field.value} onValueChange={(val: string) => handleFieldChange(field.id, val)}>
                                                    <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
                                                        <SelectValue placeholder="Select option" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-900 border-slate-800">
                                                        {field.options?.map(opt => <SelectItem key={opt} value={opt} className="text-white">{opt}</SelectItem>)}
                                                    </SelectContent>
                                                </Select>
                                            )}

                                            {field.type === 'textarea' && (
                                                <Textarea
                                                    rows={4}
                                                    value={field.value}
                                                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                                                    className="bg-slate-950 border-slate-800 text-white"
                                                />
                                            )}

                                            {field.type === 'file' && (
                                                <div className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-all ${field.value ? 'bg-blue-600/5 border-blue-500/30' : 'border-slate-800 hover:border-slate-700'}`}>
                                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${field.value ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-800 text-slate-500'}`}>
                                                        <Upload className="w-6 h-6" />
                                                    </div>
                                                    <p className="text-white font-bold text-sm mb-1">{field.value ? 'File Uploaded' : 'Drag & Drop Evidence'}</p>
                                                    <p className="text-slate-500 text-xs mb-4">Supported: MP4, JPG, PDF, PNG (Max 50MB)</p>
                                                    <Button size="sm" variant="outline" className="border-slate-700">Browse Files</Button>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: AI Assistant and Validation */}
                    <div className="space-y-6">
                        {/* AI Assistant (Full Screen Style) */}
                        <Card className="bg-slate-900 border-blue-500/20 shadow-2xl overflow-hidden relative group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/50" />
                            <CardHeader className="p-5 border-b border-slate-800 bg-blue-500/5">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-white text-sm font-black flex items-center gap-2 tracking-widest uppercase">
                                        <Sparkles className="w-4 h-4 text-blue-400" />
                                        Intelligence Guide
                                    </CardTitle>
                                    <Badge className="bg-blue-500/20 text-blue-400 border-none text-[9px]">ACTIVE</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-3">
                                    <p className="text-slate-300 text-xs leading-relaxed font-medium">
                                        I've analyzed this task. To satisfy the chain-of-custody requirements, please ensure the **Evidence ID** matches the case file #4521 signature.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="text-[9px] border-slate-800 text-slate-500">Forensics Required</Badge>
                                        <Badge variant="outline" className="text-[9px] border-slate-800 text-slate-500">Legal Hold Active</Badge>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Consult AI</Label>
                                    <div className="relative">
                                        <Input
                                            placeholder="Ask about compliance..."
                                            className="bg-slate-950 border-slate-800 text-xs pr-10"
                                            value={aiQuestion}
                                            onChange={(e) => setAiQuestion(e.target.value)}
                                        />
                                        <button
                                            onClick={handleAskAI}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500"
                                        >
                                            <Send className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>

                                {aiResponse && (
                                    <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-xl animate-in fade-in duration-500">
                                        <div className="flex items-start gap-3">
                                            <Brain className="w-4 h-4 text-blue-400 mt-0.5" />
                                            <p className="text-slate-300 text-xs leading-relaxed">{aiResponse}</p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Validation & Completion Check */}
                        <Card className="bg-slate-900/50 border-slate-800">
                            <CardHeader className="p-5 border-b border-slate-800">
                                <CardTitle className="text-white text-sm font-bold flex items-center gap-2 uppercase tracking-wide">
                                    <Zap className="w-4 h-4 text-amber-500" />
                                    Completion Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div className="space-y-3">
                                    {completionChecks.map((check) => (
                                        <div key={check.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-5 h-5 rounded-full flex items-center justify-center ${check.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-slate-800 text-slate-600'}`}>
                                                    {check.status === 'completed' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                                </div>
                                                <span className={`text-[11px] font-bold ${check.status === 'completed' ? 'text-slate-200' : 'text-slate-500'}`}>{check.label}</span>
                                            </div>
                                            {check.status === 'required' && <Badge className="bg-red-500/10 text-red-400 border-none text-[9px]">REQUIRED</Badge>}
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-4 border-t border-slate-800">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-[10px] text-slate-500 font-bold uppercase">Work Progress</span>
                                        <span className="text-[10px] text-blue-400 font-bold">{Math.round((completionChecks.filter(c => c.status === 'completed').length / completionChecks.length) * 100)}%</span>
                                    </div>
                                    <Progress value={(completionChecks.filter(c => c.status === 'completed').length / completionChecks.length) * 100} className="h-1.5 bg-slate-950" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
