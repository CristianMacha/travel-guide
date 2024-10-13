import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import Travels from "./travels"

export default withPageAuthRequired(async function Overview() {
    const { user } = await getSession() as Session;
    return (
        <main className="px-4">
            <div className="py-5 md:py-10 scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl">
                <div className="flex justify-between items-center">
                    <div className="font-medium">Hello {user.name}</div>
                    <div className="flex gap-2 items-center">
                        <Button asChild size="icon">
                            <Link href="/guide">
                                <Plus className="h-4 w-4" />
                            </Link>
                        </Button>
                        <Avatar>
                            <AvatarImage src={user.picture} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

                <div className="pt-10">
                    <h2 className="text-sm text-gray-500">Mis guias</h2>
                </div>

                <div className="mt-4">
                    <Travels />
                </div>
            </div>
        </main>
    );
}, { returnTo: '/overview' })
