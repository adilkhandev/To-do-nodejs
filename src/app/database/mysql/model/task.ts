import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const defaultStatusCode = 1
class TaskModel {

    async getTasks(user_id: string): Promise<Object | null> {
        const result = await prisma.task.findMany({
            where: {
                status: defaultStatusCode,
                user_id
            }, select: {
                content: true,
                id: true
            }
        });

        return result;
    }

    async createTask(content: string, user_id: string): Promise<Object> {
        const result = await prisma.task.create({
            data: {
                content,
                user_id,
                status: defaultStatusCode
            },
            select: { content: true, id: true }
        });

        return result;
    }

    async deleteTask(id: string, user_id: string) {
        const result = await prisma.task.delete({
            where: {
                id
            }
        });

        return result;
    }

    async updateTaskStatus(id: string, user_id: string, status: number) {
        const result = await prisma.task.update({
            where: {
                id,
            },
            data: {
                status
            }
        });

        return result;
    }
}

export default new TaskModel();