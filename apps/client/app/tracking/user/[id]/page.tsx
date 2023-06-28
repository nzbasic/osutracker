import Link from "next/link";

import { proxy } from "database";
import ReactCountryFlag from "react-country-flag";
import { get } from "api-client";

import { StatsLineGraphWithSelect } from "ui/components/graph";
import { ScoresWithHeatmap, StatsSummary } from "ui/components/osu";

export default async function Page({ params }: { params: { id: number } }) {
    const userReq = get("v2/user/:id", params.id);
    const statsReq = get("v2/user/:id/stats", params.id);
    const playsReq = get("v2/user/:id/top", params.id);

    const [user, stats, plays] = await Promise.all([
        userReq,
        statsReq,
        playsReq,
    ]);

    const playDateCount = plays
        .sort(
            (a, b) =>
                new Date(a.created_at).getTime() -
                new Date(b.created_at).getTime()
        )
        .reduce((acc, play) => {
            const date = new Date(play.created_at).toISOString().split("T")[0];
            if (acc[date] == null) {
                acc[date] = [];
            }
            acc[date].push(play);
            return acc;
        }, {} as Record<string, proxy.ScoreDocument[]>);

    const sortedStats = stats.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    const lastWeek = sortedStats[stats.length - 7];

    return (
        <div className="main my-8 flex flex-col gap-10 px-4">
            <div className="flex items-center gap-2">
                <Link
                    className="text-3xl font-semibold text-black transition-all hover:text-blue-500"
                    href={`https://osu.ppy.sh/users/${user.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <h2>{user.name}</h2>
                </Link>
                <ReactCountryFlag
                    className="!h-6 !w-8 rounded"
                    countryCode={user.country}
                    svg
                />
            </div>

            <StatsSummary user={user} lastWeek={lastWeek} />

            <div className="flex flex-col gap-4">
                <h3>Stat History</h3>
                <StatsLineGraphWithSelect data={stats} />
            </div>

            <ScoresWithHeatmap playDateCount={playDateCount} plays={plays} />
        </div>
    );
}
