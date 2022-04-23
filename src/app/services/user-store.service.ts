import { Injectable } from '@angular/core';
import { EResponseCode } from '../enums/eresponse-code';
import { User } from '../models/user';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  private users: User[] = [];
  private readonly $STORAGE_KEY = "USER_STORE";

  constructor(private srvStorage: StorageService) {
    console.log("User Store Service");
    this.onInit();
  }

  onInit() {
    this.srvStorage.getItem(this.$STORAGE_KEY)
      .then((users) => {
        (users as User[]).forEach(x => {
          this.users.push(new User().loadFrom(x));
        })
      }).catch(() => { });
  }

  getAll() {
    return this.users;
  }

  getByUsername(username: string) {
    return this.users.find(x => x.username == username);
  }

  save(user: User): Promise<EResponseCode> {
    return new Promise((resolve, reject) => {
      let existingUser = this.getByUsername(user.username);
      console.log("existingUser", existingUser);
      if (existingUser != null) {
        reject(EResponseCode.ALREADY_EXISTS);
        return;
      }

      this.users.push(user);
      this.updateInStorage();
      resolve(EResponseCode.OK);
    });
  }

  update(user: User): Promise<EResponseCode> {
    return new Promise((resolve, reject) => {
      let existingUser = this.getByUsername(user.username);
      console.log("existingUser", existingUser);
      if (existingUser == null) {
        reject(EResponseCode.NOT_FOUND);
        return;
      }

      existingUser.name = user.name;
      existingUser.username = user.username;
      existingUser.city = user.city;
      existingUser.state = user.state;
      existingUser.country = user.country;
      existingUser.profession = user.profession;
      existingUser.lookingFor = user.lookingFor;
      existingUser.bio = user.bio;
      existingUser.university = user.university;

      this.updateInStorage();
      resolve(EResponseCode.OK);
    });
  }

  updateInStorage() {
    this.srvStorage.setItem(this.$STORAGE_KEY, this.users);
  }
}
