"use server";
import { getSession, Session } from "@auth0/nextjs-auth0";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { v4 as uuid } from "uuid";

interface Requisito {
    tipo: string;
    descripcion: string;
}

interface ResponseIa {
    requisitos: Requisito[];
}

export async function createTravel(
    origin: string,
    destination: string,
    description: string,
    list: ResponseIa
) {
    const travelId = uuid();
    try {
        const { user } = (await getSession()) as Session;
        await sql`BEGIN`;
        await sql`
        INSERT INTO travels (id, origin, destination, description, owner_id)
        VALUES (${travelId}, ${origin}, ${destination}, ${description}, ${user.sub})
        `;

        for await (const [index, requisito] of list.requisitos.entries()) {
            await sql`
            INSERT INTO todos (title, description, travel_id, position)
            VALUES (${requisito.tipo}, ${requisito.descripcion}, ${travelId}, ${index})
            `;
        }
        await sql`COMMIT`;
    } catch (error) {
        await sql`ROLLBACK`;
        return {
            message: "Failed to create travel",
        };
    }
    revalidatePath("/");
    redirect(`/guide/${travelId}`);
}

export async function getTravelsByOwner() {
    const { user } = (await getSession()) as Session;
    const response = await sql`
    SELECT * FROM travels
    WHERE owner_id = ${user.sub}
    `;
    return response.rows;
}
