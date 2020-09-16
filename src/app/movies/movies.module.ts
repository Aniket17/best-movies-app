import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieService } from '../core/_services/movie.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptService } from '../core/_services/auth-interceptor.service';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: '',
        component: MovieListComponent,
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: MovieListComponent,
      },
      {
        path: 'details/:id',
        component: MovieDetailsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    MovieCardComponent,
    MovieListComponent,
    MovieDetailsComponent,
    MoviesComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
  providers: [
    MovieService,
    AuthInterceptService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptService,
      multi: true,
    },
  ],
})
export class MoviesModule {}
