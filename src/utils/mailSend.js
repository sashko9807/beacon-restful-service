const sgMail = require('@sendgrid/mail');
require('dotenv').config();

/**
* Sends email to client using sendgrid API
*
* @param sendTo  Recipient of the email
* @param subject  Email subject
* @param text   Email text
*/

module.exports = (sendTo, subject, text) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: `${sendTo}`, // Change to your recipient
    from: `admin@diplomna-bms.tk`, // Change to your verified sender
    subject: `[DO NOT REPLY] ${subject}`,
    text: `${text}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
};
