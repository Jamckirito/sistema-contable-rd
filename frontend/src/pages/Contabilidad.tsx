import { PageHeader } from '../components/layout/PageHeader';

const mockAsientos = [
  { id: 1, numero: 'AST-2025-001', fecha: '17/02/2025', descripcion: 'Cierre facturacion dia', total: 'RD$ 45,200', estado: 'Cerrado' },
  { id: 2, numero: 'AST-2025-002', fecha: '16/02/2025', descripcion: 'Pago suplidores', total: 'RD$ 28,500', estado: 'Cerrado' },
  { id: 3, numero: 'AST-2025-003', fecha: '15/02/2025', descripcion: 'Nomina febrero', total: 'RD$ 125,000', estado: 'Cerrado' },
  { id: 4, numero: 'AST-2025-004', fecha: '14/02/2025', descripcion: 'Ajuste inventario', total: 'RD$ 3,200', estado: 'Borrador' },
];

export function Contabilidad() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Contabilidad"
        subtitle="Plan de cuentas, asientos y periodos"
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nuevo asiento
          </button>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-semibold text-slate-900">Plan de cuentas</h3>
          <p className="mt-1 text-sm text-slate-500">Cuentas contables y niveles</p>
          <button className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Ver plan de cuentas
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-semibold text-slate-900">Periodo actual</h3>
          <p className="mt-1 text-sm text-slate-500">Febrero 2025</p>
          <button className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Cambiar periodo
          </button>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
          <h3 className="font-display text-base font-semibold text-slate-900">Balance de comprobacion</h3>
          <p className="mt-1 text-sm text-slate-500">Debe = Haber</p>
          <button className="mt-4 w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100">
            Generar balance
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-display text-lg font-semibold text-slate-900">Ultimos asientos</h2>
          <p className="text-sm text-slate-500">Libro diario del periodo actual</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Numero</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Fecha</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Descripcion</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Total</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAsientos.map((a) => (
                <tr key={a.id} className="transition hover:bg-slate-50/50">
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-sm font-semibold text-slate-900">{a.numero}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{a.fecha}</td>
                  <td className="px-6 py-4 text-sm text-slate-700">{a.descripcion}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-slate-900">{a.total}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={a.estado === 'Cerrado' ? 'rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800' : 'rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700'}>
                      {a.estado}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary-600" title="Ver">Ver</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-3">
          <p className="text-sm text-slate-600">Mostrando 4 asientos</p>
          <button className="rounded-lg border border-primary-600 bg-primary-600 px-3 py-1.5 text-sm font-medium text-white">Ver todos</button>
        </div>
      </div>
    </div>
  );
}
