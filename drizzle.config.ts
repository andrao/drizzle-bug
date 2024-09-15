import type { Config } from 'drizzle-kit';
import { DB_CREDENTIALS } from './src/db-credentials';

export default {
    schema: './src/schema.ts',
    dialect: 'mysql',
    dbCredentials: DB_CREDENTIALS,
    out: '.drizzle',
} satisfies Config;
