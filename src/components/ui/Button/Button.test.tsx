import { render, screen, fireEvent } from '@testing-library/react';
import { Botón } from './Button';

describe('Botón', () => {
  it('debería renderizar botón con children', () => {
    render(<Botón>Hacer click</Botón>);
    expect(screen.getByText('Hacer click')).toBeInTheDocument();
  });

  it('debería llamar onClick cuando se hace click', () => {
    const manejarClick = jest.fn();
    render(<Botón onClick={manejarClick}>Hacer click</Botón>);
    
    fireEvent.click(screen.getByText('Hacer click'));
    
    expect(manejarClick).toHaveBeenCalledTimes(1);
  });

  it('no debería llamar onClick cuando está deshabilitado', () => {
    const manejarClick = jest.fn();
    render(<Botón onClick={manejarClick} deshabilitado>Hacer click</Botón>);
    
    fireEvent.click(screen.getByText('Hacer click'));
    
    expect(manejarClick).not.toHaveBeenCalled();
  });

  it('no debería llamar onClick cuando está cargando', () => {
    const manejarClick = jest.fn();
    render(<Botón onClick={manejarClick} estaCargando>Hacer click</Botón>);
    
    fireEvent.click(screen.getByText('Hacer click'));
    
    expect(manejarClick).not.toHaveBeenCalled();
  });

  it('debería renderizar con la clase de variante correcta', () => {
    const { container } = render(<Botón variante="primary">Botón</Botón>);
    const boton = container.querySelector('button');
    
    expect(boton).toHaveClass('button--primary');
  });

  it('debería renderizar con la clase de tamaño correcta', () => {
    const { container } = render(<Botón tamaño="lg">Botón</Botón>);
    const boton = container.querySelector('button');
    
    expect(boton).toHaveClass('button--lg');
  });

  it('debería renderizar botón de ancho completo', () => {
    const { container } = render(<Botón anchoCompleto>Botón</Botón>);
    const boton = container.querySelector('button');
    
    expect(boton).toHaveClass('button--fullWidth');
  });

  it('debería mostrar spinner cuando está cargando', () => {
    const { container } = render(<Botón estaCargando>Botón</Botón>);
    const spinner = container.querySelector('.spinner');
    
    expect(spinner).toBeInTheDocument();
  });

  it('debería tener atributos aria correctos', () => {
    render(
      <Botón aria-label="Etiqueta personalizada" estaCargando>
        Botón
      </Botón>
    );
    const boton = screen.getByLabelText('Etiqueta personalizada');
    
    expect(boton).toHaveAttribute('aria-busy', 'true');
  });

  it('debería manejar className personalizado', () => {
    const { container } = render(<Botón className="clase-personalizada">Botón</Botón>);
    const boton = container.querySelector('button');
    
    expect(boton).toHaveClass('clase-personalizada');
  });

  it('debería renderizar con el tipo de botón correcto', () => {
    render(<Botón tipo="submit">Enviar</Botón>);
    const boton = screen.getByText('Enviar');
    
    expect(boton).toHaveAttribute('type', 'submit');
  });
});
