import { Router } from "express";
import { authRouter } from "./auth.routes";
import { newsRouter } from "./news.routes";

export const router: Router = Router();

router.use("", authRouter);
router.use("/news", newsRouter);
