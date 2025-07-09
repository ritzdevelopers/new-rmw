// // src/lib/mongo/dbConnect.ts
// import mongoose from "mongoose";

// const MONGO_URL = process.env.MONGO_URL;

// if (!MONGO_URL) {
//   throw new Error(
//     "Please define the MONGO_URL environment variable in your .env.local file"
//   );
// }

// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export const connectMongoDB = async () => {
//   if (cached.conn) {
//     // ✅ Reuse existing connection
//     console.log("✅ MongoDB connected successfully (cached)");
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     // ✅ Create new connection and cache the promise
//     cached.promise = mongoose.connect(MONGO_URL).then((mongoose) => {
//       console.log("✅ MongoDB connected successfully (cached)");
//       return mongoose;
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     console.log("✅ MongoDB connected successfully (cached)");
//     return cached.conn;
//   } catch (error) {
//     cached.promise = null;
//     console.error("❌ MongoDB connection error:", error);
//     throw new Error("MongoDB connection failed");
//   }
// };

import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable in your .env.local file"
  );
}

// 👇 Extend globalThis inline with a proper type for mongoose
type MongooseConnection = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalAny = globalThis as typeof globalThis & {
  mongoose: MongooseConnection;
};

// 👇 Initialize global cache if it doesn't exist
if (!globalAny.mongoose) {
  globalAny.mongoose = { conn: null, promise: null };
}

export const connectMongoDB = async () => {
  if (globalAny.mongoose.conn) {
    console.log("✅ MongoDB connected successfully (cached)");
    return globalAny.mongoose.conn;
  }

  if (!globalAny.mongoose.promise) {
    globalAny.mongoose.promise = mongoose
      .connect(MONGO_URL)
      .then((mongoose) => {
        console.log("✅ MongoDB connected successfully (new connection)");
        return mongoose;
      });
  }

  try {
    globalAny.mongoose.conn = await globalAny.mongoose.promise;
    return globalAny.mongoose.conn;
  } catch (error) {
    globalAny.mongoose.promise = null;
    console.error("❌ MongoDB connection error:", error);
    throw new Error("MongoDB connection failed");
  }
};
