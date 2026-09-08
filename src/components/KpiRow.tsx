import React from 'react';
import {
  Flame,
  Users,
  Building2,
  CloudRain,
  Layers,
  Info,
  TrendingUp,
} from 'lucide-react';
import { KPI_DATA } from '../data/mockData';

export const KpiRow: React.FC = () => {
  return (
    <div id="kpi-row" className="bg-slate-50 border-b border-slate-200 px-6 py-3 shrink-0">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">
            National Situational Overview
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400 italic">
          <Info className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <span>Prototype / Demonstration Data</span>
        </div>
      </div>

      {/* Exactly 5 Compact KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Card 1: ACTIVE EVENTS */}
        <div
          id="kpi-card-1"
          className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-center"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase">Active Events</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold text-[#0A192F]">5</span>
            <span className="text-xs font-bold text-red-600">+2 New</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1">2 Critical • 1 High</span>
        </div>

        {/* Card 2: PEOPLE POTENTIALLY AFFECTED */}
        <div
          id="kpi-card-2"
          className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-center"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase">Affected Potential</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold text-[#0A192F]">1.2M</span>
            <span className="text-xs font-bold text-orange-600">+18%</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1">Inundation & cyclone zones</span>
        </div>

        {/* Card 3: CRITICAL INFRASTRUCTURE */}
        <div
          id="kpi-card-3"
          className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-center"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase">Critical Infra</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold text-[#0A192F]">12</span>
            <span className="text-xs font-bold text-red-600">+3 Alert</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1">Substations & bridges</span>
        </div>

        {/* Card 4: HIGHEST RAINFALL */}
        <div
          id="kpi-card-4"
          className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-center"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase">Highest Rainfall</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold text-[#0A192F]">
              68.4 <span className="text-xs text-slate-400">mm/h</span>
            </span>
            <span className="text-[10px] text-slate-500 font-medium">Tamil Nadu</span>
          </div>
          <span className="text-[9px] text-slate-400 mt-1">Adyar Basin Surge</span>
        </div>

        {/* Card 5: EVIDENCE CONFIDENCE */}
        <div
          id="kpi-card-5"
          className="bg-white p-3 rounded-lg border border-slate-200 flex flex-col justify-center relative overflow-hidden"
        >
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Evidence Confidence</span>
          <div className="flex items-baseline gap-2 mt-0.5">
            <span className="text-xl font-bold text-[#0A192F]">92%</span>
            <span className="text-xs font-bold text-emerald-600 font-mono">6 / 6 Sources</span>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-1.5">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
