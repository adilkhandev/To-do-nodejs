import { Router, Request, Response, NextFunction } from 'express'
import task from "../../app/services/task";

const router = Router();

router.post('/api/create-task', async (req: Request, res: Response, next: NextFunction) => {
    const { currentUser, body: { content } }: any = req;
   
    if (!content || content.length < 10) {
        const error = new Error("Content can't be less then 10 char and can't be missing") as CustomError;
        error.status = 400;
        next(error);
    }
 
    const result = await task.createTask(content, currentUser.id)
    res.status(200).send({ message: "Task create successfully", data: result });

})

export { router as createTask }