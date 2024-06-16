// Load environment variables from .env file
require("dotenv").config();

const AWS = require("aws-sdk");

// Configure AWS SDK with environment variables
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.SES_REGION,
});

const ses = new AWS.SES();

exports.sendEmail = async (to, subject, body) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: { Data: body },
      },
      Subject: { Data: subject },
    },
    Source: "rahulsss1703@gmail.com", // Ensure this email is verified in SES
  };

  return ses.sendEmail(params).promise();
};
