import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, of, switchMap, takeUntil } from 'rxjs';
import { UiComponent } from 'src/app/abstract/ui-component';
import { AppRoutes } from 'src/app/app-routes.enum';
import { Game } from 'src/app/core/data/game';
import { GameData } from 'src/app/core/models/game.model';
import { CreateGameModal } from 'src/app/modals/create-game.modal';

import { SnackbarNotificationModal } from 'src/app/modals/snackbar-notification.modal';
import { GamesService } from 'src/app/services/game.service';
import { ModalStatus } from '../../enums/modal.enum';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GamesComponent extends UiComponent implements OnInit {
	public games$!: Observable<GameData[]>;

	constructor(
		private snackbarNotificationModal: SnackbarNotificationModal,
		private gamesService: GamesService,
		private game: Game,
		private createGameModal: CreateGameModal,
	) {
		super();
	}
	public get url(): string {
		return `${AppRoutes.Admin}/${AppRoutes.Games}`;
	}
	public ngOnInit(): void {
		this.games$ = this.gamesService.getGames();
	}

	public openCreateGameDialog() {
		this.createGameModal
			.openDialog()
			.pipe(
				switchMap((gameValue: string | null) => {
					if (gameValue) {
						return this.game.createGame(gameValue);
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

	public onDeleteGame(id: string) {
		this.games$ = this.gamesService.deleteGame(id).pipe(
			switchMap((res: boolean) => {
				if (res) {
					return this.gamesService.getGames();
				}
				return [];
			}),
		);
	}
}
