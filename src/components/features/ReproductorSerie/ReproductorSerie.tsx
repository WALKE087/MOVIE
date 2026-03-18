'use client';

import React, { useState } from 'react';
import type { OpcionReproductor } from '@/types';
import { obtenerUrlReproductorVidSrc, obtenerUrlReproductorVidLink } from '@/utils/series';
import styles from './ReproductorSerie.module.css';

interface PropsReproductorSerie {
  idSerie: number;
  tituloSerie: string;
  temporada?: number;
  episodio?: number;
}

export const ReproductorSerie: React.FC<PropsReproductorSerie> = ({
  idSerie,
  tituloSerie,
  temporada,
  episodio,
}) => {
  const opcionesReproductor: OpcionReproductor[] = [
    {
      nombre: 'VidSrc',
      url: obtenerUrlReproductorVidSrc(idSerie, temporada, episodio),
      activo: true,
    },
    {
      nombre: 'VidLink',
      url: obtenerUrlReproductorVidLink(idSerie, temporada, episodio),
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

  const tituloCompleto = temporada && episodio 
    ? `${tituloSerie} - T${temporada}:E${episodio}`
    : tituloSerie;

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
            title={`Reproducir ${tituloCompleto} - ${reproductorActual.nombre}`}
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
