"use strict";

const {
  sendInquiryNotification,
  sendInquiryAcknowledgement,
} = require("../../services/ses");

module.exports = {
  /**
   * Email the business inbox, and acknowledge the visitor, through Amazon SES
   * once the inquiry is safely stored. Running after the write, and never
   * throwing, means a mail problem shows up in the log and the admin panel
   * rather than as a failed form. The two sends are independent and run side
   * by side, so the visitor's wait is the slower of them, not the sum.
   */
  async afterCreate(event) {
    const inquiry = event.result;

    const [{ sent }] = await Promise.all([
      sendInquiryNotification(inquiry),
      sendInquiryAcknowledgement(inquiry),
    ]);

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
