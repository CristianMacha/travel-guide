import { getTodosByTravel } from "@/actions/todo.actions";
import { Button } from "@/components/ui/button"

import Todo from "./todo";
import Link from "next/link";

export default async function Guide({ params }: { params: { id: string } }) {
    const id = params.id;
    const todos = await getTodosByTravel(id);
    return (
        <main className="px-4">
            <div className="py-5 md:py-10 scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl">
                <div>
                    <Button asChild variant="link">
                        <Link href={`/`}>Volver a inicio</Link>
                    </Button>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                    {
                        todos.map((todo: any) => (
                            <Todo key={todo.id} todo={todo} travelId={id} />
                        ))
                    }
                </div>
            </div>
        </main>
    );
}