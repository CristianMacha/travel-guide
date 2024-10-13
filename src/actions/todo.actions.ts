"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

export async function getTodosByTravel(travelId: string) {
    const response = await sql`
    SELECT * FROM todos
    WHERE travel_id = ${travelId}
    ORDER BY position ASC
    `;
    return response.rows;
}

export async function updateTodoAndCheckCompletion(
    todoId: string,
    travelId: string
) {
    await sql`
    UPDATE todos
    SET completed = NOT completed
    WHERE id = ${todoId}
    `;

    const { rows: todos } = await sql`
    SELECT completed
    FROM todos
    WHERE travel_id = ${travelId}
    `;

    const allCompleted = todos.every((todo) => todo.completed);

    if (allCompleted) {
        await sql`
        UPDATE travels
        SET completed = true
        WHERE id = ${travelId}
    `;
    }

    revalidatePath(`/guide/${travelId}`);
    revalidatePath("/");
}
