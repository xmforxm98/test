import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Hotel, MapPin, Calendar, DollarSign, Users, AlertTriangle, Brain, Star } from 'lucide-react';

interface HotelStay {
  id: string;
  hotelName: string;
  location: string;
  city: string;
  country: string;
  flag: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  roomType: string;
  guests: number;
  totalCost: number;
  paymentMethod: 'Credit Card' | 'Cash' | 'Debit Card' | 'Bank Transfer';
  rating: number;
  category: 'Luxury' | 'Business' | 'Budget' | 'Mid-Range';
  linkedTrip?: string;
  risk: 'low' | 'medium' | 'high';
  alerts?: string[];
}

const hotelStaysData: HotelStay[] = [
  {
    id: '1',
    hotelName: 'Eko Hotels & Suites',
    location: 'Victoria Island',
    city: 'Lagos',
    country: 'Nigeria',
    flag: '🇳🇬',
    checkIn: 'Feb 10, 2025',
    checkOut: 'Feb 16, 2025',
    nights: 6,
    roomType: 'Deluxe Suite',
    guests: 1,
    totalCost: 4200,
    paymentMethod: 'Cash',
    rating: 4.5,
    category: 'Luxury',
    linkedTrip: 'Nigeria Trip (Feb 9-16)',
    risk: 'high',
    alerts: ['Cash payment for luxury hotel', 'Extended stay in high-risk jurisdiction']
  },
  {
    id: '2',
    hotelName: 'Pearl Continental Hotel',
    location: 'Karachi',
    city: 'Karachi',
    country: 'Pakistan',
    flag: '🇵🇰',
    checkIn: 'Dec 21, 2024',
    checkOut: 'Dec 27, 2024',
    nights: 6,
    roomType: 'Executive Room',
    guests: 2,
    totalCost: 2800,
    paymentMethod: 'Cash',
    rating: 4.0,
    category: 'Business',
    linkedTrip: 'Pakistan Trip (Dec 20-28)',
    risk: 'high',
    alerts: ['Cash payment', 'Multiple guests registered']
  },
  {
    id: '3',
    hotelName: 'Burj Al Arab',
    location: 'Jumeirah Beach',
    city: 'Dubai',
    country: 'UAE',
    flag: '🇦🇪',
    checkIn: 'Jan 15, 2025',
    checkOut: 'Jan 18, 2025',
    nights: 3,
    roomType: 'Panoramic Suite',
    guests: 1,
    totalCost: 12500,
    paymentMethod: 'Credit Card',
    rating: 5.0,
    category: 'Luxury',
    risk: 'low'
  },
  {
    id: '4',
    hotelName: 'Emirates Palace',
    location: 'Corniche',
    city: 'Abu Dhabi',
    country: 'UAE',
    flag: '🇦🇪',
    checkIn: 'Nov 22, 2024',
    checkOut: 'Nov 25, 2024',
    nights: 3,
    roomType: 'Palace Suite',
    guests: 1,
    totalCost: 9800,
    paymentMethod: 'Credit Card',
    rating: 5.0,
    category: 'Luxury',
    risk: 'low'
  },
  {
    id: '5',
    hotelName: 'Hilton Istanbul Bosphorus',
    location: 'Harbiye',
    city: 'Istanbul',
    country: 'Turkey',
    flag: '🇹🇷',
    checkIn: 'Oct 6, 2024',
    checkOut: 'Oct 10, 2024',
    nights: 4,
    roomType: 'Deluxe Room',
    guests: 1,
    totalCost: 1600,
    paymentMethod: 'Credit Card',
    rating: 4.3,
    category: 'Business',
    linkedTrip: 'Turkey Trip (Oct 5-10)',
    risk: 'medium',
    alerts: ['Business category but extended weekend stay']
  },
  {
    id: '6',
    hotelName: 'Shangri-La Al Husn',
    location: 'Barr Al Jissah',
    city: 'Muscat',
    country: 'Oman',
    flag: '🇴🇲',
    checkIn: 'Aug 13, 2024',
    checkOut: 'Aug 14, 2024',
    nights: 1,
    roomCost: 890,
    roomType: 'Deluxe Sea View',
    guests: 1,
    totalCost: 890,
    paymentMethod: 'Credit Card',
    rating: 4.8,
    category: 'Luxury',
    linkedTrip: 'Oman Trip (Aug 12-14)',
    risk: 'low'
  },
  {
    id: '7',
    hotelName: 'Taj Mahal Palace',
    location: 'Colaba',
    city: 'Mumbai',
    country: 'India',
    flag: '🇮🇳',
    checkIn: 'Jun 16, 2024',
    checkOut: 'Jun 19, 2024',
    nights: 3,
    roomType: 'Heritage Room',
    guests: 1,
    totalCost: 2100,
    paymentMethod: 'Credit Card',
    rating: 4.7,
    category: 'Luxury',
    linkedTrip: 'India Trip (Jun 15-19)',
    risk: 'medium'
  },
  {
    id: '8',
    hotelName: 'Four Seasons Cairo',
    location: 'Garden City',
    city: 'Cairo',
    country: 'Egypt',
    flag: '🇪🇬',
    checkIn: 'Apr 23, 2024',
    checkOut: 'Apr 28, 2024',
    nights: 5,
    roomType: 'Nile View Room',
    guests: 1,
    totalCost: 3200,
    paymentMethod: 'Debit Card',
    rating: 4.6,
    category: 'Luxury',
    linkedTrip: 'Egypt Trip (Apr 22-28)',
    risk: 'medium'
  }
];

