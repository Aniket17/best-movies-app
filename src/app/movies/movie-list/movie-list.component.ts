import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageRequestModel } from '../../core/_models/page-request.model';
import { MovieService } from '../../core/_services/movie.service';
import { Movie } from '../../core';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  constructor(private movieService: MovieService) {}

  moviesSubject = new BehaviorSubject<Movie[]>([]);
  totalSubject = new BehaviorSubject<number>(0);
  destroy$ = new Subject();

  ngOnInit(): void {
    this.movieService
      .find(new PageRequestModel(null))
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        if (!res) {
          return;
        }
        this.moviesSubject.next(res.items);
        this.totalSubject.next(res.totalCount);
      });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
