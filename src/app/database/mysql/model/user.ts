import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

class UserModel {
    async getUser(email?: string, id?: string, selectedFields: object = {}): Promise<Object | null> {
        const defaultSelectedFields = { id: true, email: true }
        const result = await prisma.user.findFirst({
            where: {
                status: 1,
                id,
                OR: [
                    { id },
                    { email },
                ],
            }, select: { ...defaultSelectedFields, ...selectedFields }
        });

        return result;
    }

    async createUser(email: string, name: string, password: string): Promise<Object> {
        const result = await prisma.user.create({
            data: {
                email: email,
                name: name,
                password: password
            },
            select: {
                status: true
            }
        });

        return result;
    }

    signIn(email: string, password: string) {

    }
}

export default new UserModel();


















// export interface SignUp {
//     name: string,
//     id: string
// }

// export const signUp = async (email: string, password: string): Promise<Object> => {
//     const result = await prisma.signUp.findUnique({
//         where: {
//             id: email
//         }
//     });
//     return result

// }

// // export const signUp = (email: string, name: string, password: string): Promise<Object> => {
// //     return new Promise(async (resolve, reject) => {
// //         const uuid = uuidv4();
// //         const pwd = await authenticationService.pwdToHash(password)
// //         const sql = `INSERT INTO user (UUID, NAME, email, task_ids, password,STATUS)
// //         VALUES ('${uuid}', '${name}', '${email}','', '${pwd}','1')`;
// //         DBCLient.query(sql, (err, result) => {
// //             if (err) {
// //                 const error = new Error("Unable to SignUp") as CustomError;
// //                 error.status = 400;
// //                 return reject(error)
// //             }
// //             return resolve(result)

// //         })

// //     })
// // }

// export const getUser = (email: string): any => {
//     const result = await prisma.signUp.findUnique({
//         where: {
//             id: email
//         }
//     });
//     return result
// }

