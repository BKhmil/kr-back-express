import {Router} from "express";
import {AuthModule} from "../modules/auth";

const router = Router();

router.use("/api/auth", AuthModule.controller.router);

export const apiRouter = router;