import TaskModel from '../../app/database/mysql/model/task';


class TaskService {

    async getTaskListByUserId(user_id: string) {
        const taskList = await TaskModel.getTasks(user_id);
        return taskList || []
    }

    async createTask(content: string, user_id: string) {
        return await TaskModel.createTask(content, user_id);
    }

    async deleteTask(task_id: string, user_id: string) {
        return await TaskModel.deleteTask(task_id, user_id);
    }

    async updateTaskStatus(task_id: string, user_id: string, status: number) {
        return await TaskModel.updateTaskStatus(task_id, user_id, status);
    }
}


export default new TaskService();
