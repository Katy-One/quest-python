/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { EditTaskData, TaskData } from '../models/task.model';
import { TeamData } from '../models/team.model';

@Injectable({
	providedIn: 'root',
})
export class Task {
	constructor(private http: HttpClient) {}

	// eslint-disable-next-line no-unused-vars
	public createTask(taskValue: EditTaskData) {
		//	return this.http.post<User>(`${environment.apiUrl}/users/create`, taskValue);
		return of(true);
	}

	// eslint-disable-next-line no-unused-vars
	public getTask(id: string): Observable<TeamData> {
		//return this.http.get<TeamData[]>(`${environment.apiUrl}/users/teams/${id}`);
		return of({ id: '1', email: 'team1@gmail.com', username: 'team1', motto: 'We are  winners', isActive: true });
	}
	// eslint-disable-next-line no-unused-vars
	public deleteTask(id: string): Observable<boolean> {
		//	return this.http.delete<boolean>(`${environment.apiUrl}/users/teams/${id}`);
		return of(true);
	}
	// eslint-disable-next-line no-unused-vars
	public editTask(id: string, value: TaskData): Observable<boolean> {
		//return this.http.put<boolean>(`${environment.apiUrl}/users/update/${{ id }}`, value);
		return of(true);
	}
}
