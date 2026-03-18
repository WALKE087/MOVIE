import { TMDB_API_KEY, TMDB_BASE_URL, TIMEOUT_API } from '@/constants';

interface OpcionesPeticion {
  metodo?: 'GET' | 'POST';
  parametros?: Record<string, string | number>;
  cuerpo?: unknown;
}

export class ClienteTMDB {
  private urlBase: string;
  private tokenAcceso: string;
  private esTokenBearer: boolean;

  constructor() {
    this.urlBase = TMDB_BASE_URL;
    this.tokenAcceso = TMDB_API_KEY;

    if (!this.tokenAcceso) {
      throw new Error('TMDB API key no configurada en las variables de entorno');
    }

    this.esTokenBearer = this.tokenAcceso.startsWith('eyJ');
  }

  private construirUrl(ruta: string, parametros?: Record<string, string | number>): string {
    const url = new URL(`${this.urlBase}${ruta}`);
    
    if (!this.esTokenBearer) {
      url.searchParams.append('api_key', this.tokenAcceso);
    }
    
    url.searchParams.append('language', 'es-ES');

    if (parametros) {
      Object.entries(parametros).forEach(([clave, valor]) => {
        url.searchParams.append(clave, String(valor));
      });
    }

    return url.toString();
  }

  async obtener<T>(ruta: string, opciones: OpcionesPeticion = {}): Promise<T> {
    const { parametros } = opciones;
    const url = this.construirUrl(ruta, parametros);

    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), TIMEOUT_API);

    const encabezados: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.esTokenBearer) {
      encabezados['Authorization'] = `Bearer ${this.tokenAcceso}`;
    }

    try {
      const respuesta = await fetch(url, {
        method: 'GET',
        headers: encabezados,
        signal: controlador.signal,
      });

      clearTimeout(temporizador);

      if (!respuesta.ok) {
        const mensajeError = await respuesta.text();
        throw new Error(`Error TMDB: ${respuesta.status} - ${mensajeError}`);
      }

      return await respuesta.json();
    } catch (error) {
      clearTimeout(temporizador);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Tiempo de espera agotado al conectar con TMDB');
        }
        throw error;
      }
      
      throw new Error('Error desconocido al conectar con TMDB');
    }
  }
}

export const clienteTMDB = new ClienteTMDB();
