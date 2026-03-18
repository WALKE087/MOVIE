'use client';

import React, { useEffect, useState } from 'react';
import { ListaSeries } from '@/components/features/ListaSeries';
import type { SerieTMDB } from '@/types';
import { servicioSeries } from '@/services/tmdb/servicioSeries';
import styles from './page.module.css';

export default function PaginaSeries() {
  const [series, setSeries] = useState<SerieTMDB[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [categoriaActual, setCategoriaActual] = useState<'populares' | 'mejorValoradas' | 'alAire'>('populares');
  const [reintentar, setReintentar] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const cargarSeries = async () => {
      try {
        setEstaCargando(true);
        setError(null);

        let respuesta;
        if (categoriaActual === 'populares') {
          respuesta = await servicioSeries.obtenerPopulares(1);
        } else if (categoriaActual === 'mejorValoradas') {
          respuesta = await servicioSeries.obtenerMejorValoradas(1);
        } else {
          respuesta = await servicioSeries.obtenerAlAire(1);
        }

        if (isMounted) {
          setSeries(respuesta.results);
          setTotalPaginas(respuesta.total_pages);
          setPaginaActual(respuesta.page);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar las series. Por favor, intenta de nuevo.');
          console.error('Error cargando series:', err);
        }
      } finally {
        if (isMounted) {
          setEstaCargando(false);
        }
      }
    };

    cargarSeries();

    return () => {
      isMounted = false;
    };
  }, [categoriaActual, reintentar]);

  const cargarMasSeries = async () => {
    if (paginaActual >= totalPaginas || estaCargando) return;

    try {
      setEstaCargando(true);

      let respuesta;
      const siguientePagina = paginaActual + 1;
      
      if (categoriaActual === 'populares') {
        respuesta = await servicioSeries.obtenerPopulares(siguientePagina);
      } else if (categoriaActual === 'mejorValoradas') {
        respuesta = await servicioSeries.obtenerMejorValoradas(siguientePagina);
      } else {
        respuesta = await servicioSeries.obtenerAlAire(siguientePagina);
      }

      setSeries(prev => [...prev, ...respuesta.results]);
      setPaginaActual(respuesta.page);
    } catch (err) {
      setError('Error al cargar más series.');
      console.error('Error cargando más series:', err);
    } finally {
      setEstaCargando(false);
    }
  };

  const cambiarCategoria = (nuevaCategoria: 'populares' | 'mejorValoradas' | 'alAire') => {
    setCategoriaActual(nuevaCategoria);
  };

  const obtenerTituloCategoria = () => {
    switch (categoriaActual) {
      case 'populares':
        return 'Series Populares';
      case 'mejorValoradas':
        return 'Mejor Valoradas';
      case 'alAire':
        return 'Al Aire';
      default:
        return 'Series';
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.encabezado}>
        <h1 className={styles.titulo}>Descubre Series</h1>
        <p className={styles.subtitulo}>Explora miles de series de todos los géneros</p>
      </div>

      <div className={styles.categorias}>
        <button
          className={`${styles.botonCategoria} ${categoriaActual === 'populares' ? styles.activo : ''}`}
          onClick={() => cambiarCategoria('populares')}
        >
          <svg className={styles.icono} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Populares
        </button>
        
        <button
          className={`${styles.botonCategoria} ${categoriaActual === 'mejorValoradas' ? styles.activo : ''}`}
          onClick={() => cambiarCategoria('mejorValoradas')}
        >
          <svg className={styles.icono} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          Mejor Valoradas
        </button>
        
        <button
          className={`${styles.botonCategoria} ${categoriaActual === 'alAire' ? styles.activo : ''}`}
          onClick={() => cambiarCategoria('alAire')}
        >
          <svg className={styles.icono} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Al Aire
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => setReintentar(prev => prev + 1)} className={styles.botonRecargar}>
            Reintentar
          </button>
        </div>
      )}

      <ListaSeries 
        series={series} 
        estaCargando={estaCargando}
        titulo={obtenerTituloCategoria()}
      />

      {!estaCargando && series.length > 0 && paginaActual < totalPaginas && (
        <div className={styles.contenedorBoton}>
          <button 
            onClick={cargarMasSeries}
            className={styles.botonCargarMas}
          >
            Cargar más series
          </button>
        </div>
      )}
    </div>
  );
}
