import { Router } from "express";
import RideController from "./controllers/ride";
// import UserController from "./controllers/user";
import auth from "./auth/authMiddleware";

import CreateUserController from "./controllers/usersController/CreateUserController";
import LoginUserController from "./controllers/usersController/LoginUserController";
import ListRidesController from "./controllers/usersController/ListRidesController";
import ListParticiparionsController from "./controllers/usersController/ListParticiparionsController";
import ListAllRidesController from "./controllers/usersController/ListAllRidesController";
import CreateRideController from "./controllers/usersController/CreateRideController";
import SubscribeRideController from "./controllers/usersController/SubscribeRideController";

const router = Router();

//criar usuário
router.post("/api/user", CreateUserController.create);

//login do usuário
router.post("/api/user/login", LoginUserController.login);

// //pedais que criou
router.get("/api/user/rides", auth, ListRidesController.list);

// //pedais que usuário participou
router.get("/api/user/participations", auth, ListParticiparionsController.list);

//-----------------------------------------------------------------------------------

//lista completa de pedais
router.get("/api/ride", auth, ListAllRidesController.listAll);

//cria pedal
router.post("/api/ride/create", auth, CreateRideController.create);

//inscrever-se no pedal
router.post("/api/ride/subscribe", auth, SubscribeRideController.subscribe);

export default router;
