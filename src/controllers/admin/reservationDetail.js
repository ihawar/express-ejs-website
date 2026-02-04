import db from '../../database/db.js';
import ejs from 'ejs';

export async function reservationDetailController(req, res, next) {
    const reservationId = Number(req.params.id);
    if (!Number.isInteger(reservationId) || reservationId <= 0) {
    const err = new Error();
    err.status = 404;
    return next(err);
    }

    const reservation = db.prepare(`
        SELECT * FROM reservations
        WHERE id = ?
    `).get(reservationId);
    if (!reservation) {
        const error = new Error();
        error.status = 404;
        return next(error)
    }
    res.render('admin/layout', {
        title: `ویزیت ${reservation.fullname}`,
        body: await ejs.renderFile('src/views/admin/reservation.ejs', {
        reservation
        })
    });
}

export async function acceptReservationController(req, res, next) {
    const reservationId = Number(req.params.id);

    if (!Number.isInteger(reservationId) || reservationId <= 0) {
        const err = new Error('Invalid reservation id');
        err.status = 404;
        return next(err);
    }

    const reservation = db.prepare(`
        SELECT status FROM reservations
        WHERE id = ?
    `).get(reservationId);

    if (!reservation) {
        const err = new Error('Reservation not found');
        err.status = 404;
        return next(err);
    }

    db.prepare(`
        UPDATE reservations
        SET status = 'ACCEPTED'
        WHERE id = ?
    `).run(reservationId);

    res.redirect(`/admin/reservation/${reservationId}`);
}

export async function declineReservationController(req, res, next) {
    const reservationId = Number(req.params.id);

    if (!Number.isInteger(reservationId) || reservationId <= 0) {
      const err = new Error('Invalid reservation id');
      err.status = 404;
      return next(err);
    }

    const reservation = db.prepare(`
      SELECT status FROM reservations
      WHERE id = ?
    `).get(reservationId);

    if (!reservation) {
      const err = new Error('Reservation not found');
      err.status = 404;
      return next(err);
    }

    db.prepare(`
      UPDATE reservations
      SET status = 'DECLINED'
      WHERE id = ?
    `).run(reservationId);

    res.redirect(`/admin/reservation/${reservationId}`);
}
