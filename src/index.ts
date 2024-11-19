import express, { Request, Response, NextFunction } from "express";
import {envConfig} from "./configs/env.config";
import {apiRouter} from "./routes/api.router";
import {connectDB} from "./configs/db.config";
import {ApiError} from "./errors/api.error";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(apiRouter);

app.use(
    (err: ApiError | Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
            res.status(err.status).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    },
);

process.on("uncaughtException", (err) => {
    console.error("Uncaught exception", err.message, err.stack);
    process.exit(1);
});

// from node.js docs
process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

const start = async () => {
    try {
        await connectDB();
        app.listen(envConfig.APP_PORT, () => {
            console.log("Server is running on http://" + envConfig.APP_HOST + ":" + envConfig.APP_PORT);
        });
    } catch (err) {
        console.error("Failed to start server: " + err.message);
    }
}

void start();

