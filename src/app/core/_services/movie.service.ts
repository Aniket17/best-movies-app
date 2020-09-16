import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class MovieService {
  /**
   *
   */
  BASE_URL = environment.apiServer;
  MOVIES_URL = `${this.BASE_URL}/movies`;
  constructor(private http: HttpClient) {}
}
