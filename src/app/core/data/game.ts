/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GameData, GameEditData } from '../models/game.model';

@Injectable({
	providedIn: 'root',
})
export class Game {
	constructor(private http: HttpClient) {}

	public createGame(value: string) {
		return this.http.post(`${environment.apiUrl}/users/create`, { name: value });
	}

	public getGames(): Observable<GameData[]> {
		//return this.http.get<TeamData[]>(`${environment.apiUrl}/users/teams`);
		return of([
			{
				id: '1',
				gameName: 'Game1',
				finalMessage: 'lala',
				isActive: true,
				author: 'lll',
				teams: [
					{ id: '1', email: 'team1@gmail.com', username: 'Bret', motto: 'We are  winners', isActive: true },
					{ id: '2', email: 'team2@gmail.com', username: 'Antonette', motto: 'We are  winners2', isActive: true },
					{ id: '3', email: 'team3@gmail.com', username: 'Samantha', motto: 'We are  winners3', isActive: false },
				],
				tasks: [
					{
						id: '1',
						answerFormat: 'task1',
						correctAnswer: 'task1',
						description: 'task1',
						endTime: '11',
						hints: [{ hintDescription: 'ww', timeAppear: '22' }],
					},
				],
			},
			{
				id: '2',
				gameName: 'Game2',
				finalMessage: 'We are  winners2',
				isActive: true,
				author: 'ju',
				teams: [
					{ id: '1', email: 'team1@gmail.com', username: 'Bret', motto: 'We are  winners', isActive: true },
					{ id: '2', email: 'team2@gmail.com', username: 'Antonette', motto: 'We are  winners2', isActive: true },
					{ id: '3', email: 'team3@gmail.com', username: 'Samantha', motto: 'We are  winners3', isActive: false },
				],
				tasks: [
					{
						id: '1',
						answerFormat: 'task1',
						correctAnswer: 'task1',
						description: 'task1',
						endTime: '11',
						hints: [{ hintDescription: 'ww', timeAppear: '22' }],
					},
				],
			},
			{
				id: '3',
				gameName: 'Game3',
				finalMessage: 'We are  winners3',
				isActive: false,
				author: 'ku',
				teams: [
					{ id: '1', email: 'team1@gmail.com', username: 'Bret', motto: 'We are  winners', isActive: true },
					{ id: '2', email: 'team2@gmail.com', username: 'Antonette', motto: 'We are  winners2', isActive: true },
					{ id: '3', email: 'team3@gmail.com', username: 'Samantha', motto: 'We are  winners3', isActive: false },
				],
				tasks: [
					{
						id: '1',
						answerFormat: '	task1',
						correctAnswer: 'task1',
						description: 'task1',
						endTime: '11',
						hints: [{ hintDescription: 'ww', timeAppear: '22' }],
					},
				],
			},
			{
				id: '4',
				gameName: 'Game4',
				finalMessage: 'We are  winners4',
				isActive: false,
				author: 'kk',
				teams: [
					{ id: '1', email: 'team1@gmail.com', username: 'Bret', motto: 'We are  winners', isActive: true },
					{ id: '2', email: 'team2@gmail.com', username: 'Antonette', motto: 'We are  winners2', isActive: true },
					{ id: '3', email: 'team3@gmail.com', username: 'Samantha', motto: 'We are  winners3', isActive: false },
				],
				tasks: [
					{
						id: '1',
						answerFormat: 'task1',
						correctAnswer: 'task1',
						description: 'task1',
						endTime: '11',
						hints: [{ hintDescription: 'ww', timeAppear: '22' }],
					},
				],
			},
		]);
	}

	// eslint-disable-next-line	 @typescript-eslint/no-unused-vars
	// eslint-disable-next-line no-unused-vars
	public getGame(id: string): Observable<GameData> {
		//return this.http.get<TeamData[]>(`${environment.apiUrl}/users/teams/${id}`);

		return of({
			id: '3',
			gameName: 'Game3',
			finalMessage: 'We are  winners3',
			isActive: true,
			author: 'ku',
			teams: [
				{ id: '1', email: 'team1@gmail.com', username: 'team1', motto: 'We are  winners', isActive: true },
				{ id: '2', email: 'team2@gmail.com', username: 'team2', motto: 'We are  winners2', isActive: false },
			],
			tasks: [
				{
					id: '1',
					answerFormat: 'task1',
					correctAnswer: 'task1',
					description: 'task1',
					endTime: '11',
					hints: [{ hintDescription: 'ww', timeAppear: '22' }],
				},
			],
		});
	}

	// eslint-disable-next-line no-unused-vars
	public deleteGame(id: string): Observable<boolean> {
		//	return this.http.delete<boolean>(`${environment.apiUrl}/users/teams/${id}`);
		return of(true);
	}

	// eslint-disable-next-line no-unused-vars
	public editGame(id: string, value: GameEditData): Observable<boolean> {
		//return this.http.put<boolean>(`${environment.apiUrl}/users/update/${{ id }}`, value);
		return of(true);
	}
}
