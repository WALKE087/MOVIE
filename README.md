# 🎬 MOVIE - Proyecto Frontend

Proyecto frontend con arquitectura moderna y best practices.
**⚠️ IMPORTANTE:** Esta es una aplicación **100% frontend sin backend ni base de datos**. Solo consume APIs externas (TMDB, VidSrc, VidLink).
## � REGLAS OBLIGATORIAS

**Antes de empezar, lee obligatoriamente**: [REGLAS_OBLIGATORIAS.md](./REGLAS_OBLIGATORIAS.md)

- ✅ **TODAS las funciones y variables en ESPAÑOL** (obligatorio)
- ✅ **CERO comentarios innecesarios** (obligatorio)
- ⚠️ Excepciones: Props de React (`onClick`, `children`, `className`)

## �🚀 Inicio Rápido

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Ejecutar tests
npm run test
```

## 📋 Requisitos Previos

- Node.js 18+ 
- npm o yarn

## 📚 Documentación

- **[REGLAS_OBLIGATORIAS.md](./REGLAS_OBLIGATORIAS.md)**: ⚠️ Reglas críticas (LEER PRIMERO)
- **[AGENT_RULES.md](./AGENT_RULES.md)**: Arquitectura, reglas y restricciones del desarrollo
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)**: Documentación de la estructura del proyecto

## 🛠️ Stack Tecnológico

- **Framework**: React 18+ / Next.js 14+
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Estado**: Zustand
- **Testing**: Jest + React Testing Library
- **Build**: Vite / Next.js

## 📁 Estructura Principal

```
MOVIE/
├── src/
│   ├── app/              # Aplicación principal
│   ├── components/       # Componentes reutilizables
│   ├── hooks/            # Custom hooks
│   ├── services/         # Servicios y APIs
│   ├── store/            # Estado global
│   ├── types/            # Tipos TypeScript
│   ├── utils/            # Utilidades
│   └── constants/        # Constantes
├── public/               # Archivos estáticos
└── tests/                # Tests

```

## 🤖 Reglas del Agente

Este proyecto sigue estrictas reglas de desarrollo:

### 🔴 OBLIGATORIAS (Ver [REGLAS_OBLIGATORIAS.md](./REGLAS_OBLIGATORIAS.md)):
- ✅ Funciones y variables en ESPAÑOL
- ✅ Sin comentarios innecesarios

### Adicionales (Ver [AGENT_RULES.md](./AGENT_RULES.md)):
- ✅ TypeScript obligatorio con modo estricto
- ✅ Componentes funcionales con tipos explícitos
- ✅ Testing con mínimo 70% de cobertura
- ✅ Accesibilidad (WCAG AA)
- ✅ Código limpio y documentado

## 📦 Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Build producción
npm run test         # Ejecutar tests
npm run lint         # Linter
npm run format       # Formatear código
npm run type-check   # Verificar tipos
```

## 🔧 Variables de Entorno

Crear archivo `.env.local` basado en `.env.example`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=MOVIE
```

## 🧪 Testing

```bash
# Tests unitarios
npm run test

# Tests con cobertura
npm run test:coverage

# Tests E2E
npm run test:e2e
```

## 🎨 Componentes

Los componentes están organizados en tres categorías:

- **UI**: Componentes base reutilizables
- **Features**: Componentes específicos del dominio
- **Layout**: Componentes estructurales

## 📝 Convenciones de Código

- **Archivos**: PascalCase para componentes, camelCase para utilidades
- **Commits**: Conventional Commits (feat, fix, docs, etc)
- **Branches**: feature/nombre, fix/nombre, refactor/nombre

## 🔒 Seguridad

- Variables de entorno para secrets
- Validación de datos en frontend y backend
- Sanitización de inputs
- CSP implementado

## 📄 Licencia

MIT

## 👥 Contribución

1. Fork el proyecto
2. Crea tu feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'feat: add amazing feature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**Última actualización**: Marzo 2026
