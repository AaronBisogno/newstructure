import { ProductService } from '../services/product.service.js';
import { ProductModel } from '../dao/models/products.model.js';
import { CartService } from '../services/cart.service.js';
import { UserModel } from '../dao/models/user.model.js';

const productService = new ProductService();
const cartService = new CartService();

export class ViewController{
    async home (req, res) {
        let { limit } = req.query;
        let { page } = req.query;

        const user = { firstName: req.session.user.firstName, lastName: req.session.user.lastName, email: req.session.user.email, admin: req.session.user.admin };
        const userCart = await UserModel.find({ email: user.email });
        const cart = userCart[0].cart.toString();
        const queryResult = await ProductModel.paginate({}, { limit: limit || 10, page: page || 1 });
        const { docs, ...rest } = queryResult;
        const result = docs.map((doc) => {
            return { title: doc.title, description: doc.description, code: doc.code, price: doc.price, stock: doc.stock, category: doc.category, thumbnail: doc.thumbnail, id: doc.id };
        });

        res.render('home', { result, pagination: rest, title: 'Bull Market | Home', user, cart });
    }
    async getProducts (req, res){
        let { limit } = req.query;
        let { page } = req.query;

        const user = { firstName: req.session.user.firstName, admin: req.session.user.admin, email: req.session.user.email };
        const userCart = await UserModel.find({ email: user.email });
        const cart = userCart[0].cart.toString();

        const queryResult = await ProductModel.paginate({}, { limit: limit || 10, page: page || 1 });
        const { docs, ...rest } = queryResult;
        const result = docs.map((doc) => {
            return { title: doc.title, description: doc.description, code: doc.code, price: doc.price, stock: doc.stock, category: doc.category, thumbnail: doc.thumbnail, id: doc.id, cart };
        });
        res.render('products', { result, pagination: rest, title: 'Bull Market | Products', user, cart });
    }
    async getProductById (req, res){
        const user = { firstName: req.session.user.firstName, admin: req.session.user.admin, email: req.session.user.email };
        const userCart = await UserModel.find({ email: user.email });
        const cart = userCart[0].cart.toString();
        try {
            const { pid } = req.params;
            const product = await productService.getProduct(pid);
            res.render('product', { product, title: 'Bull Market | Product', user, cart });
        } catch {
            res.render('404', { title: '404 Page not found', user, cart });
        }
    }
    async getCartById(req, res){
        const user = { firstName: req.session.user.firstName, admin: req.session.user.admin, email: req.session.user.email };
        const userCart = await UserModel.find({ email: user.email });
        const cart = userCart[0].cart.toString();
        try {
            const { cid } = req.params;
            const cart1 = await cartService.getCart(cid);
            const { products } = cart1;
            const result = [];
            for (const item of products) {
                result.push(item.product);
            }
            res.render('carts', { result, cid, title: 'Bull Market | Cart', user, cart });
        } catch {
            res.render('404', { title: 'Bull Market | 404 Page not found', user, cart });
        }
    }
    async realTime (req, res){
        const user = { firstName: req.session.user.firstName, admin: req.session.user.admin, email: req.session.user.email };
        const userCart = await UserModel.find({ email: user.email });
        const cart = userCart[0].cart.toString();
        const products = await productService.getProducts();
        res.render('realTimeProducts', { products, title: 'Bull Market | Products', user, cart });
    }
    async chat(req, res){
        res.render('login', { default: true, title: 'Bull Market | Log In' });
    }
    async register(req, res){
        res.render('register', { default: true, title: 'Bull Market | Create Account' })
    }
    async getAccount(req, res){
        const user = {
            email: req.session.user.email,
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            age: req.session.user.age,
            admin: req.session.user.admin,
            birth: req.session.user.birth,
        };
        const userCart = await UserModel.find({ email: user.email });
        const cart = userCart[0].cart.toString();
        res.render('account', { title: 'Bull Market | Account', user, cart });
    }
    async logout(req,res){
        req.session.destroy((err) => {
            if (err) {
                return res.json({ status: 'Logout ERROR', body: err });
            }
            res.redirect('/login');
        });
    }
    async notFound(req, res){
        const user = {
            email: req.session.user.email,
            firstName: req.session.user.firstName,
            lastName: req.session.user.lastName,
            age: req.session.user.age,
            admin: req.session.user.admin,
            birth: req.session.user.birth,
        };
        const userCart = await UserModel.find({ email: user.email });
        const cart = userCart[0].cart.toString();
        
        res.render('404', { title: 'Bull Market | Page not found', user, cart });
    }
}