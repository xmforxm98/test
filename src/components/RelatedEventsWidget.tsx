import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Brain,
  AlertTriangle,
  Users,
  MapPin,
  Calendar,
  Link,
  ExternalLink,
  User,
  Building2,
  Phone,
  CreditCard,
  Scale,
  Car,
  Hotel,
  Plane,
  Target,
  Activity
} from 'lucide-react';

export function RelatedEventsWidget() {
  // Mock data for related events - events that are connected to the profile but the person wasn't present
  const relatedEvents = [
    {
      id: 're-1',
      date: 'Feb 12, 2025',
      type: 'associate_activity',
      title: 'Known Associate Travel',
      description: 'Associate "Malik Khan" departed to Nigeria from Dubai International',
      location: 'Dubai International Airport 🇦🇪',
      connection: 'Frequent contact (15 calls in past week)',
      riskLevel: 'high',
      aiInsight: '3 days after subject\'s return from same destination. Pattern suggests coordinated activity.',
      relatedTo: [
        { icon: Users, text: 'Known Associate: Malik Khan', color: 'text-purple-400' },
        { icon: Plane, text: 'Same Destination: Nigeria', color: 'text-blue-400' },
        { icon: Phone, text: '15 calls in past 7 days', color: 'text-orange-400' }
      ],
      aiConfidence: 87
    },
    {
      id: 're-2',
      date: 'Feb 10, 2025',
      type: 'location_activity',
      title: 'Hotel Activity at Frequent Location',
      description: 'New guest checked in at Lagos Grand Hotel - same hotel subject stayed at during last trip',
      location: 'Lagos Grand Hotel, Nigeria 🇳🇬',
      connection: 'Subject stayed here Feb 10-13, 2025',
      riskLevel: 'medium',
      aiInsight: 'Overlapping stay period with subject. Guest used cash payment method.',
      relatedTo: [
        { icon: Hotel, text: 'Same Hotel as Subject', color: 'text-cyan-400' },
        { icon: Calendar, text: 'Overlapping Dates', color: 'text-blue-400' },
        { icon: CreditCard, text: 'Cash Payment (Unusual)', color: 'text-orange-400' }
      ],
      aiConfidence: 72
    },
    {
      id: 're-3',
      date: 'Jan 28, 2025',
      type: 'associate_incident',
      title: 'Associate Arrested',
      description: 'Known associate "Ahmed Rashid" arrested for vehicle theft in Dubai Marina',
      location: 'Dubai Marina, UAE 🇦🇪',
      connection: 'Same MO as subject\'s previous cases',
      riskLevel: 'high',
      aiInsight: 'Vehicle theft method identical to subject\'s 2021 case. Same target area.',
      relatedTo: [
        { icon: Users, text: 'Associate: Ahmed Rashid', color: 'text-purple-400' },
        { icon: Car, text: 'Same MO: Silent entry technique', color: 'text-red-400' },
        { icon: MapPin, text: 'Location: Dubai Marina (Subject\'s operational zone)', color: 'text-orange-400' }
      ],
      aiConfidence: 94
    },
    {
      id: 're-4',
      date: 'Jan 20, 2025',
      type: 'financial_link',
      title: 'Transaction to Known Account',
      description: 'Large transaction (45,000 AED) to account previously linked to subject',
      location: 'Dubai, UAE 🇦🇪',
      connection: 'Subject had 3 transactions to same account in 2024',
      riskLevel: 'high',
      aiInsight: 'Account holder is family member of known associate. Transaction timing suspicious.',
      relatedTo: [
        { icon: CreditCard, text: 'Linked Account', color: 'text-green-400' },
        { icon: Users, text: 'Connected Individual', color: 'text-purple-400' },
        { icon: Activity, text: 'Unusual Amount', color: 'text-red-400' }
      ],
      aiConfidence: 81
    },
    {
      id: 're-5',
      date: 'Dec 30, 2024',
      type: 'vehicle_sighting',
      title: 'Vehicle Spotted at Interest Location',
      description: 'Subject\'s registered vehicle (DXB-K-1473) spotted at location while subject was abroad',
      location: 'Deira, Dubai 🇦🇪',
      connection: 'Subject was in Pakistan Dec 20-28',
      riskLevel: 'high',
      aiInsight: 'Vehicle used by unknown individual during subject\'s international travel. Potential accomplice.',
      relatedTo: [
        { icon: Car, text: 'Subject\'s Vehicle: DXB-K-1473', color: 'text-cyan-400' },
        { icon: MapPin, text: 'Suspicious Location', color: 'text-orange-400' },
        { icon: Calendar, text: 'Subject abroad during sighting', color: 'text-red-400' }
      ],
      aiConfidence: 89
    },
    {
      id: 're-6',
      date: 'Dec 15, 2024',
      type: 'property_activity',
      title: 'Activity at Subject\'s Business Address',
      description: 'Multiple individuals observed at subject\'s registered business address',
      location: 'TechCorp Industries, Business Bay, Dubai 🇦🇪',
      connection: 'Subject\'s registered business address',
      riskLevel: 'medium',
      aiInsight: 'Unusual activity pattern - meetings during non-business hours (11 PM - 2 AM).',
      relatedTo: [
        { icon: Building2, text: 'Subject\'s Business Address', color: 'text-blue-400' },
        { icon: Users, text: '4 Unidentified Individuals', color: 'text-orange-400' },
        { icon: Calendar, text: 'Non-business Hours', color: 'text-red-400' }
      ],
      aiConfidence: 68
    },
    {
      id: 're-7',
      date: 'Nov 18, 2024',
      type: 'associate_travel',
      title: 'Associate Border Crossing',
      description: 'Associate "Omar Farouk" crossed to Oman same route as subject\'s frequent crossing',
      location: 'Hatta Border, UAE-Oman 🇦🇪🇴🇲',
      connection: 'Same border crossing subject uses regularly',
      riskLevel: 'medium',
      aiInsight: 'Pattern analysis shows 3 associates using same border route within 2-month window.',
      relatedTo: [
        { icon: Users, text: 'Associate: Omar Farouk', color: 'text-purple-400' },
        { icon: MapPin, text: 'Subject\'s Preferred Route', color: 'text-blue-400' },
        { icon: Activity, text: 'Pattern: Multiple associates', color: 'text-orange-400' }
      ],
      aiConfidence: 76
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        badge: 'bg-red-500/20 text-red-400 border-red-500/30'
      };
      case 'medium': return {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        badge: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
      };
      case 'low': return {
        bg: 'bg-green-500/10',
        border: 'border-green-500/30',
        text: 'text-green-400',
        badge: 'bg-green-500/20 text-green-400 border-green-500/30'
      };
      default: return {
        bg: 'bg-slate-800/50',
        border: 'border-slate-700',
        text: 'text-slate-400',
        badge: 'bg-slate-500/20 text-slate-400 border-slate-500/30'
      };
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'associate_activity':
      case 'associate_incident':
      case 'associate_travel':
        return Users;
      case 'location_activity':
        return MapPin;
      case 'financial_link':
        return CreditCard;
      case 'vehicle_sighting':
        return Car;
      case 'property_activity':
        return Building2;
      default:
        return Activity;
    }
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Link className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white">Related Events Timeline</h4>
              <p className="text-slate-400 text-xs">Events connected to subject without direct participation</p>
            </div>
          </div>
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
            <Brain className="w-3 h-3 mr-1" />
            AI Link Analysis
          </Badge>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30 text-center">
            <p className="text-purple-400 text-xl">{relatedEvents.length}</p>
            <p className="text-slate-400 text-xs">Total Events</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-center">
            <p className="text-red-400 text-xl">{relatedEvents.filter(e => e.riskLevel === 'high').length}</p>
            <p className="text-slate-400 text-xs">High Risk</p>
          </div>
          <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-center">
            <p className="text-blue-400 text-xl">{relatedEvents.filter(e => e.type.includes('associate')).length}</p>
            <p className="text-slate-400 text-xs">Associate Activity</p>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30 text-center">
            <p className="text-orange-400 text-xl">
              {Math.round(relatedEvents.reduce((acc, e) => acc + e.aiConfidence, 0) / relatedEvents.length)}%
            </p>
            <p className="text-slate-400 text-xs">Avg Confidence</p>
          </div>
        </div>

        {/* AI Pattern Summary */}
        <div className="mb-6 p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <p className="text-purple-400">AI Pattern Analysis</p>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">
            Network analysis reveals coordinated activity patterns among 5 known associates. 
            Multiple events at subject's frequent locations and use of subject's vehicle during absence 
            suggest organized network operation. Temporal correlation between associate movements and 
            suspicious transactions indicates potential coordination.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-blue-500 to-cyan-500 opacity-50"></div>

          {/* Events */}
          <div className="space-y-5">
            {relatedEvents.map((event) => {
              const colors = getRiskColor(event.riskLevel);
              const EventIcon = getEventIcon(event.type);

              return (
                <div key={event.id} className="relative pl-20">
                  {/* Timeline Marker */}
                  <div className={`absolute left-5 top-2 w-6 h-6 rounded-full ${colors.bg} border-4 border-slate-900 flex items-center justify-center`}>
                    <EventIcon className={`w-3 h-3 ${colors.text}`} />
                  </div>

                  {/* Event Card */}
                  <div className={`${colors.bg} border ${colors.border} rounded-lg p-4`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className={colors.text}>{event.title}</p>
                          <Badge className="bg-slate-700/50 text-slate-300 border-slate-600 text-xs">
                            Not Present
                          </Badge>
                        </div>
                        <p className="text-slate-300 text-sm mb-1">{event.description}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                          <span>•</span>
                          <MapPin className="w-3 h-3" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <Badge className={colors.badge}>
                        {event.riskLevel.charAt(0).toUpperCase() + event.riskLevel.slice(1)} Risk
                      </Badge>
                    </div>

                    {/* Connection Info */}
                    <div className="mb-3 p-3 rounded bg-slate-900/50 border border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        <Link className="w-3 h-3 text-blue-400" />
                        <p className="text-blue-400 text-xs">Connection to Subject</p>
                      </div>
                      <p className="text-slate-300 text-sm">{event.connection}</p>
                    </div>

                    {/* Related Factors */}
                    <div className="mb-3 space-y-1.5">
                      {event.relatedTo.map((factor, idx) => {
                        const FactorIcon = factor.icon;
                        return (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <FactorIcon className={`w-3.5 h-3.5 ${factor.color}`} />
                            <span className="text-slate-300">{factor.text}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* AI Insight */}
                    <div className="p-3 rounded bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Brain className="w-3 h-3 text-blue-400" />
                          <p className="text-blue-400 text-xs">AI Insight</p>
                        </div>
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                          {event.aiConfidence}% Confidence
                        </Badge>
                      </div>
                      <p className="text-slate-300 text-xs">{event.aiInsight}</p>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-2">
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 text-xs"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View Details
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 text-xs"
                      >
                        <Target className="w-3 h-3 mr-1" />
                        Investigate Connection
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Insights */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <p className="text-red-400 text-sm">Critical Finding</p>
            </div>
            <p className="text-slate-300 text-sm">
              Subject's vehicle used during international absence suggests trusted associate network with access to personal assets.
            </p>
          </div>
          <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-purple-400" />
              <p className="text-purple-400 text-sm">Network Pattern</p>
            </div>
            <p className="text-slate-300 text-sm">
              Multiple associates using same locations and methods indicates coordinated operational structure requiring further investigation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
