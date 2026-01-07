import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowUpRight, ArrowDownLeft, Plane, Car as CarIcon, Ship, AlertTriangle, Clock, MapPin } from 'lucide-react';

interface BorderCrossing {
  id: string;
  date: string;
  type: 'Entry' | 'Exit';
  country: string;
  countryCode: string;
  flag: string;
  port: string;
  method: 'Air' | 'Land' | 'Sea';
  duration?: number; // days
  risk: 'low' | 'medium' | 'high';
  returnDate?: string;
  linkedTrip?: string;
}

const borderCrossingsData: BorderCrossing[] = [
  {
    id: '1',
    date: 'Feb 9, 2025',
    type: 'Exit',
    country: 'Nigeria',
    countryCode: 'NG',
    flag: '🇳🇬',
    port: 'Dubai International Airport',
    method: 'Air',
    duration: 7,
    risk: 'high',
    returnDate: 'Feb 16, 2025',
    linkedTrip: 'Business Trip - Lagos'
  },
  {
    id: '2',
    date: 'Feb 16, 2025',
    type: 'Entry',
    country: 'UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    port: 'Dubai International Airport',
    method: 'Air',
    risk: 'low'
  },
  {
    id: '3',
    date: 'Dec 20, 2024',
    type: 'Exit',
    country: 'Pakistan',
    countryCode: 'PK',
    flag: '🇵🇰',
    port: 'Dubai International Airport',
    method: 'Air',
    duration: 8,
    risk: 'high',
    returnDate: 'Dec 28, 2024',
    linkedTrip: 'Family Visit - Karachi'
  },
  {
    id: '4',
    date: 'Dec 28, 2024',
    type: 'Entry',
    country: 'UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    port: 'Dubai International Airport',
    method: 'Air',
    risk: 'low'
  },
  {
    id: '5',
    date: 'Oct 5, 2024',
    type: 'Exit',
    country: 'Turkey',
    countryCode: 'TR',
    flag: '🇹🇷',
    port: 'Abu Dhabi Airport',
    method: 'Air',
    duration: 5,
    risk: 'medium',
    returnDate: 'Oct 10, 2024',
    linkedTrip: 'Conference - Istanbul'
  },
  {
    id: '6',
    date: 'Oct 10, 2024',
    type: 'Entry',
    country: 'UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    port: 'Abu Dhabi Airport',
    method: 'Air',
    risk: 'low'
  },
  {
    id: '7',
    date: 'Aug 12, 2024',
    type: 'Exit',
    country: 'Oman',
    countryCode: 'OM',
    flag: '🇴🇲',
    port: 'Hatta Border',
    method: 'Land',
    duration: 2,
    risk: 'low',
    returnDate: 'Aug 14, 2024',
    linkedTrip: 'Weekend Trip - Muscat'
  },
  {
    id: '8',
    date: 'Aug 14, 2024',
    type: 'Entry',
    country: 'UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    port: 'Hatta Border',
    method: 'Land',
    risk: 'low'
  },
  {
    id: '9',
    date: 'Jun 15, 2024',
    type: 'Exit',
    country: 'India',
    countryCode: 'IN',
    flag: '🇮🇳',
    port: 'Dubai International Airport',
    method: 'Air',
    duration: 4,
    risk: 'medium',
    returnDate: 'Jun 19, 2024',
    linkedTrip: 'Business - Mumbai'
  },
  {
    id: '10',
    date: 'Jun 19, 2024',
    type: 'Entry',
    country: 'UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    port: 'Dubai International Airport',
    method: 'Air',
    risk: 'low'
  },
  {
    id: '11',
    date: 'Apr 22, 2024',
    type: 'Exit',
    country: 'Egypt',
    countryCode: 'EG',
    flag: '🇪🇬',
    port: 'Dubai International Airport',
    method: 'Air',
    duration: 6,
    risk: 'medium',
    returnDate: 'Apr 28, 2024',
    linkedTrip: 'Personal - Cairo'
  },
  {
    id: '12',
    date: 'Apr 28, 2024',
    type: 'Entry',
    country: 'UAE',
    countryCode: 'AE',
    flag: '🇦🇪',
    port: 'Dubai International Airport',
    method: 'Air',
    risk: 'low'
  }
];

const getMethodIcon = (method: 'Air' | 'Land' | 'Sea') => {
  switch (method) {
    case 'Air':
      return <Plane className="w-4 h-4" />;
    case 'Land':
      return <CarIcon className="w-4 h-4" />;
    case 'Sea':
      return <Ship className="w-4 h-4" />;
  }
};

