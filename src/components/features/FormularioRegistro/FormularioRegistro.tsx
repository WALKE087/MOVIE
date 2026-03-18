'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { Botón } from '@/components/ui/Button';
import styles from './FormularioRegistro.module.css';

export function FormularioRegistro() {
  const router = useRouter();
  const { registrar } = useAuth();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmarPassword, setConfirmarPassword] = useState('');
  const [error, setError] = useState('');
  const [estaCargando, setEstaCargando] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (password !== confirmarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setEstaCargando(true);

    try {
      await registrar({ email, username, password });
      router.push('/peliculas');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
    } finally {
      setEstaCargando(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.titulo}>Crear Cuenta</h1>
        <p className={styles.subtitulo}>Regístrate para empezar a disfrutar</p>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          {error && (
            <div className={styles.error}>
              {error}
            </div>
          )}

          <div className={styles.campo}>
            <label htmlFor="username" className={styles.label}>
              Nombre de Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="miusuario"
              required
              disabled={estaCargando}
            />
          </div>

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
              minLength={6}
              disabled={estaCargando}
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="confirmarPassword" className={styles.label}>
              Confirmar Contraseña
            </label>
            <input
              id="confirmarPassword"
              type="password"
              value={confirmarPassword}
              onChange={(e) => setConfirmarPassword(e.target.value)}
              className={styles.input}
              placeholder="••••••••"
              required
              minLength={6}
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
            {estaCargando ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Botón>
        </form>

        <div className={styles.footer}>
          <p className={styles.textoFooter}>
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className={styles.enlace}>
              Inicia sesión aquí
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
