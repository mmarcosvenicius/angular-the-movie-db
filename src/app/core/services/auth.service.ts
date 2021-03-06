import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from "rxjs/operators";
import { User } from '../models/user.model';
import { Guest } from '../models/guest.model';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlApi = environment.urlApi
  private apiKey = environment.apiKey
  private apiUrl = environment.apiUrl

  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(
    private http: HttpClient,
    private router: Router

  ) {
    
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();

  }


  guestSession() {
    // Create Guest Session
    const url = `${this.urlApi}/authentication/guest_session/new?api_key=${this.apiKey}`
    return this.http.get(url)
      .pipe(
        map((guest: Guest) => {
          return guest
        }))
  }


  register(user: User) {
    return this.http.post<User>(`${this.apiUrl}/users`, user)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUserAuth(user)
          }
          return user;
        }));
  }

  login(username: string) {
    return this.http.get<any>(`${this.apiUrl}/users?username=${username}`)
      .pipe(
        map((response: any) => {
          if (response.length) {

            const user: User = response[0]
            if (user) {

              const now = new Date()
              const expireAt = new Date(user.guest.expires_at)

              if (user.id !== 3 && (now.getTime() > expireAt.getTime())) {
                return new User('')
              }
              this.setUserAuth(user)
              return user;
            }
          }
          return new User('')
        }));
  }

  setUserAuth(user: User): void {
    localStorage.setItem('user', JSON.stringify(user))
    this.userSubject.next(user)
  }

  logout(): void {
    localStorage.removeItem('user')
    this.userSubject.next(null)
    this.router.navigate(['/login'])

  }
  getUserAuth(): any {
    try {
      const userAuth = localStorage.getItem('user');

      return JSON.parse((userAuth) ? userAuth : '');

    } catch {
      return null;
    }
  }

}
