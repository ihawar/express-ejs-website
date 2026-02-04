import { config } from "../../utils/readConfig.js";
import ejs from 'ejs';

export default async function homeController(req, res, next) {
    res.render('layout', {
        title: config.homeTitle,
        doctorName: config.doctorName,
        specialty: config.specialty,
        clinicPhoneNumber: config.clinicPhoneNumber,
        address: config.address,
        email: config.email,
        body: await ejs.renderFile('src/views/home.ejs', {
            doctorName: config.doctorName,
            clinicPhoneNumber: config.clinicPhoneNumber,
            address: config.address,
            email: config.email,
        })
    });
}
