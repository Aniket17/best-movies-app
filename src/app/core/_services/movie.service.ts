import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '..';
import { PageRequestModel } from '../_models/page-request.model';
import { PageResultsModel } from '../_models/page-results.model';

@Injectable()
export class MovieService {
  /**
   *
   */
  BASE_URL = environment.apiServer;
  MOVIES_URL = `${this.BASE_URL}/movies`;
  constructor(private http: HttpClient) {}

  find(params: PageRequestModel): Observable<PageResultsModel> {
    return this.http
      .post<PageResultsModel>(`${this.MOVIES_URL}/find`, params)
      .pipe(catchError((err) => this.handleError(err)));
  }
  getMovie(id) {
    return this.http
      .get<Movie>(`${this.MOVIES_URL}/${id}`)
      .pipe(catchError((err) => this.handleError(err)));
  }
  handleError(err: HttpErrorResponse) {
    //do something with error.. show a toast TODO
    console.error(err);
    return of(null);
  }
}
