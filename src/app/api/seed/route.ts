import { db } from "@vercel/postgres";
const client = await db.connect();

async function seedTravel() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS travels (
        id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        origin          VARCHAR(80) NOT NULL,
        destination     VARCHAR(80) NOT NULL,
        description     TEXT NULL,
        owner_id        VARCHAR(50) NOT NULL,
        completed       BOOLEAN DEFAULT FALSE,
        is_active       BOOLEAN DEFAULT TRUE
        );
    `;
}

async function seedTodo() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await client.sql`
        CREATE TABLE IF NOT EXISTS todos (
        id              UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title           VARCHAR(80) NOT NULL,
        description     TEXT NULL,
        completed       BOOLEAN DEFAULT FALSE,
        is_active       BOOLEAN DEFAULT TRUE,
        travel_id       UUID NOT NULL,
        position        INT DEFAULT 0
        );
    `;
}

async function deleteTables() {
    await client.sql`DROP TABLE IF EXISTS todos`;
    await client.sql`DROP TABLE IF EXISTS travels`;
    await client.sql`DROP TABLE IF EXISTS type_registrations`;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        await seedTravel();
        await seedTodo();
        // await deleteTables();
        await client.sql`COMMIT`;

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({ error }, { status: 500 });
    }
}
