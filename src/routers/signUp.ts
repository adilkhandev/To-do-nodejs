import { Router, Request, Response, NextFunction } from 'express';

import { signUp, getUser } from '../model/user';

const router = Router();

router.post('/api/signUp', async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        const error = new Error("Name and email is requried") as CustomError;
        error.status = 401;

        return next(error);
    }

    const isUserAvailable = await getUser(email);
    if (isUserAvailable.length) {
        const error = new Error("User Already exist") as CustomError;
        error.status = 400
        return next(error);
    }
    signUp(email, name, password).then(async () => {
        res.status(200).send({ "message": "Sign Up completed successfully" })
    }, (error) => {
        return next(error);
    })

});


export { router as SignUpRouter }