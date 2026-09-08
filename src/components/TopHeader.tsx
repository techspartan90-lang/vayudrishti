import React from 'react';
import {
  Search,
  Bell,
  Activity,
  Compass,
} from 'lucide-react';

interface TopHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNotifications: () => void;
  onOpenSourcesModal: () => void;
  onOpenReportModal?: () => void;
  activeNav?: string;
  onSelectNav?: (nav: string) => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenNotifications,
  onOpenSourcesModal,
  onOpenReportModal,
  activeNav = 'dashboard',
  onSelectNav,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'live-map', label: 'Live Map' },
    { id: 'events', label: 'Events', badge: '5' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports', label: 'SitRep', action: onOpenReportModal },
    { id: 'sources', label: 'Data Sources', action: onOpenSourcesModal },
  ];

  return (
    <header
      id="top-header"
      className="h-16 w-full bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-xs sticky top-0 z-30 select-none"
    >
      {/* Left: Atmospheric Insignia & ATMOCONNECT Branding */}
      <div className="flex items-center gap-3.5 shrink-0">
        <div className="bg-[#0A192F] p-2 rounded-lg flex items-center justify-center shadow-xs border border-slate-800 text-white relative overflow-hidden group">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-blue-400/40 animate-ping opacity-30"></div>
            <div className="w-5 h-5 rounded-full border-2 border-blue-400 flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-extrabold text-[#0A192F] text-lg leading-none tracking-tight font-mono">
              ATMOCONNECT
            </h1>
            <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200/60">
              NATIONAL NODE
            </span>
          </div>
          <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold mt-0.5">
            WEATHER & DISASTER INTELLIGENCE
          </p>
        </div>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden lg:flex items-center gap-1 mx-4">
        {navItems.map((item) => {
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else if (onSelectNav) {
                  onSelectNav(item.id);
                }
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                isActive
                  ? 'bg-blue-50 text-blue-700 font-bold border border-blue-200/80 shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.2 text-[9px] font-mono font-bold rounded-full bg-red-100 text-red-700">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Center/Right: Search Bar */}
      <div className="flex-1 max-w-xs mx-4 hidden xl:block">
        <div className="relative flex items-center">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            id="global-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search location, event, telemetry…"
            className="w-full bg-slate-100/90 border border-slate-200/80 rounded-full py-1.5 pl-8 pr-10 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-600/20 focus:border-blue-500 transition-all shadow-2xs"
          />
          <div className="absolute right-2.5 flex items-center pointer-events-none">
            <span className="text-[9px] uppercase font-mono text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded-full">
              ⌘K
            </span>
          </div>
        </div>
      </div>

      {/* Right: Disclaimer, Live Indicator, Notifications & User */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Prototype / Demonstration Data Disclaimer Pill */}
        <div
          onClick={onOpenSourcesModal}
          className="hidden md:flex items-center gap-1.5 text-[10px] font-mono text-amber-800 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-md cursor-pointer hover:bg-amber-100/70 transition-colors shadow-2xs"
          title="Click to view authoritative source connectivity"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
          <span className="font-semibold">Prototype Data</span>
        </div>

        {/* Clean Live Indicator */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 border border-emerald-200/70 rounded-md">
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span className="text-[10.5px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
            LIVE
          </span>
        </div>

        {/* Notifications Icon */}
        <button
          id="btn-notifications"
          onClick={onOpenNotifications}
          className="relative p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
          title="Operational Alerts & Telemetry Feed"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-7 h-7 rounded-full bg-[#0A192F] text-white flex items-center justify-center text-[11px] font-bold font-mono shadow-2xs border border-slate-700">
            AD
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-[#0A192F] leading-tight">
              Duty Officer
            </div>
            <div className="text-[9.5px] text-slate-500 font-mono leading-tight">
              National Operations Node
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

