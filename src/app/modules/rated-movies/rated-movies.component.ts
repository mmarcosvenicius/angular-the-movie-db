import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TheMovieDbService } from 'src/app/core/services/the-movie-db.service';

@Component({
  selector: 'app-rated-movies',
  templateUrl: './rated-movies.component.html',
  styleUrls: ['./rated-movies.component.css']
})
export class RatedMoviesComponent implements OnInit {

  
  loading: boolean = true
  currentPage: number = 1
  totalPages: number = 0
  
  movies: Array<any> = []
  imgBaseUrl: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'
  constructor(
    private theMovieDbService: TheMovieDbService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRatedMovies()
  }

  getRatedMovies(pageNumber: number = 1): void {
    this.theMovieDbService.getRatedMovies(pageNumber)
      .then((response: any) => {
        if (this.currentPage === 1) {
          this.movies = response.results
        } else {
          this.movies = this.movies.concat(response.results)
        }
        this.totalPages = response.total_pages
        if (this.currentPage < this.totalPages) {
          this.currentPage++
        }
        this.loading = false

      })
      .catch((param: any) => {
        console.error(param)
      })
  }
}
