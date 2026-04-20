'use client';

import React, { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
import { ListaPeliculas } from '@/components/features/ListaPeliculas';
import type { PeliculaTMDB } from '@/types';
import { servicioPeliculas } from '@/services/tmdb/servicioPeliculas';
import styles from './page.module.css';

export default function PaginaMejoresPeliculas() {
  const [peliculas, setPeliculas] = useState<PeliculaTMDB[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [reintentar, setReintentar] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const cargarPeliculas = async () => {
      try {
        setEstaCargando(true);
        setError(null);

        const respuesta = await servicioPeliculas.obtenerMejorValoradas(1);

        if (isMounted) {
          setPeliculas(respuesta.results);
          setTotalPaginas(respuesta.total_pages);
          setPaginaActual(respuesta.page);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar las películas. Por favor, intenta de nuevo.');
          console.error('Error cargando películas:', err);
        }
      } finally {
        if (isMounted) {
          setEstaCargando(false);
        }
      }
    };

    cargarPeliculas();

    return () => {
      isMounted = false;
    };
  }, [reintentar]);

  const cargarMasPeliculas = async () => {
    if (paginaActual >= totalPaginas || estaCargando) return;

    try {
      setEstaCargando(true);
      const siguientePagina = paginaActual + 1;
      const respuesta = await servicioPeliculas.obtenerMejorValoradas(siguientePagina);

      setPeliculas(prev => [...prev, ...respuesta.results]);
      setPaginaActual(respuesta.page);
    } catch (err) {
      setError('Error al cargar más películas.');
      console.error('Error cargando más películas:', err);
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.encabezado}>
        <div className={styles.iconoTrofeo}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" />
          </svg>
        </div>
        <h1 className={styles.titulo}>Mejores Películas</h1>
        <p className={styles.subtitulo}>Las películas mejor valoradas por los usuarios de todo el mundo</p>
        <div className={styles.estadisticas}>
          <div className={styles.estadistica}>
            <span className={styles.numeroEstadistica}>{peliculas.length}</span>
            <span className={styles.labelEstadistica}>Películas</span>
          </div>
          <div className={styles.separador}></div>
          <div className={styles.estadistica}>
            <span className={styles.numeroEstadistica}>⭐ 7.0+</span>
            <span className={styles.labelEstadistica}>Calificación mínima</span>
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.error}>
          <svg className={styles.iconoError} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p>{error}</p>
          <button onClick={() => setReintentar(prev => prev + 1)} className={styles.botonReintentar}>
            Reintentar
          </button>
        </div>
      )}

      <ListaPeliculas 
        peliculas={peliculas} 
        estaCargando={estaCargando && paginaActual === 0}
      />

      {!estaCargando && peliculas.length > 0 && paginaActual < totalPaginas && (
        <div className={styles.contenedorBoton}>
          <button 
            onClick={cargarMasPeliculas}
            className={styles.botonCargarMas}
            disabled={estaCargando}
          >
            {estaCargando ? (
              <>
                <svg className={styles.iconoCargando} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Cargando...
              </>
            ) : (
              <>
                Cargar más películas
                <svg className={styles.iconoFlecha} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
