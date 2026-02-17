import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Dashboard', icon: DashboardIcon },
  { path: '/facturas', label: 'Facturas', icon: FacturaIcon },
  { path: '/clientes', label: 'Clientes', icon: ClientesIcon },
  { path: '/inventario', label: 'Inventario', icon: InventarioIcon },
  { path: '/contabilidad', label: 'Contabilidad', icon: ContabilidadIcon },
  { path: '/reportes', label: 'Reportes', icon: ReportesIcon },
];

function DashboardIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  );
}
function FacturaIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  );
}
function ClientesIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  );
}
function InventarioIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  );
}
function ContabilidadIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}
function ReportesIcon({ active }: { active: boolean }) {
  return (
    <svg className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  );
}

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-slate-200/80 bg-slate-900 shadow-xl">
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-700/50 px-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500 shadow-lg shadow-primary-500/30">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <span className="font-display text-lg font-bold tracking-tight text-white">Sistema Contable</span>
          <span className="block text-[10px] font-medium uppercase tracking-widest text-slate-500">República Dominicana</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-0.5 p-4">
        {navItems.map(({ path, label, icon: Icon }) => {
          const active = location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
          return (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                active
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon active={active} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer sidebar */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-slate-700/50 p-4">
        <div className="rounded-xl bg-slate-800/50 px-4 py-3">
          <p className="text-xs font-medium text-slate-500">Cumplimiento DGII</p>
          <p className="text-[10px] text-slate-600">NCF · ITBIS · Normativa</p>
        </div>
      </div>
    </aside>
  );
}
