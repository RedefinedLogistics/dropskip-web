"use strict";

const { sendInquiryNotification } = require("../../services/ses");

module.exports = {
  /**
   * Email the business inbox through Amazon SES once the inquiry is safely
   * stored. Running after the write, and never throwing, means a mail problem
   * shows up in the log and the admin panel rather than as a failed form.
   */
  async afterCreate(event) {
    const inquiry = event.result;

    const { sent } = await sendInquiryNotification(inquiry);

    if (sent) {
      // Recorded so the admin list shows which inquiries were emailed and which
      // need chasing by hand. Updated directly to avoid re-running lifecycles.
      try {
        await strapi.db
          .query("api::inquiry.inquiry")
          .update({ where: { id: inquiry.id }, data: { notified: true } });
      } catch (error) {
        strapi.log.error(`[inquiry] could not flag as notified: ${error.message}`);
      }
    }
  },
};
