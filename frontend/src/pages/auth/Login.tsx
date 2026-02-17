import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, type User } from '../../store/authStore';
import api from '../../services/api';

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);
  
  const [formData, setFormData] = useState({
    nombreUsuario: '',
    password: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post<{
        success: boolean;
        data: { accessToken: string; refreshToken: string; usuario: unknown };
      }>('/auth/login', formData);

      const data = response.data?.data;
      if (!data?.accessToken || !data?.usuario) {
        setError('Respuesta inválida del servidor. Reintenta.');
        return;
      }

      login(data.usuario as User, data.accessToken, data.refreshToken);
      navigate('/', { replace: true });
    } catch (err: unknown) {
      console.error('Error en login:', err);
      let message = 'Error al iniciar sesión. Verifica tus credenciales.';
      if (err && typeof err === 'object' && 'response' in err) {
        const res = (err as { response?: { data?: { message?: string }; status?: number } }).response;
        if (res?.data?.message) message = res.data.message;
        else if (res?.status === 404 || (res?.status && res.status >= 500))
          message = 'Servidor no disponible. ¿Está el backend en marcha?';
        else if (res?.status === 0 || (err as { code?: string }).code === 'ERR_NETWORK')
          message = 'No se pudo conectar. Revisa que el backend esté en http://localhost:3000';
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-primary-900 to-slate-900 px-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-700/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-2xl shadow-primary-900/30 mb-5 ring-4 ring-white/10">
            <svg className="w-11 h-11 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-white mb-2">Sistema Contable</h1>
          <p className="text-slate-400 text-sm">Republica Dominicana · Cumplimiento DGII</p>
        </div>

        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl border border-slate-200/50 p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 mb-6">Iniciar sesion</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nombreUsuario" className="block text-sm font-medium text-slate-700 mb-2">Usuario</label>
              <input
                id="nombreUsuario"
                name="nombreUsuario"
                type="text"
                required
                value={formData.nombreUsuario}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition outline-none bg-slate-50/50"
                placeholder="admin"
                disabled={loading}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Contrasena</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition outline-none bg-slate-50/50"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary-600 text-white py-3.5 rounded-xl hover:bg-primary-700 transition font-semibold shadow-lg shadow-primary-600/25 hover:shadow-primary-600/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Iniciando sesion...
                </>
              ) : (
                'Iniciar sesion'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-700 mb-3">Usuarios de prueba</p>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600">Admin</span>
                <code className="text-primary-600 font-mono">admin / admin123</code>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600">Contador</span>
                <code className="text-primary-600 font-mono">contador / contador123</code>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-600">Vendedor</span>
                <code className="text-primary-600 font-mono">vendedor / vendedor123</code>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          <p>Sistema Contable para Republica Dominicana</p>
          <p className="mt-1">NCF · ITBIS · Normativa DGII</p>
        </div>
      </div>
    </div>
  );
}
