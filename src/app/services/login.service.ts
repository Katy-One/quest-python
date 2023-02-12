import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SessionStore } from 'src/store/session.store';
import { accessTokenPropName, tokenType } from '../consts/consts';
import { LoginResponse } from '../core/models/login.model';
import { UserFormData } from '../core/models/user.model';

@Injectable({
	providedIn: 'root',
})
export class LoginService {
	constructor(private http: HttpClient, private sessionStore: SessionStore) {}

	public login(user: UserFormData) {
		const formData = new FormData();
		formData.append('username', user.username);
		formData.append('password', user.password);
		return this.http.post<LoginResponse>(`${environment.apiUrl}/users/login`, formData).pipe(
			tap((res: LoginResponse) => {
				this.sessionStore.user$.next(null);
				this.storeJwtToken(res.access_token, res.token_type);
			}),
		);
	}

	public logout() {
		localStorage.removeItem(accessTokenPropName);
		localStorage.removeItem(tokenType);
	}

	public getJwtToken() {
		return localStorage.getItem(accessTokenPropName);
	}
	public getTokenType() {
		return localStorage.getItem(tokenType);
	}

	private storeJwtToken(jwt: string, type: string) {
		localStorage.setItem(accessTokenPropName, jwt);
		localStorage.setItem(tokenType, type);
	}
}
