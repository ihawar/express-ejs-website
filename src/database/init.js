import db from "./db.js";

console.log("[-] Creating database tables.");

// --------------------
// RESERVATIONS
// --------------------
db.prepare(`
  CREATE TABLE IF NOT EXISTS reservations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    fullname TEXT NOT NULL,
    phone TEXT NOT NULL,

    message TEXT CHECK (length(message) <= 512),

    status TEXT NOT NULL DEFAULT 'PENDING'
      CHECK (status IN ('PENDING', 'DECLINED', 'ACCEPTED')),

    visit_date_time INTEGER DEFAULT NULL, 
    created_at INTEGER NOT NULL  
  )
`).run();
console.log("[+] 'reservations' table created.");

// --------------------
// ADMINS
// --------------------
db.prepare(`
  CREATE TABLE IF NOT EXISTS admins (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL
  )
`).run();
console.log("[+] 'admins' table created.");


// --------------------
// ADMINS SESSIONS
// --------------------
db.prepare(`
  CREATE TABLE IF NOT EXISTS sessions (
    id TEXT PRIMARY KEY,
    admin_id INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL,

    FOREIGN KEY (admin_id) REFERENCES admins(id)
      ON DELETE CASCADE
  )
`).run();
console.log("[+] 'sessions' table created.");


// --------------------
// VISITS
// --------------------
db.prepare(`
  CREATE TABLE IF NOT EXISTS visits (
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    ip_address TEXT NOT NULL,
    user_agent TEXT,
    url TEXT NOT NULL,

    date_time INTEGER NOT NULL
  )
`).run();
console.log("[+] 'visits' table created.");
