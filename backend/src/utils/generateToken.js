import jwt from "jsonwebtoken";

export const generateToken = (res, id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
  const isSecure = (process.env.COOKIE_SECURE || "false") === "true";
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: isSecure,
    sameSite: isSecure ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
  return token;
};
