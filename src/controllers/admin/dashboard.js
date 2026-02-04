import db from '../../database/db.js';
import ejs from 'ejs';

export default async function dashboardController(req, res, next) {
    const {
        q = '',
        status = 'all',
        time = 'month',
        page = '1'
    } = req.query;

    const PAGE_SIZE = 10;
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const offset = (currentPage - 1) * PAGE_SIZE;

    // timing filter
    let timeCondition = '';
    const now = Math.floor(Date.now() / 1000);
    switch (time) {
        case 'day':
        timeCondition = `AND created_at >= ${now - 86400000}`;
        break;
        case '3days':
        timeCondition = `AND created_at >= ${now - 3 * 86400000}`;
        break;
        case 'week':
        timeCondition = `AND created_at >= ${now - 7 * 86400000}`;
        break;
        case 'month':
        timeCondition = `AND created_at >= ${now - 30 * 86400000}`;
        break;
        case 'all':
        default:
        timeCondition = '';
    }

    // Status filter 
    let statusCondition = '';
    if (status !== 'all') {
        statusCondition = `AND status = @status`;
    }

    // Search
    let searchCondition = '';
    if (q.trim() !== '') {
        searchCondition = `AND fullname LIKE @q`;
    }

    // Count
    const countStmt = db.prepare(`
        SELECT COUNT(*) as total
        FROM reservations
        WHERE 1=1
        ${timeCondition}
        ${statusCondition}
        ${searchCondition}
    `);

    const { total } = countStmt.get({
        status,
        q: `%${q}%`
    });

    const totalPages = Math.ceil(total / PAGE_SIZE);

    // Fetch data
    const dataStmt = db.prepare(`
        SELECT id, fullname, status, created_at, phone
        FROM reservations
        WHERE 1=1
        ${timeCondition}
        ${statusCondition}
        ${searchCondition}
        ORDER BY created_at DESC
        LIMIT @limit OFFSET @offset
    `);

    const reservations = dataStmt.all({
        status,
        q: `%${q}%`,
        limit: PAGE_SIZE,
        offset
    });

    // Fetch reservations and website views count 
    const {reservationCount} = db.prepare(`
        SELECT COUNT(*) as reservationCount
        FROM reservations
        WHERE 1=1
    `).get();
    const {visitsCount} = db.prepare(`
        SELECT COUNT(*) as visitsCount
        FROM visits
        WHERE 1=1
    `).get();

    res.render('admin/layout', {
        title: 'پنل مدیریت',
        body: await ejs.renderFile('src/views/admin/dashboard.ejs', {
        reservations,
        filters: { q, status, time },
        pagination: {
            currentPage,
            totalPages
        },
        reservationCount: reservationCount,
        visitsCount: visitsCount
        })
    });
}
