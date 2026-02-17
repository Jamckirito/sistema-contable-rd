import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-8 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <h1 className="font-display text-sm font-semibold uppercase tracking-wider text-slate-500">
          Panel de control
        </h1>
      </div>

      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 shadow-sm transition hover:border-slate-300 hover:shadow"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
            <span className="text-sm font-bold">
              {user?.nombreCompleto?.charAt(0) || user?.nombreUsuario?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-800">{user?.nombreCompleto || user?.nombreUsuario}</p>
            <p className="text-xs text-slate-500">{user?.rol}</p>
          </div>
          <svg className={`h-4 w-4 text-slate-400 transition ${open ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
            <div className="absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-slate-200 bg-white py-2 shadow-xl">
              <div className="border-b border-slate-100 px-4 py-3">
                <p className="text-sm font-medium text-slate-800">{user?.email}</p>
                <p className="text-xs text-slate-500">@{user?.nombreUsuario}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
