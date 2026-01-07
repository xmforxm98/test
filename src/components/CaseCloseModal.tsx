import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { AlertCircle, Lock } from 'lucide-react';

interface CaseCloseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (data: { reason: string; summary: string }) => void;
    caseId: string;
    caseName: string;
}

export function CaseCloseModal({ isOpen, onClose, onConfirm, caseId, caseName }: CaseCloseModalProps) {
    const [reason, setReason] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [generateReport, setGenerateReport] = useState<boolean>(true);
    const [archiveCase, setArchiveCase] = useState<boolean>(true);
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false);

    const handleConfirm = () => {
        if (reason && summary && isConfirmed) {
            onConfirm({ reason, summary });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-slate-900 border-slate-800 text-white sm:max-w-[600px]">
                <DialogHeader>
                    <div className="flex items-center gap-2 mb-2">
                        <div className="p-2 bg-red-600/20 rounded-lg">
                            <Lock className="w-5 h-5 text-red-400" />
                        </div>
                        <DialogTitle className="text-xl">Finalize Case Closure</DialogTitle>
                    </div>
                    <DialogDescription className="text-slate-400">
                        You are about to archive <span className="text-blue-400">{caseId}</span>. This process generates the final investigation report and locks all records for legal retention.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    {/* Closing Reason */}
                    <div className="space-y-2">
                        <Label htmlFor="reason" className="text-slate-300 font-medium">Closing Reason <span className="text-red-400">*</span></Label>
                        <Select value={reason} onValueChange={setReason}>
                            <SelectTrigger id="reason" className="bg-slate-950 border-slate-700 text-white h-11">
                                <SelectValue placeholder="Select a reason for closing" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-900 border-slate-700 text-white">
                                <SelectItem value="investigation-completed">Investigation Completed</SelectItem>
                                <SelectItem value="insufficient-evidence">Insufficient Evidence</SelectItem>
                                <SelectItem value="resolved-other-agency">Resolved by Other Agency</SelectItem>
                                <SelectItem value="administrative-closure">Administrative Closure</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Outcome Summary */}
                    <div className="space-y-2">
                        <Label htmlFor="summary" className="text-slate-300 font-medium">Final Outcome & Executive Summary <span className="text-red-400">*</span></Label>
                        <Textarea
                            id="summary"
                            placeholder="This summary will be included in the final report. Describe the investigation results, suspect status, and concluding actions..."
                            className="bg-slate-950 border-slate-700 text-white min-h-[140px] leading-relaxed"
                            value={summary}
                            onChange={(e: any) => setSummary(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Report Generation Toggle */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                            <div className="space-y-0.5">
                                <Label className="text-sm font-medium text-slate-200">Generate Report</Label>
                                <p className="text-[10px] text-slate-500">AI-powered PDF generation</p>
                            </div>
                            <Checkbox
                                checked={generateReport}
                                onCheckedChange={(checked: any) => setGenerateReport(checked as boolean)}
                                className="border-slate-600 data-[state=checked]:bg-blue-600"
                            />
                        </div>

                        {/* Archiving Toggle */}
                        <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
                            <div className="space-y-0.5">
                                <Label className="text-sm font-medium text-slate-200">Archive Records</Label>
                                <p className="text-[10px] text-slate-500">Lock all evidence files</p>
                            </div>
                            <Checkbox
                                checked={archiveCase}
                                onCheckedChange={(checked: any) => setArchiveCase(checked as boolean)}
                                className="border-slate-600 data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    </div>

                    {/* Acknowledgement */}
                    <div className="flex items-start space-x-3 p-4 bg-blue-600/10 border border-blue-500/20 rounded-lg">
                        <Checkbox
                            id="confirm"
                            checked={isConfirmed}
                            onCheckedChange={(checked: any) => setIsConfirmed(checked as boolean)}
                            className="mt-1 border-blue-400 data-[state=checked]:bg-blue-600"
                        />
                        <div className="grid gap-1 leading-tight">
                            <label
                                htmlFor="confirm"
                                className="text-sm font-medium text-slate-200 cursor-pointer"
                            >
                                I confirm the accuracy of all investigation data
                            </label>
                            <p className="text-xs text-slate-500">
                                Action is irreversible. Case will be moved to Archive.
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2 sm:gap-0 border-t border-slate-800 pt-4 mt-2">
                    <Button variant="ghost" onClick={onClose} className="text-slate-400 hover:text-white hover:bg-slate-800">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirm}
                        disabled={!reason || !summary || !isConfirmed}
                        className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20 px-6 h-11"
                    >
                        Generate Report & Archive Case
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
