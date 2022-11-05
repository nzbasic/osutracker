export interface Score {
    name: string,
    id: string,
    setId: string,
    mods: string[],
    pp: string,
    missCount: string,
    acc: number,
    mapper: string,
    length: string,
    objects: number,
    player?: string
    added?: boolean
}