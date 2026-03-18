'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { servicioFavoritos } from '@/services/api/servicioFavoritos';
import { servicioPeliculas } from '@/services/tmdb/servicioPeliculas';
import { TarjetaPelicula } from '@/components/features/TarjetaPelicula';
import type { Favorito, PeliculaTMDB } from '@/types';
import styles from './ListaFavoritos.module.css';

export function ListaFavoritos() {
  const router = useRouter();
  const { estaAutenticado, estaCargando: authCargando } = useAuth();
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [peliculas, setPeliculas] = useState<PeliculaTMDB[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authCargando && !estaAutenticado) {
      router.push('/login');
      return;
    }

    if (estaAutenticado) {
      cargarFavoritos();
    }
  }, [estaAutenticado, authCargando, router]);

  const cargarFavoritos = async () => {
    try {
      setEstaCargando(true);
      setError('');
      
      const favoritosData = await servicioFavoritos.listarFavoritos();
      setFavoritos(favoritosData);

      // Cargar detalles de las películas
      const peliculasPromises = favoritosData
        .filter(fav => fav.tipo === 'movie')
        .map(fav => servicioPeliculas.obtenerDetalle(fav.tmdb_id.toString()));
      
      const peliculasData = await Promise.all(peliculasPromises);
      setPeliculas(peliculasData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar favoritos');
    } finally {
      setEstaCargando(false);
    }
  };

  if (authCargando || estaCargando) {
    return (
      <div className={styles.container}>
        <div className={styles.cargando}>
          <div className={styles.spinner}></div>
          <p>Cargando favoritos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error</h2>
          <p>{error}</p>
          <button onClick={cargarFavoritos} className={styles.botonReintentar}>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (favoritos.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.vacio}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className={styles.iconoVacio}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <h2>No tienes favoritos aún</h2>
          <p>Empieza a agregar películas a tus favoritos para verlas aquí</p>
          <button onClick={() => router.push('/peliculas')} className={styles.botonExplorar}>
            Explorar Películas
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titulo}>Mis Favoritos</h1>
        <p className={styles.subtitulo}>
          {favoritos.length} {favoritos.length === 1 ? 'película' : 'películas'}
        </p>
      </div>

      <div className={styles.grid}>
        {peliculas.map((pelicula) => (
          <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </div>
  );
}
