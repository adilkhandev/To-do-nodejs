import UserModel from '../../app/database/mysql/model/user';
import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'


const scryptAsync = promisify(scrypt);
class UserService {

    async pwdToHash(password: string) {
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsync(password, salt, 64)) as Buffer;
        return `${buf.toString('hex')}.${salt}`
    }

    async pwdCompare(storedPassword: string, suppliedPassword: string) {
        const [hashedPassword, salt] = storedPassword.split('.');
        const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer
        return buf.toString('hex') === hashedPassword
    }

    async checkUserAvailable(email: string): Promise<boolean> {
        const user = await UserModel.getUser(email);
        return user ? true : false
    }

    async createUser(name: string, email: string, password: string) {
        const passwordHash = await this.pwdToHash(password);
        const user = await UserModel.createUser(email, name, passwordHash)
    }

    async getUserDetails(email: string, id?: string): Promise<Object | null> {
        const getExtraFields = { password: true }
        return await UserModel.getUser(email, id, getExtraFields)
    }
}


export default new UserService();
