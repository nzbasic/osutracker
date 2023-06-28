import { proxy, v2 } from "database";

const api = "http://localhost:8080/api/";

export type routes = {
    "v2/user/:id/stats": {
        args: [id: number];
        returns: Omit<
            v2.UserStatDocument,
            "playerId" | "player" | "_id" | "__v"
        >[];
    };
    "v2/user/:id/top": {
        args: [id: number];
        returns: proxy.ScoreDocument[];
    };
    "v2/user/:id": {
        args: [id: number];
        returns: Omit<v2.UserDocument, "_id" | "__v">;
    };
};

export async function get<T extends keyof routes>(
    url: T,
    ...args: routes[T]["args"]
) {
    // const fill url with args by replacing the first :arg with args[0], etc
    const filledUrl = url.replace(
        /:(\w+)/g,
        (_, arg) => args.shift() as unknown as string
    );
    const response = await fetch(api + filledUrl);
    return response.json() as unknown as routes[typeof url]["returns"];
}
