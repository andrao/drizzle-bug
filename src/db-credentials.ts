import type { Config } from 'drizzle-kit';

/**
 * @todo Set DB connection params
 */
export const DB_CREDENTIALS = {
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: '',
} satisfies Extract<Config, { dialect: 'mysql' }>['dbCredentials'];
