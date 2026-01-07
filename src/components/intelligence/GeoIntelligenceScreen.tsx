import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Map as MapIcon,
  MapPin,
  Radio,
  AlertCircle,
  Search,
  Layers,
  Maximize2,
  Navigation2,
  Filter,
  ChevronRight,
  Info
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default marker icons in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MAP_LAYERS = {
  light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
  standard: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  grayscale: 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
};

function ChangeView({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const incidents = [
  { id: 1, pos: [25.2048, 55.2708], title: "Downtown Sector 7", status: "High Risk", type: "incident" },
  { id: 2, pos: [25.1972, 55.2744], title: "Burj Area", status: "Under Surveillance", type: "address" },
  { id: 3, pos: [25.2297, 55.2893], title: "Harbor District", status: "Last Known Position", type: "position" }
];

function InteractiveMap({ center, zoom, activeLayer, onSelect }: {
  center: [number, number],
  zoom: number,
  activeLayer: keyof typeof MAP_LAYERS,
  onSelect: (id: number, pos: [number, number]) => void
}) {
  return (
    <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-full w-full grayscale"
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <ChangeView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url={MAP_LAYERS[activeLayer]}
        />
        {incidents.map(incident => (
          <Marker
            key={incident.id}
            position={incident.pos as [number, number]}
            eventHandlers={{
              click: () => onSelect(incident.id, incident.pos as [number, number])
            }}
          >
            <Popup>
              <div className="p-2 bg-white text-black font-mono border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-bold border-b border-black pb-1 mb-1 uppercase text-xs">{incident.title}</p>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[10px]">{incident.status}</p>
                  <Button size="sm" className="h-5 px-2 bg-black text-white text-[8px] uppercase rounded-none">Focus</Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export function GeoIntelligenceScreen() {
  const [activeLayer, setActiveLayer] = useState<keyof typeof MAP_LAYERS>('light');
  const [mapCenter, setMapCenter] = useState<[number, number]>([25.2048, 55.2708]);
  const [zoom, setZoom] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [showLayers, setShowLayers] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState<number | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMapCenter([25.2048, 55.2708]);
    setZoom(15);
  };

  const focusIncident = (id: number, pos: [number, number]) => {
    setSelectedIncident(id);
    setMapCenter(pos);
    setZoom(16);
  };

  return (
    <div className="flex-1 w-full flex flex-col h-full bg-white font-mono overflow-hidden">
      {/* Search Header */}
      <div className="border-b-2 border-black bg-white z-50 p-4 shrink-0 shadow-[0_4px_0_0_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 max-w-2xl">
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-focus-within:translate-x-0.5 group-focus-within:translate-y-0.5 group-focus-within:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-black" />
              <form onSubmit={handleSearch}>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="SEARCH GEOSPATIAL INTELLIGENCE..."
                  className="relative bg-transparent border-none text-black placeholder:text-black/30 pl-10 pr-4 py-4 rounded-none focus-visible:ring-0 text-sm font-black uppercase tracking-widest h-11"
                />
              </form>
            </div>
            <Button className="h-11 px-6 bg-black text-white hover:bg-slate-800 rounded-none border-2 border-black uppercase font-black text-xs tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] transition-all">
              Execute Search
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex border-2 border-black">
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-black hover:bg-black hover:text-white rounded-none border-r-2 border-black last:border-r-0 transition-colors"
                onClick={() => setShowLayers(!showLayers)}
              >
                <Layers className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-black hover:bg-black hover:text-white rounded-none border-r-2 border-black last:border-r-0"
              >
                <Filter className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative flex min-h-0">
        {/* Map Wrapper */}
        <div className="flex-1 relative overflow-hidden bg-slate-100 border-r-2 border-black group">
          <InteractiveMap
            center={mapCenter}
            zoom={zoom}
            activeLayer={activeLayer}
            onSelect={focusIncident}
          />

          {/* Actionable Map Overlays */}
          <div className="absolute top-4 left-4 z-[4000] space-y-2">
            <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-in fade-in duration-500">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[10px] font-black uppercase tracking-tighter">Operational Status</p>
                <div className="w-2 h-2 bg-black animate-pulse rounded-full" />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black" />
                  <span className="text-[9px] text-black uppercase font-bold">Grid Sector: 9A-Dubai</span>
                </div>
                <div className="flex items-center gap-2 opacity-60">
                  <div className="w-1.5 h-1.5 bg-black" />
                  <span className="text-[9px] text-black uppercase font-bold">Signal: Strong [0.8s]</span>
                </div>
              </div>
            </div>

            {selectedIncident && (
              <div className="bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-in slide-in-from-left-2">
                <p className="text-[9px] font-black uppercase text-black/40 mb-1">Target Identified</p>
                <p className="text-[11px] font-black uppercase mb-2">
                  {incidents.find(i => i.id === selectedIncident)?.title}
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="h-7 px-3 bg-black text-white text-[9px] font-black uppercase rounded-none">Track Subject</Button>
                  <Button size="sm" variant="outline" className="h-7 px-3 border-black text-[9px] font-black uppercase rounded-none">View Intel</Button>
                </div>
              </div>
            )}
          </div>

          {/* Layer Selector Overlay */}
          {showLayers && (
            <div className="absolute top-4 right-4 bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-[4000] animate-in slide-in-from-right-2">
              {Object.keys(MAP_LAYERS).map((layer) => (
                <button
                  key={layer}
                  onClick={() => setActiveLayer(layer as keyof typeof MAP_LAYERS)}
                  className={`block w-full px-4 py-2 text-[10px] uppercase font-black text-left transition-colors whitespace-nowrap ${activeLayer === layer ? 'bg-black text-white' : 'text-black hover:bg-black/10'
                    }`}
                >
                  {layer} TILESET
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Side Dashboard - The "Intelligence Dossier" View */}
        <div className="w-80 bg-white flex flex-col shrink-0 overflow-hidden relative">
          <div className="p-4 border-b-2 border-black flex items-center justify-between bg-black text-white sticky top-0 z-10 shadow-md">
            <span className="text-xs font-black uppercase tracking-[0.2em]">Regional Intel Feed</span>
            <Radio className="w-4 h-4 animate-pulse text-white" />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-2 bg-slate-100 border-b-2 border-black">
              <p className="text-[9px] font-black uppercase text-black/40 text-center tracking-widest">REAL-TIME DATA STREAM ACTIVE</p>
            </div>
            {incidents.map(incident => (
              <div
                key={incident.id}
                onClick={() => focusIncident(incident.id, incident.pos as [number, number])}
                className={`p-4 border-b-2 border-black transition-all cursor-pointer group relative ${selectedIncident === incident.id ? 'bg-black text-white' : 'hover:bg-slate-50 text-black'
                  }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex flex-col">
                    <span className="text-[11px] font-black uppercase tracking-widest">{incident.title}</span>
                    <span className={`text-[9px] uppercase font-bold mt-1 ${selectedIncident === incident.id ? 'text-white/60' : 'text-black/40'
                      }`}>
                      {incident.status}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${selectedIncident === incident.id ? 'text-white' : 'text-black'
                    }`} />
                </div>
                {selectedIncident === incident.id && (
                  <div className="mt-3 pt-3 border-t border-white/20 flex gap-2 animate-in fade-in slide-in-from-top-1">
                    <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                    <span className="text-[8px] font-black uppercase text-white">Live Tracking Active</span>
                  </div>
                )}
              </div>
            ))}
            <div className="p-4 border-t-2 border-black bg-white shadow-[0_-4px_0_0_rgba(0,0,0,1)]">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-tighter">
                  <span>Active Nodes</span>
                  <span className="bg-black text-white px-2 py-0.5">124</span>
                </div>
                <div className="h-1 bg-black/10 w-full overflow-hidden">
                  <div className="h-full bg-black w-2/3" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-black/40">Criticality</span>
                  <span className="text-[10px] font-black uppercase text-black">High (67.4%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
