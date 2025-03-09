import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb+srv://mhadicentrox:thisismongopass@cluster0.osoxb.mongodb.net/" as string);
    console.log("MongoDB Connected");
  }
};

export default connectDb;
