'use client'

import { updateTodoAndCheckCompletion } from "@/actions/todo.actions";
import { useState } from "react";

export default function Todo({ todo, travelId }: { todo: { id: string, title: string, description: string, completed: boolean }, travelId: string }) {
    const [completed, setCompleted] = useState<boolean>(todo.completed);
    const handleUpdateTodo = () => {
        console.log('Update todo');
    }

    const handleCheckboxChange = async () => {
        setCompleted(!completed);
        await updateTodoAndCheckCompletion(todo.id, travelId);
    }

    return (
        <div onClick={handleUpdateTodo} className={`border p-4 rounded-md ${completed ? 'border-blue-500 bg-blue-50' : ''}`}>
            <div className="flex flex-row gap-4 items-center">
                <input type="checkbox" checked={completed} onChange={handleCheckboxChange} />
                <div>
                    <h3 className="font-medium">{todo.title}</h3>
                    <p className="font-normal text-gray-600 text-sm">{todo.description}</p>
                </div>
            </div>
        </div>
    )
}