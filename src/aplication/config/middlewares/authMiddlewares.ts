import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPlayload {
    id: string;
    iat: number;
    exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(403).send("Unauthorized client");
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const data = jwt.verify(token, "secret");

    const { id } = data as TokenPlayload;

    req.userId = id;

    return next();

  } catch (error) {
    return error;
  }
}
