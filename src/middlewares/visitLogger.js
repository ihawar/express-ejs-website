import db from '../database/db.js';

// log requests on the DB with IP and User-Agent
export default function visitLoggerMiddleware(req, res, next) {
    try {
        const ip = req.ip;
        const userAgent = req.headers['user-agent'] || null;
        const url = req.originalUrl;
        const now = Math.floor(Date.now() / 1000);

        // We check for the IP's last visit
        // if it's within the last hour
        // we do not log it
        const lastVisit = db.prepare(`
            SELECT date_time
            FROM visits
            WHERE ip_address = ?
            ORDER BY date_time DESC
            LIMIT 1
        `).get(ip);

        if (lastVisit && now - lastVisit.date_time < 60 * 60 * 1000) {
            return next();
        }

        db.prepare(`
            INSERT INTO visits (ip_address, user_agent, url, date_time)
            VALUES (?, ?, ?, ?)
        `).run(ip, userAgent, url, now);

        return next();
    } catch (err) {
        console.error('[Visit Logger Error]', err);
        next();
    }
}
