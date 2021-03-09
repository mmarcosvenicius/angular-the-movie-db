import { Component, OnInit } from '@angular/core';

import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';
import { TheMovieDbService } from 'src/app/core/services/the-movie-db.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [TheMovieDbService]
})
export class HomeComponent implements OnInit {


  faStar = faStar
  faStarHalf = faStarHalf
  maxRate = 10;
  loading: boolean = true
  currentPage: number = 1
  totalPages: number = 0

  movies: Array<any> = []
  imgBaseUrl: string = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2'

  constructor(private theMovieDbService: TheMovieDbService) { }

  ngOnInit(): void {
    this.getNowPlaying()
  }

  getNowPlaying(pageNumber: number = 1): void {
    this.theMovieDbService.getNowPlaying(pageNumber)
      .then((response: any) => {
        if (this.currentPage === 1) {
          this.movies = response.results.sort(this.orderByVoteAverage)
        } else {
          this.movies = this.movies.concat(response.results.sort(this.orderByVoteAverage)).sort(this.orderByVoteAverage)
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

  orderByVoteAverage(a, b): number {
    if (a.vote_average < b.vote_average) {
      return 1
    }
    if (a.vote_average > b.vote_average) {
      return -1
    }
    return 0
  }
}
