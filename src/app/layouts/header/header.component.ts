import { Component, OnInit } from '@angular/core';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/core/models/movie.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { TheMovieDbService } from 'src/app/core/services/the-movie-db.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public topScroll: boolean
  faPowerOff = faPowerOff
  user: any
  movies!: Observable<Movie[]>
  searchSubject: Subject<string> = new Subject<string>()

  constructor(
    private theMovieDbService: TheMovieDbService,
    private authService: AuthService
  ) {
    this.authService.user.subscribe(user => this.user = user)
  }

  ngOnInit(): void {
    this.movies = this.searchSubject
    .pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((termo: string) => {
        if(termo.trim() === ''){
          return of<Movie[]>([])
        }
        return this.theMovieDbService.searchMovie(termo)
      }),
      catchError((err: any) => {
        console.log(err)
        return of<Movie[]>([])
      })
    )
  }

  logout(): void {
    this.authService.logout()
  }
  
  searchMovies(search: string) {
    this.searchSubject.next(search)
  }

  clearSearch(): void {
    this.searchSubject.next('')
  }
}
