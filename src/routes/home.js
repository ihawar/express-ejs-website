import { Router } from "express";
import homeController from "../controllers/home/home.js";
const router = Router();

router.get('/', homeController)


export default router;
