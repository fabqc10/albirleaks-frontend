/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['a.storyblok.com','alicanteout.com','costablanca-anglicanchaplaincy.org','alfas.es','cdn.pixabay.com'], 
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