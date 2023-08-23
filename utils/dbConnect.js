import mongoose from "mongoose";

const connectMongoDB = async () => mongoose.connect(process.env.DATABASE_URL);

export default connectMongoDB;
