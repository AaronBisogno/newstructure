import express from 'express';
import { userLogged } from '../middlewares/auth.js';
import passport from 'passport';
import { AuthController } from '../controller/auth.controller.js';

export const authRouter = express.Router();
const authController = new AuthController();

authRouter.get('/auth/github', userLogged, passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/auth/github/callback', userLogged, passport.authenticate('github', { failureRedirect: '/login' }), authController.githubLogin);

authRouter.post(
    '/login',
    userLogged,
    passport.authenticate('login', {
        failureRedirect: '/loginError',
    }), authController.login
);

authRouter.get('/loginError', userLogged, authController.loginError);

authRouter.post(
    '/register',
    userLogged,
    passport.authenticate('register', {
        successRedirect: '/login',
        failureRedirect: '/failRegister',
    })
);

authRouter.get('/failRegister', authController.failRegister);
