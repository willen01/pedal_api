import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

type JwtPayload = {
  id: string;
};

function auth(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;
  if (!authorization)
    //verifica se a aplicação recebe no header o a propriedade authorization
    return response.status(403).json({ message: "acess denied" });

  const [, token] = authorization.split(" "); //separa o token

  try {
    jwt.verify(token, process.env.JWT_TOKEN); //compara o token com o segredo
    next();
  } catch (error) {
    response.status(403).json({ error: "invalid token" });
  }
}

export default auth;
