import queryString from "query-string";

const maxCompare = 50;

export interface UrlOptions {
    users: number[];
    countries: string[];
    topCountries?: boolean;
    topUsers?: boolean;
}

export const parseUrl = () => {
    const pathname = window.location.pathname
    const options: UrlOptions = { users: [], countries: [] };

    if (pathname.endsWith("topCountries")) {
        options.topCountries = true;
        return options
    }

    if (pathname.endsWith("topUsers")) {
        options.topUsers = true;
        return options
    }

    const urlParams = queryString.parse(window.location.search, {
      arrayFormatSeparator: ",",
      arrayFormat: "bracket-separator",
      parseNumbers: true,
    });

    for (let i = 0; i < maxCompare; i++) {
        if (urlParams[i]) {
            const item = urlParams[i]
            if (typeof item === "number") {
                options.users.push(item)
            } else if (typeof item === "string") {
                options.countries.push(item)
            }
        }    
    }

    return options
}