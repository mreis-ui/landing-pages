/** @type {import('next').NextConfig} */

// Ported 1:1 from the previous static site's vercel.json so paid-ads display
// paths, funnel redirects and security headers keep working after the redesign.

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // microphone=(self) kept for the ElevenLabs voice-AI widget
  { key: "Permissions-Policy", value: "camera=(), microphone=(self), geolocation=()" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },

  async redirects() {
    return [
      { source: "/index", destination: "/", permanent: true },
      { source: "/awareness", destination: "/werkstatt-software", permanent: true },
      { source: "/consideration", destination: "/funktionen", permanent: true },
      { source: "/decision", destination: "/kostenlos-testen", permanent: true },
      { source: "/contact-3", destination: "/kontakt", permanent: true },
      { source: "/lösungen", destination: "/loesungen", permanent: true },
      { source: "/loslegen", destination: "/kostenlos-testen", permanent: true },
      { source: "/demo", destination: "/kostenlos-testen", permanent: true },
      { source: "/testen", destination: "/kostenlos-testen", permanent: true },
    ];
  },

  async rewrites() {
    return [
      // Google Ads display-URL slots
      { source: "/s/1", destination: "/" },
      { source: "/s/2", destination: "/" },
      { source: "/s/3", destination: "/werkstatt-software" },
      { source: "/s/4", destination: "/funktionen" },
      { source: "/s/5", destination: "/loesungen" },
      { source: "/s/6", destination: "/kostenlos-testen" },
      { source: "/s/7", destination: "/kostenlos-testen" },
      { source: "/s/8", destination: "/kostenlos-testen" },
      // Vanity / ad-friendly paths
      { source: "/online-termine", destination: "/funktionen" },
      { source: "/leihwagen/digital", destination: "/funktionen" },
      { source: "/tuev-reminder/automatisch", destination: "/funktionen" },
      { source: "/mahnwesen/automatisch", destination: "/funktionen" },
      { source: "/werkstatt-one/demo", destination: "/kostenlos-testen" },
      { source: "/foerderung/mut-zu", destination: "/preise" },
      { source: "/oldenburg/werkstatt", destination: "/werkstatt-software" },
      { source: "/werkstatt/alltag", destination: "/werkstatt-software" },
    ];
  },
};

export default nextConfig;
