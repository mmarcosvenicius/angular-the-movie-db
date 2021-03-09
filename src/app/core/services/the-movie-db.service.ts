import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie.model';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {

  private urlApi = environment.urlApi
  private apiKey = environment.apiKey
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getNowPlaying(pageNumber: number = 1): Promise<any> {
    return this.http.get(`${this.urlApi}/movie/now_playing?api_key=${this.apiKey}&language=pt-BR&page=${pageNumber}`).toPromise()
      .then((resposta: any) => resposta)
  }

  getMovieById(id: number): Promise<any> {
    return this.http.get(`${this.urlApi}/movie/${id}?api_key=${this.apiKey}&language=pt-BR`).toPromise()
      .then((resposta: any) => resposta)
  }
  
  getRatedMovies(pageNumber: number = 1): Promise<any> {
    const user : User =  this.authService.getUserAuth()

    return this.http.get(`${this.urlApi}/guest_session/${user.guest.guest_session_id}/rated/movies?api_key=${this.apiKey}&language=pt-BR&sort_by=created_at.desc&page=${pageNumber}`).toPromise()
      .then((resposta: any) => resposta)
  }

  rating(id, rating: number) {
    const user : User =  this.authService.getUserAuth()
    return this.http.post(`${this.urlApi}/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${user.guest.guest_session_id}`, {value: rating}).toPromise()
      .then((resposta: any) => resposta)
  }

  deleteRating(id) {
    const user : User =  this.authService.getUserAuth()
    return this.http.delete(`${this.urlApi}/movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${user.guest.guest_session_id}`).toPromise()
      .then((resposta: any) => resposta)
  }

  searchMovie(busca:string): Observable<Movie[]> {
    return this.http.get(`${this.urlApi}/search/movie?api_key=${this.apiKey}&language=pt-BR&page=1&query=${busca}`)
    .pipe(
      retry(5),
      map((resposta: any) => resposta.results )
    )
  }
}