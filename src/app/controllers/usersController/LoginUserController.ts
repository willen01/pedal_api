import { Request, Response } from "express";
import { UserRepository } from "../../repository/user/UserRespository";
import { LoginUserUseCase } from "../../UseCases/users/LoginUserUseCase";

const loginUseUseCase = new LoginUserUseCase(new UserRepository());

class LoginUserController {
  async login(req: Request, res: Response): Promise<void> {
    const { login, password } = req.body;

    try {
      const getToken = await loginUseUseCase.login(login, password);
      console.log(getToken);
      res.header("authorization", getToken);
      res.status(200).json({});
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}

export default new LoginUserController();
