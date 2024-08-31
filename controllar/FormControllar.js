const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs'); // Import the fs module

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use 'service' instead of 'host' for Gmail
  auth: {
    user: "gouravpanchal80107@gmail.com",
    pass: "phbj zozm zwzw jngl", // Use the app password if 2-Step Verification is enabled
  },
});

const createRecord = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    // Mail options
    const mailOptions = {
      from: req.body.email, // Sender address (from form)
      to: 'gouravpanchal80107@gmail.com', // Replace with your email where you want to receive the applications
      subject: 'Job Application',
      text: `Name: ${req.body.name}\nEmail: ${req.body.email}\nPhone: ${req.body.phone}\nCover Letter: ${req.body.cover_letter}`,
      attachments: [
        {
          filename: req.file.originalname,
          path: req.file.path,
        },
      ],
    };

    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).send('There was an error sending the email.');
      }

      // Delete the file after sending the email
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error('Error deleting the file:', unlinkError);
          return res.status(500).send('Email sent, but failed to delete the file.');
        }
        res.status(200).send('Application submitted and email sent successfully!');
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  createRecord,
};
