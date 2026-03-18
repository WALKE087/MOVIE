import { clienteTMDB } from './clienteTMDB';
import { ENDPOINTS_TMDB } from '@/constants';
import type { SerieTMDB, RespuestaPaginadaTMDB, VideoTMDB, CreditoTMDB } from '@/types';

export interface OpcionesBusquedaSeries {
  pagina?: number;
  genero?: number;
  ordenar?: string;
}

export const servicioSeries = {
  obtenerPopulares: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<SerieTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<SerieTMDB>>(
      ENDPOINTS_TMDB.SERIES_POPULARES,
      { parametros: { page: pagina } }
    );
  },

  obtenerMejorValoradas: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<SerieTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<SerieTMDB>>(
      ENDPOINTS_TMDB.SERIES_MEJOR_VALORADAS,
      { parametros: { page: pagina } }
    );
  },

  obtenerAlAire: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<SerieTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<SerieTMDB>>(
      ENDPOINTS_TMDB.SERIES_AL_AIRE,
      { parametros: { page: pagina } }
    );
  },

  obtenerHoy: async (pagina: number = 1): Promise<RespuestaPaginadaTMDB<SerieTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<SerieTMDB>>(
      ENDPOINTS_TMDB.SERIES_HOY,
      { parametros: { page: pagina } }
    );
  },

  obtenerDetalle: async (id: number | string): Promise<SerieTMDB> => {
    return clienteTMDB.obtener<SerieTMDB>(
      ENDPOINTS_TMDB.DETALLE_SERIE(id),
      { parametros: { append_to_response: 'videos,credits' } }
    );
  },

  buscar: async (consulta: string, pagina: number = 1): Promise<RespuestaPaginadaTMDB<SerieTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<SerieTMDB>>(
      ENDPOINTS_TMDB.BUSCAR_SERIES,
      { parametros: { query: consulta, page: pagina } }
    );
  },

  obtenerVideos: async (id: number | string): Promise<{ results: VideoTMDB[] }> => {
    return clienteTMDB.obtener<{ results: VideoTMDB[] }>(
      ENDPOINTS_TMDB.VIDEOS_SERIE(id)
    );
  },

  obtenerCreditos: async (id: number | string): Promise<{ cast: CreditoTMDB[]; crew: CreditoTMDB[] }> => {
    return clienteTMDB.obtener<{ cast: CreditoTMDB[]; crew: CreditoTMDB[] }>(
      ENDPOINTS_TMDB.CREDITOS_SERIE(id)
    );
  },

  obtenerSimilares: async (id: number | string, pagina: number = 1): Promise<RespuestaPaginadaTMDB<SerieTMDB>> => {
    return clienteTMDB.obtener<RespuestaPaginadaTMDB<SerieTMDB>>(
      ENDPOINTS_TMDB.SIMILARES_SERIE(id),
      { parametros: { page: pagina } }
    );
  },
};
