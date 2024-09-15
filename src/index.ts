import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { DB_CREDENTIALS } from './db-credentials';
import { SCHEMA } from './schema';

async function getDb() {
    const connection = await mysql.createConnection(DB_CREDENTIALS);

    return drizzle(connection, { mode: 'default', schema: SCHEMA });
}

void (async function () {
    const db = await getDb();

    /**
     * Both query responses are typed properly
     */
    const proper_response = await db
        .insert(SCHEMA.ProperTable)
        .values({ name: 'A' })
        .$returningId();

    const faulty_response = await db
        .insert(SCHEMA.FaultyTable)
        .values({ name: 'B' })
        .$returningId();

    /**
     * But `faulty_response` will actually be { name: 1 }
     */
    console.log('proper_response:', proper_response);
    console.log('faulty_response:', faulty_response);
})();
