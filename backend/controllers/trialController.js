const trialService = require("../services/trialService");

const registerTrialUser = async (req, res) => {
  try {
    const result = await trialService.registerUser(req.body);
    res.status(201).json({ message: result });
  } catch (error) {
    console.error("Fehler beim Registrieren:", error.message);
    res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const getTrialUsers = async (req, res) => {
  try {
    const users = await trialService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Fehler beim Abrufen:", error.message);
    res.status(500).json({ message: "Fehler beim Abrufen der Benutzer." });
  }
};

module.exports = {
  registerTrialUser,
  getTrialUsers,
};
