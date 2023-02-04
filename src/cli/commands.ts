import { Command } from "commander";
import jwt from 'jsonwebtoken';

import UserService from '../app/services/user';
import { authenticationService } from '../app/services/auth';

// import inquirer from 'inquirer'
const program = new Command();


//sign-in criteria 
// const signIn = [
//     { "type": "input", name: "email", messgage: "Please enter the email" },
//     { "type": "input", name: "password", messgage: "Please enter the your password" }
// ];

program
    .version("1.1.0")
    .description("An To-Do listing app")

program
    .command("sign-in <email> <password>")
    .description("Add new task")
    .alias("a")
    .action(async (email, password) => {
        const currentUser: any = await authenticationService.verifyUser(email);
        
        if (!currentUser) {
            const error = new Error("Not a valid user") as CustomError;
            error.status = 401;
            console.log("error", error);

        }

        const isPasswordValid = await UserService.pwdCompare(currentUser.password, password)
        if (!isPasswordValid) {
            const error = new Error("wrong credentials") as CustomError;
            error.status = 401;
            console.log("error", error);
        }

        const token = jwt.sign({ email, userId: currentUser.uuid }, process.env.JWT_KEY!, { expiresIn: '10h' });
        console.log(token);
    })

program.parse(process.argv);

