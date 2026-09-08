import React, { useState } from 'react';
import { WeatherEvent, EventSeverity } from '../types';
import {
  Flame,
  Search,
  Filter,
  Layers,
  CheckCircle2,
  ChevronRight,
  ShieldAlert,
} from 'lucide-react';

interface ActiveEventsListProps {
  events: WeatherEvent[];
  selectedEventId: string;
  onSelectEvent: (event: WeatherEvent) => void;
}

export const ActiveEventsList: React.FC<ActiveEventsListProps> = ({
  events,
  selectedEventId,
  onSelectEvent,
}) => {
  const [filter, setFilter] = useState<'ALL' | EventSeverity>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Counts
  const counts = {
    ALL: events.length,
    CRITICAL: events.filter((e) => e.status === 'CRITICAL').length,
    HIGH: events.filter((e) => e.status === 'HIGH').length,
    MODERATE: events.filter((e) => e.status === 'MODERATE').length,
    LOW: events.filter((e) => e.status === 'LOW').length,
  };

  const filteredEvents = events.filter((evt) => {
    const matchesFilter = filter === 'ALL' || evt.status === filter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getBorderAccent = (status: EventSeverity) => {
    switch (status) {
      case 'CRITICAL':
        return 'border-l-4 border-l-red-500';
      case 'HIGH':
        return 'border-l-4 border-l-orange-500';
      case 'MODERATE':
        return 'border-l-4 border-l-yellow-500';
      case 'LOW':
        return 'border-l-4 border-l-blue-500';
    }
  };

  const getSeverityBadge = (status: EventSeverity) => {
    switch (status) {
      case 'CRITICAL':
        return (
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-wider">
            CRITICAL
          </span>
        );
      case 'HIGH':
        return (
          <span className="text-[10px] font-bold text-orange-700 uppercase tracking-wider">
            HIGH
          </span>
        );
      case 'MODERATE':
        return (
          <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">
            MODERATE
          </span>
        );
      case 'LOW':
        return (
          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
            LOW
          </span>
        );
    }
  };

  return (
    <div
      id="active-events-column"
      className="flex flex-col h-full bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden"
    >
      {/* Column Header */}
      <div className="p-3 border-b border-slate-200 bg-slate-50/70">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-black text-slate-900 tracking-wider uppercase font-mono">
              ACTIVE EVENTS
            </h3>
            <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-800 text-[10px] font-bold">
              {events.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter events..."
                className="w-28 focus:w-36 transition-all text-xs pl-6 pr-2 py-1 bg-white border border-slate-200 rounded text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-blue-500"
              />
              <Search className="w-3 h-3 text-slate-400 absolute left-2 top-2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="grid grid-cols-5 gap-1 text-[10px] font-bold font-mono">
          <button
            id="filter-all"
            onClick={() => setFilter('ALL')}
            className={`py-1 rounded text-center transition-colors ${
              filter === 'ALL'
                ? 'bg-slate-900 text-white shadow-2xs'
                : 'text-slate-600 bg-slate-100 hover:bg-slate-200'
            }`}
          >
            ALL
          </button>
          <button
            id="filter-critical"
            onClick={() => setFilter('CRITICAL')}
            className={`py-1 rounded text-center transition-colors ${
              filter === 'CRITICAL'
                ? 'bg-red-600 text-white shadow-2xs'
                : 'text-red-700 bg-red-50 hover:bg-red-100'
            }`}
          >
            CRITICAL
          </button>
          <button
            id="filter-high"
            onClick={() => setFilter('HIGH')}
            className={`py-1 rounded text-center transition-colors ${
              filter === 'HIGH'
                ? 'bg-orange-600 text-white shadow-2xs'
                : 'text-orange-700 bg-orange-50 hover:bg-orange-100'
            }`}
          >
            HIGH
          </button>
          <button
            id="filter-moderate"
            onClick={() => setFilter('MODERATE')}
            className={`py-1 rounded text-center transition-colors ${
              filter === 'MODERATE'
                ? 'bg-amber-600 text-white shadow-2xs'
                : 'text-amber-800 bg-amber-50 hover:bg-amber-100'
            }`}
          >
            MOD
          </button>
          <button
            id="filter-low"
            onClick={() => setFilter('LOW')}
            className={`py-1 rounded text-center transition-colors ${
              filter === 'LOW'
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'text-blue-700 bg-blue-50 hover:bg-blue-100'
            }`}
          >
            LOW
          </button>
        </div>
      </div>

      {/* Event Cards Scrollable Feed */}
      <div className="flex-1 p-2 space-y-2 overflow-y-auto min-h-0">
        {filteredEvents.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">
            No events match the selected criteria.
          </div>
        ) : (
          filteredEvents.map((evt) => {
            const isSelected = evt.id === selectedEventId;
            const simplifiedLoc = evt.location.split('(')[0].trim();
            return (
              <div
                key={evt.id}
                id={`event-card-${evt.id}`}
                onClick={() => onSelectEvent(evt)}
                className={`group relative p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-150 ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-xs ring-1.5 ring-blue-500/30'
                    : 'bg-white border-slate-200 hover:bg-slate-50/80 hover:border-slate-300'
                }`}
              >
                {/* Top: Status Badge & Code */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-1.5">
                    {evt.status === 'CRITICAL' && (
                      <span className="text-[9.5px] font-black font-mono px-1.5 py-0.5 rounded bg-red-600 text-white">
                        CRITICAL
                      </span>
                    )}
                    {evt.status === 'HIGH' && (
                      <span className="text-[9.5px] font-black font-mono px-1.5 py-0.5 rounded bg-orange-600 text-white">
                        HIGH
                      </span>
                    )}
                    {evt.status === 'MODERATE' && (
                      <span className="text-[9.5px] font-black font-mono px-1.5 py-0.5 rounded bg-amber-500 text-white">
                        MODERATE
                      </span>
                    )}
                    {evt.status === 'LOW' && (
                      <span className="text-[9.5px] font-black font-mono px-1.5 py-0.5 rounded bg-blue-600 text-white">
                        LOW
                      </span>
                    )}
                    <span className="text-[9.5px] font-mono text-slate-400 font-bold">
                      {evt.code}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-slate-400">
                    {evt.time}
                  </span>
                </div>

                {/* Event Name */}
                <h4 className="text-xs font-bold leading-tight text-[#0A192F] group-hover:text-blue-700 transition-colors">
                  {evt.title}
                </h4>

                {/* Location */}
                <p className="text-[11px] text-slate-500 mt-0.5 font-medium truncate">
                  {simplifiedLoc}
                </p>

                {/* Metrics Row: Key Metric and Confidence */}
                <div className="mt-1.5 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10.5px]">
                  <span className="font-mono font-bold text-slate-800">
                    {evt.keyMetricValue}
                  </span>
                  <span className="font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200/60 text-[9.5px]">
                    {evt.confidence}% confidence
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Column Footer: Operational Status summary */}
      <div className="p-2.5 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-500 flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          5 Active Multi-Source Feeds
        </span>
        <span className="font-mono text-slate-400">Refreshed 30s ago</span>
      </div>
    </div>
  );
};
