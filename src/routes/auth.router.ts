import {Router} from "express";
import {authController} from "../controllers/auth.controller";
import {authMiddleware} from "../middlewares/auth.middleware";

const router = Router();

router.post("/sign-up", authController.signUp);
router.post("/sign-in", authController.signIn);
router.post("/refresh", authMiddleware.checkRefreshToken, authController.refresh);
router.post("/logout", authMiddleware.checkAccessToken, authController.logout);
router.post("/logout-all", authMiddleware.checkAccessToken, authController.logoutAll);
router.get("/all", authMiddleware.checkAccessToken, authController.getAll);

export const authRouter = router;