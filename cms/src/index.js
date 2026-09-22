"use strict";

const seedBlogs = require("../data/seed-blogs.json");

/**
 * Permissions the Next.js site needs from the public role. Blogs are readable,
 * inquiries can only be created — never listed — so nobody can read back what
 * other people submitted.
 */
const PUBLIC_ACTIONS = [
  "api::blog.blog.find",
  "api::blog.blog.findOne",
  "api::inquiry.inquiry.create",
];

async function grantPublicPermissions(strapi) {
  const publicRole = await strapi
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) return;

  for (const action of PUBLIC_ACTIONS) {
    const existing = await strapi
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi
        .query("plugin::users-permissions.permission")
        .create({ data: { action, role: publicRole.id } });
      strapi.log.info(`[bootstrap] granted public: ${action}`);
    }
  }
}

/**
 * Load the posts that used to live in the Next app as Markdown files, once, on
 * an empty CMS. After that the admin panel is the source of truth and this does
 * nothing.
 */
async function seed(strapi) {
  const count = await strapi.documents("api::blog.blog").count();
  if (count > 0) return;

  for (const blog of seedBlogs) {
    await strapi.documents("api::blog.blog").create({
      data: blog,
      status: "published",
    });
  }
  strapi.log.info(`[bootstrap] seeded ${seedBlogs.length} blogs`);
}

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    try {
      await grantPublicPermissions(strapi);
      await seed(strapi);
    } catch (error) {
      strapi.log.error(`[bootstrap] ${error.message}`);
    }
  },
};
