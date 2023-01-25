import express, { Response, Request, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser'
import cookieSession from 'cookie-session';

import { SignUpRouter, SignInRouter, GetAllTask } from './http/routers'
import { currentUser } from './middleware/auth/logged-in-user';
import { requireAuth } from './middleware/auth/require-auth';

const app = express();

app.use(urlencoded({
    extended: false
}));
app.use(json());
app.use(cookieSession({
    signed: false,
    secure: false,
}))
app.use(SignUpRouter)
app.use(SignInRouter);
app.use(currentUser)

app.use(requireAuth)
app.use(GetAllTask);

declare global {
    interface CustomError extends Error {
        status?: number
    }
}
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    const error = new Error("Not Found!") as CustomError;
    error.status = 404;
    return next(error)

});

app.use((error: CustomError, req: Request, res: Response) => {
    if (error.status) {
        return res.status(error.status).json({ message: error.message })
    }

    return res.status(500).json({ message: 'oops something went wrong!' })
})

export default app