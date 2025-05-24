/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['a.storyblok.com','alicanteout.com','costablanca-anglicanchaplaincy.org','alfas.es','cdn.pixabay.com'], 
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          port: '', // Dejar vacío para cualquier puerto (o omitir)
          pathname: '/a/**', // Ajustar si las URLs tienen un patrón específico
        },
        // ... puedes añadir otros dominios aquí si los necesitas ...
      ],
    },
    async rewrites() {
        return {
           // Usar beforeFiles para asegurar que se aplique antes que las rutas API internas de Next.js
           beforeFiles: [
             {
               // Coincide con /api/ seguido de cualquier cosa que NO empiece por 'auth'
               source: '/api/:path((?!auth).*)',
               destination: 'http://localhost:8080/api/:path*', // Redirige al backend
             },
             // Las peticiones a /api/auth/* no coincidirán con la regla anterior
             // y serán manejadas por next-auth como corresponde.
           ],
           // Puedes dejar afterFiles y fallback vacíos si no los necesitas
           afterFiles: [],
           fallback: [],
        }
      },
};
  
export default nextConfig;