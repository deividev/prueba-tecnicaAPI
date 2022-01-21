import { Router } from "express";
import { SignUpController } from "../controllers/auth/SignUp.controller";
import { SetPasswordController } from "../controllers/auth/SetPasswordController";
import { SigninController } from "../controllers/auth/Singin.controller";
import { TurnUserToAdminController } from "../controllers/auth/TurnUserToAdmin.controller";

export const authRouter = Router();

const signUpController = new SignUpController();
const setPasswordController = new SetPasswordController();
const signinController = new SigninController();

authRouter.post("/signup", signUpController.run);
authRouter.post("/signup/password", setPasswordController.run);
authRouter.post("/signin", signinController.run);
authRouter.post("/turn-admin/:uuid", new TurnUserToAdminController().run);
