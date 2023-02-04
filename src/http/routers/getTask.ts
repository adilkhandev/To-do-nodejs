import { NextFunction, Request, Response, Router } from "express";
import task from "../../app/services/task";
const router = Router();

router.get('/api/task-list', (req: Request, res: Response, next: NextFunction) => {
    const { currentUser }: any = req
    task.getTaskListByUserId(currentUser.userId).then((response) => {
        res.send({ "data": response });
    }, (error) => {
        console.log("error",error);
        next(error)
    })

})

export { router as GetAllTask }