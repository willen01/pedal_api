// import { Request, Response } from "express";
// import UserUseCase from "../UseCases/users/CreateUserUseCase";

// type bearer_token = {
//   authorization: string;
// };

// class UserController {
//   async create(request: Request, response: Response) {
//     const user = request.body;

//     try {
//       const savedUser = await UserUseCase.create(user);
//       response.status(201).json(savedUser);
//     } catch (error) {
//       response.status(500).json({ errors: error });
//     }
//   } //cria um novo usuário

//   async login(request: Request, response: Response) {
//     const { login, password } = request.body;

//     try {
//       const tokenUser = await UserUseCase.login(login, password);
//       response.header("authorization", tokenUser); //envia o token pela propriedade 'authorization' no header da aplicação
//       response.status(200).json();
//     } catch (error) {
//       response.status(404).json({ error });
//     }
//   } //login para usuários cadastrados

//   async rides(request: Request, response: Response): Promise<void> {
//     const { authorization } = request.headers as bearer_token; //pega o token no header da aplicação pela propriedade authorization no formato 'Bearer <token>'

//     const events = await UserUseCase.rides(authorization);

//     response.status(200).json(events);
//   } // eventos que o usuário criou

//   async participations(request: Request, response: Response) {
//     const { authorization } = request.headers as bearer_token; //pega o token no header da aplicação pela propriedade authorization no formato 'Bearer <token>'

//     const events = await UserUseCase.participations(authorization);

//     response.status(200).json(events);
//   } //eventos que o usuário participou
// }

// export default new UserController();
