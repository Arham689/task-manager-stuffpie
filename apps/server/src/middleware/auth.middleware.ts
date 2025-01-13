
import jwt, { JwtPayload, Secret, VerifyErrors } from 'jsonwebtoken';
import { AppNextFunction, AppRequest, AppResponse } from '../types/express';
import { NextFunction, Request, Response } from 'express';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface DecodedToken extends JwtPayload {
  _id: string;
  email: string;
}

// export const authenticateToken =async (
//   req: AppRequest,
//   res: AppResponse,
//   next: AppNextFunction
// ):Promise<any> =>  {
//     console.log(req)
//   const token =
//     req.headers.authorization?.split(" ")[1] || req.cookies.token;
//   if (!token) {
//     res.status(401).json({message : 'token not found'});
//     return  
//     }
//     const decoded = await jwt.verify(token, JWT_SECRET ) as {_id: string, email: string }
//     req.user = decoded;
//     return next();
// };

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies.token;

  if (!token) {
      res.status(401).json({ message: 'Token not found' });
      return;
  }

  try {
      const decoded = jwt.verify(token, JWT_SECRET) as DecodedToken;
      req.user = { _id : decoded.userId , email: decoded.email }; //  data to req.user
      next();
  } catch (error) {
      console.error(error);
      res.status(403).json({ message: 'Invalid or expired token' });
  }
};
