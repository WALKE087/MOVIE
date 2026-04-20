/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/**',
      },
    ],
  },
  reactStrictMode: true,
  // Permitir que el build continúe aunque falle el pre-renderizado de algunas páginas
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Configurar para no fallar en errores de pre-renderizado durante build
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
}

module.exports = nextConfig
