import { clienteTMDB } from './clienteTMDB';
import { ENDPOINTS_TMDB } from '@/constants';
import type { PeliculaTMDB, RespuestaPaginadaTMDB, VideoTMDB, CreditoTMDB } from '@/types';

export interface OpcionesBusqueda {
  pagina?: number;
  genero?: number;
  ordenar?: string;
}

export const servicioPeliculas = {
  obtenerPopulares: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<PeliculaTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<PeliculaTMDB>>(
      ENDPOINTS_TMDB.PELICULAS_POPULARES,
      { parametros: { page: pagina } }
    );
  },

  obtenerMejorValoradas: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<PeliculaTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<PeliculaTMDB>>(
      ENDPOINTS_TMDB.PELICULAS_MEJOR_VALORADAS,
      { parametros: { page: pagina } }
    );
  },

  obtenerEnCartelera: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<PeliculaTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<PeliculaTMDB>>(
      ENDPOINTS_TMDB.PELICULAS_EN_CARTELERA,
      { parametros: { page: pagina } }
    );
  },

  obtenerProximas: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<PeliculaTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<PeliculaTMDB>>(
      ENDPOINTS_TMDB.PELICULAS_PROXIMAS,
      { parametros: { page: pagina } }
    );
  },

  obtenerDetalle: async (id: number | string): Promise<PeliculaTMDB> => {
    return clienteTMDB.obtener<PeliculaTMDB>(
      ENDPOINTS_TMDB.DETALLE_PELICULA(id),
      { parametros: { append_to_response: 'videos,credits' } }
    );
  },

  buscar: async (consulta: string, pagina: number = 1): Promise<RespuestaPaginadaTMDB<PeliculaTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<PeliculaTMDB>>(
      ENDPOINTS_TMDB.BUSCAR_PELICULAS,
      { parametros: { query: consulta, page: pagina } }
    );
  },

  obtenerVideos: async (id: number | string): Promise<{ results: VideoTMDB[] }> => {
    return clienteTMDB.obtener<{ results: VideoTMDB[] }>(
      ENDPOINTS_TMDB.VIDEOS_PELICULA(id)
    );
  },

  obtenerCreditos: async (id: number | string): Promise<{ cast: CreditoTMDB[]; crew: CreditoTMDB[] }> => {
    return clienteTMDB.obtener<{ cast: CreditoTMDB[]; crew: CreditoTMDB[] }>(
      ENDPOINTS_TMDB.CREDITOS_PELICULA(id)
    );
  },

  obtenerSimilares: async (id: number | string, pagina: number = 1): Promise<RespuestaPaginadaTMDB<PeliculaTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<PeliculaTMDB>>(
      ENDPOINTS_TMDB.SIMILARES_PELICULA(id),
      { parametros: { page: pagina } }
    );
  },
};
