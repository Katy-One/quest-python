import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TeamsStore } from 'src/store/teams.store';
import { Game } from '../core/data/game';
import { GameData, GameEditData } from '../core/models/game.model';

@Injectable({ providedIn: 'root' })
export class GamesService {
	constructor(private game: Game, private teamsStore: TeamsStore) {}

	public getGames(): Observable<GameData[]> {
		return this.game.getGames().pipe(
			map(res => res),
			catchError(() => of([])),
		);
	}
	public getGame(id: string): Observable<GameData | null> {
		return this.game.getGame(id).pipe(
			map(res => {
				this.teamsStore.teams$.next(res.teams);
				return res;
			}),
			catchError(() => of(null)),
		);
	}

	public deleteGame(id: string): Observable<boolean> {
		return this.game.deleteGame(id).pipe(
			map(res => res),
			catchError(() => of(false)),
		);
	}
	public editGame(id: string, value: GameEditData): Observable<boolean> {
		return this.game.editGame(id, value).pipe(
			map(res => res),
			catchError(() => of(false)),
		);
	}
}
