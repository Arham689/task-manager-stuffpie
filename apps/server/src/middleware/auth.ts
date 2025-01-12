import { Request, Response, NextFunction } from 'express';
import jwt ,{JwtPayload} from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
    userId: string;
    email: string;
  }
  
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) : void  => {
    const token =  req.cookies.token ;
    console.log(req.cookies)
    //req.header('Authorization')?.replace('Bearer ', '') 
    if (!token) {
        res.status(401).json({ message: 'Access denied. No token provided.' });
        return ;
    }

    jwt.verify(token, JWT_SECRET, (err : any ) => {
        if (err) {
            res.status(403).json({ message: 'Invalid or expired token.' });
            return ;
        }
        next();
    });
};
