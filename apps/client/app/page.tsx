import React from "react";
import { get } from 'api-client';
import { ResponsiveContainer, HeroGraph } from "ui/components/graph";
import { SearchBar } from "ui/components/search";

export default async function Page() {
    const statsReq = get('v2/user/:id/stats', 6600930);
    const [stats] = await Promise.all([statsReq]);
   
    return (
        <div className="flex flex-col mx-4">
            <section className="flex flex-col gap-4 main mt-8 md:mt-24 min-h-[calc(100vh-10rem)] bg-primary-light w-full">
                <div className="md:absolute z-10 flex flex-col items-start shrink-0">
                    <h1 className="max-w-md">Visualize your progress with deep, historic data</h1>
                    <h5 className="mt-4 md:mt-8">Start tracking your stats today</h5>
                    <SearchBar className="mt-4 w-56 z-40" placeholder="Enter your username"/>
                </div>
                <ResponsiveContainer className="md:min-h-[36rem] h-96 md:h-[calc(100vh-16rem)] max-w-5xl w-full">
                    <HeroGraph data={stats} />
                </ResponsiveContainer>
            </section>

            <section className="h-72 bg-white w-full">

            </section>
        </div>
    );
}
