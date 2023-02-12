import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs';
import { UiComponent } from './abstract/ui-component';
import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends UiComponent implements OnInit {
	constructor(private loginService: LoginService, private userService: UserService) {
		super();
	}

	public ngOnInit() {
		if (this.loginService.getJwtToken()) {
			this.userService.loadUserToStore().pipe(takeUntil(this.dispose$)).subscribe();
		}
	}
}
