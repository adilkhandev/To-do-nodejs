import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UserService from '../../app/services/user';
import { authenticationService } from '../../app/services/auth';
import { stringify } from 'uuid';

const router = Router();

router.post('/api/signIn', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Name and password is requried") as CustomError;
        error.status = 400;
        return next(error);
    }

    const currentUser: any = await authenticationService.verifyUser(email);
    if (!currentUser) {
        const error = new Error("No User Found") as CustomError;
        error.status = 400
        return next(error);
    }

    const isPasswordValid = await UserService.pwdCompare(currentUser.password, password)
    if (!isPasswordValid) {
        const error = new Error("wrong credentials") as CustomError;
        error.status = 401;
        return next(error)
    }
    const token = jwt.sign({ email, userId: currentUser.uuid }, process.env.JWT_KEY!, { expiresIn: '10h' });
    res.status(200).send({ "message": "Sign In successfully", "token": token })

});


export { router as SignInRouter }