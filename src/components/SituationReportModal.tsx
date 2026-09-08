import React from 'react';
import { WeatherEvent } from '../types';
import {
  X,
  Printer,
  Download,
  ShieldAlert,
  FileCheck,
  CheckCircle,
  Copy,
} from 'lucide-react';

interface SituationReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: WeatherEvent;
}

export const SituationReportModal: React.FC<SituationReportModalProps> = ({
  isOpen,
  onClose,
  event,
}) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    const text = `ATMOCONNECT SITUATION REPORT (SITREP)\nINCIDENT: ${event.code} - ${event.title}\nSTATUS: ${event.status}\nLOCATION: ${event.location}\nKEY METRIC: ${event.keyMetricLabel} ${event.keyMetricValue}\nCONFIDENCE: ${event.confidence}%\nPOPULATION EXPOSED: ${event.impact.populationPotentiallyAffected}\nCRITICAL INFRASTRUCTURE: ${event.impact.criticalInfrastructureCount}\nRECOMMENDED ACTION: ${event.recommendedAction}\nGenerated: ${new Date().toLocaleString()}`;
    navigator.clipboard.writeText(text);
    alert('SitRep copied to clipboard for emergency transmission.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl border border-slate-300 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-[#0A192F] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold text-xs font-mono">
              AC
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight font-mono">
                SITUATION REPORT (SITREP) #{event.code}
              </div>
              <div className="text-[11px] text-slate-400">
                ATMOCONNECT Multi-Source Weather Intelligence Dispatch
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* SitRep Body */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto font-sans text-slate-800 text-xs">
          {/* Official Banner */}
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2 text-red-900 font-bold">
              <ShieldAlert className="w-5 h-5 text-red-600" />
              <span>INCIDENT LEVEL: {event.status} DISASTER ADVISORY</span>
            </div>
            <span className="font-mono text-[11px] bg-red-600 text-white font-black px-2 py-0.5 rounded">
              OPERATIONAL
            </span>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <div>
              <span className="text-slate-500 font-medium">Incident Name:</span>
              <div className="font-bold text-slate-900 mt-0.5">{event.title}</div>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Primary Geographic Target:</span>
              <div className="font-bold text-slate-900 mt-0.5">{event.location}</div>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Fused Telemetry Metric:</span>
              <div className="font-mono font-bold text-blue-700 mt-0.5">
                {event.keyMetricLabel}: {event.keyMetricValue}
              </div>
            </div>
            <div>
              <span className="text-slate-500 font-medium">Multi-Source Confidence:</span>
              <div className="font-mono font-bold text-emerald-700 mt-0.5">
                {event.confidence}% Fusion ({event.sourcesCount} distinct sources)
              </div>
            </div>
          </div>

          {/* Synthesis Narrative */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] mb-1">
              1. Operational Summary
            </h4>
            <p className="text-slate-700 leading-relaxed bg-slate-50 p-2.5 rounded border border-slate-200">
              {event.description} What Changed: {event.whatChanged.precipitation} precipitation change, {event.whatChanged.signalsInflux} in last 30 minutes. Risk footprint transition: {event.whatChanged.transition}.
            </p>
          </div>

          {/* Exposure Assessment */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] mb-1">
              2. Exposure & Vulnerability Context
            </h4>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1.5">
              <div>
                <strong>Potentially Exposed Population:</strong>{' '}
                {event.impact.populationPotentiallyAffected} residents across {event.impact.affectedAreas.join(', ')}.
              </div>
              <div>
                <strong>Critical Infrastructure Nodes:</strong>{' '}
                {event.impact.criticalInfrastructureList.join('; ') || 'None reported'}.
              </div>
              <div>
                <strong>Transportation Networks:</strong>{' '}
                {event.impact.roadTransportCorridorsList.join('; ') || 'Normal circulation'}.
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wide text-[11px] mb-1">
              3. Authorised Decision-Support Recommendation
            </h4>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded text-blue-950 font-semibold leading-relaxed">
              &ldquo;{event.recommendedAction}&rdquo;
            </div>
          </div>

          {/* Legal / Prototype Disclaimer */}
          <div className="p-2.5 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-900">
            <strong>Demonstration / Prototype Disclaimer:</strong> ATMOCONNECT does NOT replace statutory warning systems (IMD, CWC, INCOIS, NDMA). This automated synthesis is provided for evaluation and decision support for authorized personnel.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy Text</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print SitRep</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-md bg-slate-900 text-white hover:bg-slate-800 font-bold text-xs transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
