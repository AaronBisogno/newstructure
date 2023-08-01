export class AuthController{
    async githubLogin(req, res) {
        if (req.user) {
            req.session.user = {
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                admin: req.user.isAdmin,
                birth: req.user.birth,
                age: req.user.age,
            };
            res.redirect('/');
        }
    }
    async login(req,res){
        if (req.user) {
            req.session.user = {
                email: req.user.email,
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                admin: req.user.isAdmin,
                birth: req.user.birth,
                age: req.user.age,
            };
            res.redirect('/');
        }
    }
    async loginError(req, res){
        return res.status(401).render('loginError', { default: true, title: 'Bull Market | Log In' });
    }
    async failRegister(req, res){
        return res.redirect('/register');
    }
}