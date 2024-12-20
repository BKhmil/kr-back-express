import dotenv from "dotenv";

dotenv.config();

export const envConfig = {
    APP_PORT: process.env.APP_PORT || 5001,
    APP_HOST: process.env.APP_HOST,

    MONGO_URI: process.env.MONGO_URI,

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION
}