import { APIGatewayProxyHandler } from "aws-lambda";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { connectToDatabase } from "../config/db";
import { generateToken } from "../utils/auth";

export const registerUser: APIGatewayProxyHandler = async (event) => {
  await connectToDatabase();
  const { username, password } = JSON.parse(event.body || "{}");

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "User already exists" }),
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "User created", user }),
  };
};

export const loginUser: APIGatewayProxyHandler = async (event) => {
  await connectToDatabase();
  const { username, password } = JSON.parse(event.body || "{}");

  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      statusCode: 401,
      body: JSON.stringify({ message: "Invalid credentials" }),
    };
  }

  const token = generateToken(user.id);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Login successful", token }),
  };
};
