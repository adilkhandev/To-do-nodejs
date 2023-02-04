import { Command } from "commander";
import jwt from 'jsonwebtoken';

import UserService from '../app/services/user';
import { authenticationService } from '../app/services/auth';
import task from "../app/services/task";

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
    .alias("si")
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



program
    .command("sign-up <email> <name> <password>")
    .description("Create a user")
    .alias("su")
    .action(async (email, name, password) => {
        const isUserAlreadyExists = await UserService.checkUserAvailable(email);

        if (!isUserAlreadyExists) {
            const error = new Error("User Already Exists") as CustomError;
            error.status = 400;
            console.log("error", error);

        }

        await UserService.createUser(name, email, password);

        console.log("Sign Up successful !");
    })

program
    .command("get-task <token>")
    .description("Create a user")
    .alias("g")
    .action(async (token) => {
        const payload = (jwt.verify(token, process.env.JWT_KEY!)) as JwtPayload;
        const user: any = await authenticationService.verifyUser(payload.email);
        const tasks = await task.getTaskListByUserId(user.userId);
        console.log("tasks", tasks);

    })


program
    .command("update-task <token> <task_id> <task_status>")
    .description("Create a user")
    .alias("tu")
    .action(async (token, task_id, task_status) => {
        const payload = (jwt.verify(token, process.env.JWT_KEY!)) as JwtPayload;
        const user: any = await authenticationService.verifyUser(payload.email);
        await task.updateTaskStatus(task_id, user.id, parseInt(task_status));
        console.log("Task Updated successfully !!");

    })

program.parse(process.argv);

