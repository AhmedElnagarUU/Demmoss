// Prints the value for ADMIN_PASSWORD_HASH in .env.
// Usage: npm run hash-password -- "your password"
// Same format as src/features/admin/auth/password.ts: scrypt$<saltHex>$<hashHex>
import { randomBytes, scryptSync } from "node:crypto";

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run hash-password -- "your password"');
  process.exit(1);
}

const salt = randomBytes(16);
const hash = scryptSync(password, salt, 64);
console.log(`scrypt$${salt.toString("hex")}$${hash.toString("hex")}`);
