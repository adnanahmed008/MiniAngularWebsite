import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {
  public users: User[] = [];

  constructor(private srvUsers: UserStoreService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Get users from the store
   */
  getUsers() {
    this.users = this.srvUsers.getAll();
  }

}
