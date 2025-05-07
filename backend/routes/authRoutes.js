const express = require("express");
const router = express.Router();

router.post("/login", (req, res) => {
  const { password } = req.body;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (password === ADMIN_PASSWORD) {
    return res.json({ token: process.env.ADMIN_TOKEN || "mysecrettoken" });
  } else {
    return res.status(401).json({ message: "Falsches Passwort" });
  }
});

module.exports = router;
