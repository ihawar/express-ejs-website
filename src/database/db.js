import Database from "better-sqlite3";
import { config } from '../utils/readConfig.js';

const db = new Database(config.database_address);
db.pragma('journal_mode = WAL');


function cleanExit() {
  console.log('\n[!] Closing database...');
  db.close();
  process.exit(0);
}

process.on('SIGINT', cleanExit);  
process.on('SIGTERM', cleanExit);
process.on('exit', () => {
  if (db.open) {
    db.close();  
}
});

export default db;
