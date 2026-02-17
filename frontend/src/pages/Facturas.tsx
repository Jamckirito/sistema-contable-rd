import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';

const mockFacturas = [
  { id: 'FAC-000125', cliente: 'Distribuidora Garcia SRL', fecha: '17/02/2025', total: 'RD$ 15,420', estado: 'Pagada' },
  { id: 'FAC-000124', cliente: 'Supermercado Norte', fecha: '16/02/2025', total: 'RD$ 22,100', estado: 'Pendiente' },
  { id: 'FAC-000123', cliente: 'Farmacia San Jose', fecha: '15/02/2025', total: 'RD$ 8,750', estado: 'Pagada' },
  { id: 'FAC-000122', cliente: 'Restaurante El Sabor', fecha: '14/02/2025', total: 'RD$ 45,200', estado: 'Vencida' },
  { id: 'FAC-000121', cliente: 'Tienda La Esquina', fecha: '13/02/2025', total: 'RD$ 12,300', estado: 'Pagada' },
];

const estadoStyles: Record<string, string> = {
  Pagada: 'bg-emerald-100 text-emerald-800',
  Pendiente: 'bg-amber-100 text-amber-800',
  Vencida: 'bg-red-100 text-red-800',
};

export function Facturas() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Facturas"
        subtitle="Gestiona facturas de venta y credito fiscal"
        actions={
          <Link
            to="/facturas/nueva"
            className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700 hover:shadow-primary-600/30"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nueva factura
          </Link>
        }
      />

      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <label className="sr-only">Buscar</label>
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="search"
            placeholder="Buscar por NCF, cliente..."
            className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none"
          />
        </div>
        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none">
          <option>Todas las fechas</option>
        </select>
        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none">
          <option>Todos los estados</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">NCF / Numero</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Fecha</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockFacturas.map((f) => (
                <tr key={f.id} className="transition hover:bg-slate-50/50">
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className="font-mono text-sm font-semibold text-slate-900">{f.id}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-700">{f.cliente}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{f.fecha}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-semibold text-slate-900">{f.total}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={"inline-flex rounded-lg px-2.5 py-1 text-xs font-medium " + (estadoStyles[f.estado] ?? 'bg-slate-100 text-slate-700')}>
                      {f.estado}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary-600" title="Ver">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-3">
          <p className="text-sm text-slate-600">Mostrando 5 de 125 facturas</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Anterior</button>
            <button className="rounded-lg border border-primary-600 bg-primary-600 px-3 py-1.5 text-sm font-medium text-white">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
