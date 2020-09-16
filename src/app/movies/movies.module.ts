import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';

const routes: Routes = [
  {
    path: '',
    component: MovieListComponent,
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
    ],
  },
];

@NgModule({
  declarations: [MovieCardComponent, MovieListComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class MoviesModule {}
