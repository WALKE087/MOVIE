'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { SerieTMDB } from '@/types';
import { servicioSeries } from '@/services/tmdb/servicioSeries';
import { formatearFecha } from '@/utils/series';
import { ReproductorSerie } from '@/components/features/ReproductorSerie';
import styles from './page.module.css';

interface DetallesSerieTMDB extends SerieTMDB {
  created_by?: Array<{ name: string }>;
  networks?: Array<{ name: string; logo_path: string }>;
}

export default function PaginaDetalleSerie() {
  const params = useParams();
  const id = params?.id as string;
  const [serie, setSerie] = useState<DetallesSerieTMDB | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const cargarSerie = async () => {
      if (!id) return;

      try {
        setCargando(true);
        setError(null);
        const datos = await servicioSeries.obtenerDetalle(Number(id));
        
        if (isMounted) {
          setSerie(datos);
        }
      } catch (err) {
        if (isMounted) {
          setError('Error al cargar los detalles de la serie');
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setCargando(false);
        }
      }
    };

    cargarSerie();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (cargando) {
    return (
      <div className={styles.contenedor}>
        <div className={styles.cargando}>Cargando...</div>
      </div>
    );
  }

  if (error || !serie) {
    return (
      <div className={styles.contenedor}>
        <div className={styles.error}>{error || 'Serie no encontrada'}</div>
      </div>
    );
  }

  const imagenFondo = serie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${serie.backdrop_path}`
    : '';

  const imagenPoster = serie.poster_path
    ? `https://image.tmdb.org/t/p/w500${serie.poster_path}`
    : '';

  return (
    <div className={styles.contenedor}>
      {imagenFondo && (
        <div 
          className={styles.fondoPortada}
          style={{ backgroundImage: `url(${imagenFondo})` }}
        >
          <div className={styles.gradiente}></div>
        </div>
      )}

      <div className={styles.contenido}>
        <div className={styles.cabeceraDetalle}>
          {imagenPoster && (
            <div className={styles.contenedorPoster}>
              <img
                src={imagenPoster}
                alt={serie.name}
                className={styles.imagenPoster}
              />
            </div>
          )}

          <div className={styles.informacion}>
            <h1 className={styles.titulo}>{serie.name}</h1>
            
            {serie.original_name !== serie.name && (
              <p className={styles.tituloOriginal}>
                {serie.original_name}
              </p>
            )}

            <div className={styles.metadata}>
              {serie.first_air_date && (
                <span className={styles.dato}>
                  {formatearFecha(serie.first_air_date)}
                </span>
              )}
              {serie.vote_average && (
                <span className={styles.calificacion}>
                  ⭐ {serie.vote_average.toFixed(1)}
                </span>
              )}
              {serie.number_of_seasons && (
                <span className={styles.dato}>
                  {serie.number_of_seasons} {serie.number_of_seasons === 1 ? 'Temporada' : 'Temporadas'}
                </span>
              )}
              {serie.number_of_episodes && (
                <span className={styles.dato}>
                  {serie.number_of_episodes} Episodios
                </span>
              )}
            </div>

            {serie.genres && serie.genres.length > 0 && (
              <div className={styles.generos}>
                {serie.genres.map((genero) => (
                  <span key={genero.id} className={styles.genero}>
                    {genero.name}
                  </span>
                ))}
              </div>
            )}

            {serie.overview && (
              <div className={styles.sinopsis}>
                <h2>Sinopsis</h2>
                <p>{serie.overview}</p>
              </div>
            )}

            {serie.created_by && serie.created_by.length > 0 && (
              <div className={styles.creadores}>
                <h3>Creado por:</h3>
                <p>{serie.created_by.map(c => c.name).join(', ')}</p>
              </div>
            )}

            {serie.networks && serie.networks.length > 0 && (
              <div className={styles.redes}>
                <h3>Cadenas:</h3>
                <div className={styles.logosRedes}>
                  {serie.networks.map((network, index) => (
                    <span key={index} className={styles.nombreRed}>
                      {network.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {serie.status && (
              <div className={styles.estado}>
                <strong>Estado:</strong> {serie.status}
              </div>
            )}
          </div>
        </div>

        {/* Reproductor de Serie */}
        <div className={styles.seccionReproductor}>
          <ReproductorSerie
            idSerie={serie.id}
            tituloSerie={serie.name}
          />
        </div>
      </div>
    </div>
  );
}
