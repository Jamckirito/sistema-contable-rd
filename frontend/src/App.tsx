import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';

// Import pages
import { Login, Dashboard, Facturas, NuevaFactura, Clientes, Inventario, Contabilidad, Reportes } from './pages/index';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Simple layouts
const AuthLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <Outlet />
  </div>
);

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
        <div className="text-xl font-bold text-primary-600 mb-8">Sistema Contable RD</div>
        <nav className="space-y-2">
          <a href="/" className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-gray-700">Dashboard</a>
          <a href="/facturas" className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-gray-700">Facturas</a>
          <a href="/clientes" className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-gray-700">Clientes</a>
          <a href="/inventario" className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-gray-700">Inventario</a>
          <a href="/contabilidad" className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-gray-700">Contabilidad</a>
          <a href="/reportes" className="block px-4 py-2 rounded-lg hover:bg-primary-50 text-gray-700">Reportes</a>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
);

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected routes */}
          <Route element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route path="/" element={<Dashboard />} />
            <Route path="/facturas" element={<Facturas />} />
            <Route path="/facturas/nueva" element={<NuevaFactura />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/inventario" element={<Inventario />} />
            <Route path="/contabilidad" element={<Contabilidad />} />
            <Route path="/reportes/*" element={<Reportes />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
