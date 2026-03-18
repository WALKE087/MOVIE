import { URL_BACKEND } from '@/constants';
import type { Favorito, FavoritoRequest } from '@/types';
import { servicioAuth } from './servicioAuth';

class ServicioFavoritos {
  private baseURL: string;

  constructor() {
    this.baseURL = `${URL_BACKEND}/favoritos`;
  }

  private obtenerHeaders(): HeadersInit {
    const token = servicioAuth.obtenerToken();
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
  }

  async listarFavoritos(): Promise<Favorito[]> {
    const response = await fetch(this.baseURL, {
      method: 'GET',
      headers: this.obtenerHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
      }
      const error = await response.json();
      throw new Error(error.detail || 'Error al obtener favoritos');
    }

    return response.json();
  }

  async agregarFavorito(datos: FavoritoRequest): Promise<Favorito> {
    const response = await fetch(this.baseURL, {
      method: 'POST',
      headers: this.obtenerHeaders(),
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
      }
      const error = await response.json();
      throw new Error(error.detail || 'Error al agregar favorito');
    }

    return response.json();
  }

  async eliminarFavorito(favoritoId: number): Promise<void> {
    const response = await fetch(`${this.baseURL}/${favoritoId}`, {
      method: 'DELETE',
      headers: this.obtenerHeaders(),
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('No autorizado. Por favor, inicia sesión nuevamente.');
      }
      if (response.status === 404) {
        throw new Error('Favorito no encontrado');
      }
      const error = await response.json();
      throw new Error(error.detail || 'Error al eliminar favorito');
    }
  }

  async esFavorito(tmdbId: number, tipo: 'movie' | 'tv'): Promise<boolean> {
    try {
      const favoritos = await this.listarFavoritos();
      return favoritos.some(fav => fav.tmdb_id === tmdbId && fav.tipo === tipo);
    } catch (error) {
      console.error('Error al verificar favorito:', error);
      return false;
    }
  }

  async toggleFavorito(tmdbId: number, tipo: 'movie' | 'tv'): Promise<{ agregado: boolean; favorito?: Favorito }> {
    try {
      const favoritos = await this.listarFavoritos();
      const favoritoExistente = favoritos.find(fav => fav.tmdb_id === tmdbId && fav.tipo === tipo);

      if (favoritoExistente) {
        await this.eliminarFavorito(favoritoExistente.id);
        return { agregado: false };
      } else {
        const nuevoFavorito = await this.agregarFavorito({ tmdb_id: tmdbId, tipo });
        return { agregado: true, favorito: nuevoFavorito };
      }
    } catch (error) {
      throw error;
    }
  }
}

export const servicioFavoritos = new ServicioFavoritos();