export function HotelStayWidget() {
  // Calculate statistics
  const totalStays = hotelStaysData.length;
  const totalNights = hotelStaysData.reduce((acc, stay) => acc + stay.nights, 0);
  const totalSpent = hotelStaysData.reduce((acc, stay) => acc + stay.totalCost, 0);
  const cashPayments = hotelStaysData.filter(s => s.paymentMethod === 'Cash').length;
  const highRiskStays = hotelStaysData.filter(s => s.risk === 'high').length;
  const avgNightlyRate = totalSpent / totalNights;

  // Group by country
  const staysByCountry = hotelStaysData.reduce((acc, stay) => {
    if (!acc[stay.country]) {
      acc[stay.country] = {
        count: 0,
        nights: 0,
        spent: 0,
        flag: stay.flag,
        risk: stay.risk
      };
    }
    acc[stay.country].count++;
    acc[stay.country].nights += stay.nights;
    acc[stay.country].spent += stay.totalCost;
    return acc;
  }, {} as Record<string, { count: number; nights: number; spent: number; flag: string; risk: string }>);

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
              <Hotel className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h4 className="text-white">Hotel Stay Analysis</h4>
              <p className="text-slate-400 text-xs">Accommodation tracking with spending pattern analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              {totalStays} Bookings
            </Badge>
            {highRiskStays > 0 && (
              <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                {highRiskStays} High Risk
              </Badge>
            )}
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-slate-400 text-xs mb-1">Total Stays</p>
            <p className="text-white text-xl">{totalStays}</p>
          </div>
          <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
            <p className="text-cyan-400 text-xs mb-1">Total Nights</p>
            <p className="text-cyan-400 text-xl">{totalNights}</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
            <p className="text-purple-400 text-xs mb-1">Total Spent</p>
            <p className="text-purple-400 text-xl">{(totalSpent / 1000).toFixed(1)}K</p>
          </div>
          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <p className="text-orange-400 text-xs mb-1">Avg/Night</p>
            <p className="text-orange-400 text-xl">{avgNightlyRate.toFixed(0)}</p>
          </div>
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
            <p className="text-red-400 text-xs mb-1">Cash Pmts</p>
            <p className="text-red-400 text-xl">{cashPayments}</p>
          </div>
        </div>

        {/* Hotel Stays List */}
        <div className="space-y-3 mb-6 max-h-[600px] overflow-y-auto">
          {hotelStaysData.map((stay) => (
            <div
              key={stay.id}
              className={`p-4 rounded-lg border transition-all ${
                stay.risk === 'high'
                  ? 'bg-red-500/10 border-red-500/30'
                  : stay.risk === 'medium'
                  ? 'bg-orange-500/10 border-orange-500/30'
                  : 'bg-slate-800/50 border-slate-700'
              }`}
            >
              {/* Stay Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{stay.flag}</div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white">{stay.hotelName}</p>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(stay.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <p className="text-slate-400 text-xs">
                        {stay.location}, {stay.city}, {stay.country}
                      </p>
                    </div>
                    {stay.linkedTrip && (
                      <p className="text-blue-400 text-xs mt-1">🔗 {stay.linkedTrip}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge
                    className={`text-xs ${
                      stay.category === 'Luxury'
                        ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                        : stay.category === 'Business'
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                        : 'bg-slate-500/20 text-slate-400 border-slate-500/30'
                    }`}
                  >
                    {stay.category}
                  </Badge>
                  <Badge
                    className={`text-xs ${
                      stay.risk === 'high'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : stay.risk === 'medium'
                        ? 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                        : 'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}
                  >
                    {stay.risk.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>

              {/* Stay Details Grid */}
              <div className="grid grid-cols-5 gap-3 mb-3">
                <div className="p-2 rounded bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <p className="text-slate-400 text-xs">Check-in</p>
                  </div>
                  <p className="text-white text-xs">{stay.checkIn}</p>
                </div>

                <div className="p-2 rounded bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-1 mb-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <p className="text-slate-400 text-xs">Check-out</p>
                  </div>
                  <p className="text-white text-xs">{stay.checkOut}</p>
                </div>

                <div className="p-2 rounded bg-cyan-500/10 border border-cyan-500/30">
                  <p className="text-slate-400 text-xs mb-1">Nights</p>
                  <p className="text-cyan-400">{stay.nights}</p>
                </div>

                <div className="p-2 rounded bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-1 mb-1">
                    <Users className="w-3 h-3 text-slate-500" />
                    <p className="text-slate-400 text-xs">Guests</p>
                  </div>
                  <p className="text-white text-xs">{stay.guests}</p>
                </div>

                <div className="p-2 rounded bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign className="w-3 h-3 text-purple-400" />
                    <p className="text-purple-400 text-xs">Total</p>
                  </div>
                  <p className="text-purple-400">{stay.totalCost}</p>
                </div>
              </div>

              {/* Room Type & Payment */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-slate-400">
                    <span className="text-slate-500">Room:</span> {stay.roomType}
                  </span>
                  <span
                    className={`px-2 py-1 rounded ${
                      stay.paymentMethod === 'Cash'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {stay.paymentMethod}
                  </span>
                </div>
                <span className="text-slate-500">
                  {(stay.totalCost / stay.nights).toFixed(0)} AED/night
                </span>
              </div>

              {/* Alerts */}
              {stay.alerts && stay.alerts.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-1">
                  {stay.alerts.map((alert, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <AlertTriangle className="w-3 h-3 text-red-400" />
                      <p className="text-red-400 text-xs">{alert}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Spending by Country */}
        <div className="mb-6">
          <p className="text-white text-sm mb-3">Hotel Spending by Country</p>
          <div className="space-y-2">
            {Object.entries(staysByCountry)
              .sort(([, a], [, b]) => b.spent - a.spent)
              .map(([country, data]) => {
                const maxSpent = Math.max(...Object.values(staysByCountry).map(d => d.spent));
                const percentage = (data.spent / maxSpent) * 100;

                return (
                  <div key={country} className="flex items-center gap-3">
                    <span className="text-xl">{data.flag}</span>
                    <span className="text-slate-300 text-sm w-24">{country}</span>
                    <div className="flex-1 h-8 bg-slate-800 rounded-lg overflow-hidden">
                      <div
                        className={`h-full flex items-center px-3 justify-between ${
                          data.risk === 'high'
                            ? 'bg-red-500'
                            : data.risk === 'medium'
                            ? 'bg-orange-500'
                            : 'bg-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      >
                        {percentage > 25 && (
                          <>
                            <span className="text-white text-xs">
                              {data.count} stay{data.count > 1 ? 's' : ''} • {data.nights} nights
                            </span>
                            <span className="text-white text-xs">{data.spent.toLocaleString()} AED</span>
                          </>
                        )}
                      </div>
                    </div>
                    {percentage <= 25 && (
                      <div className="text-right">
                        <p className="text-slate-300 text-xs">{data.spent.toLocaleString()} AED</p>
                        <p className="text-slate-500 text-xs">{data.nights}n</p>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Payment Method Analysis */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-white text-sm mb-3">Payment Methods</p>
            <div className="space-y-2">
              {[
                { method: 'Credit Card', count: hotelStaysData.filter(s => s.paymentMethod === 'Credit Card').length, color: 'blue' },
                { method: 'Cash', count: hotelStaysData.filter(s => s.paymentMethod === 'Cash').length, color: 'red' },
                { method: 'Debit Card', count: hotelStaysData.filter(s => s.paymentMethod === 'Debit Card').length, color: 'green' },
              ]
                .filter(p => p.count > 0)
                .map((payment) => (
                  <div key={payment.method} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{payment.method}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${payment.color}-500`}
                          style={{ width: `${(payment.count / totalStays) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-${payment.color}-400 text-xs w-8`}>{payment.count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-slate-800/50 border border-slate-700">
            <p className="text-white text-sm mb-3">Hotel Categories</p>
            <div className="space-y-2">
              {[
                { category: 'Luxury', count: hotelStaysData.filter(s => s.category === 'Luxury').length, color: 'purple' },
                { category: 'Business', count: hotelStaysData.filter(s => s.category === 'Business').length, color: 'blue' },
                { category: 'Mid-Range', count: hotelStaysData.filter(s => s.category === 'Mid-Range').length, color: 'cyan' },
              ]
                .filter(c => c.count > 0)
                .map((cat) => (
                  <div key={cat.category} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{cat.category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-${cat.color}-500`}
                          style={{ width: `${(cat.count / totalStays) * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-${cat.color}-400 text-xs w-8`}>{cat.count}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* AI Pattern Analysis */}
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-red-400 text-sm mb-2">AI-Detected Anomalies</p>
              <ul className="text-slate-300 text-xs space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">•</span>
                  <span>
                    <strong className="text-red-400">Cash Payment Pattern:</strong> {cashPayments} luxury hotel stays 
                    (totaling {hotelStaysData.filter(s => s.paymentMethod === 'Cash').reduce((acc, s) => acc + s.totalCost, 0).toLocaleString()} AED) 
                    paid in cash during high-risk jurisdiction visits. This is atypical for business travelers and may indicate 
                    attempts to avoid financial tracking.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-orange-400">•</span>
                  <span>
                    <strong className="text-orange-400">Travel-Transaction Correlation:</strong> Hotel bookings in Nigeria and Pakistan 
                    coincide with periods of significant cross-border financial activity. Recommend cross-referencing transaction timestamps 
                    with hotel check-in/out dates.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-400">•</span>
                  <span>
                    <strong className="text-yellow-400">Spending Inconsistency:</strong> Average nightly rate of {avgNightlyRate.toFixed(0)} AED 
                    suggests high-end accommodation preferences, inconsistent with declared income sources in case file.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
