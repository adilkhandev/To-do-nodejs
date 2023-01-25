import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

import { authenticationService } from '../../common/services/authentication';
import { getUser } from '../../app/database/mysql/model/user'
const router = Router();

router.post('/api/signIn', async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        const error = new Error("Name and password is requried") as CustomError;
        error.status = 400;
        return next(error);
    }

    const currentUser = await getUser(email);
    if (!currentUser.length) {
        const error = new Error("No User Found") as CustomError;
        error.status = 400
        return next(error);
    }

    const isPasswordValid = await authenticationService.pwdCompare(currentUser[0].password, password)
    if (!isPasswordValid) {
        const error = new Error("wrong credentials") as CustomError;
        error.status = 401;
      return  next(error)
    }

    const token = jwt.sign({ email, userId: currentUser[0].uuid }, process.env.JWT_KEY!, { expiresIn: '10h' })

    req.session = { jwt: token }

    res.status(200).send({ "message": "Sign In successfully" })

});


export { router as SignInRouter }