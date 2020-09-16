import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './theme/base/base.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'movies',
        loadChildren: () =>
          import('./movies/movies.module').then((m) => m.MoviesModule),
      },
      { path: '', redirectTo: 'movies', pathMatch: 'full' },
    ], //lazy loaded modules
  },
  //login and other error pages
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
