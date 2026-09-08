import React from 'react';
import { WeatherEvent } from '../types';
import { PRIORITY_RANKINGS } from '../data/mockData';
import {
  Users,
  Building2,
  Route,
  Zap,
  ShieldAlert,
  Hospital,
  Compass,
  AlertTriangle,
  Flame,
  BarChart3,
  HelpCircle,
  MapPin,
} from 'lucide-react';

interface ImpactAndPrioritySectionProps {
  selectedEvent: WeatherEvent;
  onSelectEventByHazard?: (hazardType: string) => void;
}

export const ImpactAndPrioritySection: React.FC<ImpactAndPrioritySectionProps> = ({
  selectedEvent,
  onSelectEventByHazard,
}) => {
  const { impact } = selectedEvent;
  const breakdown = impact.categoriesBreakdown;

  return (
    <section
      id="impact-and-priority-section"
      className="mt-4 bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
        {/* ========================================================= */}
        {/* SECTION 10: IMPACT & EXPOSURE ANALYSIS (7 Cols on LG)     */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <h3 className="text-xs font-black text-[#0A192F] uppercase tracking-wider font-mono">
                    Impact & Exposure Analysis
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200/60">
                    {selectedEvent.code}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Answering: <span className="font-semibold text-slate-700">Where is the hazard, and what could be affected?</span>
                </p>
              </div>

              <div className="text-[10px] font-mono text-slate-400">
                Location: <span className="text-slate-700 font-semibold">{selectedEvent.location}</span>
              </div>
            </div>

            {/* 4 Core Exposure Figures */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4">
              {/* Estimated Population */}
              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Users className="w-3 h-3 text-blue-600" />
                  Est. Population
                </span>
                <div className="text-lg font-bold text-[#0A192F] font-mono mt-0.5">
                  {impact.populationPotentiallyAffected}
                </div>
                <span className="text-[9px] text-slate-500">In hazard footprint</span>
              </div>

              {/* Affected Districts */}
              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-orange-600" />
                  Affected Districts
                </span>
                <div className="text-lg font-bold text-[#0A192F] font-mono mt-0.5">
                  {impact.affectedDistrictsCount}
                </div>
                <span className="text-[9px] text-slate-500">Jurisdictions alerted</span>
              </div>

              {/* Critical Infrastructure */}
              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Building2 className="w-3 h-3 text-purple-600" />
                  Critical Infrastructure
                </span>
                <div className="text-lg font-bold text-[#0A192F] font-mono mt-0.5">
                  {impact.criticalInfrastructureCount}
                </div>
                <span className="text-[9px] text-slate-500">High-value assets</span>
              </div>

              {/* Roads / Key Routes */}
              <div className="bg-slate-50 p-2.5 rounded-md border border-slate-200/80">
                <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-wide flex items-center gap-1">
                  <Route className="w-3 h-3 text-emerald-600" />
                  Road Network
                </span>
                <div className="text-lg font-bold text-[#0A192F] font-mono mt-0.5">
                  {impact.roadsAffectedKm} <span className="text-xs text-slate-400 font-normal">km</span>
                </div>
                <span className="text-[9px] text-slate-500">Corridors impacted</span>
              </div>
            </div>

            {/* 6 Category Breakdown Grid */}
            <div className="border border-slate-200 rounded-md p-3 bg-slate-50/50">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>Infrastructure & Demographic Category Breakdown</span>
                <span className="text-[9px] font-normal text-slate-400 font-mono">Exposure Assessment</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {/* Hospitals */}
                <div className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Hospital className="w-3.5 h-3.5 text-red-600" />
                    <span className="text-slate-700 font-medium">Hospitals</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{breakdown.hospitals}</span>
                </div>

                {/* Bridges */}
                <div className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Route className="w-3.5 h-3.5 text-amber-600" />
                    <span className="text-slate-700 font-medium">Bridges / Culverts</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{breakdown.bridges}</span>
                </div>

                {/* Roads */}
                <div className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Compass className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-slate-700 font-medium">Roads Immersed</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{breakdown.roadsKm} km</span>
                </div>

                {/* Power Infrastructure */}
                <div className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-slate-700 font-medium">Power Stations</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{breakdown.powerStations}</span>
                </div>

                {/* Population Density */}
                <div className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-slate-700 font-medium">Population Exposure</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{breakdown.population}</span>
                </div>

                {/* Public Facilities */}
                <div className="bg-white p-2 rounded border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span className="text-slate-700 font-medium">Public Facilities</span>
                  </div>
                  <span className="font-mono font-bold text-slate-900">{breakdown.publicFacilities}</span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic mt-3">
            Impact context overlays GIS demographic density with terrain elevations and critical utility topologies.
          </p>
        </div>

        {/* ========================================================= */}
        {/* SECTION 11: PRIORITY RANKING CHART (5 Cols on LG)         */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 p-4 sm:p-5 bg-slate-50/50 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600" />
                <h3 className="text-xs font-black text-[#0A192F] uppercase tracking-wider font-mono">
                  Priority Ranking
                </h3>
              </div>
              <span className="text-[9px] font-mono text-amber-800 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                Prototype Priority Score
              </span>
            </div>

            <p className="text-[10.5px] text-slate-500 mb-3">
              Multi-factor ranking synthesized from <span className="font-semibold text-slate-700">Severity × Confidence × Exposure</span>.
            </p>

            {/* Ranking Bars */}
            <div className="space-y-2.5">
              {PRIORITY_RANKINGS.map((item, idx) => {
                const isCurrent = selectedEvent.hazardType === item.hazard;
                return (
                  <div
                    key={item.hazard}
                    onClick={() => onSelectEventByHazard && onSelectEventByHazard(item.hazard)}
                    className={`p-2.5 rounded-md border transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-white border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400 font-bold w-4">
                          #{idx + 1}
                        </span>
                        <span className="font-bold text-slate-900">{item.hazard}</span>
                        <span
                          className="text-[9px] px-1.5 py-0.2 rounded font-bold uppercase font-mono"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                          }}
                        >
                          {item.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-400 font-mono">
                          {item.confidence} Conf.
                        </span>
                        <span className="font-mono font-extrabold text-sm text-[#0A192F]">
                          {item.score}
                        </span>
                      </div>
                    </div>

                    {/* Score Bar */}
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.score}%`,
                          backgroundColor: item.color,
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer Footer */}
          <div className="mt-3 pt-2.5 border-t border-slate-200 text-[9.5px] text-slate-500 flex items-start gap-1.5 leading-snug">
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-slate-700">Notice:</strong> Prototype prioritisation algorithm for decision support. Does not replace statutory IMD forecasts or NDMA advisories.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
