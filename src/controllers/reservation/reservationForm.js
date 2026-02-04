import { config } from "../../utils/readConfig.js";
import ejs from 'ejs';

export default async function reservationFormController(req, res, next) {
    const { error, success } = req.query;

    res.render('layout', {
        title: "رزرو نوبت",
        doctorName: config.doctorName,
        specialty: config.specialty,
        clinicPhoneNumber: config.clinicPhoneNumber,
        address: config.address,
        email: config.email,
        error,
        success,
        body: await ejs.renderFile('src/views/reservation.ejs', {
        error,
        success
        })
    });
}
