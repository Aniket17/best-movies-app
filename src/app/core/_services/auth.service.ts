import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  /**
   *
   */
  BASE_URL = environment.apiServer;
  AUTH_URL = `${this.BASE_URL}/api/auth`;
  constructor(private http: HttpClient) {}

  login(loginReq) {
    return this.http
      .post(`${this.AUTH_URL}/login`, loginReq)
      .pipe(catchError((err) => this.handleError(err)));
  }
  register(loginReq) {
    return this.http
      .post(`${this.AUTH_URL}/register`, loginReq)
      .pipe(catchError((err) => this.handleError(err)));
  }
  handleError(err: HttpErrorResponse) {
    //do something with error.. show a toast TODO
    console.error(err);
    return of(null);
  }
}
