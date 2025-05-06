const express = require("express");
const router = express.Router();
const TrialUser = require("../models/TrialUser");
const calculateEndDate = require("../utils/calculateEndDate");
const validator = require("validator");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

router.post("/trial", async (req, res) => {
  const { firstName, lastName, email, startDate } = req.body;

  if (!firstName || !lastName || !email || !startDate) {
    return res.status(400).json({ message: "Alle Felder sind erforderlich." });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: "Ungültige E-Mail-Adresse." });
  }

  try {
    const existingUser = await TrialUser.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Diese E-Mail ist bereits registriert." });
    }

    const endDate = calculateEndDate(startDate);

    const newUser = new TrialUser({
      firstName,
      lastName,
      email,
      startDate,
      endDate,
    });

    await newUser.save();

    // Sending an e-mail
    const mailOptions = {
      from: `"Kurze Rippe Boxstudio" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Dein Probetraining im "Kurze Rippe" Boxstudio',
      text: `Hallo ${firstName},\n\nVielen Dank für deine Anmeldung zum Probetraining!\nDein Probetraining endet am ${endDate}.\n\nWir freuen uns auf dich!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
      } else {
        console.log("E-Mail gesendet:", info.response);
      }
    });

    res.status(201).json({ message: "Erfolgreich registriert!" });
  } catch (error) {
    console.error("Fehler beim Speichern:", error);
    res.status(500).json({ message: "Interner Serverfehler." });
  }
});

router.get("/trial", async (req, res) => {
  try {
    const users = await TrialUser.find({});
    res.status(200).json(users);
  } catch (error) {
    console.error("Fehler beim Abrufen:", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Benutzer." });
  }
});

module.exports = router;
