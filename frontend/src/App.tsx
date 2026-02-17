import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthStore } from './store/authStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';

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

const AuthLayout = () => (
  <div className="min-h-screen bg-slate-50">
    <Outlet />
  </div>
);

const MainLayout = () => (
  <div className="min-h-screen bg-slate-50/80">
    <Sidebar />
    <div className="pl-64">
      <Header />
      <main className="min-h-[calc(100vh-4rem)] p-8">
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
