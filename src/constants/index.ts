export const URL_BASE_API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const TIMEOUT_API = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;

// Backend URL
export const URL_BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
export const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
export const TMDB_IMAGE_SIZE_POSTER = process.env.NEXT_PUBLIC_TMDB_IMAGE_SIZE_POSTER || 'w500';
export const TMDB_IMAGE_SIZE_BACKDROP = process.env.NEXT_PUBLIC_TMDB_IMAGE_SIZE_BACKDROP || 'original';

export const VIDSRC_BASE_URL = process.env.NEXT_PUBLIC_VIDSRC_BASE_URL || 'https://vidsrc.to/embed/movie';
export const VIDLINK_BASE_URL = process.env.NEXT_PUBLIC_VIDLINK_BASE_URL || 'https://vidlink.pro/movie';

export const ENDPOINTS_TMDB = {
  // Películas
  PELICULAS_POPULARES: '/movie/popular',
  PELICULAS_MEJOR_VALORADAS: '/movie/top_rated',
  PELICULAS_EN_CARTELERA: '/movie/now_playing',
  PELICULAS_PROXIMAS: '/movie/upcoming',
  DETALLE_PELICULA: (id: string | number) => `/movie/${id}`,
  BUSCAR_PELICULAS: '/search/movie',
  GENEROS: '/genre/movie/list',
  VIDEOS_PELICULA: (id: string | number) => `/movie/${id}/videos`,
  CREDITOS_PELICULA: (id: string | number) => `/movie/${id}/credits`,
  SIMILARES_PELICULA: (id: string | number) => `/movie/${id}/similar`,
  
  // Series
  SERIES_POPULARES: '/tv/popular',
  SERIES_MEJOR_VALORADAS: '/tv/top_rated',
  SERIES_AL_AIRE: '/tv/on_the_air',
  SERIES_HOY: '/tv/airing_today',
  DETALLE_SERIE: (id: string | number) => `/tv/${id}`,
  BUSCAR_SERIES: '/search/tv',
  GENEROS_SERIES: '/genre/tv/list',
  VIDEOS_SERIE: (id: string | number) => `/tv/${id}/videos`,
  CREDITOS_SERIE: (id: string | number) => `/tv/${id}/credits`,
  SIMILARES_SERIE: (id: string | number) => `/tv/${id}/similar`,
} as const;

export const NOMBRE_APP = process.env.NEXT_PUBLIC_APP_NAME || 'MOVIE';
export const VERSION_APP = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';

export const RUTAS = {
  INICIO: '/',
  PELICULAS: '/peliculas',
  DETALLE_PELICULA: (id: string) => `/peliculas/${id}`,
  SERIES: '/series',
  DETALLE_SERIE: (id: string) => `/series/${id}`,
  MEJORES: '/mejores',
  BUSCAR: '/buscar',
  FAVORITOS: '/favoritos',
  LOGIN: '/login',
  REGISTRO: '/registro',
  PERFIL: '/perfil',
  CONFIGURACION: '/configuracion',
} as const;

export const CLAVES_ALMACENAMIENTO = {
  TOKEN_AUTH: 'token_auth',
  TOKEN_REFRESCO: 'token_refresco',
  PREFERENCIAS_USUARIO: 'preferencias_usuario',
  TEMA: 'tema',
  IDIOMA: 'idioma',
} as const;

export const RETRASO_DEBOUNCE = 300;
export const DURACION_TOAST = 3000;
export const TAMAÑO_PAGINACION = 20;
export const MAX_REINTENTOS = 3;

export const VALIDACION = {
  EMAIL: {
    LONGITUD_MIN: 5,
    LONGITUD_MAX: 255,
    PATRON: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  CONTRASEÑA: {
    LONGITUD_MIN: 8,
    LONGITUD_MAX: 128,
    PATRON: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  },
  NOMBRE_USUARIO: {
    LONGITUD_MIN: 3,
    LONGITUD_MAX: 50,
    PATRON: /^[a-zA-Z0-9_-]+$/,
  },
} as const;

export const GENEROS_PELICULA = [
  { id: 28, nombre: 'Acción' },
  { id: 12, nombre: 'Aventura' },
  { id: 16, nombre: 'Animación' },
  { id: 35, nombre: 'Comedia' },
  { id: 80, nombre: 'Crimen' },
  { id: 99, nombre: 'Documental' },
  { id: 18, nombre: 'Drama' },
  { id: 10751, nombre: 'Familiar' },
  { id: 14, nombre: 'Fantasía' },
  { id: 36, nombre: 'Historia' },
  { id: 27, nombre: 'Terror' },
  { id: 10402, nombre: 'Música' },
  { id: 9648, nombre: 'Misterio' },
  { id: 10749, nombre: 'Romance' },
  { id: 878, nombre: 'Ciencia Ficción' },
  { id: 10770, nombre: 'Película de TV' },
  { id: 53, nombre: 'Thriller' },
  { id: 10752, nombre: 'Bélica' },
  { id: 37, nombre: 'Western' },
] as const;

export const OPCIONES_ORDEN_PELICULAS = [
  { valor: 'popularidad.desc', etiqueta: 'Popularidad (Mayor)' },
  { valor: 'popularidad.asc', etiqueta: 'Popularidad (Menor)' },
  { valor: 'fecha_estreno.desc', etiqueta: 'Fecha (Más reciente)' },
  { valor: 'fecha_estreno.asc', etiqueta: 'Fecha (Más antigua)' },
  { valor: 'calificacion.desc', etiqueta: 'Calificación (Mayor)' },
  { valor: 'calificacion.asc', etiqueta: 'Calificación (Menor)' },
  { valor: 'titulo.asc', etiqueta: 'Título (A-Z)' },
  { valor: 'titulo.desc', etiqueta: 'Título (Z-A)' },
] as const;

export const MENSAJES_ERROR = {
  ERROR_RED: 'Error de conexión. Por favor, verifica tu internet.',
  NO_AUTORIZADO: 'No autorizado. Por favor, inicia sesión.',
  PROHIBIDO: 'No tienes permisos para realizar esta acción.',
  NO_ENCONTRADO: 'Recurso no encontrado.',
  ERROR_SERVIDOR: 'Error del servidor. Intenta nuevamente más tarde.',
  ERROR_VALIDACION: 'Error de validación. Verifica los datos ingresados.',
  ERROR_DESCONOCIDO: 'Ocurrió un error inesperado.',
} as const;

export const FUNCIONALIDADES = {
  ANALITICAS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
} as const;
