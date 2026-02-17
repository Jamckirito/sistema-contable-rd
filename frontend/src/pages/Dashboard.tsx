import { Link } from 'react-router-dom';

const kpis = [
  {
    label: 'Facturas del mes',
    value: 'RD$ 250,000',
    change: '+12%',
    changeLabel: 'vs mes anterior',
    trend: 'up',
    icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    bg: 'bg-primary-500',
    light: 'bg-primary-50',
    text: 'text-primary-600',
  },
  {
    label: 'Cuentas por cobrar',
    value: 'RD$ 80,500',
    change: '15',
    changeLabel: 'facturas pendientes',
    trend: 'neutral',
    icon: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-2a2 2 0 00-2-2h-2m-4-4V9a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-4 4z',
    bg: 'bg-amber-500',
    light: 'bg-amber-50',
    text: 'text-amber-600',
  },
  {
    label: 'ITBIS a pagar',
    value: 'RD$ 12,340',
    change: '5 días',
    changeLabel: 'para vencimiento',
    trend: 'neutral',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    bg: 'bg-violet-500',
    light: 'bg-violet-50',
    text: 'text-violet-600',
  },
  {
    label: 'Productos en stock',
    value: '342',
    change: '8',
    changeLabel: 'bajo mínimo',
    trend: 'down',
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    bg: 'bg-emerald-500',
    light: 'bg-emerald-50',
    text: 'text-emerald-600',
  },
];

const recent = [
  { id: 1, action: 'Factura FAC-000125 emitida', amount: 'RD$ 15,420', time: 'Hace 2 h' },
  { id: 2, action: 'Pago registrado - Cliente García', amount: 'RD$ 8,000', time: 'Hace 5 h' },
  { id: 3, action: 'Nueva factura FAC-000124', amount: 'RD$ 22,100', time: 'Ayer' },
  { id: 4, action: 'Compra COM-000089', amount: 'RD$ 45,200', time: 'Ayer' },
  { id: 5, action: 'Cliente "Distribuidora Norte" creado', amount: '—', time: 'Hace 2 días' },
];

export function Dashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Resumen de tu negocio y actividad reciente
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50"
          >
            <div className="absolute right-4 top-4 opacity-10 group-hover:opacity-20 transition">
              <div className={`h-12 w-12 rounded-xl ${kpi.bg}`} />
            </div>
            <div className={`inline-flex rounded-xl p-2.5 ${kpi.light}`}>
              <svg className={`h-6 w-6 ${kpi.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={kpi.icon} />
              </svg>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-500">{kpi.label}</p>
            <p className="mt-1 font-display text-2xl font-bold text-slate-900">{kpi.value}</p>
            <p className={`mt-2 text-sm font-medium ${kpi.trend === 'up' ? 'text-emerald-600' : kpi.trend === 'down' ? 'text-red-600' : 'text-slate-500'}`}>
              {kpi.trend === 'up' && '↑ '}{kpi.change} {kpi.changeLabel}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Gráfico placeholder */}
        <div className="lg:col-span-2 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h2 className="font-display text-lg font-semibold text-slate-900">Ventas últimos 30 días</h2>
          <p className="mt-1 text-sm text-slate-500">Comparativa mensual</p>
          <div className="mt-8 flex h-64 items-end justify-between gap-2">
            {[65, 45, 78, 52, 90, 70, 85, 60, 75, 82, 68, 88].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-lg bg-gradient-to-t from-primary-500 to-primary-400 transition hover:from-primary-600 hover:to-primary-500"
                style={{ height: `${h}%` }}
                title={`Día ${i + 1}: ${h}%`}
              />
            ))}
          </div>
          <div className="mt-4 flex justify-between text-xs text-slate-400">
            <span>Día 1</span>
            <span>Día 12</span>
          </div>
        </div>

        {/* Actividad reciente */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-slate-900">Actividad reciente</h2>
            <Link
              to="/facturas"
              className="text-sm font-medium text-primary-600 hover:text-primary-700"
            >
              Ver todo
            </Link>
          </div>
          <ul className="mt-6 space-y-4">
            {recent.map((item) => (
              <li
                key={item.id}
                className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-800">{item.action}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{item.time}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-slate-700">{item.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-slate-900">Accesos rápidos</h2>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Link
            to="/facturas/nueva"
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 py-6 transition hover:border-primary-200 hover:bg-primary-50/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700">Nueva factura</span>
          </Link>
          <Link
            to="/clientes"
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 py-6 transition hover:border-primary-200 hover:bg-primary-50/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700">Nuevo cliente</span>
          </Link>
          <Link
            to="/contabilidad"
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 py-6 transition hover:border-primary-200 hover:bg-primary-50/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700">Asientos</span>
          </Link>
          <Link
            to="/reportes"
            className="flex flex-col items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/50 py-6 transition hover:border-primary-200 hover:bg-primary-50/50"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-700">Reportes</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
