// Angular
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
// RxJS
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const tokenExists = localStorage.getItem(environment.authTokenKey) != null;
    if (!tokenExists) {
      this.router.navigateByUrl(
        '/auth/login?returnUrl=' + route.url.toString()
      );
    }
    return of(tokenExists);
  }
}
