// log each request
export default function loggingMiddleware(req, res, next) {
    res.on('finish', () => {
        console.log(
            `[+] ${req.method} ${req.url} → ${res.statusCode}`
        );
    });
    next();
}