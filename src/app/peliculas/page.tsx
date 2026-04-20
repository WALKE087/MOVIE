'use client';

import React, { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
import { ListaPeliculas } from '@/components/features/ListaPeliculas';
import type { PeliculaTMDB } from '@/types';
import { servicioPeliculas } from '@/services/tmdb/servicioPeliculas';
import styles from './page.module.css';

export default function PaginaPeliculas() {
  const [peliculas, setPeliculas] = useState<PeliculaTMDB[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [categoriaActual, setCategoriaActual] = useState<'populares' | 'mejorValoradas' | 'enCartelera'>('populares');

  const cargarPeliculas = async () => {
    try {
      setEstaCargando(true);
      setError(null);

      let respuesta;
      if (categoriaActual === 'populares') {
        respuesta = await servicioPeliculas.obtenerPopulares(1);
      } else if (categoriaActual === 'mejorValoradas') {
        respuesta = await servicioPeliculas.obtenerMejorValoradas(1);
      } else {
        respuesta = await servicioPeliculas.obtenerEnCartelera(1);
      }

      setPeliculas(respuesta.results);
      setTotalPaginas(respuesta.total_pages);
      setPaginaActual(respuesta.page);
    } catch (err) {
      setError('Error al cargar las películas. Por favor, intenta de nuevo.');
      console.error('Error cargando películas:', err);
    } finally {
      setEstaCargando(false);
    }
  };

  useEffect(() => {
    cargarPeliculas();
  }, [categoriaActual]);

  const cargarMasPeliculas = async () => {
    if (paginaActual >= totalPaginas || estaCargando) return;

    try {
      setEstaCargando(true);

      let respuesta;
      const siguientePagina = paginaActual + 1;
      
      if (categoriaActual === 'populares') {
        respuesta = await servicioPeliculas.obtenerPopulares(siguientePagina);
      } else if (categoriaActual === 'mejorValoradas') {
        respuesta = await servicioPeliculas.obtenerMejorValoradas(siguientePagina);
      } else {
        respuesta = await servicioPeliculas.obtenerEnCartelera(siguientePagina);
      }

      setPeliculas(prev => [...prev, ...respuesta.results]);
      setPaginaActual(respuesta.page);
    } catch (err) {
      setError('Error al cargar más películas.');
      console.error('Error cargando más películas:', err);
    } finally {
      setEstaCargando(false);
    }
  };

  const cambiarCategoria = (nuevaCategoria: 'populares' | 'mejorValoradas' | 'enCartelera') => {
    setCategoriaActual(nuevaCategoria);
  };

  const obtenerTituloCategoria = () => {
    switch (categoriaActual) {
      case 'populares':
        return 'Películas Populares';
      case 'mejorValoradas':
        return 'Mejor Valoradas';
      case 'enCartelera':
        return 'En Cartelera';
      default:
        return 'Películas';
    }
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.encabezado}>
        <h1 className={styles.titulo}>Descubre Películas</h1>
        <p className={styles.subtitulo}>Explora miles de películas de todos los géneros</p>
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
          className={`${styles.botonCategoria} ${categoriaActual === 'enCartelera' ? styles.activo : ''}`}
          onClick={() => cambiarCategoria('enCartelera')}
        >
          <svg className={styles.icono} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
          </svg>
          En Cartelera
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={cargarPeliculas} className={styles.botonReintentar}>
            Reintentar
          </button>
        </div>
      )}

      <ListaPeliculas
        peliculas={peliculas}
        estaCargando={estaCargando}
        titulo={obtenerTituloCategoria()}
      />

      {!estaCargando && peliculas.length > 0 && paginaActual < totalPaginas && (
        <div className={styles.contenedorBotonCargar}>
          <button onClick={cargarMasPeliculas} className={styles.botonCargarMas}>
            Cargar más películas
            <svg className={styles.iconoFlecha} viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
