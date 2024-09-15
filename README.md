# drizzle-bug

This repository reproduces the bug described in https://github.com/drizzle-team/drizzle-orm/issues/2971.

## To use this repo

1. Set database credentials in _src/db-credentials.ts_.
2. Start MySQL server.
3. Run `pnpm db:push` to push tables to databases.
4. Run `pnpm start` to run the script at _src/index.ts_.


---

## Issue

When using MySQL `.$returningId()`, the key on the response at runtime will always use the name of the **first column defined** in the table definition, and **not necessarily the primary key column**.

To illustrate, consider two tables:

```ts
// Here, the primary key is defined FIRST; $returningId() will return the proper type at runtime
export const ProperTable = mysqlTable('proper_table', {
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().primaryKey(),
    name: varchar('name', { length: 255 }),
});

// Here, the primary key is defined SECOND; $returningId() will NOT return the proper type at runtime
export const FaultyTable = mysqlTable('faulty_table', {
    name: varchar('name', { length: 255 }),
    id: bigint('id', { mode: 'number', unsigned: true }).autoincrement().primaryKey(),
});
```

When we use `.$returningId()` with the latter, we get the proper ID value, but it's stored under the wrong key:

```ts
// Both query responses are typed properly
const proper_response = await db
    .insert(SCHEMA.ProperTable)
    .values({ name: 'A' })
    .$returningId();

const faulty_response = await db
    .insert(SCHEMA.FaultyTable)
    .values({ name: 'B' })
    .$returningId();

// But the latter will use the wrong key
console.log('proper_response:', proper_response); // { id: 1 }
console.log('faulty_response:', faulty_response); // { name: 1 }
```
