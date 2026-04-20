'use client';

import React, { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ReproductorPelicula } from '@/components/features/ReproductorPelicula';
import { ListaPeliculas } from '@/components/features/ListaPeliculas';
import { BotonFavorito } from '@/components/features/BotonFavorito';
import type { PeliculaTMDB } from '@/types';
import { servicioPeliculas } from '@/services/tmdb/servicioPeliculas';
import {
  construirUrlFondo,
  construirUrlPoster,
  formatearDuracion,
  formatearCalificacion,
  formatearFecha,
} from '@/utils/peliculas';
import styles from './page.module.css';

export default function PaginaDetallePelicula() {
  const params = useParams();
  const router = useRouter();
  const idPelicula = Number(params.id);

  const [pelicula, setPelicula] = useState<PeliculaTMDB | null>(null);
  const [peliculasSimilares, setPeliculasSimilares] = useState<PeliculaTMDB[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const cargarDatos = async () => {
      if (!idPelicula) return;

      try {
        setEstaCargando(true);
        setError(null);

        const [detallePelicula, similares] = await Promise.all([
          servicioPeliculas.obtenerDetalle(idPelicula),
          servicioPeliculas.obtenerSimilares(idPelicula),
        ]);

        if (isMounted) {
          setPelicula(detallePelicula);
          setPeliculasSimilares(similares.results.slice(0, 6));
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar los detalles de la película');
          console.error('Error cargando detalles:', err);
        }
      } finally {
        if (isMounted) {
          setEstaCargando(false);
        }
      }
    };

    cargarDatos();

    return () => {
      isMounted = false;
    };
  }, [idPelicula]);

  const manejarRetroceso = () => {
    router.back();
  };

  if (estaCargando) {
    return (
      <div className={styles.contenedorCargando}>
        <div className={styles.spinner} />
        <p>Cargando película...</p>
      </div>
    );
  }

  if (error || !pelicula) {
    return (
      <div className={styles.contenedorError}>
        <div className={styles.error}>
          <svg className={styles.iconoError} viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2>Error al cargar la película</h2>
          <p>{error || 'No se pudo obtener la información de la película'}</p>
          <button onClick={manejarRetroceso} className={styles.botonVolver}>
            Volver atrás
          </button>
        </div>
      </div>
    );
  }

  const urlFondo = construirUrlFondo(pelicula.backdrop_path);
  const urlPoster = construirUrlPoster(pelicula.poster_path);

  return (
    <div className={styles.contenedor}>
      <div className={styles.fondo} style={{ backgroundImage: `url(${urlFondo})` }}>
        <div className={styles.superposicionFondo} />
      </div>

      <div className={styles.contenido}>
        <button onClick={manejarRetroceso} className={styles.botonRetroceso}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver
        </button>

        <div className={styles.informacion}>
          <div className={styles.poster}>
            <Image
              src={urlPoster}
              alt={pelicula.title}
              width={300}
              height={450}
              className={styles.imagenPoster}
              priority
            />
          </div>

          <div className={styles.detalles}>
            <div className={styles.encabezadoTitulo}>
              <h1 className={styles.titulo}>{pelicula.title}</h1>
              <BotonFavorito tmdbId={pelicula.id} tipo="movie" className={styles.botonFavorito} />
            </div>
            
            {pelicula.original_title !== pelicula.title && (
              <p className={styles.tituloOriginal}>{pelicula.original_title}</p>
            )}

            <div className={styles.metadatos}>
              <div className={styles.calificacion}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                <span>{formatearCalificacion(pelicula.vote_average)}</span>
              </div>
              
              {pelicula.release_date && (
                <span className={styles.fecha}>{formatearFecha(pelicula.release_date)}</span>
              )}
              
              {pelicula.runtime && (
                <span className={styles.duracion}>{formatearDuracion(pelicula.runtime)}</span>
              )}
            </div>

            {pelicula.genres && pelicula.genres.length > 0 && (
              <div className={styles.generos}>
                {pelicula.genres.map((genero) => (
                  <span key={genero.id} className={styles.genero}>
                    {genero.name}
                  </span>
                ))}
              </div>
            )}

            {pelicula.overview && (
              <div className={styles.sinopsis}>
                <h3>Sinopsis</h3>
                <p>{pelicula.overview}</p>
              </div>
            )}
          </div>
        </div>

        <div className={styles.seccionReproductor}>
          <h2 className={styles.subtituloSeccion}>Ver Película</h2>
          <ReproductorPelicula idPelicula={pelicula.id} tituloPelicula={pelicula.title} />
        </div>

        {peliculasSimilares.length > 0 && (
          <div className={styles.seccionSimilares}>
            <ListaPeliculas
              peliculas={peliculasSimilares}
              estaCargando={false}
              titulo="Películas Similares"
            />
          </div>
        )}
      </div>
    </div>
  );
}
