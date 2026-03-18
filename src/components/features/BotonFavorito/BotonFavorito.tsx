'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { servicioFavoritos } from '@/services/api/servicioFavoritos';
import styles from './BotonFavorito.module.css';

interface BotonFavoritoProps {
  tmdbId: number;
  tipo?: 'movie' | 'tv';
  className?: string;
}

export function BotonFavorito({ tmdbId, tipo = 'movie', className }: BotonFavoritoProps) {
  const { estaAutenticado } = useAuth();
  const [esFavorito, setEsFavorito] = useState(false);
  const [estaCargando, setEstaCargando] = useState(false);

  useEffect(() => {
    if (estaAutenticado) {
      verificarFavorito();
    }
  }, [tmdbId, tipo, estaAutenticado]);

  const verificarFavorito = async () => {
    try {
      const resultado = await servicioFavoritos.esFavorito(tmdbId, tipo);
      setEsFavorito(resultado);
    } catch (error) {
      console.error('Error al verificar favorito:', error);
    }
  };

  const handleClick = async () => {
    if (!estaAutenticado) {
      alert('Debes iniciar sesión para agregar favoritos');
      return;
    }

    setEstaCargando(true);
    try {
      const resultado = await servicioFavoritos.toggleFavorito(tmdbId, tipo);
      setEsFavorito(resultado.agregado);
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
      alert(error instanceof Error ? error.message : 'Error al actualizar favorito');
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={estaCargando || !estaAutenticado}
      className={`${styles.boton} ${esFavorito ? styles.activo : ''} ${className || ''}`}
      title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={esFavorito ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        className={styles.icono}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
      {estaCargando && <span className={styles.loader}></span>}
    </button>
  );
}
