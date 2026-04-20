'use client';

import React, { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';
import Link from 'next/link';
import { ListaPeliculas } from '@/components/features/ListaPeliculas';
import type { PeliculaTMDB } from '@/types';
import { servicioPeliculas } from '@/services/tmdb/servicioPeliculas';
import styles from './page.module.css';

export default function PaginaInicio() {
  const [peliculasPopulares, setPeliculasPopulares] = useState<PeliculaTMDB[]>([]);
  const [peliculasEnCartelera, setPeliculasEnCartelera] = useState<PeliculaTMDB[]>([]);
  const [estaCargandoPopulares, setEstaCargandoPopulares] = useState(true);
  const [estaCargandoCartelera, setEstaCargandoCartelera] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const cargarPeliculasPopulares = async () => {
      try {
        const respuesta = await servicioPeliculas.obtenerPopulares(1);
        if (isMounted) {
          setPeliculasPopulares(respuesta.results.slice(0, 6));
        }
      } catch (error) {
        console.error('Error cargando películas populares:', error);
      } finally {
        if (isMounted) {
          setEstaCargandoPopulares(false);
        }
      }
    };

    const cargarPeliculasCartelera = async () => {
      try {
        const respuesta = await servicioPeliculas.obtenerEnCartelera(1);
        if (isMounted) {
          setPeliculasEnCartelera(respuesta.results.slice(0, 6));
        }
      } catch (error) {
        console.error('Error cargando películas en cartelera:', error);
      } finally {
        if (isMounted) {
          setEstaCargandoCartelera(false);
        }
      }
    };

    cargarPeliculasPopulares();
    cargarPeliculasCartelera();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.contenedor}>
      <section className={styles.hero}>
        <div className={styles.heroContenido}>
          <h1 className={styles.heroTitulo}>Bienvenido a Movie App</h1>
          <p className={styles.heroSubtitulo}>
            Descubre miles de películas y series. Mira tus favoritos en línea.
          </p>
          <Link href="/peliculas" className={styles.heroBoton}>
            Explorar Películas
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>

      <section className={styles.seccion}>
        <div className={styles.encabezadoSeccion}>
          <h2 className={styles.tituloSeccion}>Películas Populares</h2>
          <Link href="/peliculas" className={styles.enlaceVerTodas}>
            Ver todas
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <ListaPeliculas
          peliculas={peliculasPopulares}
          estaCargando={estaCargandoPopulares}
        />
      </section>

      <section className={styles.seccion}>
        <div className={styles.encabezadoSeccion}>
          <h2 className={styles.tituloSeccion}>En Cartelera</h2>
          <Link href="/peliculas" className={styles.enlaceVerTodas}>
            Ver todas
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <ListaPeliculas
          peliculas={peliculasEnCartelera}
          estaCargando={estaCargandoCartelera}
        />
      </section>
    </div>
  );
}
