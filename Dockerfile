# Dockerfile para Next.js 14
# Construcción multi-etapa optimizada

# Etapa 1: Builder
FROM node:18-alpine AS builder
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar todas las dependencias (incluyendo devDependencies para build)
RUN npm ci

# Copiar código fuente
COPY . .

# Variables de entorno para build
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# ARGs para variables de build (se pasan desde docker-compose)
ARG NEXT_PUBLIC_TMDB_API_KEY
ARG NEXT_PUBLIC_TMDB_BASE_URL
ARG NEXT_PUBLIC_TMDB_IMAGE_BASE_URL
ARG NEXT_PUBLIC_TMDB_IMAGE_SIZE_POSTER
ARG NEXT_PUBLIC_TMDB_IMAGE_SIZE_BACKDROP
ARG NEXT_PUBLIC_VIDSRC_BASE_URL
ARG NEXT_PUBLIC_VIDLINK_BASE_URL

# Convertir ARGs a ENVs disponibles durante el build
ENV NEXT_PUBLIC_TMDB_API_KEY=$NEXT_PUBLIC_TMDB_API_KEY
ENV NEXT_PUBLIC_TMDB_BASE_URL=$NEXT_PUBLIC_TMDB_BASE_URL
ENV NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=$NEXT_PUBLIC_TMDB_IMAGE_BASE_URL
ENV NEXT_PUBLIC_TMDB_IMAGE_SIZE_POSTER=$NEXT_PUBLIC_TMDB_IMAGE_SIZE_POSTER
ENV NEXT_PUBLIC_TMDB_IMAGE_SIZE_BACKDROP=$NEXT_PUBLIC_TMDB_IMAGE_SIZE_BACKDROP
ENV NEXT_PUBLIC_VIDSRC_BASE_URL=$NEXT_PUBLIC_VIDSRC_BASE_URL
ENV NEXT_PUBLIC_VIDLINK_BASE_URL=$NEXT_PUBLIC_VIDLINK_BASE_URL

# Construir aplicación
RUN npm run build

# Etapa 2: Runner (Producción)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Crear usuario no-root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copiar archivos públicos
COPY --from=builder /app/public ./public

# Copiar archivos de build
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Cambiar a usuario no-root
USER nextjs

# Exponer puerto
EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# Comando de inicio
CMD ["node", "server.js"]
