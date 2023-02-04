import { Router, Request, Response, NextFunction } from 'express';
import UserService from '../../app/services/user';

const router = Router();

router.post('/api/signUp', async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        const error = new Error("All fields is requried") as CustomError;
        error.status = 400;
        return next(error);
    }

    const isUserAlreadyExists = await UserService.checkUserAvailable(email);

    if (isUserAlreadyExists) {
        const error = new Error("User Already Exists") as CustomError;
        error.status = 400;
        next(error)
    }

    await UserService.createUser(name, email, password);
    res.status(200).send({ massega: "Sign Up successful !" });


});


export { router as SignUpRouter }