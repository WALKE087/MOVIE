'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Botón } from '@/components/ui/Button';
import styles from './FormularioLogin.module.css';

export function FormularioLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [estaCargando, setEstaCargando] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setEstaCargando(true);

    try {
      await login({ email, password });
      router.push('/peliculas');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Iniciar Sesión</h1>
        <p className={styles.subtitulo}>Accede a tu cuenta para continuar</p>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.campo}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="tu@email.com"
              required
              disabled={estaCargando}
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="password" className={styles.label}>
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
              disabled={estaCargando}
            />
          </div>

          <Botón
            tipo="submit"
            variante="primary"
            tamaño="lg"
            deshabilitado={estaCargando}
            className={styles.botonSubmit}
          >
            {estaCargando ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Botón>
        </form>

        <div className={styles.footer}>
          <p className={styles.textoFooter}>
            ¿No tienes una cuenta?{' '}
            <Link href="/registro" className={styles.enlace}>
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
