import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouteReuseStrategy,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (sessionStorage.getItem('currentUser')) {
      console.log('true');
      console.log(sessionStorage.getItem('currentUser'));
      return true;
    }
    this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
    console.log('false');
    return false;
  }
}
