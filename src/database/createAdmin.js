import readline from 'node:readline';
import { hashPassword } from '../utils/auth.js';
import db from './db.js';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, answer => resolve(answer));
  });
}

async function createAdmin() {
  const username = await ask('Enter username: ');
  const passwordRaw = await ask('Enter password: ');
  const passwordHash = hashPassword(passwordRaw);

  rl.close();

  const q = db.prepare(`
    INSERT INTO admins (username, password_hash)
    VALUES (?, ?)
  `);

  q.run(username, passwordHash);

  console.log('[+] User created.');
}

createAdmin();
