import { Router, Request, Response, NextFunction } from 'express'
import task from "../../app/services/task";

const router = Router();

router.delete('/api/delete-task/:task_id', async (req: Request, res: Response, next: NextFunction) => {
    const { currentUser, params: { task_id } }: any = req;

    if (!task_id) {
        const error = new Error("Task Id missing") as CustomError;
        error.status = 400;
        next(error);
    }

    await task.deleteTask(task_id, currentUser.id)
    res.status(200).send({ message: "Task deleted successfully" });

})

export { router as DeleteTask }