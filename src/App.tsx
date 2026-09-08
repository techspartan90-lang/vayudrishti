import React, { useState } from 'react';
import { WEATHER_EVENTS } from './data/mockData';
import { WeatherEvent } from './types';
import { TopHeader } from './components/TopHeader';
import { KpiRow } from './components/KpiRow';
import { WorkflowBanner } from './components/WorkflowBanner';
import { ActiveEventsList } from './components/ActiveEventsList';
import { IndiaMap } from './components/IndiaMap';
import { EventIntelligence } from './components/EventIntelligence';
import { ImpactAndPrioritySection } from './components/ImpactAndPrioritySection';
import { SupportingDataArea } from './components/SupportingDataArea';
import { SituationReportModal } from './components/SituationReportModal';
import { DataSourcesModal } from './components/DataSourcesModal';

export default function App() {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState<WeatherEvent>(WEATHER_EVENTS[0]);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isSourcesModalOpen, setIsSourcesModalOpen] = useState(false);
  const [markedActions, setMarkedActions] = useState<Record<string, boolean>>({});
  const [actionNotification, setActionNotification] = useState<string | null>(null);

  const handleSelectEvent = (event: WeatherEvent) => {
    setSelectedEvent(event);
  };

  const handleSelectEventByHazard = (hazardType: string) => {
    const match = WEATHER_EVENTS.find(
      (e) => e.hazardType?.toLowerCase() === hazardType.toLowerCase()
    );
    if (match) {
      setSelectedEvent(match);
    }
  };

  const handleMarkForAction = () => {
    const isCurrentlyMarked = !!markedActions[selectedEvent.id];
    const nextState = !isCurrentlyMarked;
    setMarkedActions((prev) => ({ ...prev, [selectedEvent.id]: nextState }));

    if (nextState) {
      setActionNotification(
        `Action successfully logged for ${selectedEvent.code} (${selectedEvent.title}). Dispatched to State EOC queue.`
      );
      setTimeout(() => {
        setActionNotification(null);
      }, 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      {/* Top Header (Height ~64px, clean white with bottom border) */}
      <TopHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNotifications={() => setIsSourcesModalOpen(true)}
        onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
        onOpenReportModal={() => setIsReportModalOpen(true)}
        activeNav={activeNav}
        onSelectNav={setActiveNav}
      />

      {/* Action Notification Toast */}
      {actionNotification && (
        <div className="fixed top-20 right-6 z-50 bg-[#0A192F] text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{actionNotification}</span>
        </div>
      )}

      {/* Main Operational Canvas */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-[#F8FAFC]">
        {/* KPI Row (Exactly 5 compact KPI cards with prototype data label) */}
        <KpiRow />

        {/* Workflow Pipeline Banner: COLLECT → CORRELATE → DETECT → VERIFY → ANALYSE IMPACT → PRIORITISE → INFORM */}
        <WorkflowBanner />

        {/* Main Operational Container: 3 Columns + Bottom Supporting Area */}
        <div className="p-3 sm:p-5 space-y-4 max-w-[1700px] w-full mx-auto">
          {/* ======================================================== */}
          {/* THREE-COLUMN COMMAND CENTRE                              */}
          {/* COLUMN 1 = ACTIVE EVENTS (25-28%)                        */}
          {/* COLUMN 2 = LIVE INDIA MAP (45-50%)                       */}
          {/* COLUMN 3 = EVENT INTELLIGENCE (25-28%)                   */}
          {/* All three are visible simultaneously side-by-side        */}
          {/* ======================================================== */}
          <div
            id="operational-three-column-grid"
            className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-stretch"
          >
            {/* COLUMN 1: ACTIVE EVENTS (Compact Vertical Rail, 25-28% width) */}
            <section className="col-span-12 md:col-span-3 xl:col-span-3 flex flex-col h-[600px]">
              <ActiveEventsList
                events={WEATHER_EVENTS}
                selectedEventId={selectedEvent.id}
                onSelectEvent={handleSelectEvent}
              />
            </section>

            {/* COLUMN 2: LIVE INDIA MAP (45-50% width) */}
            <section className="col-span-12 md:col-span-5 xl:col-span-6 flex flex-col h-[600px]">
              <IndiaMap
                events={WEATHER_EVENTS}
                selectedEvent={selectedEvent}
                onSelectEvent={handleSelectEvent}
              />
            </section>

            {/* COLUMN 3: EVENT INTELLIGENCE (25-28% width) */}
            <section className="col-span-12 md:col-span-4 xl:col-span-3 flex flex-col h-[600px]">
              <EventIntelligence
                event={selectedEvent}
                onGenerateReport={() => setIsReportModalOpen(true)}
                onMarkForAction={handleMarkForAction}
                isActionMarked={!!markedActions[selectedEvent.id]}
              />
            </section>
          </div>

          {/* ======================================================== */}
          {/* IMPACT & EXPOSURE (LEFT) | PRIORITY RANKING (RIGHT)      */}
          {/* ======================================================== */}
          <ImpactAndPrioritySection
            selectedEvent={selectedEvent}
            onSelectEventByHazard={handleSelectEventByHazard}
          />

          {/* ======================================================== */}
          {/* BOTTOM SECTION: RECENT TELEMETRY | DATA SOURCES          */}
          {/* ======================================================== */}
          <SupportingDataArea
            onOpenFeedDetail={() => setIsSourcesModalOpen(true)}
            onOpenSourcesModal={() => setIsSourcesModalOpen(true)}
          />
        </div>

        {/* Institutional Control-Room Footer */}
        <footer className="mt-auto px-6 py-3 bg-white border-t border-slate-200 text-[10px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#0A192F] font-mono">ATMOCONNECT v3.2.0</span>
            <span className="text-slate-300">•</span>
            <span>Multi-Source Weather Intelligence & Disaster Decision Support Platform</span>
            <span className="hidden md:inline text-slate-300">•</span>
            <span className="hidden md:inline italic text-slate-400">Connect. Verify. Analyse. Prioritise.</span>
          </div>
          <div className="flex items-center gap-4 font-mono text-slate-500">
            <button
              onClick={() => setIsSourcesModalOpen(true)}
              className="hover:text-blue-600 transition-colors"
            >
              Authoritative Sources
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="hover:text-blue-600 transition-colors"
            >
              SitRep Dispatch
            </button>
            <span className="text-slate-300">•</span>
            <span className="text-emerald-600 font-bold">Node Sync: Optimal</span>
          </div>
        </footer>
      </main>

      {/* Interactive Modals */}
      <SituationReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        event={selectedEvent}
      />

      <DataSourcesModal
        isOpen={isSourcesModalOpen}
        onClose={() => setIsSourcesModalOpen(false)}
      />
    </div>
  );
}
