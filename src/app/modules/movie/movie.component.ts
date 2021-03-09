import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/core/models/movie.model';
import { TheMovieDbService } from 'src/app/core/services/the-movie-db.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  providers: [TheMovieDbService]
})
export class MovieComponent implements OnInit {

  constructor(
    private theMovieDbService: TheMovieDbService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }


  movie: Movie
  movieData: any
  movieUrlBackground: string = 'https://image.tmdb.org/t/p/w1400_and_h450_face/'
  imgBaseUrl: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
  loading: boolean = true
  currentRating: number = 0

  ngOnInit(): void {
    this.movieData = history.state? history.state.movie : null
    this.route.params.subscribe((param: any) => {
      this.getMovie(param.id)
    })
  }

  getMovie(id: number): void {
    this.theMovieDbService.getMovieById(id)
      .then((response: Movie) => {
        this.movie = response
        this.movieData?.rating? this.currentRating = this.movieData.rating : this.currentRating = this.movie.vote_average
        this.loading = false
      })
      .catch((param: any) => {
        console.error(param)
      })
  }

  rating(currentRating): void {
    this.theMovieDbService.rating(this.movie.id, currentRating).then(response => {
      setTimeout(() => {
        this.router.navigate(['/rated-movies'])
      }, 500);
    })
  }
  deleteRating(): void {
    this.theMovieDbService.deleteRating(this.movie.id).then(response => {
      setTimeout(() => {
        this.router.navigate(['/rated-movies'])
      }, 500);
    })
  }
}
