import {PrismaClient} from "@prisma/client";
import {UserService} from "./users/user.service";
import dotenv from 'dotenv';
import {AuthController} from "./auth/auth.controller";
import {EmployeeService} from "./employee/employee.service";

dotenv.config();
// Busca os .envs
const tokenSecret = process.env.TOKEN_SECRET as string;
const tokenDuration = process.env.TOKEN_DURATION as string;
// Cria uma única instancia
const prisma = new PrismaClient();

// Service
const userService = new UserService();
const employeeService = new EmployeeService();

// Controller
const authController = new AuthController();

export {prisma, userService, authController,
    tokenSecret, tokenDuration, employeeService};
