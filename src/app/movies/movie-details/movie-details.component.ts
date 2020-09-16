import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  ListingType,
  ListingTypes,
  Movie,
  MovieService,
  SubheaderService,
} from 'src/app/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private subheaderService: SubheaderService,
    private movieService: MovieService
  ) {}
  destroy$ = new Subject();
  id: number;
  loading: boolean;
  movie: Movie;
  listings = ListingTypes;
  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        if (params && params.id) {
          this.id = params.id;
          this.getMovie(this.id);
        } else {
          //go back to list..
          this.goBack();
        }
      });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  getMovie(id: number) {
    this.movieService
      .getMovie(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (!res) {
          //error
          this.goBack();
        }
        this.movie = res;
        this.loading = false;
        this.subheaderService.setTitle(this.movie.title, 'All Movies');
      });
  }

  goBack() {
    this.router.navigateByUrl('/movies/list', {
      relativeTo: this.activatedRoute,
    });
  }
}
