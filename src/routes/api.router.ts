import {Router} from "express";
import {authRouter} from "./auth.router";

const router = Router();

router.use("/api/auth", authRouter);

export const apiRouter = router;