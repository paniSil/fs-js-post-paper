import express from 'express';
import passport from 'passport';
import { getLoginPage, getRegisterPage, postRegisterPage } from '../controllers/auth/authPageHandler.mjs';
import { postLogout } from '../controllers/auth/authLogout.mjs';
import { getForgotPasswordPage, postForgotPassword, getResetPasswordPage, postResetPassword } from '../controllers/auth/forgotPasswordHandler.mjs';
import { checkAuthHandler } from '../controllers/auth/checkAuthHandler.mjs';

const authRouter = express.Router();

authRouter.get('/login', getLoginPage);
authRouter.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ user: null, message: 'Invalid credentials' });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ user });
        });
    })(req, res, next);
});

authRouter.get('/check', checkAuthHandler);
authRouter.get('/me', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ user: null });
    }
});

authRouter.get('/register', getRegisterPage);
authRouter.post('/register', postRegisterPage);

authRouter.post('/logout', postLogout);


authRouter.get('/forgot', getForgotPasswordPage)
authRouter.post('/forgot', postForgotPassword);

authRouter.get('/reset/:token', getResetPasswordPage);
authRouter.post('/reset/:token', postResetPassword);

export default authRouter;