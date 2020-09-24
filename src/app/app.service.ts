import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import { TopGames } from './entities/TopGames';
import { GameDetail } from './entities/GameDetail';

@Injectable()
export class ConfigService {
    constructor(private http: HttpClient) { }

    getPopularUrl = 'https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added';

    getPopularGames(): Observable<HttpResponse<TopGames>>  {
        return this.http.get<TopGames>(
            this.getPopularUrl, { observe: 'response' });
    }

    getDetailsUrl = "https://api.rawg.io/api/games/"

    getGameDetails(id: number): Observable<HttpResponse<GameDetail>>{
        return this.http.get<GameDetail>(
            this.getDetailsUrl+id, { observe: 'response' });
    }
}
