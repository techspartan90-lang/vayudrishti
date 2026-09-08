import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Flame,
  BarChart3,
  FileText,
  Bell,
  Database,
  Settings,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';

interface SidebarNavProps {
  activeNav: string;
  onSelectNav: (nav: string) => void;
  onOpenSourcesModal: () => void;
  onOpenReportModal: () => void;
}

export const SidebarNav: React.FC<SidebarNavProps> = ({
  activeNav,
  onSelectNav,
  onOpenSourcesModal,
  onOpenReportModal,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'live-map', label: 'Live Map', icon: MapPin },
    { id: 'events', label: 'Events', icon: Flame, badge: '5' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'alerts', label: 'Alerts', icon: Bell, badge: '3' },
    { id: 'sources', label: 'Data Sources', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleNavClick = (id: string) => {
    onSelectNav(id);
    if (id === 'sources') {
      onOpenSourcesModal();
    } else if (id === 'reports') {
      onOpenReportModal();
    }
  };

  return (
    <aside
      id="sidebar-nav"
      className="w-56 shrink-0 bg-white border-r border-slate-200 flex flex-col justify-between select-none z-20"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      {/* Top Section */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-3 tracking-widest">
          Navigation
        </h3>
        <nav className="space-y-1 mb-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                id={`nav-item-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-bold'
                    : 'text-slate-600 hover:bg-slate-50 font-medium'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      isActive
                        ? 'bg-blue-200/70 text-blue-800'
                        : item.id === 'events'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sync Status Box */}
        <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 text-xs">
          <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">
            <span>Node Telemetry</span>
            <span className="text-green-600 font-mono">100% OK</span>
          </div>
          <p className="text-[10px] text-slate-500 leading-snug">
            CWC • IMD • INCOIS • MOSDAC • NDMA Sync
          </p>
        </div>
      </div>

      {/* Bottom Mission Anchor */}
      <div className="p-3.5 bg-[#0A192F] text-white text-center rounded-t-lg mx-2 mb-2 border border-slate-800 shadow-2xs">
        <div className="text-[11px] font-semibold tracking-tight text-slate-200">
          ATMOCONNECT
        </div>
        <p className="text-[9.5px] leading-relaxed text-blue-300 font-medium mt-0.5">
          Connect • Verify • Analyse • Prioritise
        </p>
        <div className="text-[8px] text-slate-400 uppercase tracking-widest mt-1.5 font-mono pt-1.5 border-t border-slate-800">
          Decision Support System
        </div>
      </div>
    </aside>
  );
};
