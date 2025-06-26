import { Router } from "express";
import rootRouter from "./rootRouter.mjs";
import usersRouter from "./usersRouter.mjs";
import articlesRouter from "./articlesRouter.mjs";
import themeRouter from "./themeRouter.mjs";
import authRouter from "./authRouter.mjs";
import { protect, authorize } from "../middleware/authHandler.mjs";


const router = Router();

router.use('/', rootRouter);
router.use('/theme', themeRouter);
router.use('/auth', authRouter);

router.use('/users', usersRouter);
router.use('/articles', articlesRouter);
// protect, authorize('admin')

export default router;