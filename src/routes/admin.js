import { Router } from "express";
import ejs from "ejs";
// Middlewares
import { requireSession } from "../middlewares/auth.js";
// Controllers
import { loginViewController, loginPostController } from "../controllers/auth/login.js";
import logoutController from "../controllers/auth/logout.js";
import dashboardController from "../controllers/admin/dashboard.js";
import {reservationDetailController, 
    acceptReservationController,
    declineReservationController
} from "../controllers/admin/reservationDetail.js";
import websiteVisitsController from "../controllers/admin/websiteVisits.js";

const router = Router();

router.get('/login', loginViewController);

router.post('/login', async (req, res, next) => {
    try {
        return await loginPostController(req, res, next);
    } catch(e) {
            e.status = 500;
            return next(e);
    }
})

router.get('/logout', requireSession, logoutController);

router.get('/', requireSession, async (req, res, next) => {
    try {
        return await dashboardController(req, res, next);

    } catch(e) {
        e.status = 500;
        return next(e);
    }
});

router.get('/reservation/:id', requireSession, async (req, res, next) => {
    try {
        return await reservationDetailController(req, res, next)
    }catch(e) {
        e.status = 500;
        return next(e);
    }
})

router.post('/reservation/:id/accept', requireSession, async (req, res, next) => {
    try {
        return await acceptReservationController(req, res, next);
    } catch (err) {
        err.status = 500;
        return next(err);
    }
});

router.post('/reservation/:id/decline', requireSession, async (req, res, next) => {
  try {
    return await declineReservationController(req, res, next);
  } catch (err) {
    err.status = 500;
    return next(err);
  }
});


router.get('/website-visits', requireSession, async (req, res, next) => {
    try {
        return await websiteVisitsController(req, res, next);
    } catch (err) {
        err.status = 500;
        return next(err);
    }    
});


export default router;
