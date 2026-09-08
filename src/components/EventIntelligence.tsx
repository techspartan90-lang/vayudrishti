import React, { useState } from 'react';
import { WeatherEvent, EvidenceChainStep } from '../types';
import {
  ShieldAlert,
  AlertTriangle,
  FileText,
  CheckCircle2,
  TrendingUp,
  Layers,
  MapPin,
  Clock,
  Send,
  Building,
  Users,
  Route,
  Activity,
  Check,
  Info,
  Radio,
  Satellite,
  Waves,
  Eye,
  UserCheck,
} from 'lucide-react';

interface EventIntelligenceProps {
  event: WeatherEvent;
  onGenerateReport: () => void;
  onMarkForAction: () => void;
  isActionMarked: boolean;
}

export const EventIntelligence: React.FC<EventIntelligenceProps> = ({
  event,
  onGenerateReport,
  onMarkForAction,
  isActionMarked,
}) => {
  const [activeTab, setActiveTab] = useState<'Overview' | 'Evidence' | 'Impacts' | 'Timeline' | 'Actions'>('Overview');

  const tabs: Array<'Overview' | 'Evidence' | 'Impacts' | 'Timeline' | 'Actions'> = [
    'Overview',
    'Evidence',
    'Impacts',
    'Timeline',
    'Actions',
  ];

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'RADAR':
        return <Radio className="w-3.5 h-3.5 text-red-600" />;
      case 'AWS':
        return <Activity className="w-3.5 h-3.5 text-blue-600" />;
      case 'SATELLITE':
        return <Satellite className="w-3.5 h-3.5 text-purple-600" />;
      case 'RIVER DATA':
        return <Waves className="w-3.5 h-3.5 text-cyan-600" />;
      case 'CITIZEN REPORTS':
        return <Users className="w-3.5 h-3.5 text-amber-600" />;
      case 'VERIFICATION':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-slate-600" />;
    }
  };

  const getSupportBadge = (indicator: string, requiresReview?: boolean) => {
    if (requiresReview) {
      return (
        <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
          Needs Review / Supporting
        </span>
      );
    }
    switch (indicator) {
      case 'Verified':
        return (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            Verified
          </span>
        );
      case 'Corroborated':
        return (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
            Corroborated
          </span>
        );
      case 'Supporting':
        return (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
            Supporting
          </span>
        );
      default:
        return (
          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
            {indicator}
          </span>
        );
    }
  };

  const getSeverityBadgeClass = (status: string) => {
    switch (status) {
      case 'CRITICAL':
        return 'bg-red-600 text-white';
      case 'HIGH':
        return 'bg-orange-600 text-white';
      case 'MODERATE':
        return 'bg-amber-500 text-white';
      case 'LOW':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-slate-700 text-white';
    }
  };

  return (
    <div
      id="event-intelligence-column"
      className="flex flex-col h-full bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden"
    >
      {/* Panel Header */}
      <div className="p-3.5 border-b border-slate-200 bg-white">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span
              className={`text-[10px] font-black px-2 py-0.5 rounded tracking-wide font-mono ${getSeverityBadgeClass(
                event.status
              )}`}
            >
              {event.status}
            </span>
            <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded font-mono border border-slate-200">
              {event.code}
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded uppercase font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
              {event.activeStatus}
            </span>
          </div>
          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            {event.confidence}% Confidence
          </span>
        </div>

        {/* Title & Location */}
        <h2 className="font-extrabold text-sm sm:text-base leading-tight text-[#0A192F] mt-1">
          {event.title}
        </h2>
        <div className="mt-1 flex flex-col text-xs text-slate-500">
          <span className="font-bold text-slate-700">Chennai</span>
          <span className="text-[11px] text-slate-500">Saidapet – Guindy – Kotturpuram</span>
        </div>

        {/* Intelligence Tabs */}
        <div className="flex border-b border-slate-100 shrink-0 bg-slate-50 rounded-md p-0.5 mt-2.5 text-xs font-semibold">
          {tabs.map((tab) => (
            <button
              key={tab}
              id={`intelligence-tab-${tab.toLowerCase()}`}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-1 text-center rounded transition-colors text-[10px] font-bold tracking-wide uppercase ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-2xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Tab Content Body (Scrollable) */}
      <div className="flex-1 p-3 space-y-3 overflow-y-auto min-h-0">
        {/* ======================================================== */}
        {/* OVERVIEW TAB (Default & Comprehensive View) */}
        {/* ======================================================== */}
        {(activeTab === 'Overview' || activeTab === 'Actions') && (
          <>
            {/* 4 Core Evidence Metric Cards */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200">
                <p className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  RAINFALL
                </p>
                <p className="text-base font-extrabold text-[#0A192F] font-mono mt-0.5">
                  {event.metrics.rainfall || event.keyMetricValue || '68.4 mm/h'}
                </p>
              </div>

              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200">
                <p className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  RIVER LEVEL
                </p>
                <p className="text-base font-extrabold text-[#0A192F] font-mono mt-0.5">
                  {event.metrics.riverLevelRise || '+0.28 m'}
                </p>
              </div>

              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200">
                <p className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  AREA AT RISK
                </p>
                <p className="text-base font-extrabold text-[#0A192F] font-mono mt-0.5">
                  {event.metrics.areaAtRisk || '+34%'}
                </p>
              </div>

              <div className="bg-slate-50/80 p-2.5 rounded-lg border border-slate-200">
                <p className="text-[9.5px] text-slate-500 font-bold uppercase tracking-wider font-mono">
                  EVIDENCE CONFIDENCE
                </p>
                <p className="text-base font-extrabold text-emerald-600 font-mono mt-0.5">
                  {event.confidence}%
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 my-1"></div>

            {/* WHAT CHANGED (Past 30 minutes) */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider font-mono">
                    WHAT CHANGED
                  </span>
                </div>
                <span className="text-[9.5px] text-slate-400 font-mono font-medium">
                  Past 30 minutes
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5 text-xs mb-2">
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Signal Intensity</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px]">
                    {event.whatChanged.signalsInflux}
                  </span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Precipitation</span>
                  <span className="font-mono font-bold text-blue-700 text-[11px]">
                    {event.whatChanged.precipitation}
                  </span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">River Level</span>
                  <span className="font-mono font-bold text-cyan-700 text-[11px]">
                    {event.whatChanged.riverSwell || '+0.28 m'}
                  </span>
                </div>
                <div className="p-2 rounded bg-white border border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500">Risk Footprint</span>
                  <span className="font-mono font-bold text-amber-700 text-[11px]">
                    {event.whatChanged.riskFootprint}
                  </span>
                </div>
              </div>

              {/* Transition Banner */}
              <div className="p-2 rounded bg-red-100/70 border border-red-200 flex items-center justify-center text-xs">
                <span className="font-mono font-black text-red-700 tracking-wider text-[11px]">
                  DEVELOPING → ESCALATING
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 my-1"></div>

            {/* EVIDENCE CHECKLIST */}
            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider font-mono">
                  EVIDENCE
                </span>
                <span className="text-[9.5px] font-mono text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                  5/5 Verified Feeds
                </span>
              </div>

              <div className="grid grid-cols-1 gap-1 text-xs">
                {[
                  { name: 'Radar', verified: true, detail: 'Chennai Doppler Radar (DWR)' },
                  { name: 'AWS', verified: true, detail: 'Automatic Weather Station' },
                  { name: 'Satellite', verified: true, detail: 'INSAT-3DR Rapid Scan' },
                  { name: 'River', verified: true, detail: 'CWC Telemetry Gauge (+0.28m)' },
                  { name: 'Citizen Reports', verified: true, detail: '31 Corroborated Reports' },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-1.5 px-2.5 rounded bg-white border border-slate-200 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-800 text-[11px]">
                        {item.name}
                      </span>
                      <span className="text-[9.5px] text-slate-400">
                        {item.detail}
                      </span>
                    </div>
                    <span className="text-emerald-600 font-bold text-xs flex items-center gap-0.5">
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ======================================================== */}
        {/* EVIDENCE DRILLDOWN TAB */}
        {/* ======================================================== */}
        {activeTab === 'Evidence' && (
          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-950 font-medium leading-relaxed">
              <strong>Evidence Chain Architecture:</strong> ATMOCONNECT connects multi-spectral sensor feeds across Doppler radar, automated weather stations, INSAT-3DR rapid-scan satellite channels, CWC river telemetry, and verified citizen observations to eliminate false alarms and confirm high-confidence anomalies.
            </div>

            <div className="space-y-2">
              {event.evidenceChain.map((step, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-white border border-slate-200 shadow-2xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                        STAGE {idx + 1}
                      </span>
                      <span className="font-bold text-slate-900 text-xs">{step.stage}</span>
                    </div>
                    {getSupportBadge(step.supportIndicator, step.requiresHumanReview)}
                  </div>

                  <div className="text-xs font-semibold text-slate-800">
                    Source: {step.sourceName}
                  </div>

                  <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-100">
                    {step.status}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-slate-100">
                    <span>Node Location: {step.location}</span>
                    <span>Timestamp: {step.timestamp}</span>
                  </div>

                  {step.requiresHumanReview && (
                    <div className="p-1.5 rounded bg-amber-50 border border-amber-200 text-[10px] text-amber-900">
                      <strong>Human Verification Required:</strong> Crowdsourced signals are treated as auxiliary corroborating evidence and must be confirmed against AWS/Radar sensors before triggering statutory evacuations.
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* IMPACTS DRILLDOWN TAB */}
        {/* ======================================================== */}
        {activeTab === 'Impacts' && (
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                Critical Infrastructure at Risk ({event.impact.criticalInfrastructureCount})
              </h4>
              {event.impact.criticalInfrastructureList.length > 0 ? (
                <div className="space-y-1.5">
                  {event.impact.criticalInfrastructureList.map((item, i) => (
                    <div
                      key={i}
                      className="p-2 rounded bg-white border border-slate-200 text-xs flex items-center justify-between"
                    >
                      <span className="font-medium text-slate-800">{item}</span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        MONITORED
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500">No high-value infrastructure threatened.</p>
              )}
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide">
                Transport & Road Corridors ({event.impact.roadTransportCorridorsCount})
              </h4>
              <div className="space-y-1.5">
                {event.impact.roadTransportCorridorsList.map((road, i) => (
                  <div
                    key={i}
                    className="p-2 rounded bg-white border border-slate-200 text-xs flex items-center justify-between"
                  >
                    <span className="font-medium text-slate-800">{road}</span>
                    <span className="text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                      IMPEDED
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* TIMELINE DRILLDOWN TAB */}
        {/* ======================================================== */}
        {activeTab === 'Timeline' && (
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-3">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wide">
              Detailed Incident Telemetry Log
            </h4>
            <div className="space-y-2.5 relative pl-3 border-l-2 border-blue-500 ml-1">
              {event.timeline.map((item, idx) => (
                <div key={idx} className="relative pl-3 text-xs">
                  <span className="absolute -left-[18px] top-1 w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-white"></span>
                  <div className="font-mono font-bold text-slate-900">{item.time} — {item.label}</div>
                  <p className="text-slate-600 mt-1">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Section 15: DECISION-SUPPORT ACTION (Sticky at Bottom of Right Panel) */}
      <div
        id="decision-support-action-footer"
        className="p-3 bg-white border-t border-slate-200"
      >
        <div className="bg-[#0A192F] p-3.5 rounded-lg text-white shadow-2xs border border-slate-800">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[10px] font-bold text-blue-300 uppercase tracking-wider font-mono">
              Priority Decision Action
            </p>
            <span className="text-[9px] font-mono text-slate-400">Authorized Support</span>
          </div>
          <p className="text-xs font-semibold leading-relaxed mb-3 text-slate-100">
            &ldquo;{event.recommendedAction}&rdquo;
          </p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              id="btn-generate-report"
              onClick={onGenerateReport}
              className="flex-1 bg-white text-[#0A192F] hover:bg-slate-100 text-[10px] font-bold py-2 rounded shadow-2xs transition-colors flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#0A192F]" />
              <span>SITUATION REPORT</span>
            </button>

            <button
              id="btn-mark-for-action"
              onClick={onMarkForAction}
              className={`flex-1 border text-[10px] font-bold py-2 rounded transition-colors flex items-center justify-center gap-1.5 ${
                isActionMarked
                  ? 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              {isActionMarked ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                  <span>ESCALATED</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-white" />
                  <span>MARK FOR ACTION</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
