import { Request, Response, NextFunction } from "express";

export type AppRequest = Request;
export type AppResponse = Response;
export type AppNextFunction = NextFunction;

declare global {
  namespace Express {
    interface User {
      _id: string, 
      email: string 
    }

    interface Request {
      user?: User,
    }
  }
}