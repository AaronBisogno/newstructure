import { CartService } from '../services/cart.service.js';
const cartService = new CartService();

export class CartController{
    async getCarts(req, res){
        const carts = await cartService.getCarts();
        return res.status(200).send({
            status: 'success',
            msg: 'Carts found',
            data: carts,
        });
    }
    async getCartById(req, res){
        const { cid } = req.params;
        try {
            const result = await cartService.getCart(cid);
            res.status(200).send({
                status: 'success',
                msg: `Cart id: '${cid}' founded`,
                data: `Products: ${JSON.stringify(result.products)}`,
            });
        } catch {
            res.status(404).send({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
    async createCart(req, res){
        try {
            const result = await cartService.create();
            res.status(200).send({
                status: 'success',
                msg: `Cart created`,
                data: { cartId: result._id, products: result.products },
            });
        } catch {
            res.status(404).send({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
    async addProductToCart(req, res){
        const { cid, pid } = req.params;
        try {
            const productAdded = await cartService.addProductToCart(cid, pid);
            res.status(200).send({
                status: 'success',
                msg: `Product added`,
                data: JSON.stringify(productAdded),
            });
        } catch {
            res.status(404).send({
                status: 'error',
                msg: 'Product id does not exist! Please insert a valid id.',
            });
        }
    }
    async deleteProductFromCart(req, res){
        const { cid, pid } = req.params;
        try {
            const productRemoved = await cartService.removeProductFromCart(cid, pid);
            res.status(200).send({
                status: 'success',
                msg: `Product deleted`,
                data: `${productRemoved}`,
            });
        } catch {
            res.status(404).send({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
    async updateQuantity (req, res){
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        try {
            const productUpdated = await cartService.newStock(cid, pid, quantity);
            res.status(200).send({
                status: 'success',
                msg: `Product updated`,
                data: productUpdated,
            });
        } catch {
            res.status(404).send({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
    async clearCart(req, res){
        const { cid } = req.params;
        try {
            const cart = await cartService.clear(cid);
            res.status(200).send({
                status: 'success',
                msg: `Cart cleaned`,
                data: cart,
            });
        } catch {
            res.status(404).send({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
}