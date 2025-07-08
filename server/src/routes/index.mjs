import { Router } from "express";
import rootRouter from "./rootRouter.mjs";
import usersRouter from "./usersRouter.mjs";
import articlesRouter from "./articlesRouter.mjs";
import themeRouter from "./themeRouter.mjs";
import authRouter from "./authRouter.mjs";

const router = Router();

router.use('/', rootRouter);
router.use('/api/theme', themeRouter);
router.use('/api/auth', authRouter);

router.use('/api/users', usersRouter);
router.use('/api/articles', articlesRouter);

export default router;