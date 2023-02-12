import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { LoginService } from '../services/login.service';

@Injectable({
	providedIn: 'root',
})
export class UnAuthGuard implements CanActivate {
	constructor(private loginService: LoginService) {}
	public canActivate(): boolean {
		return !this.loginService.getJwtToken();
	}
}
