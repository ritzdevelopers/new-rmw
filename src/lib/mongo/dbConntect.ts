import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error("Please define the MONGO_URL environment variable in your .env.local file");
}

let isConnected: boolean = false;

export const connectMongoDB = async () => {
  try {
    if (isConnected) {
      console.log("✅ MongoDB already connected");
      return;
    }

    await mongoose.connect(MONGO_URL);

    isConnected = true;
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.log("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
