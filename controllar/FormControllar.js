const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs"); // Import the fs module

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "hksconsulting2015@gmail.com",
    pass: "ocml nbxf aqsi zwck", 
  },
});

const createRecord = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.file);

    // Mail options
    const mailOptions = {
      from: req.body.email,
      to: "hksconsulting2015@gmail.com",
      subject: "Job Application",
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Job Application Received</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; color: #333;">
            <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <div style="text-align: center; margin-bottom: 20px;">
                    <img src="https://hksconsultingplacementservices.com/img/logo.png" alt="HKS Consulting Placement Services" style="max-width: 150px;">
                </div>
                <div style="line-height: 1.6;">
                    <h1 style="color: #2c3e50;">New Job Application Received</h1>
                    <p>Dear Admin,</p>
                    <p>You have received a new job application. Here are the details:</p>
    
                    <div style="margin: 20px 0; padding: 10px; background-color: #f9f9f9; border-radius: 8px;">
                        <p><strong>Name:</strong> ${req.body.name}</p>
                        <p><strong>Email:</strong> ${req.body.email}</p>
                        <p><strong>Phone:</strong> ${req.body.phone}</p>
                        <p><strong>Cover Letter:</strong> ${req.body.cover_letter}</p>
                    </div>
    
                    <p>Please find the attached resume for further details.</p>
    
                    <p>Best regards,<br>HKS Consulting Placement Services</p>
                </div>
                <div style="text-align: center; margin-top: 20px; color: #777;">
                    <p>&copy; 2024 HKS Consulting Placement Services. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>
      `,
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
        return res.status(500).send("There was an error sending the email.");
      }

      // Delete the file after sending the email
      fs.unlink(req.file.path, (unlinkError) => {
        if (unlinkError) {
          console.error("Error deleting the file:", unlinkError);
          return res
            .status(500)
            .send("Email sent, but failed to delete the file.");
        }
        res
          .status(200)
          .send("Application submitted and email sent successfully!");
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  createRecord,
};
