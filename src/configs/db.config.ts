import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        console.log("Connecting to DB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connected");
    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1);
    }
};