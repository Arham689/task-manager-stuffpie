
// custom.d.ts
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; email: string }; // Modify this based on the structure of your user object
    }
  }
}
