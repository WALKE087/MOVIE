'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import styles from './Sidebar.module.css';

interface OpcionMenu {
  id: string;
  titulo: string;
  ruta: string;
  icono: React.ReactNode;
  habilitado: boolean;
  requiereAuth?: boolean;
}

export const Sidebar: React.FC = () => {
  const [colapsado, setColapsado] = useState(false);
  const rutaActual = usePathname();
  const router = useRouter();
  const { estaAutenticado, usuario, logout } = useAuth();

  const opcionesMenu: OpcionMenu[] = [
    {
      id: 'peliculas',
      titulo: 'Películas',
      ruta: '/peliculas',
      habilitado: true,
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
          <polyline points="17 2 12 7 7 2"/>
        </svg>
      ),
    },
    {
      id: 'favoritos',
      titulo: 'Favoritos',
      ruta: '/favoritos',
      habilitado: true,
      requiereAuth: true,
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
    },
    {
      id: 'series',
      titulo: 'Series',
      ruta: '/series',
      habilitado: true,
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
          <polyline points="17 2 12 7 7 2"/>
          <line x1="12" y1="12" x2="12" y2="12"/>
        </svg>
      ),
    },
    {
      id: 'mejores',
      titulo: 'Mejores Películas',
      ruta: '/mejores',
      habilitado: true,
      icono: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      ),
    },
  ];

  const alternarColapso = () => {
    setColapsado(!colapsado);
  };

  const estaActivo = (ruta: string): boolean => {
    return rutaActual === ruta || rutaActual.startsWith(`${ruta}/`);
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside className={`${styles.sidebar} ${colapsado ? styles.colapsado : ''}`}>
      <div className={styles.encabezado}>
        <div className={styles.logo}>
          {!colapsado && (
            <span className={styles.logoTexto}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7v10"/>
                <path d="M12 7v10"/>
                <path d="M17 7v10"/>
                <path d="M3 3h18v18H3z"/>
              </svg>
              <span>MOVIE</span>
            </span>
          )}
        </div>
        <button 
          className={styles.botonColapsar} 
          onClick={alternarColapso}
          aria-label={colapsado ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {colapsado ? (
              <polyline points="9 18 15 12 9 6"/>
            ) : (
              <polyline points="15 18 9 12 15 6"/>
            )}
          </svg>
        </button>
      </div>

      <nav className={styles.navegacion}>
        {opcionesMenu.map((opcion) => {
          const estaDisponible = opcion.habilitado && (!opcion.requiereAuth || estaAutenticado);
          
          return (
            <Link
              key={opcion.id}
              href={estaDisponible ? opcion.ruta : '#'}
              className={`${styles.enlace} ${
                estaActivo(opcion.ruta) ? styles.activo : ''
              } ${!estaDisponible ? styles.deshabilitado : ''}`}
              onClick={(e) => !estaDisponible && e.preventDefault()}
              title={opcion.titulo}
            >
              <span className={styles.icono}>{opcion.icono}</span>
              {!colapsado && (
                <span className={styles.texto}>
                  {opcion.titulo}
                  {!opcion.habilitado && (
                    <span className={styles.etiquetaProximamente}>Próximamente</span>
                  )}
                  {opcion.requiereAuth && !estaAutenticado && (
                    <span className={styles.etiquetaProximamente}>Login</span>
                  )}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className={styles.pie}>
        {!colapsado && (
          <>
            {estaAutenticado ? (
              <div className={styles.usuario}>
                <div className={styles.infoUsuario}>
                  <div className={styles.avatarUsuario}>
                    {usuario?.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className={styles.datosUsuario}>
                    <p className={styles.nombreUsuario}>{usuario?.username || 'Usuario'}</p>
                    <p className={styles.emailUsuario}>{usuario?.email || ''}</p>
                  </div>
                </div>
                <button onClick={handleLogout} className={styles.botonLogout} title="Cerrar sesión">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </div>
            ) : (
              <div className={styles.auth}>
                <Link href="/login" className={styles.botonAuth}>
                  Iniciar Sesión
                </Link>
                <Link href="/registro" className={styles.botonAuthSecundario}>
                  Registrarse
                </Link>
              </div>
            )}
            <div className={styles.info}>
              <p className={styles.version}>v1.0.0</p>
              <p className={styles.copyright}>© 2026 MOVIE</p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
