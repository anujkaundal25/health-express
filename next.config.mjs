/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: { formats: ["image/avif", "image/webp"] },
  // friendly short links → the original page URLs (kept the same as the live site for SEO)
  async redirects() {
    return [
      { source: "/apply-as-driver", destination: "/driverForm", permanent: true },
      { source: "/brooklyn", destination: "/ambuletteService", permanent: true },
      { source: "/south-brooklyn", destination: "/southBrooklyn", permanent: true },
      { source: "/book", destination: "/schedule", permanent: true },
    ];
  },
};

export default nextConfig;
