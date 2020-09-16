import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss'],
})
export class MovieDetailsComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  @Input() movie: Movie;
  ngOnInit(): void {
    this.goBack();
  }
  goBack() {
    this.router.navigate(['../list'], {
      relativeTo: this.activatedRoute,
    });
  }
}
