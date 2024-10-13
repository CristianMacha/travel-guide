import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import FormGuide from "./form-guide";

export default withPageAuthRequired(async function GuidePage() {
    return (
        <main className="px-4">
            <div className="py-5 md:py-10 scroll-m-20 w-full mx-auto container lg:max-w-4xl md:max-w-2xl">
                <div>
                    <FormGuide />
                </div>
            </div>
        </main>
    )
}, { returnTo: '/guide' });