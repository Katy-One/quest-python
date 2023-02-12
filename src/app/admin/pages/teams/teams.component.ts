import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { of, switchMap, takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { Team } from 'src/app/core/data/team';
import { TeamData } from 'src/app/core/models/team.model';
import { User } from 'src/app/core/models/user.model';
import { CreateTeamModal } from 'src/app/modals/create-team.modal';
import { EditTeamModal } from 'src/app/modals/edit-team.modal';
import { SnackbarNotificationModal } from 'src/app/modals/snackbar-notification.modal';
import { TeamsService } from 'src/app/services/teams.service';
import { TeamsStore } from 'src/store/teams.store';
import { ModalStatus } from '../../enums/modal.enum';

@Component({
	selector: 'app-teams',
	templateUrl: './teams.component.html',
	styleUrls: ['./teams.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeamsComponent extends UiComponent implements OnInit {
	public teams$ = this.teamsStore.teams$;

	constructor(
		private createTeamModal: CreateTeamModal,
		private editTeamModal: EditTeamModal,
		private team: Team,
		private snackbarNotificationModal: SnackbarNotificationModal,
		private teamsService: TeamsService,
		private teamsStore: TeamsStore,
	) {
		super();
	}

	public ngOnInit(): void {
		this.teamsService.getTeams().subscribe();
	}

	public openCreateTeamDialog() {
		this.createTeamModal
			.openDialog()
			.pipe(
				switchMap((teamValue: User | null) => {
					if (teamValue) {
						return this.team.createTeam(teamValue);
					} else {
						return of(false);
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe(res => {
				if (res) {
					this.snackbarNotificationModal.open({
						title: 'You have successfully added the team!',
						panelClass: ModalStatus.Successful,
					});
					this.teamsService.getTeams().pipe(takeUntil(this.dispose$)).subscribe();
				}
			});
	}
	public openEditTeamDialog(teamValue: TeamData) {
		this.editTeamModal
			.openDialog(teamValue)
			.pipe(
				switchMap(res => {
					if (res) {
						return this.team.editTeam(teamValue.id, teamValue);
					} else {
						return of(false);
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe((res: boolean) => {
				if (res) {
					this.snackbarNotificationModal.open({
						title: 'You have successfully updated the team!',
						panelClass: ModalStatus.Successful,
					});
				}
			});
	}
	public onDeleteTeam(id: string) {
		this.teamsService
			.deleteTeam(id)
			.pipe(
				switchMap((res: boolean) => {
					if (res) {
						this.snackbarNotificationModal.open({
							title: 'You have successfully deleted the team',
							panelClass: ModalStatus.Successful,
						});
						this.teamsService.getTeams().pipe(takeUntil(this.dispose$)).subscribe();
					}
					return of([]);
				}),
				takeUntil(this.dispose$),
			)
			.subscribe();
	}
}
