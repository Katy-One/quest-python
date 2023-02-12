import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { TeamsStore } from 'src/store/teams.store';
import { Team } from '../core/data/team';
import { EditTeamData, TeamData } from '../core/models/team.model';

@Injectable({ providedIn: 'root' })
export class TeamsService {
	constructor(private team: Team, private teamsStore: TeamsStore) {}

	public getTeams(): Observable<TeamData[]> {
		return this.team.getTeams().pipe(
			map(res => {
				this.teamsStore.teams$.next(res);
				return res;
			}),
			catchError(() => {
				return of([]);
			}),
		);
	}
	public getTeam(id: string): Observable<TeamData | null> {
		return this.team.getTeam(id).pipe(
			map(res => res),
			catchError(() => of(null)),
		);
	}

	public deleteTeam(id: string): Observable<boolean> {
		return this.team.deleteTeam(id).pipe(
			map(res => res),
			catchError(() => of(false)),
		);
	}
	public editTeam(id: string, value: EditTeamData): Observable<boolean> {
		return this.team.editTeam(id, value).pipe(
			map(res => res),
			catchError(() => of(false)),
		);
	}
}
