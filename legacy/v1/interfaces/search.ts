export interface SearchRes {
    page: Array<GenericSummary>
    length: number
}

export interface GenericSummary {
    type: string
    id: string
    name: string
    pp: string
    url?: string
}

export interface CountrySummary {
    abbreviation: string,
    name: string,
    pp: string
}

export interface UserSummary {
    id: string,
    name: string,
    pp: string
}