import dotenv from 'dotenv';

import app from './app';
dotenv.config();

const PORT = process.env.PORT || 8080

const start = () => {
    
}

app.listen(PORT, () => {
    
    console.log(`Server is up and running on ${PORT}`)
});




