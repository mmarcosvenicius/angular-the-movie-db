import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  getUser(user: User) {
    return this.http.get(`${this.apiUrl}/users/${user.id}`);
  }

  delete(user: User) {
    return this.http.delete(`${this.apiUrl}/users/${user.id}`);
  }

  getUsername(username: string): Promise<any> {
    return this.http.get(`${this.apiUrl}/users?username=${username}`).toPromise()
      .then((resposta: any) => resposta)
  }
}
