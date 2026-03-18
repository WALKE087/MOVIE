'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { servicioAuth } from '@/services/api/servicioAuth';
import type { LoginRequest, RegistroRequest, Usuario } from '@/types';

interface AuthContextType {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  estaCargando: boolean;
  login: (credenciales: LoginRequest) => Promise<void>;
  registrar: (datos: RegistroRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [estaCargando, setEstaCargando] = useState(true);

  useEffect(() => {
    const token = servicioAuth.obtenerToken();
    if (token) {
      setUsuario({ 
        id: 0, 
        email: '', 
        username: 'Usuario', 
        created_at: '' 
      });
    }
    setEstaCargando(false);
  }, []);

  const login = async (credenciales: LoginRequest) => {
    try {
      const respuesta = await servicioAuth.login(credenciales);
      servicioAuth.guardarToken(respuesta.access_token);
      
      setUsuario({
        id: 0,
        email: credenciales.email,
        username: credenciales.email?.split('@')[0] || 'Usuario',
        created_at: new Date().toISOString(),
      });
    } catch (error) {
      throw error;
    }
  };

  const registrar = async (datos: RegistroRequest) => {
    try {
      await servicioAuth.registrar(datos);
      
      await login({
        email: datos.email,
        password: datos.password,
      });
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    servicioAuth.eliminarToken();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        estaAutenticado: !!usuario,
        estaCargando,
        login,
        registrar,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  return context;
}
