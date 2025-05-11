const express = require("express");
const router = express.Router();
const trialController = require("../controllers/trialController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/trial", trialController.registerTrialUser);
router.get("/trial", authMiddleware, trialController.getTrialUsers);

module.exports = router;
