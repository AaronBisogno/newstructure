import express from 'express';
import { ProductController } from '../controller/products.controller.js';

export const productsRouter = express.Router();
const productController = new ProductController()

productsRouter.get('/', productController.getProducts);

productsRouter.get('/:pid', productController.getProductById);

productsRouter.post('/', productController.createProduct);

productsRouter.put('/:pid', productController.updateProduct);

productsRouter.delete('/:pid', productController.deleteById);

productsRouter.delete('/', productController.deleteAll);
