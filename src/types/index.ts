export interface PeliculaTMDB {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  release_date: string;
  runtime?: number;
  genre_ids?: number[];
  genres?: Genero[];
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface Pelicula {
  id: number;
  titulo: string;
  tituloOriginal: string;
  sinopsis: string;
  fechaEstreno: string;
  duracion?: number;
  generos: Genero[];
  calificacion: number;
  cantidadVotos: number;
  poster: string;
  imagenFondo: string;
  popularidad: number;
  idioma: string;
}

export interface Genero {
  id: number;
  name: string;
}

export interface RespuestaPaginadaTMDB<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface VideoTMDB {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface CreditoTMDB {
  id: number;
  name: string;
  original_name: string;
  profile_path: string | null;
  character?: string;
  job?: string;
}

export interface OpcionReproductor {
  nombre: string;
  url: string;
  activo: boolean;
}

export type VarianteBotón = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type TamañoBotón = 'sm' | 'md' | 'lg';

// Tipos de Autenticación
export interface Usuario {
  id: number;
  email: string;
  username: string;
  created_at: string;
}

export interface RegistroRequest {
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

// Tipos de Favoritos
export interface Favorito {
  id: number;
  tmdb_id: number;
  tipo: 'movie' | 'tv';
  created_at: string;
}

export interface FavoritoRequest {
  tmdb_id: number;
  tipo: 'movie' | 'tv';
}

// Tipos de Series
export interface SerieTMDB {
  id: number;
  name: string;
  original_name: string;
  overview: string;
  first_air_date: string;
  last_air_date?: string;
  number_of_seasons?: number;
  number_of_episodes?: number;
  episode_run_time?: number[];
  genre_ids?: number[];
  genres?: Genero[];
  vote_average: number;
  vote_count: number;
  poster_path: string | null;
  backdrop_path: string | null;
  popularity: number;
  adult: boolean;
  original_language: string;
  status?: string;
  type?: string;
}

export interface Serie {
  id: number;
  nombre: string;
  nombreOriginal: string;
  sinopsis: string;
  fechaPrimeraEmision: string;
  fechaUltimaEmision?: string;
  numeroTemporadas?: number;
  numeroEpisodios?: number;
  duracionEpisodio?: number[];
  generos: Genero[];
  calificacion: number;
  cantidadVotos: number;
  poster: string;
  imagenFondo: string;
  popularidad: number;
  idioma: string;
  estado?: string;
  tipo?: string;
}
