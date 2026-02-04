import db from '../../database/db.js';
import ejs from 'ejs';

export default async function websiteVisitsController(req, res, next) {
    const {
        q = '',
        page = '1'
    } = req.query;
    const PAGE_SIZE = 30;
    const currentPage = Math.max(parseInt(page, 10) || 1, 1);
    const offset = (currentPage - 1) * PAGE_SIZE;
    // Search query
    let searchCondition = '';
    if (q.trim() !== '') {
        searchCondition = `AND ip_address LIKE @q`;
    }
    // Count
    const countStmt = db.prepare(`
        SELECT COUNT(*) as total
        FROM visits
        WHERE 1=1
        ${searchCondition}
    `);
    const { total } = countStmt.get({
        q: `%${q}%`
    });

    const totalPages = Math.ceil(total / PAGE_SIZE);

    // Fetch data
    const dataStmt = db.prepare(`
        SELECT id, ip_address, user_agent, url, date_time
        FROM visits
        WHERE 1=1
        ${searchCondition}
        ORDER BY date_time DESC
        LIMIT @limit OFFSET @offset
    `);

    const visits = dataStmt.all({
        q: `%${q}%`,
        limit: PAGE_SIZE,
        offset
    });

    res.render('admin/layout', {
        title: "بازدید های وبسایت",
        body: await ejs.renderFile('src/views/admin/websiteVisits.ejs', {
            visits,
            filters: { q },
            pagination: {
                currentPage,
                totalPages
            },
            total
        })
    });
}
