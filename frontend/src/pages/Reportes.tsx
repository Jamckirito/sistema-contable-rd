import { PageHeader } from '../components/layout/PageHeader';

const reportes = [
  { id: 'ventas', titulo: 'Reporte de ventas', descripcion: 'Ventas por período, cliente y producto', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', color: 'bg-primary-500', light: 'bg-primary-50', text: 'text-primary-600' },
  { id: 'itbis', titulo: 'ITBIS retenido y causado', descripcion: 'Para declaración 606 y libro de compras/ventas', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'bg-violet-500', light: 'bg-violet-50', text: 'text-violet-600' },
  { id: 'balance', titulo: 'Balance general', descripcion: 'Activos, pasivos y patrimonio', icon: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z', color: 'bg-amber-500', light: 'bg-amber-50', text: 'text-amber-600' },
  { id: 'resultados', titulo: 'Estado de resultados', descripcion: 'Ingresos, gastos y utilidad', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', color: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-600' },
  { id: 'libro-ventas', titulo: 'Libro de ventas (DGII)', descripcion: 'Formato oficial para declaraciones', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'bg-slate-600', light: 'bg-slate-100', text: 'text-slate-600' },
  { id: 'libro-compras', titulo: 'Libro de compras (DGII)', descripcion: 'Compras y crédito fiscal', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'bg-slate-600', light: 'bg-slate-100', text: 'text-slate-600' },
];

export function Reportes() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Reportes"
        subtitle="Reportes fiscales y financieros para DGII y gestión"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reportes.map((r) => (
          <div
            key={r.id}
            className="group flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50"
          >
            <div className={`inline-flex h-12 w-12 rounded-xl ${r.light} items-center justify-center ${r.text}`}>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={r.icon} />
              </svg>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-slate-900">{r.titulo}</h3>
            <p className="mt-1 flex-1 text-sm text-slate-500">{r.descripcion}</p>
            <button className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 group-hover:border-primary-200 group-hover:bg-primary-50/50 group-hover:text-primary-700">
              Generar reporte
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
        <h2 className="font-display text-lg font-semibold text-slate-900">Reportes recientes</h2>
        <p className="mt-1 text-sm text-slate-500">Descargas y programación</p>
        <div className="mt-6 flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-12 text-center">
          <svg className="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="mt-2 text-sm text-slate-500">No hay reportes generados recientemente</p>
          <p className="text-xs text-slate-400">Selecciona un reporte arriba para generarlo</p>
        </div>
      </div>
    </div>
  );
}
