import mongoose from "mongoose";

const connectDb = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string);
    console.log("MongoDB Connected");
  }
};

export default connectDb;
