import { getTravelsByOwner } from "@/actions/travel.actions";
import { Button } from "@/components/ui/button"

import Link from "next/link";

export default async function Travels() {
    const myTravels = await getTravelsByOwner();
    return (
        <div className="flex flex-col gap-2">
            {
                myTravels.map((travel) => (
                    <Link key={travel.id} href={`/guide/${travel.id}`} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 flex flex-row justify-between items-center gap-4">
                        <div>
                            <h3>{travel.origin} - {travel.destination}</h3>
                            <p className="text-sm text-gray-500">{travel.description}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${travel.completed ? 'bg-green-200 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{travel.completed ? 'completado' : 'pendiente'}</span>
                    </Link>
                ))
            }
            {
                myTravels.length === 0 && (
                    <div className="bg-gray-100 p-4 border border-gray-400 border-dashed rounded-md">
                        <div className="text-center text-gray-500">No tienes guias creadas</div>
                        <div className="text-center mt-4">
                        <Button asChild>
                            <Link href="/guide">Crear guia</Link>
                        </Button>
                        </div>
                    </div>
                )
            }
        </div>
    );
}