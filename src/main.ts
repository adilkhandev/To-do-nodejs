import express, { Router } from 'express';
import dotenv from 'dotenv';

dotenv.config()
const PORT = 8080
const app = express();

app.listen(PORT, () => {
    console.log(`Server is up and runnig on ${PORT}`)
});




