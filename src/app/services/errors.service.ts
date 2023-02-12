import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { AppRoutes } from '../app-routes.enum';
import { LoginService } from './login.service';

@Injectable({ providedIn: 'root' })
export class ErrorService {
	public serverErrors$ = new BehaviorSubject<boolean>(false);

	constructor(private loginService: LoginService, private router: Router) {}

	public error500State(setServerError: boolean) {
		this.serverErrors$.next(setServerError);
	}

	public handleErrors(error: number) {
		if (error === 401) {
			this.loginService.logout();
			void this.router.navigate(['/' + AppRoutes.Login]);
		} else {
			this.error500State(false);
		}
	}
}
