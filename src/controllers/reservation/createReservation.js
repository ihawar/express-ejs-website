import db from '../../database/db.js';
import {isValidFullName,
    isValidPhone,
    normalizeText,
    normalizePhone,
} from '../../utils/reservationFormValidations.js';

export default async function createReservationController(req, res, next) {
    let { fullName, phoneNumber, message } = req.body;

    fullName = normalizeText(fullName);
    phoneNumber = normalizePhone(phoneNumber);

    if (!isValidFullName(fullName) || !isValidPhone(phoneNumber) 
        || message.length > 512) {
        return res.redirect(
        '/reservation?error=لطفا اطلاعات خود را به‌درستی وارد کنید'
        );
    }
    try {
        db.prepare(`
        INSERT INTO reservations 
        (fullname, phone, message, created_at)
        VALUES (?, ?, ?, ?)`).run(
            fullName, phoneNumber, message.trim(), Math.floor(Date.now() / 1000)
        )
    } catch(e) {
        e.status = 500;
        return next(e);
    }

    res.redirect(
        '/reservation?success=اطلاعات شما ثبت شد. به زودی با شما تماس خواهیم گرفت'
    );
}
