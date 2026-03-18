import { URL_BACKEND } from '@/constants';
import type { LoginRequest, LoginResponse, RegistroRequest, Usuario } from '@/types';

class ServicioAuth {
  private baseURL: string;

  constructor() {
    this.baseURL = `${URL_BACKEND}/auth`;
  }

  async registrar(datos: RegistroRequest): Promise<Usuario> {
    const response = await fetch(`${this.baseURL}/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datos),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al registrar usuario');
    }

    return response.json();
  }

  async login(credenciales: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${this.baseURL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credenciales),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Error al iniciar sesión');
    }

    return response.json();
  }

  guardarToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token_auth', token);
    }
  }

  obtenerToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token_auth');
    }
    return null;
  }

  eliminarToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token_auth');
    }
  }

  estaAutenticado(): boolean {
    return !!this.obtenerToken();
  }
}

export const servicioAuth = new ServicioAuth();
