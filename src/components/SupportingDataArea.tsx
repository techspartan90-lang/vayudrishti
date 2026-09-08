import React from 'react';
import {
  SUPPORTING_VIEWS,
  DATA_SOURCE_TELEMETRY_ITEMS,
  RECENT_TELEMETRY_LOGS,
} from '../data/mockData';
import {
  Satellite,
  Radio,
  CloudRain,
  Waves,
  Clock,
  ChevronRight,
  Database,
  Activity,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

interface SupportingDataAreaProps {
  onOpenFeedDetail?: (id: string) => void;
  onOpenSourcesModal?: () => void;
}

export const SupportingDataArea: React.FC<SupportingDataAreaProps> = ({
  onOpenFeedDetail,
  onOpenSourcesModal,
}) => {
  const telemetryTimeline = [
    { time: '10:32', source: 'Radar', message: 'Rainfall intensity increased', tag: 'DWR Core > 55 dBZ' },
    { time: '10:29', source: 'AWS', message: '52 mm rainfall recorded', tag: 'Gauge Basin' },
    { time: '10:25', source: 'Citizen Report', message: 'Flooding reported', tag: 'Saidapet Subway' },
    { time: '10:21', source: 'River Gauge', message: 'Water level rising', tag: '+0.28m Surge' },
  ];

  const dataSources = [
    { name: 'IMD', full: 'India Meteorological Department', status: 'Connected', ping: '30s ago', type: 'AWS & Doppler Radars' },
    { name: 'CWC', full: 'Central Water Commission', status: 'Connected', ping: '1m ago', type: 'Hydrological River Gauges' },
    { name: 'MOSDAC', full: 'Meteorological & Oceanographic Satellite Data Arc', status: 'Receiving', ping: '2m ago', type: 'INSAT-3DR Rapid Scan' },
    { name: 'INCOIS', full: 'Indian National Centre for Ocean Information', status: 'Connected', ping: '45s ago', type: 'Coastal & Surge Bulletins' },
    { name: 'Citizen Reports', full: 'Crowdsourced Ground Signal Correlation', status: 'Receiving', ping: '10s ago', type: 'Auxiliary Corroborating Feed' },
  ];

  return (
    <div id="supporting-telemetry-area" className="mt-4 space-y-4">
      {/* 2-Column Bottom Section: RECENT TELEMETRY | DATA SOURCES */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* LEFT: RECENT TELEMETRY (Compact Timeline) */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-lg p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-black text-[#0A192F] uppercase tracking-wider font-mono">
                  RECENT TELEMETRY
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                TIMELINE
              </span>
            </div>

            {/* Compact Timeline Items */}
            <div className="space-y-2 relative pl-2">
              <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-200"></div>
              {telemetryTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded border border-slate-100 bg-slate-50/70 hover:bg-slate-100 transition-colors flex items-center justify-between text-xs relative z-10"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10.5px] font-bold text-slate-500 bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                      {item.time}
                    </span>
                    <div>
                      <span className="font-bold text-[#0A192F] text-[11px] mr-1.5">
                        {item.source}
                      </span>
                      <span className="text-slate-600 text-[11px]">
                        {item.message}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-mono text-slate-400 hidden sm:inline-block">
                    {item.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[9.5px] text-slate-400 font-mono flex items-center justify-between">
            <span>Buffer: 60-Minute Sliding Window</span>
            <span>Latency: &lt;1.8s</span>
          </div>
        </div>

        {/* RIGHT: DATA SOURCES (Status Indicators) */}
        <div className="md:col-span-6 bg-white border border-slate-200 rounded-lg p-4 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-black text-[#0A192F] uppercase tracking-wider font-mono">
                  DATA SOURCES
                </h3>
              </div>
              <button
                onClick={onOpenSourcesModal}
                className="text-[10px] font-mono text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded hover:bg-blue-100 transition-colors font-bold"
              >
                Inspect Feeds
              </button>
            </div>

            {/* 5 Data Source Status Indicators */}
            <div className="space-y-1.5">
              {dataSources.map((src) => (
                <div
                  key={src.name}
                  onClick={onOpenSourcesModal}
                  className="p-2 rounded border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-bold text-xs font-mono text-[#0A192F] w-28 shrink-0">
                      {src.name}
                    </span>
                    <span className="text-[10.5px] text-slate-500 truncate hidden sm:inline">
                      {src.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="flex items-center gap-1.5 text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {src.status}
                    </span>
                    <span className="text-[9px] font-mono text-slate-400 hidden lg:inline">
                      {src.ping}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-100 text-[9.5px] text-slate-400 font-mono flex items-center justify-between">
            <span>5/5 Ingestion Pipelines Operating Nominally</span>
            <span className="text-emerald-700 font-bold">100% Uptime</span>
          </div>
        </div>
      </div>
    </div>
  );
};
