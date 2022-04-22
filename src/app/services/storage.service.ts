import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getItem(key: string) {
    return new Promise((resolve, reject) => {
      let value = localStorage.getItem(key);
      if (!value) {
        reject("ITEM_NOT_FOUND");
        console.log("StorageService: " + key + ": NOT_FOUND");
      }
      else {
        resolve(JSON.parse(value));
      }
    });
  }

  setItem(key: string, value: any): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        resolve();
      } catch (error) {
        reject();
        console.log(JSON.stringify(error));
      }
    });
  }

  clearAll(callback?: Function) {
    localStorage.clear();
    if (callback) callback();
  }
}