import { Router } from "express";
import reservationFormController from "../controllers/reservation/reservationForm.js";
import createReservationController from "../controllers/reservation/createReservation.js";

const router = Router();

router.get('/', reservationFormController);
router.post('/', createReservationController);

export default router;
