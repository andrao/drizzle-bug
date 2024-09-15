import { bigint, mysqlTable, varchar } from 'drizzle-orm/mysql-core';

/**
 * @const ProperTable
 * @comment The primary key is defined FIRST; $returningId() will return the proper type at runtime
 */
export const ProperTable = mysqlTable('proper_table', {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }),
});

/**
 * @const FaultyTable
 * @comment The primary key is defined SECOND; $returningId() will NOT return the proper type at runtime
 */
export const FaultyTable = mysqlTable('faulty_table', {
    name: varchar('name', { length: 255 }),
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().primaryKey(),
});

export const SCHEMA = {
    ProperTable,
    FaultyTable,
};
