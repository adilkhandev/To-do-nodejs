import UserService from './user';
import dotenv from 'dotenv';

dotenv.config();

class AuthService {

    async verifyUser(email: string): Promise<Object | null> {
        try {
            const user = await UserService.getUserDetails(email)
            if (!user) new Error('Invalid User');
            return user

        } catch (err) {
            return new Error('Not AuthorizedError')
        }

    }
}

export const authenticationService = new AuthService()