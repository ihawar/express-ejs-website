import fs from 'fs';

export function readConfig() {
   try {
        return JSON.parse(fs.readFileSync('config.json'));
    } catch(e) {
        console.error("[!] Couldn't read the config file.")
        throw e;
    }
}

export const config = readConfig();

