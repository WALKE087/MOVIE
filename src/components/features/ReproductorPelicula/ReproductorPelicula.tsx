'use client';

import React, { useState } from 'react';
import type { OpcionReproductor } from '@/types';
import { obtenerUrlReproductorVidSrc, obtenerUrlReproductorVidLink } from '@/utils/peliculas';
import styles from './ReproductorPelicula.module.css';

interface PropsReproductorPelicula {
  idPelicula: number;
  tituloPelicula: string;
}

export const ReproductorPelicula: React.FC<PropsReproductorPelicula> = ({
  idPelicula,
  tituloPelicula,
}) => {
  const opcionesReproductor: OpcionReproductor[] = [
    {
      nombre: 'VidSrc',
      url: obtenerUrlReproductorVidSrc(idPelicula),
      activo: true,
    },
    {
      nombre: 'VidLink',
      url: obtenerUrlReproductorVidLink(idPelicula),
      activo: false,
    },
  ];

  const [reproductorActual, setReproductorActual] = useState<OpcionReproductor>(
    opcionesReproductor[0]!
  );
  const [estaCargando, setEstaCargando] = useState(true);

  const cambiarReproductor = (opcion: OpcionReproductor) => {
    setEstaCargando(true);
    setReproductorActual(opcion);
  };

  const manejarCarga = () => {
    setEstaCargando(false);
  };

  return (
    <div className={styles.contenedor}>
      <div className={styles.controles}>
        {opcionesReproductor.map((opcion) => (
          <button
            key={opcion.nombre}
            className={`${styles.botonReproductor} ${
              reproductorActual?.nombre === opcion.nombre ? styles.activo : ''
            }`}
            onClick={() => cambiarReproductor(opcion)}
          >
            {opcion.nombre}
          </button>
        ))}
      </div>

      <div className={styles.contenedorReproductor}>
        {estaCargando && (
          <div className={styles.cargando}>
            <div className={styles.spinner} />
            <p>Cargando reproductor...</p>
          </div>
        )}
        {reproductorActual && (
          <iframe
            src={reproductorActual.url}
            title={`Reproducir ${tituloPelicula} - ${reproductorActual.nombre}`}
            className={styles.iframe}
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            onLoad={manejarCarga}
          />
        )}
      </div>
    </div>
  );
};
