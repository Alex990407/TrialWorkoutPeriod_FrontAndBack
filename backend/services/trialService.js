const TrialUser = require("../models/TrialUser");
const calculateEndDate = require("../utils/calculateEndDate");
const validator = require("validator");
const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function registerUser({ firstName, lastName, email, startDate }) {
  if (!firstName || !lastName || !email || !startDate) {
    const error = new Error("Alle Felder sind erforderlich.");
    error.statusCode = 400;
    throw error;
  }

  if (!validator.isEmail(email)) {
    const error = new Error("Ungültige E-Mail-Adresse.");
    error.statusCode = 400;
    throw error;
  }

  const existingUser = await TrialUser.findOne({ email });
  if (existingUser) {
    const error = new Error("Diese E-Mail ist bereits registriert.");
    error.statusCode = 400;
    throw error;
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

  const mailOptions = {
    from: `"Kurze Rippe Boxstudio" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Dein Probetraining im "Kurze Rippe" Boxstudio',
    text: `Hallo ${firstName},

Vielen Dank für deine Anmeldung zum Probetraining!
Dein Probetraining endet am ${endDate}.

Hier ist unser aktueller Trainingsplan:

📅 Montag:
  - 17:00 - 18:30: Boxtraining (Trainer: Marc)
  - 18:30 - 20:00: Boxtraining (Trainer: Marc)
  - 20:00 - 21:30: Boxtraining (Trainer: Marc)

📅 Dienstag:
  - 15:30 - 17:00: Boxtraining (Trainer: Rene)
  - 17:00 - 18:00: Kindertraining (Trainer: Rene)
  - 18:00 - 19:30: Boxtraining (Trainer: Rene)
  - 20:00 - 21:30: Boxtraining (Trainer: Rene)

📅 Mittwoch:
  - 15:00 - 16:30: Boxtraining (Trainer: Sergej)
  - 17:00 - 18:30: Boxtraining (Trainer: Sergej)
  - 18:30 - 20:00: Boxtraining (Trainer: Sergej)

📅 Donnerstag:
  - 18:00 - 19:30: Boxtraining (Trainer: Alex)
  - 19:30 - 21:00: Boxtraining (Trainer: Alex)

📅 Freitag:
  - 16:30 - 18:00: Boxtraining (Trainer: Eike)
  - 18:00 - 19:30: Sparring (Trainer: Eike)

📅 Samstag:
  - 15:00 - 16:30: Boxtraining (Trainer: Sergej)

Für weitere Informationen besuche bitte unsere Website: https://www.kurze-rippe.de/

Wir freuen uns auf dich!`,
  };

  try {
    await resend.emails.send(mailOptions);
  } catch (err) {
    console.error("Fehler beim Senden der E-Mail:", err);
  }

  return "Erfolgreich registriert!";
}

async function getAllUsers() {
  return await TrialUser.find({});
}

module.exports = {
  registerUser,
  getAllUsers,
};
