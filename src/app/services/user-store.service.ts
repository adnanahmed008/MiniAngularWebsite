import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private users: User[] = [];

  constructor() { }

  getAll() {
    return this.users;
  }

  getByUsername(username: string){
    return this.users.find(x => x.username == username);
  }
}
