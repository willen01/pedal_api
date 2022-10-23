import jwt from "jsonwebtoken";

type JwtType = {
  id: string;
};

export class DecodeToken {
  constructor(private bearer_token: string) {}

  getId() {
    const [, token] = this.bearer_token.split(" "); //separa o token

    const { id } = jwt.decode(token) as JwtType;
    return id; //retorna o id recebido no payload do token jwt
  }
}
