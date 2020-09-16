import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptService implements HttpInterceptor {
  constructor(private injector: Injector, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.indexOf(environment.apiServer) < 0) {
      return next.handle(req);
    }
    let requestToForward = req;
    let token = localStorage.getItem(environment.authTokenKey);

    //add token
    requestToForward = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(requestToForward).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
          }
        },
        (error) => {
          if (error.status == 401) {
            //check for access
          } else if (error.status == 403) {
            console.error(
              'You do not have the permission to perform this action.'
            );
          } else if (error.status == 500) {
            console.error(
              'Error occured on server side api. We will work to fix this. Please try again.'
            );
          } else if (error.error && error.error instanceof ProgressEvent) {
            console.error('Looks like you are not connection to internet.');
          }
        }
      )
    );
  }
}
