import { DBCLient } from "../connection";

export const getAll = (userId: string | undefined) => {
    const sql = `select * from task where user_id='${userId}'`;
    return new Promise((resolve, reject) => {
        DBCLient.query(sql, (err, result) => {
            if (err) {
                console.log("err",err);
                const error = new Error("Oops something went wrong") as CustomError;
                error.status = 500;
                reject(error);
            }

            return resolve(result);

        })
    })

}


