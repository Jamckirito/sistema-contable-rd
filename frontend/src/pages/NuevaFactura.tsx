import { Link } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';

export function NuevaFactura() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Nueva factura"
        subtitle="Emitir factura de venta con NCF y credito fiscal"
        actions={
          <Link
            to="/facturas"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver
          </Link>
        }
      />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-slate-900">Datos del cliente</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-slate-700">Cliente</label>
                <select className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 focus:outline-none">
                  <option>Seleccionar cliente...</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">RNC / Cedula</label>
                <input type="text" readOnly className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-600" placeholder="Auto" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">Direccion fiscal</label>
                <input type="text" readOnly className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-100 px-4 py-2.5 text-sm text-slate-600" placeholder="Auto" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-slate-900">Lineas de factura</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs font-medium uppercase text-slate-500">
                    <th className="pb-3 pr-4">Producto / Servicio</th>
                    <th className="pb-3 pr-4 w-24">Cant.</th>
                    <th className="pb-3 pr-4 w-28">P. unit.</th>
                    <th className="pb-3 pr-4 w-28">Subtotal</th>
                    <th className="pb-3 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="py-3 pr-4">
                      <select className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20">
                        <option>Seleccionar producto...</option>
                      </select>
                    </td>
                    <td className="py-3 pr-4"><input type="number" min={1} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="1" /></td>
                    <td className="py-3 pr-4 text-sm text-slate-600">RD$ 0.00</td>
                    <td className="py-3 pr-4 font-medium text-slate-900">RD$ 0.00</td>
                    <td className="py-3"><button type="button" className="rounded p-1 text-slate-400 hover:bg-red-50 hover:text-red-600" title="Quitar">×</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button type="button" className="mt-4 flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              Anadir linea
            </button>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <h2 className="font-display text-lg font-semibold text-slate-900">Comprobante</h2>
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500">Tipo NCF</label>
                <select className="mt-1 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20">
                  <option>01 - Factura de credito fiscal</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500">NCF (auto)</label>
                <input type="text" readOnly className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 font-mono text-sm text-slate-600" placeholder="E310000000001" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500">Fecha de emision</label>
                <input type="date" className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/80 p-6">
            <dl className="space-y-3">
              <div className="flex justify-between text-sm">
                <dt className="text-slate-600">Subtotal</dt>
                <dd className="font-medium text-slate-900">RD$ 0.00</dd>
              </div>
              <div className="flex justify-between text-sm">
                <dt className="text-slate-600">ITBIS (18%)</dt>
                <dd className="font-medium text-slate-900">RD$ 0.00</dd>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-base">
                <dt className="font-semibold text-slate-900">Total</dt>
                <dd className="font-display text-xl font-bold text-slate-900">RD$ 0.00</dd>
              </div>
            </dl>
            <button type="button" className="mt-6 w-full rounded-xl bg-primary-600 py-3 font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-700">
              Emitir factura
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
