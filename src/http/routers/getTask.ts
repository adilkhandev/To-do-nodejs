import { NextFunction, Request, Response, Router } from "express";
import { getAll } from '../../app/database/mysql/model/task'
const router = Router();

router.get('/api/task-list', (req: Request, res: Response, next: NextFunction) => {
    const { currentUser } = req
    getAll(currentUser?.userId).then((response) => {
        res.send({ "data": response });
    }, (error) => {
        next(error)
    })

})

export { router as GetAllTask }