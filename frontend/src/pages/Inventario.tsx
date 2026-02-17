import { PageHeader } from '../components/layout/PageHeader';

const mockProductos = [
  { id: 1, codigo: 'ART-001', nombre: 'Arroz Premium 1kg', categoria: 'Granos', stock: 450, minimo: 100, unidad: 'Und', estado: 'ok' },
  { id: 2, codigo: 'ART-002', nombre: 'Aceite Vegetal 1L', categoria: 'Aceites', stock: 280, minimo: 80, unidad: 'Und', estado: 'ok' },
  { id: 3, codigo: 'ART-003', nombre: 'Leche Entera 1L', categoria: 'Lácteos', stock: 12, minimo: 50, unidad: 'Und', estado: 'bajo' },
  { id: 4, codigo: 'ART-004', nombre: 'Detergente 2kg', categoria: 'Limpieza', stock: 95, minimo: 60, unidad: 'Und', estado: 'ok' },
  { id: 5, codigo: 'ART-005', nombre: 'Jabón en barra x6', categoria: 'Limpieza', stock: 8, minimo: 30, unidad: 'Caja', estado: 'bajo' },
];

export function Inventario() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Inventario"
        subtitle="Stock, movimientos y alertas de productos"
        actions={
          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
              Ajuste
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Nuevo producto
            </button>
          </div>
        }
      />

      {/* Resumen rápido */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total productos</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900">200</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Valor en almacén</p>
          <p className="mt-1 font-display text-2xl font-bold text-slate-900">RD$ 1.2M</p>
        </div>
        <div className="rounded-2xl border border-amber-200/80 bg-amber-50/50 p-5 shadow-sm">
          <p className="text-sm font-medium text-amber-700">Productos bajo mínimo</p>
          <p className="mt-1 font-display text-2xl font-bold text-amber-800">8</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input type="search" placeholder="Buscar producto o código..." className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
        </div>
        <select className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20">
          <option>Todas las categorías</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Código</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Producto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Categoría</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Stock</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Mínimo</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Estado</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProductos.map((p) => (
                <tr key={p.id} className="transition hover:bg-slate-50/50">
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-sm font-medium text-slate-900">{p.codigo}</td>
                  <td className="px-6 py-4 text-sm text-slate-800">{p.nombre}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{p.categoria}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right font-semibold text-slate-900">{p.stock} {p.unidad}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-slate-600">{p.minimo}</td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span className={p.estado === 'bajo' ? 'inline-flex rounded-lg bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800' : 'inline-flex rounded-lg bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800'}>
                      {p.estado === 'bajo' ? 'Bajo mínimo' : 'OK'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary-600" title="Movimientos">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-3">
          <p className="text-sm text-slate-600">Mostrando 5 de 200 productos</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Anterior</button>
            <button className="rounded-lg border border-primary-600 bg-primary-600 px-3 py-1.5 text-sm font-medium text-white">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
