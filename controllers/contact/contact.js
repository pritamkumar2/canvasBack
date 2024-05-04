import Contact from "../../models/contact-model.js";
import sendEmail from "../Nodemailer/sendEmail.js";

const contact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ message: "Please fill all fields properly" });
    }

    const newContact = new Contact({ name, email, message });
    await newContact.save();

    const htmlTemplate = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }
          h1 {
            color: #333;
            margin-top: 0;
          }
          p {
            color: #666;
          }
          strong {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Contact Form Submission</h1>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      </body>
    </html>
  `;

    sendEmail(
      "pretamram0@gmail.com",
      "New Contact Form Submission",
      `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      htmlTemplate
    );

    res.status(200).json({ message: "Contact sent successfully" });
  } catch (err) {
    console.error("Error from controllers contact route", err);
    res.status(500).send("Internal Server Error");
  }
};

export default contact;
