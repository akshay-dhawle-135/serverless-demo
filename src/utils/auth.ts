import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT secret not set");

  return jwt.sign({ userId }, secret, { expiresIn: "1h" });
};
