import mongoose from "mongoose";

export const connectToDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("Database URI not set in environment");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");
};
