import React from 'react';
import styles from './Button.module.css';

export interface PropsBotón {
  children: React.ReactNode;
  onClick?: () => void;
  variante?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  tamaño?: 'sm' | 'md' | 'lg';
  deshabilitado?: boolean;
  estaCargando?: boolean;
  tipo?: 'button' | 'submit' | 'reset';
  className?: string;
  anchoCompleto?: boolean;
  'aria-label'?: string;
  'data-testid'?: string;
}

export const Botón: React.FC<PropsBotón> = ({
  children,
  onClick,
  variante = 'primary',
  tamaño = 'md',
  deshabilitado = false,
  estaCargando = false,
  tipo = 'button',
  className = '',
  anchoCompleto = false,
  'aria-label': ariaLabel,
  'data-testid': dataTestId,
}) => {
  const clases = [
    styles.button,
    styles[`button--${variante}`],
    styles[`button--${tamaño}`],
    anchoCompleto && styles['button--fullWidth'],
    estaCargando && styles['button--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const manejarClick = () => {
    if (!deshabilitado && !estaCargando && onClick) {
      onClick();
    }
  };

  return (
    <button
      type={tipo}
      className={clases}
      onClick={manejarClick}
      disabled={deshabilitado || estaCargando}
      aria-label={ariaLabel}
      aria-busy={estaCargando}
      data-testid={dataTestId}
    >
      {estaCargando ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : null}
      <span className={estaCargando ? styles.hiddenText : undefined}>
        {children}
      </span>
    </button>
  );
};

Botón.displayName = 'Botón';

