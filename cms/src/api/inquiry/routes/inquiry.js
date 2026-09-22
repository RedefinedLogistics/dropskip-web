"use strict";

const { createCoreRouter } = require("@strapi/strapi").factories;

/**
 * Only `create` is reachable by the website. Reading, updating and deleting
 * inquiries stays inside the admin panel, so nobody can list what other people
 * have submitted.
 */
module.exports = createCoreRouter("api::inquiry.inquiry", {
  only: ["create"],
});
