import { Game } from './game';

export interface TopGames {
    headers: any;
    count: number,
    next: string,
    previous: string,
    results: Game[]
}