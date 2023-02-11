import mongoose from "mongoose";

export const connectMongo = async () =>
  mongoose.connect(
    "mongodb+srv://Admin:7kWN9s91dLYRt2GT@cluster0.yo6zbcr.mongodb.net/?retryWrites=true&w=majority"
  );
