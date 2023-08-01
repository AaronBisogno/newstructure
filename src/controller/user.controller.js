import { UserService } from "../services/user.service.js";

const userService = new UserService();

export class UserController{
    async getAll (req, res){
        try {
            const users = await userService.getUsers();
            return res.status(200).json({
                status: 'success',
                msg: 'Users list',
                data: users,
            });
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
    async create (req, res){
        const { firstName, lastName, email } = req.body;
        try {
            const user = await userService.createUser(firstName, lastName, email);
            return res.status(201).json({
                status: 'success',
                msg: 'User created!',
                data: user,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
    async updateUserById(req, res){
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        try {
            const user = await userService.updateUser(id, firstName, lastName, email);
            return res.status(201).json({
                status: 'success',
                msg: 'user Updated',
                data: user,
            });
        } catch (e) {
            return res.status(500).json({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
    async deleteUserById(req, res){
        try {
            const { id } = req.params;
            const deleted = await userService.deleteUser(id);
            return res.status(200).json({
                status: 'success',
                msg: 'user deleted',
                data: deleted,
            });
        } catch (e) {
            console.log(e);
            return res.status(500).json({
                status: 'error',
                msg: 'Something went wrong!',
            });
        }
    }
}