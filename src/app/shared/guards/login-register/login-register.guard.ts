import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router,
	Route,
	UrlSegment, CanLoad, CanActivateChild
} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth/auth.service';

@Injectable({
	providedIn: 'root'
})
export class LoginRegisterGuard implements CanActivate, CanActivateChild, CanLoad {
	constructor(private auth: AuthService, private router: Router) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.check();
	}

	canActivateChild(
		childRoute: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return this.check();
	}

	canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
		return this.check();
	}

	private check(): boolean {
		if (this.auth.isLoggedIn) {
			this.router.navigateByUrl('/');
		}
		return !this.auth.isLoggedIn;
	}
}
