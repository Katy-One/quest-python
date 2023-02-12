import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-user-team',
	templateUrl: './user-team.component.html',
	styleUrls: ['./user-team.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserTeamComponent {}
