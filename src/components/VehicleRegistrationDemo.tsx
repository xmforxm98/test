import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Car, Database, Clock, Link2, AlertTriangle, CheckCircle2 } from 'lucide-react';

// Mock Database - Vehicle Registration Records
const vehicleRegistrationDB = [
  {
    plate: '2465',
    fullPlate: 'Red Nissan 2465',
    owner: 'Ahmed R.',
    caseId: '#288',
    caseTitle: 'Al Barsha Mall Theft Case',
    flagged: true,
    lastSeen: 'Al Barsha Mall Parking',
    registeredDate: '2023-05-12'
  },
  {
    plate: 'JBK-59211',
    fullPlate: 'JBK-59211',
    owner: 'Ali F.',
    caseId: '#145',
    caseTitle: 'Downtown Fraud Investigation',
    flagged: true,
    lastSeen: '1234 Main Street, NY',
    registeredDate: '2022-08-20'
  }
];

export function VehicleRegistrationDemo() {
  // Example scenario: Photo uploaded with name "Red Nissan 2465, Al Barsha Mall Parking."
  const uploadedFile = {
    name: 'Red Nissan 2465, Al Barsha Mall Parking.jpg',
    uploadTime: '18:35',
    uploadDate: '5 Oct 2024'
  };

  // AI extracts plate number from file name
  const extractedPlate = '2465';
  
  // Check vehicle registration database
  const vehicleRecord = vehicleRegistrationDB.find(v => v.plate === extractedPlate);

  // Create timeline entry
  const timelineEntry = vehicleRecord ? {
    suspect: vehicleRecord.owner,
    event: 'Vehicle Spotted',
    location: 'Al Barsha Mall',
    time: uploadedFile.uploadTime,
    date: uploadedFile.uploadDate,
    evidence: uploadedFile.name
  } : null;

  // Generate case link suggestion
  const caseLinkSuggestion = vehicleRecord ? {
    currentCase: 'Current Investigation',
    relatedCase: vehicleRecord.caseId,
    relatedCaseTitle: vehicleRecord.caseTitle,
    linkReason: `Vehicle ${vehicleRecord.fullPlate} registered to suspect ${vehicleRecord.owner}`,
    confidence: 94,
    sharedEntities: [vehicleRecord.owner, vehicleRecord.fullPlate]
  } : null;

  return (
    <div className="space-y-6 p-6 bg-slate-950">
      <div>
        <h2 className="text-white text-xl mb-2">Evidence Linking Demo</h2>
        <p className="text-slate-400 text-sm">
          Demonstrating AI-powered vehicle registration check, timeline creation, and cross-case linking
        </p>
      </div>

      {/* Step 1: File Upload */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            Step 1: Evidence Uploaded
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded bg-blue-500/20 flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-white">{uploadedFile.name}</p>
                <p className="text-slate-400 text-sm mt-1">
                  Uploaded: {uploadedFile.uploadDate} at {uploadedFile.uploadTime}
                </p>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mt-2">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  License plate detected
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Vehicle Registration DB Check */}
      <Card className="bg-slate-900/50 border-slate-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Database className="w-5 h-5 text-cyan-400" />
            Step 2: Vehicle Registration Database Check
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-cyan-300 text-sm">Database Query Result</p>
                <p className="text-white">Plate Number: <span className="text-cyan-400">{extractedPlate}</span></p>
              </div>
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                Flagged
              </Badge>
            </div>
            
            {vehicleRecord && (
              <div className="space-y-2 pt-3 border-t border-cyan-500/30">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-slate-400">Registered Owner</p>
                    <p className="text-white">{vehicleRecord.owner}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Vehicle</p>
                    <p className="text-white">{vehicleRecord.fullPlate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Linked Case</p>
                    <p className="text-cyan-400">{vehicleRecord.caseId} - {vehicleRecord.caseTitle}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Last Known Location</p>
                    <p className="text-white">{vehicleRecord.lastSeen}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-slate-800/50 border border-slate-700 rounded p-3">
            <p className="text-xs text-slate-400 mb-1">AI Analysis:</p>
            <p className="text-sm text-slate-300">
              ✓ Plate number <span className="text-cyan-400">{extractedPlate}</span> linked to suspect <span className="text-purple-400">{vehicleRecord?.owner}</span> from ongoing theft case <span className="text-blue-400">{vehicleRecord?.caseId}</span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Step 3: Timeline Entry Created */}
      {timelineEntry && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              Step 3: Timeline Entry Created
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-4">
                <div className="w-1 bg-blue-400 rounded-full self-stretch"></div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <Car className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white">
                        <span className="text-purple-400">{timelineEntry.suspect}</span> — "{timelineEntry.event}"
                      </p>
                      <p className="text-slate-400 text-sm">
                        {timelineEntry.location}, {timelineEntry.time}, {timelineEntry.date}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-slate-900/50 rounded p-3 border border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Evidence Source:</p>
                    <p className="text-sm text-slate-300">{timelineEntry.evidence}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Case Link Suggestion */}
      {caseLinkSuggestion && (
        <Card className="bg-slate-900/50 border-slate-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Link2 className="w-5 h-5 text-amber-400" />
              Step 4: Cross-Case Link Suggestion
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-amber-300 text-sm">AI Recommendation</p>
                  <p className="text-white">Link to Related Case</p>
                </div>
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  {caseLinkSuggestion.confidence}% confidence
                </Badge>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-900/50 rounded p-3 border border-amber-500/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-slate-400">Current Case</p>
                      <p className="text-white">{caseLinkSuggestion.currentCase}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400">Suggested Link</p>
                      <p className="text-amber-400">
                        Case {caseLinkSuggestion.relatedCase}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-700">
                    <p className="text-xs text-slate-400 mb-1">Case Title:</p>
                    <p className="text-white">{caseLinkSuggestion.relatedCaseTitle}</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded p-3">
                  <p className="text-xs text-slate-400 mb-2">Link Reason:</p>
                  <p className="text-sm text-slate-300 mb-3">{caseLinkSuggestion.linkReason}</p>
                  
                  <p className="text-xs text-slate-400 mb-1">Shared Entities:</p>
                  <div className="flex flex-wrap gap-2">
                    {caseLinkSuggestion.sharedEntities.map((entity, idx) => (
                      <Badge key={idx} className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {entity}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1 bg-amber-600 hover:bg-amber-700 text-white">
                    <Link2 className="w-4 h-4 mr-2" />
                    Link Cases
                  </Button>
                  <Button variant="outline" className="flex-1 border-slate-700 text-slate-300">
                    Review Later
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      <Card className="bg-gradient-to-br from-green-950/30 to-slate-900/50 border-green-500/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-400" />
            AI Evidence Linking Complete
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p className="text-slate-300">
              ✓ Vehicle registration database checked
            </p>
            <p className="text-slate-300">
              ✓ Suspect <span className="text-purple-400">{vehicleRecord?.owner}</span> identified and linked
            </p>
            <p className="text-slate-300">
              ✓ Timeline entry created automatically
            </p>
            <p className="text-slate-300">
              ✓ Cross-case link to <span className="text-amber-400">Case {vehicleRecord?.caseId}</span> suggested
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
