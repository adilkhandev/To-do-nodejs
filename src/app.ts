import express, { Response, Request, NextFunction } from 'express';
import { json, urlencoded } from 'body-parser'


import { SignUpRouter, SignInRouter, GetAllTask,createTask, DeleteTask } from './http/routers'
import { currentUser } from './http/routers/middleware/current-user';
import { requireAuth } from './http/routers/middleware/require-auth';
import { UpdateTask } from './http/routers/updateTask';

const app = express();

app.use(urlencoded({
    extended: false
}));
app.use(json());

app.use(SignUpRouter)
app.use(SignInRouter);
app.use(currentUser)

app.use(requireAuth);
app.use(GetAllTask);
app.use(createTask);
app.use(DeleteTask);
app.use(UpdateTask);

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

app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const errStatus = err.status || 500;
    const errMsg = err.message || 'Something went wrong';
    res.status(errStatus).json({
        status: errStatus,
        message: errMsg
    })
})

export default app