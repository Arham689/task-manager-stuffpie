import express, { Request, Response ,Router} from 'express';
import dotenv from 'dotenv';
import {dbConnect} from "./config/db"
import authRoutes from './routes/auth.routes'
import cors from 'cors';
import cookieParser from 'cookie-parser'; 
import manageTasks from './routes/manageTasks.route'

dotenv.config(); 

const PORT = process.env.PORT || 3001;
const app = express();


const corsOptions = {
    origin: [ 'http://localhost:4000' , 'https://dapper-heliotrope-04078e.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser()); 

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});


if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

dbConnect(process.env.MONGODB_URI)

app.use('/api/v1/auth', authRoutes as Router  );

app.use('/api/v1' , manageTasks as Router )

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app 