export function BorderCrossingWidget() {
  // Group crossings into trips (Exit followed by Entry)
  const trips: { exit: BorderCrossing; entry: BorderCrossing }[] = [];
  for (let i = 0; i < borderCrossingsData.length - 1; i++) {
    if (borderCrossingsData[i].type === 'Exit' && borderCrossingsData[i + 1].type === 'Entry') {
      trips.push({
        exit: borderCrossingsData[i],
        entry: borderCrossingsData[i + 1]
      });
    }
  }

  // Calculate statistics
  const totalCrossings = borderCrossingsData.length;
  const exitCrossings = borderCrossingsData.filter(c => c.type === 'Exit').length;
  const highRiskTrips = trips.filter(t => t.exit.risk === 'high').length;
  const countries = [...new Set(borderCrossingsData.filter(c => c.type === 'Exit').map(c => c.country))];

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
              <Plane className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white">Border Crossing Analysis</h4>
              <p className="text-slate-400 text-xs">Immigration movement tracking with risk assessment</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              {totalCrossings} Crossings
            </Badge>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
              {highRiskTrips} High Risk
            </Badge>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-slate-400 text-xs mb-1">Total Trips</p>
            <p className="text-white text-xl">{exitCrossings}</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-slate-400 text-xs mb-1">Countries</p>
            <p className="text-cyan-400 text-xl">{countries.length}</p>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <p className="text-orange-400 text-xs mb-1">Avg Duration</p>
            <p className="text-orange-400 text-xl">
              {Math.round(trips.reduce((acc, t) => acc + (t.exit.duration || 0), 0) / trips.length)} days
            </p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-xs mb-1">High Risk</p>
            <p className="text-red-400 text-xl">{highRiskTrips} trips</p>
          </div>
        </div>

        {/* Trip Timeline */}
        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {trips.map((trip, index) => (
            <div
              key={trip.exit.id}
              className={`p-4 rounded-lg border ${
                trip.exit.risk === 'high'
                  ? 'bg-red-500/10 border-red-500/30'
                  : trip.exit.risk === 'medium'
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-slate-800/50 border-slate-700'
              }`}
            >
              {/* Trip Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{trip.exit.flag}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white">{trip.exit.country}</p>
                      <Badge
                        className={`text-xs ${
                          trip.exit.risk === 'high'
                            ? 'bg-red-500/20 text-red-400 border-red-500/30'
                            : trip.exit.risk === 'medium'
                            ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                            : 'bg-green-500/20 text-green-400 border-green-500/30'
                        }`}
                      >
                        {trip.exit.risk.toUpperCase()} RISK
                      </Badge>
                    </div>
                    {trip.exit.linkedTrip && (
                      <p className="text-slate-400 text-xs mt-1">{trip.exit.linkedTrip}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  {getMethodIcon(trip.exit.method)}
                  <span className="text-xs">{trip.exit.method}</span>
                </div>
              </div>

              {/* Trip Details */}
              <div className="grid grid-cols-2 gap-4">
                {/* Exit Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                      <ArrowUpRight className="w-4 h-4 text-red-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-red-400 text-sm">Exit</p>
                      <p className="text-slate-400 text-xs">{trip.exit.date}</p>
                    </div>
                  </div>
                  <div className="ml-10 p-2 rounded bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <p className="text-slate-300 text-xs">{trip.exit.port}</p>
                    </div>
                  </div>
                </div>

                {/* Entry Details */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                      <ArrowDownLeft className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-green-400 text-sm">Entry</p>
                      <p className="text-slate-400 text-xs">{trip.entry.date}</p>
                    </div>
                  </div>
                  <div className="ml-10 p-2 rounded bg-slate-950/50 border border-slate-800">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <p className="text-slate-300 text-xs">{trip.entry.port}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trip Duration & Alerts */}
              <div className="mt-3 pt-3 border-t border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs">{trip.exit.duration} days</span>
                  </div>
                  {trip.exit.risk === 'high' && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400 text-xs">High-risk jurisdiction</span>
                    </div>
                  )}
                </div>
                {index === 0 && trip.exit.risk === 'high' && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">
                    Recent Trip
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Pattern Analysis */}
        <div className="mt-4 p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-blue-400 text-sm mb-2">Travel Pattern Analysis</p>
              <p className="text-slate-300 text-xs">
                {highRiskTrips} trips to high-risk jurisdictions detected in the last 12 months. 
                Average trip duration to Nigeria and Pakistan ({Math.round(trips.filter(t => t.exit.risk === 'high').reduce((acc, t) => acc + (t.exit.duration || 0), 0) / highRiskTrips)} days) 
                exceeds typical business travel patterns. Cross-reference with financial transaction timeline reveals 
                correlation between travel dates and suspicious cross-border money movements.
              </p>
            </div>
          </div>
        </div>

        {/* Country Frequency Chart */}
        <div className="mt-4">
          <p className="text-white text-sm mb-3">Travel Frequency by Country</p>
          <div className="space-y-2">
            {Object.entries(
              borderCrossingsData
                .filter(c => c.type === 'Exit')
                .reduce((acc, crossing) => {
                  acc[crossing.country] = (acc[crossing.country] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>)
            )
              .sort(([, a], [, b]) => b - a)
              .map(([country, count]) => {
                const crossing = borderCrossingsData.find(c => c.country === country)!;
                const maxCount = 2; // Maximum trips to any country
                const percentage = (count / maxCount) * 100;
                
                return (
                  <div key={country} className="flex items-center gap-3">
                    <span className="text-xl">{crossing.flag}</span>
                    <span className="text-slate-300 text-sm w-24">{country}</span>
                    <div className="flex-1 h-6 bg-slate-800 rounded-lg overflow-hidden">
                      <div
                        className={`h-full flex items-center px-2 ${
                          crossing.risk === 'high'
                            ? 'bg-red-500'
                            : crossing.risk === 'medium'
                            ? 'bg-orange-500'
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      >
                        {percentage > 20 && (
                          <span className="text-white text-xs">{count} trip{count > 1 ? 's' : ''}</span>
                        )}
                      </div>
                    </div>
                    {percentage <= 20 && (
                      <span className="text-slate-400 text-xs w-12">{count}</span>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
