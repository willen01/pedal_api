import { Router } from "express";
import RideController from "./controllers/ride";
import UserController from "./controllers/user";
import auth from "./auth/authMiddleware";

const router = Router();

//criar usuário
router.post("/api/user", UserController.create);

//login do usuário
router.post("/api/user/login", UserController.login);

//pedais que criou
router.get("/api/user/rides", auth, UserController.rides);

//pedais que usuário participou
router.get("/api/user/participations", auth, UserController.participations);

//lista completa de pedais
router.get("/api/ride", auth, RideController.list);

//cria pedal
router.post("/api/ride/create", auth, RideController.create);

//inscrever-se no pedal
router.post("/api/ride/subscribe", auth, RideController.subscribe);

export default router;
