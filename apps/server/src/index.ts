import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import {dbConnect} from "./config/db.ts"
const cors = require('cors')

dotenv.config(); 

const PORT = process.env.PORT || 3001;
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    exposedHeaders: ['set-cookie'],
  };
  
app.use(cors(corsOptions)); // Use CORS middleware with options
app.use(express.json());


app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express with TypeScript!');
});


if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
}

dbConnect(process.env.MONGODB_URI)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



// {
//     "scripts": {
//       "build": "tsc",
//       "start": "node dist/server.js",
//       "dev": "ts-node src/server.ts"
//     }
//   }