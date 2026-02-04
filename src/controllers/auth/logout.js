import db from "../../database/db.js";

export default async function logoutController(req, res, next) {
    const sid = req.cookies.sid;
    if (sid) {
        db.prepare(`DELETE FROM sessions WHERE id = ?`).run(sid);
    }

    res.clearCookie('sessionId');
    return res.redirect('/');
}
