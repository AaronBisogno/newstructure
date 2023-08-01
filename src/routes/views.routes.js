import express from 'express';
import { isUser, userLogged } from '../middlewares/auth.js';
import { ViewController } from '../controller/views.controller.js';

const viewController = new ViewController()

export const viewsRouter = express.Router();

viewsRouter.get('/', isUser, viewController.home);

viewsRouter.get('/products', isUser, viewController.getProducts);

viewsRouter.get('/products/:pid', isUser, viewController.getProductById);

viewsRouter.get(`/carts/:cid`, isUser, viewController.getCartById);

viewsRouter.get('/realtimeproducts', isUser, viewController.realTime);

viewsRouter.get('/chat', (req, res) => {
    res.render('chat', { title: 'Bull Market | Chat Online' });
});

viewsRouter.get('/login', userLogged, viewController.chat);

viewsRouter.get('/register', userLogged, viewController.register);

viewsRouter.get('/account', isUser, viewController.getAccount);

viewsRouter.get('/logout', isUser, viewController.logout);

viewsRouter.get('*', isUser, viewController.notFound);
