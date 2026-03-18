import { 
  TMDB_IMAGE_BASE_URL, 
  TMDB_IMAGE_SIZE_POSTER, 
  TMDB_IMAGE_SIZE_BACKDROP,
  VIDSRC_BASE_URL,
  VIDLINK_BASE_URL
} from '@/constants';

export const construirUrlImagen = (ruta: string | null, tamaño: 'poster' | 'backdrop' = 'poster'): string => {
  if (!ruta) {
    return '/images/no-poster.jpg';
  }

  const tamañoImagen = tamaño === 'poster' ? TMDB_IMAGE_SIZE_POSTER : TMDB_IMAGE_SIZE_BACKDROP;
  return `${TMDB_IMAGE_BASE_URL}/${tamañoImagen}${ruta}`;
};

export const obtenerUrlReproductorVidSrc = (idSerie: number | string, temporada?: number, episodio?: number): string => {
  if (temporada && episodio) {
    return `${VIDSRC_BASE_URL}/tv/${idSerie}/${temporada}/${episodio}`;
  }
  return `${VIDSRC_BASE_URL}/tv/${idSerie}`;
};

export const obtenerUrlReproductorVidLink = (idSerie: number | string, temporada?: number, episodio?: number): string => {
  if (temporada && episodio) {
    return `${VIDLINK_BASE_URL}/tv/${idSerie}/${temporada}/${episodio}`;
  }
  return `${VIDLINK_BASE_URL}/tv/${idSerie}`;
};

export const construirUrlPoster = (ruta: string | null): string => {
  return construirUrlImagen(ruta, 'poster');
};

export const construirUrlFondo = (ruta: string | null): string => {
  return construirUrlImagen(ruta, 'backdrop');
};

export const formatearTemporadas = (numeroTemporadas?: number): string => {
  if (!numeroTemporadas) return 'N/A';
  return numeroTemporadas === 1 ? '1 temporada' : `${numeroTemporadas} temporadas`;
};

export const formatearEpisodios = (numeroEpisodios?: number): string => {
  if (!numeroEpisodios) return 'N/A';
  return numeroEpisodios === 1 ? '1 episodio' : `${numeroEpisodios} episodios`;
};

export const formatearDuracionEpisodio = (duracion?: number[]): string => {
  if (!duracion || duracion.length === 0) return 'N/A';
  
  const promedio = Math.round(duracion.reduce((a, b) => a + b, 0) / duracion.length);
  return `~${promedio}m por episodio`;
};

export const formatearCalificacion = (calificacion: number): string => {
  return calificacion.toFixed(1);
};

export const formatearFecha = (fecha: string): string => {
  if (!fecha) return 'N/A';
  
  const opciones: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(fecha).toLocaleDateString('es-ES', opciones);
};

export const formatearEstado = (estado?: string): string => {
  const estados: Record<string, string> = {
    'Returning Series': 'En emisión',
    'Ended': 'Finalizada',
    'Canceled': 'Cancelada',
    'In Production': 'En producción',
    'Planned': 'Planeada',
  };
  
  return estados[estado || ''] || estado || 'Desconocido';
};
