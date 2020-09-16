import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  constructor() {}
  @Input() movie: Movie;
  @Output() viewClick = new EventEmitter<Movie>();
  ngOnInit(): void {}

  viewMovie(movie: Movie) {
    this.viewClick.emit(movie);
  }
}
