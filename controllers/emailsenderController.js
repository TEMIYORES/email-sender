import nodemailer from "nodemailer";

const handleSendEmail = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;
  if (!firstName || !lastName || !email) {
    return res.status(400).json({
      message: "First name, last name and email are required.",
    });
  }

  try {
    //     create waitlist
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.USER_EMAIL, //send gmail address
        pass: process.env.USER_PWD, //app password from email account
      },
    });
    const mailOptions = {
      from: {
        name: "Musben Portfolio",
        address: process.env.USER_EMAIL,
      }, // sender address
      to: [process.env.USER_EMAIL], // list of receivers
      subject: "Message from my Portfolio🤩", // Subject line
      html: `<p>FirstName: ${firstName}</p></br>
      <p>LastName: ${lastName}</p></br>
      <p>Email: ${email}</p></br>
      <p>Message: ${message}</p></br>`,
      //   cc:['email']
    };
    transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
    res
      .status(201)
      .json({
        message: `${firstName} ${lastName} your message was sent succesfully!`,
      });
  } catch (err) {
    res.status(500).json({ error: `${err.message} ${process.env.USER_EMAIL}` });
  }
};

export default handleSendEmail;
