const mongoose = require("mongoose");
const AWS = require("aws-sdk");
const User = require("../models/User");

require("dotenv").config(); // Ensure environment variables are loaded

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.SES_REGION,
});

const ses = new AWS.SES();

async function sendNotification(authorId, subject, message) {
  try {
    // Convert authorId to ObjectId
    const objectId = new mongoose.Types.ObjectId(authorId);

    // Fetch author's email address from the database
    const author = await User.findById(objectId);
    if (!author || !author.email) {
      throw new Error("Author email not found");
    }

    // Define email parameters
    const params = {
      Destination: {
        ToAddresses: [author.email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: message,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject,
        },
      },
      Source: "rahulsss1703@gmail.com", // Ensure this email is verified in SES
    };

    // Send email
    const data = await ses.sendEmail(params).promise();
    console.log("Email sent successfully:", data);
  } catch (error) {
    console.error("Error sending email:", error.message, error.stack);
  }
}

module.exports = sendNotification;
