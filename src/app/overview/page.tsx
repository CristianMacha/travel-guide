import { getSession, Session, withPageAuthRequired } from "@auth0/nextjs-auth0"

import Travels from "./travels"
import Header from "./header"

export default withPageAuthRequired(async function Overview() {
    const { user } = await getSession() as Session;
    return (
        <main className="px-4">
            <div className="py-5 md:py-10 scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl">
                <Header name={user.name} picture={user.picture} />

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
