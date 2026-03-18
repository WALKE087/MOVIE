'use client';

import React from 'react';
import type { PeliculaTMDB } from '@/types';
import { TarjetaPelicula } from '../TarjetaPelicula';
import styles from './ListaPeliculas.module.css';

interface PropsListaPeliculas {
  peliculas: PeliculaTMDB[];
  estaCargando?: boolean;
  titulo?: string;
}

export const ListaPeliculas: React.FC<PropsListaPeliculas> = ({
  peliculas,
  estaCargando = false,
  titulo,
}) => {
  if (estaCargando) {
    return (
      <div className={styles.contenedor}>
        {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
        <div className={styles.cuadricula}>
          {Array.from({ length: 12 }).map((_, indice) => (
            <div key={indice} className={styles.esqueleto}>
              <div className={styles.esqueletoImagen} />
              <div className={styles.esqueletoContenido}>
                <div className={styles.esqueletoLinea} />
                <div className={styles.esqueletoLineaCorta} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (peliculas.length === 0) {
    return (
      <div className={styles.vacio}>
        <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
          <polyline points="17 2 12 7 7 2"/>
        </svg>
        <p>No se encontraron películas</p>
      </div>
    );
  }

  return (
    <div className={styles.contenedor}>
      {titulo && <h2 className={styles.titulo}>{titulo}</h2>}
      <div className={styles.cuadricula}>
        {peliculas.map((pelicula) => (
          <TarjetaPelicula key={pelicula.id} pelicula={pelicula} />
        ))}
      </div>
    </div>
  );
};
