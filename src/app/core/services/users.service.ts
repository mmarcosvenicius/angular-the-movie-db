import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`http://localhost:3000/users`);
  }

  register(user: User) {
    return this.http.post(`http://localhost:3000/users`, user);
  }

  getUser(user: User) {
    return this.http.get(`http://localhost:3000/users/${user.id}`);
  }

  delete(user: User) {
    return this.http.delete(`http://localhost:3000/users/${user.id}`);
  }

  getUsername(username: string): Promise<any> {
    return this.http.get(`http://localhost:3000/users?username=${username}`).toPromise()
      .then((resposta: any) => resposta)
  }
}
