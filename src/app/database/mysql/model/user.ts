import { DBCLient } from '../connection';
import { v4 as uuidv4 } from 'uuid';


import { authenticationService } from '../../../../common/services/authentication';

export const signIn = async (email: string, password: string): Promise<Object> => {
    return new Promise(async (resolve, reject) => {
        
    });
}

export const signUp = (email: string, name: string, password: string): Promise<Object> => {
    return new Promise(async (resolve, reject) => {
        const uuid = uuidv4();
        const pwd = await authenticationService.pwdToHash(password)
        const sql = `INSERT INTO user (UUID, NAME, email, task_ids, password,STATUS) 
        VALUES ('${uuid}', '${name}', '${email}','', '${pwd}','1')`;
        DBCLient.query(sql, (err, result) => {
            if (err) {
                const error = new Error("Unable to SignUp") as CustomError;
                error.status = 400;
                return reject(error)
            }
            return resolve(result)

        })

    })
}

export const getUser = (email: string): any => {
    return new Promise((resolve, reject) => {
        const sql = `Select * From user Where email='${email}'`;

        DBCLient.query(sql, (err, result) => {
            if (err) {
                const error = new Error("Oops something went wrong") as CustomError;
                error.status = 400;
                return reject(error);
            }

            return resolve(result);
        })

    })
}

