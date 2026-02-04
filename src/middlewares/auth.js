import db from '../database/db.js';

// Validates authentication session with database
export function requireSession(req, res, next) {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) return res.redirect('/admin/login');

    const now = Math.floor(Date.now() / 1000);

    const session = db.prepare(`
      SELECT s.*, a.id as user_id, a.username
      FROM sessions s
      JOIN admins a ON a.id = s.admin_id
      WHERE s.id = ? AND s.expires_at > ?
    `).get(sessionId, now);

    if (!session) {
      res.clearCookie('sessionId');
      return res.redirect('/admin/login');
    }

    req.session = {
      id: session.id,
      expiresAt: session.expires_at
    };

    req.user = {
      id: session.user_id,
      username: session.username
    };

    next();
}
