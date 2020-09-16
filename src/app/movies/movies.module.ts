import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MovieCardComponent,
    children: [
      {
        path: '',
        component: MovieCardComponent,
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: MovieCardComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [MovieCardComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class MoviesModule {}
