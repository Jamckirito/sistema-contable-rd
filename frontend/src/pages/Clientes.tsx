import { PageHeader } from '../components/layout/PageHeader';

const mockClientes = [
  { id: 1, nombre: 'Distribuidora Garcia SRL', rnc: '1-31-12345-6', telefono: '809-555-0100', email: 'contacto@garcia.com.do', ciudad: 'Santo Domingo' },
  { id: 2, nombre: 'Supermercado Norte', rnc: '1-31-23456-7', telefono: '809-555-0101', email: 'info@supernorte.do', ciudad: 'Santiago' },
  { id: 3, nombre: 'Farmacia San Jose', rnc: '1-31-34567-8', telefono: '809-555-0102', email: 'ventas@farmaciasanjose.do', ciudad: 'La Romana' },
  { id: 4, nombre: 'Restaurante El Sabor', rnc: '1-31-45678-9', telefono: '809-555-0103', email: 'reservas@elsabor.do', ciudad: 'Santo Domingo' },
  { id: 5, nombre: 'Tienda La Esquina', rnc: '1-31-56789-0', telefono: '809-555-0104', email: 'tienda@laesquina.do', ciudad: 'Puerto Plata' },
];

export function Clientes() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Clientes"
        subtitle="Directorio de clientes y datos fiscales"
        actions={
          <button className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 transition hover:bg-primary-700">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
            Nuevo cliente
          </button>
        }
      />
      <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <div className="relative flex-1 min-w-[200px]">
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </span>
          <input type="search" placeholder="Buscar por nombre, RNC, email..." className="block w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none" />
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead>
              <tr className="bg-slate-50/80">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Cliente</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">RNC / Cedula</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Contacto</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Ciudad</th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockClientes.map((c) => (
                <tr key={c.id} className="transition hover:bg-slate-50/50">
                  <td className="px-6 py-4">
                    <span className="font-semibold text-slate-900">{c.nombre}</span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 font-mono text-sm text-slate-600">{c.rnc}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div>{c.telefono}</div>
                    <div className="text-slate-500">{c.email}</div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">{c.ciudad}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-right">
                    <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-primary-600" title="Editar">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/50 px-6 py-3">
          <p className="text-sm text-slate-600">Mostrando 5 de 150 clientes</p>
          <div className="flex gap-2">
            <button className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50">Anterior</button>
            <button className="rounded-lg border border-primary-600 bg-primary-600 px-3 py-1.5 text-sm font-medium text-white">Siguiente</button>
          </div>
        </div>
      </div>
    </div>
  );
}
