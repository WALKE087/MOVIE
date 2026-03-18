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

export const construirUrlPoster = (ruta: string | null): string => {
  return construirUrlImagen(ruta, 'poster');
};

export const construirUrlFondo = (ruta: string | null): string => {
  return construirUrlImagen(ruta, 'backdrop');
};

export const obtenerUrlReproductorVidSrc = (idPelicula: number | string): string => {
  return `${VIDSRC_BASE_URL}/${idPelicula}`;
};

export const obtenerUrlReproductorVidLink = (idPelicula: number | string): string => {
  return `${VIDLINK_BASE_URL}/${idPelicula}`;
};

export const formatearDuracion = (minutos?: number): string => {
  if (!minutos) return 'N/A';
  
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  
  if (horas === 0) return `${mins}m`;
  return `${horas}h ${mins}m`;
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
