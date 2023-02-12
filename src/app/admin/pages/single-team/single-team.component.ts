import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { TeamData } from 'src/app/core/models/team.model';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
	selector: 'app-single-team',
	templateUrl: './single-team.component.html',
	styleUrls: ['./single-team.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleTeamComponent implements OnInit {
	public team$!: Observable<TeamData | null>;

	constructor(private activatedRoute: ActivatedRoute, private teamsService: TeamsService) {}

	public ngOnInit(): void {
		this.team$ = this.activatedRoute.paramMap.pipe(
			switchMap((params: ParamMap) => {
				const teamParam = params.get('teamsName');
				if (teamParam) {
					return this.teamsService.getTeam(teamParam);
				}
				return of(null);
			}),
		);
	}
}
