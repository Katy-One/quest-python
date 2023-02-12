import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, switchMap, takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { Task } from 'src/app/core/data/task';
import { GameData } from 'src/app/core/models/game.model';
import { EditTaskData, TaskData } from 'src/app/core/models/task.model';
import { AddTeamModal } from 'src/app/modals/add-team.modal';
import { CreateEditTaskModal } from 'src/app/modals/create-edit-task.modal';
import { SnackbarNotificationModal } from 'src/app/modals/snackbar-notification.modal';
import { GamesService } from 'src/app/services/game.service';
import { TaskService } from 'src/app/services/task.service';
import { ModalStatus } from '../../enums/modal.enum';

@Component({
	selector: 'app-single-game',
	templateUrl: './single-game.component.html',
	styleUrls: ['./single-game.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SingleGameComponent extends UiComponent implements OnInit, OnDestroy {
	public game$!: Observable<GameData | null>;
	private params!: string;
	constructor(
		private activatedRoute: ActivatedRoute,
		private gamesService: GamesService,
		private taskService: TaskService,
		private addTeamModal: AddTeamModal,
		private createEditTaskModal: CreateEditTaskModal,
		private snackbarNotificationModal: SnackbarNotificationModal,
		private task: Task,
	) {
		super();
	}

	public ngOnInit(): void {
		this.game$ = this.activatedRoute.params.pipe(
			switchMap(params => {
				this.params = params['gameName'];
				if (params) {
					return this.gamesService.getGame(this.params);
				}
				return of(null);
			}),
		);
	}

	public addTeam() {
		this.addTeamModal
			.openDialog()
			.pipe(
				switchMap((gameValue: string | null) => {
					if (gameValue) {
						return of(true);
						//return this.game.createGame(gameValue);
					} else {
						return of(false);
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe(res => {
				if (res) {
					this.snackbarNotificationModal.open({ title: 'Thank you for your opinion!', panelClass: ModalStatus.Successful });
				}
			});
	}

	public openCreateTaskDialog() {
		this.createEditTaskModal
			.openDialog()
			.pipe(
				switchMap((gameValue: EditTaskData) => {
					return of(gameValue);
					if (gameValue) {
						return this.task.createTask(gameValue);
					} else {
						return of(false);
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe(res => {
				if (res) {
					this.snackbarNotificationModal.open({ title: 'Thank you for your opinion!', panelClass: ModalStatus.Successful });
				}
			});
	}
	public onEditTask(task: TaskData) {
		this.createEditTaskModal
			.openDialog(task)
			.pipe(
				switchMap((gameValue: EditTaskData) => {
					return of(gameValue);
					if (gameValue) {
						return this.task.createTask(gameValue);
					} else {
						return of(false);
					}
				}),
				takeUntil(this.dispose$),
			)
			.subscribe(res => {
				if (res) {
					this.snackbarNotificationModal.open({ title: 'Thank you for your opinion!', panelClass: ModalStatus.Successful });
				}
			});
	}

	public onDeleteTask(id: string) {
		this.game$ = this.taskService.deleteTask(id).pipe(
			switchMap((res: boolean) => {
				if (res) {
					return this.gamesService.getGame(this.params);
				}
				return of(null);
			}),
		);
	}
}
