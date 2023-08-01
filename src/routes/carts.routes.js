import express from 'express';
import { CartController } from '../controller/carts.controller.js';

export const cartRouter = express.Router();
const cartController = new CartController()



// Get carts: true

cartRouter.get('/', cartController.getCarts);

// Get cart by id: true

cartRouter.get('/:cid', cartController.getCartById);

// create a new cart: true

cartRouter.post('/', cartController.createCart);

// add a new product to the cart: true

cartRouter.post('/:cid/product/:pid', cartController.addProductToCart);

// Delete product from cart: true

cartRouter.delete('/:cid/product/:pid', cartController.deleteProductFromCart);

// update product quantity from cart: true

cartRouter.put('/:cid/product/:pid', cartController.updateQuantity);

// Clear all products: true

cartRouter.delete('/:cid', cartController.clearCart);
