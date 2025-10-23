import jwt from "jsonwebtoken";

function auth(req, res, next) {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "No token, authorization denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(400).json({ error: "Token is not valid" });
  }
}

export default auth;