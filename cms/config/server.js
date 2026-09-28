module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // The public address of the CMS, e.g. https://cms.dropskip.ai. Strapi uses it
  // for the admin panel and for absolute links; unset, it assumes localhost.
  url: env('PUBLIC_URL', ''),
  // Trust X-Forwarded-* from the reverse proxy (nginx, a load balancer, a PaaS
  // router) that terminates HTTPS in front of Strapi. Without it Strapi sees a
  // plain-http request in production and refuses to set the admin's secure
  // login cookie, so nobody can sign in to the admin panel.
  proxy: { koa: env.bool('IS_PROXIED', true) },
  app: {
    keys: env.array('APP_KEYS'),
  },
  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },
});
