import { Router, Request, Response, NextFunction } from 'express'
import task from "../../app/services/task";

const router = Router();

router.put('/api/update-task/:task_id/:task_status', async (req: Request, res: Response, next: NextFunction) => {
    const { currentUser, params: { task_id, task_status } }: any = req;

    if (!task_id) {
        const error = new Error("Task Id missing") as CustomError;
        error.status = 400;
        next(error);
    }

    await task.updateTaskStatus(task_id, currentUser.id, parseInt(task_status));
    res.status(200).send({ message: "Task updated successfully" });

})

export { router as UpdateTask }