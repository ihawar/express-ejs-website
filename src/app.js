import express from "express";
import cookieParser from 'cookie-parser';
import url from 'url';
import path from 'path';
// routers
import  homeRouter from './routes/home.js';
import reservationRouter  from './routes/reservation.js';
import adminHandler  from './routes/admin.js';
// middlewares
import errorHandlerMiddleware from './middlewares/error.js';
import loggingMiddleware from "./middlewares/log.js";
import visitLoggerMiddleware from "./middlewares/visitLogger.js";


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
// --------
// Middlewares
// --------
// logging
app.use(loggingMiddleware);
// parsing data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// Static files
app.use('/statics', express.static(path.join(__dirname, 'public')));
// views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', true); // FOR IPs
// visit logger
app.use(visitLoggerMiddleware)



// routers
app.use('/', homeRouter);
app.use('/reservation', reservationRouter);
app.use('/admin', adminHandler);


// 404 handler
//  * When no route is triggered
//  * these handles the job
app.use((req, res, next) => {
    const err = new Error('صفحه مورد نظر پیدا نشد');
    err.status = 404;
    next(err);
});


// error handler middleware
app.use(errorHandlerMiddleware);


export default app;
