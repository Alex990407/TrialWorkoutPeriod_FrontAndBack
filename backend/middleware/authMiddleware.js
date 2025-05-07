function authMiddleware(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  if (token !== process.env.ADMIN_TOKEN) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
  }

  next();
}

module.exports = authMiddleware;
