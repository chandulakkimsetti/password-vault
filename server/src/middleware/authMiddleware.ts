// server/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: { id: string };
}

export const protect = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in your .env file');
    }

    const decoded = jwt.verify(token, jwtSecret) as { user: { id: string } };
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error('--- TOKEN VERIFICATION FAILED ---');
    console.error('Token Received:', token);
    console.error('JWT Secret Used:', process.env.JWT_SECRET);
    // We can just cast the error to 'any' to access its message property
    console.error('Error Message:', (error as any).message);

    res.status(401).json({ message: 'Token is not valid' });
  }
};