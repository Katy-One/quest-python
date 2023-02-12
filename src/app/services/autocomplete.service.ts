import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { TeamsStore } from 'src/store/teams.store';
import { Team } from '../core/data/team';
import { TeamData } from '../core/models/team.model';

@Injectable({ providedIn: 'root' })
export class AutocompleteService {
	constructor(private teamsStore: TeamsStore, private team: Team) {}

	public opts = new BehaviorSubject<TeamData[]>([]);

	public getData() {
		const teams = this.team.getTeams().pipe(
			tap((teams: TeamData[]) => {
				this.opts.next(teams);

				return this.opts;
			}),
		);
		return combineLatest([teams, this.teamsStore.teams$]).pipe(
			map(([existTeams, addedTeams]) => {
				if (addedTeams?.length) {
					for (let i = 0; i < existTeams?.length; i++) {
						for (let j = 0; j < addedTeams?.length; j++) {
							if (existTeams[i].username == addedTeams[j].username) {
								existTeams.splice(i, 1);
							}
						}
					}
				}

				return existTeams;
			}),
		);
	}
}
