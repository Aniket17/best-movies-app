import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { debounceTime, finalize, takeUntil, tap } from 'rxjs/operators';
import { PageRequestModel } from '../../core/_models/page-request.model';
import { MovieService } from '../../core/_services/movie.service';
import { Movie, SubheaderService } from '../../core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
  constructor(
    private movieService: MovieService,
    private subheaderService: SubheaderService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  moviesSubject = new BehaviorSubject<Movie[]>([]);
  totalSubject = new BehaviorSubject<number>(0);
  destroy$ = new Subject();
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [3, 5, 10];
  pageRequest = new PageRequestModel(null);
  searchInput: FormControl = new FormControl('');
  loading: boolean = false;
  locations = ['Delhi', 'London', 'USA', 'Australia'];
  languages = ['English', 'Hindi', 'Marathi', 'Tamil'];
  location;
  language;
  hasItems: boolean;

  ngOnInit(): void {
    this.subheaderService.setTitle('All Movies', 'Home');

    //subscribe
    this.paginator.page
      .pipe(
        takeUntil(this.destroy$),
        tap((pageEvent) => {
          this.pageRequest.pageNumber = pageEvent.pageIndex;
          this.pageRequest.pageSize = pageEvent.pageSize;
          this.getMovies(this.pageRequest);
        })
      )
      .subscribe();

    this.sort.sortChange
      .pipe(
        takeUntil(this.destroy$),
        tap((sortEvent) => {
          this.pageRequest.sortField = sortEvent.active;
          this.pageRequest.sortOrder = sortEvent.direction;
          this.pageRequest.pageNumber = 0;
          this.getMovies(this.pageRequest);
        })
      )
      .subscribe();

    this.searchInput.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(150),
        tap((val) => {
          this.pageRequest.pageNumber = 0;
          this.pageRequest.filter = { ...this.pageRequest.filter, search: val };
          this.getMovies(this.pageRequest);
        })
      )
      .subscribe();

    this.getMovies(this.pageRequest);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getMovies(params: PageRequestModel) {
    this.loading = true;
    this.movieService
      .find(params)
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.loading = false))
      )
      .subscribe((res) => {
        if (!res) {
          this.hasItems = false;
          return;
        }
        this.hasItems = res.totalCount > 0;
        console.log(this.hasItems);

        this.moviesSubject.next(res.items);
        this.totalSubject.next(res.totalCount);
      });
  }

  //selectors
  locationChanged(val) {
    if (!val) {
      return;
    }
    this.pageRequest.filter = { ...this.pageRequest.filter, location: val };
    this.getMovies(this.pageRequest);
  }
  languageChanged(val) {
    if (!val) {
      return;
    }
    this.pageRequest.filter = { ...this.pageRequest.filter, language: val };
    this.getMovies(this.pageRequest);
  }

  reset() {
    this.pageRequest = new PageRequestModel(null);
    this.location = this.language = null;
    this.searchInput.reset();
    this.getMovies(this.pageRequest);
  }

  //action
  goToMovie(movie: Movie) {
    this.router.navigate(['../details/' + movie.id], {
      relativeTo: this.activatedRoute,
    });
  }
}
