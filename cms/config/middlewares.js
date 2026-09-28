/**
 * Browsers never call this API directly: the website reads blogs and submits
 * inquiries from its own server, and the admin panel is served from this same
 * origin. So CORS is limited to the CMS itself plus whatever CORS_ORIGINS
 * lists, rather than Strapi's default of every origin.
 */
module.exports = ({ env }) => {
  const origins = [
    env('PUBLIC_URL', ''),
    ...env.array('CORS_ORIGINS', ['http://localhost:1337', 'http://localhost:3000']),
  ]
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

  return [
    'strapi::logger',
    'strapi::errors',
    'strapi::security',
    { name: 'strapi::cors', config: { origin: [...new Set(origins)] } },
    'strapi::poweredBy',
    'strapi::query',
    'strapi::body',
    'strapi::session',
    'strapi::favicon',
    'strapi::public',
  ];
};
