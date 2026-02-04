import db from '../../database/db.js';
import { hashPassword, generateSessionId } from '../../utils/auth.js';

export async function loginViewController(req, res, next) {
    const { error } = req.query;
    res.render('admin/login', {error: error});
}

export async function loginPostController(req, res, next) {
    const {username, password} = req.body;
    const user = db.prepare(`
        SELECT id, username, password_hash
        FROM admins
        WHERE username = ? AND password_hash = ?
        `
    ).get(username, hashPassword(password));
    if (!user) {
        return res.redirect('/admin/login?error=اطلاعات وارد شده صحیح نمی باشند.')
    }

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = 60 * 60 * 24 * 7; // 7 days
    const sessionId = generateSessionId();
    db.prepare(`
        INSERT INTO sessions (id, admin_id, created_at, expires_at)
        VALUES (?, ?, ?, ?)
        `).run(
            sessionId,
            user.id,
            now,
            now + expiresIn,);

    res.cookie('sessionId', sessionId, {
        httpOnly: true,
        sameSite: 'lax',
        secure: true
    });

    return res.redirect('/admin');
}
