import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes.enum';
import { LoginService } from 'src/app/services/login.service';

@Component({
	selector: 'app-logout-btn',
	templateUrl: './logout-btn.component.html',
	styleUrls: ['./logout-btn.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogoutBtnComponent {
	constructor(private loginService: LoginService, private router: Router) {}

	public logout() {
		this.loginService.logout();
		this.router.navigate(['/' + AppRoutes.Login]);
	}
}
