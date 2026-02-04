import path from 'path';
import ejs from 'ejs';
import { config } from "../utils/readConfig.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
// Handles errors like 404 and 500
// and responds with the corresponding html page
// also logs the error
export default async function errorHandlerMiddleware(err, req, res, next) {
    console.error(
    `[!] ${new Date().toISOString()} - ${err.stack || err.message}`
    );

    const status = err.status || 500;
    let errorPage = '500.ejs';
    if (status === 404) errorPage = '404.ejs';
    // Change the response's status
    res.status(status);

    res.render('layout', {
        title: config.homeTitle,
        doctorName: config.doctorName,
        specialty: config.specialty,
        clinicPhoneNumber: config.clinicPhoneNumber,
        address: config.address,
        email: config.email,
        body: await ejs.renderFile(`src/views/errors/${errorPage}`)
    });
}
