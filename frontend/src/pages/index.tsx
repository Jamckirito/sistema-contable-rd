// Export login from separate file
export { default as Login } from './auth/Login';

export const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="text-sm text-gray-600 mb-1">Facturas del Mes</div>
        <div className="text-3xl font-bold text-gray-900">RD$ 250,000</div>
        <div className="text-sm text-green-600 mt-2">+12% vs mes anterior</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="text-sm text-gray-600 mb-1">Cuentas por Cobrar</div>
        <div className="text-3xl font-bold text-gray-900">RD$ 80,500</div>
        <div className="text-sm text-yellow-600 mt-2">15 facturas pendientes</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="text-sm text-gray-600 mb-1">ITBIS a Pagar</div>
        <div className="text-3xl font-bold text-gray-900">RD$ 12,340</div>
        <div className="text-sm text-gray-600 mt-2">Vence en 5 días</div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="text-sm text-gray-600 mb-1">Productos en Stock</div>
        <div className="text-3xl font-bold text-gray-900">342</div>
        <div className="text-sm text-red-600 mt-2">8 productos bajo mínimo</div>
      </div>
    </div>
  </div>
);

export const Facturas = () => (
  <div className="p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">Facturas</h1>
      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700">
        Nueva Factura
      </button>
    </div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <p className="text-gray-600">Lista de facturas aparecerá aquí...</p>
    </div>
  </div>
);

export const NuevaFactura = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Nueva Factura</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <p className="text-gray-600">Formulario de facturación aparecerá aquí...</p>
    </div>
  </div>
);

export const Clientes = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Clientes</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <p className="text-gray-600">Gestión de clientes aparecerá aquí...</p>
    </div>
  </div>
);

export const Inventario = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Inventario</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <p className="text-gray-600">Gestión de inventario aparecerá aquí...</p>
    </div>
  </div>
);

export const Contabilidad = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Contabilidad</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <p className="text-gray-600">Módulo de contabilidad aparecerá aquí...</p>
    </div>
  </div>
);

export const Reportes = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-6">Reportes</h1>
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <p className="text-gray-600">Reportes fiscales y financieros aparecerán aquí...</p>
    </div>
  </div>
);
