/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EditTeamData, TeamData } from '../models/team.model';
import { User } from '../models/user.model';

@Injectable({
	providedIn: 'root',
})
export class Team {
	constructor(private http: HttpClient) {}

	public createTeam(userValue: User) {
		userValue.email = 'e.a.golovinova3@gmail.com';
		return this.http.post<User>(`${environment.apiUrl}/users/create`, userValue);
	}
	public getTeams(): Observable<TeamData[]> {
		return this.http.get<TeamData[]>(`${environment.apiUrl}/users/teams`);
	}
	// eslint-disable-next-line no-unused-vars
	public getTeam(id: string): Observable<TeamData> {
		//return this.http.get<TeamData[]>(`${environment.apiUrl}/users/teams/${id}`);

		return of({ id: '1', email: 'team1@gmail.com', username: 'team1', motto: 'We are  winners', isActive: true });
	}

	public deleteTeam(id: string): Observable<boolean> {
		return this.http.delete<boolean>(`${environment.apiUrl}/users/delete/${id}`);
	}
	// eslint-disable-next-line no-unused-vars
	public editTeam(id: string, value: EditTeamData): Observable<boolean> {
		//return this.http.put<boolean>(`${environment.apiUrl}/users/update/${{ id }}`, value);
		return of(true);
	}
}
