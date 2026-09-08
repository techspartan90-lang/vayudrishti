import React from 'react';
import { X, Database, CheckCircle2, Shield, ExternalLink, Info } from 'lucide-react';

interface DataSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataSourcesModal: React.FC<DataSourcesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const sources = [
    {
      name: 'India Meteorological Department (IMD)',
      role: 'Precipitation, AWS Telemetry, Cyclone Warnings, Radar DWR Feeds',
      status: 'Synchronized (Prototype API)',
      latency: '< 2 mins',
    },
    {
      name: 'Central Water Commission (CWC)',
      role: 'Hydrological River Gauges, Flood Inundation Thresholds',
      status: 'Synchronized (Prototype API)',
      latency: '< 5 mins',
    },
    {
      name: 'INCOIS (Ocean Information Services)',
      role: 'Deep-sea Buoys, Coastal Wave Heights, Storm Surge Models',
      status: 'Synchronized (Prototype API)',
      latency: '< 4 mins',
    },
    {
      name: 'ISRO / MOSDAC',
      role: 'INSAT-3DR / 3D Rapid Scan Satellite Thermal & Water Vapor Imagery',
      status: 'Synchronized (Prototype API)',
      latency: '< 15 mins',
    },
    {
      name: 'National Disaster Management Authority (NDMA)',
      role: 'Common Alerting Protocol (CAP) Standardized Warning Distribution',
      status: 'Integrated Protocol',
      latency: '< 1 min',
    },
    {
      name: 'ATMOCONNECT Citizen & Municipal Feeds',
      role: 'Geotagged micro-flooding, road impassability, civic verification',
      status: 'Active Crowdsource Ingestion',
      latency: 'Real-time',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0A192F] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center">
              <Database className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight font-mono">
                Data Fusion Engine & Sources
              </h3>
              <p className="text-[11px] text-slate-400">
                Multi-source correlation architecture for decision-makers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 text-xs text-slate-700">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-900 leading-relaxed font-medium">
            <strong>Platform Mandate:</strong> ATMOCONNECT does <em>NOT</em> replace IMD forecasting, CWC flood systems, INCOIS, ISRO/MOSDAC or NDMA warning systems. Its role is to:
            <div className="mt-2 font-mono font-bold text-blue-950 flex flex-wrap gap-1 items-center">
              <span>Collect</span> → <span>Correlate</span> → <span>Detect</span> → <span>Verify</span> → <span>Analyse Impact</span> → <span>Prioritise</span> → <span>Inform</span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px]">
              Active Ingestion Streams ({sources.length})
            </h4>
            {sources.map((s, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span>{s.name}</span>
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">{s.role}</div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                    {s.status}
                  </span>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    Latency: {s.latency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs transition-colors"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
};
