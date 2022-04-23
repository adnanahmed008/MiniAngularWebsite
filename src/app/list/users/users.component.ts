import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users: User[] = [];


  constructor(private srvUsers: UserStoreService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /**
   * Get users from the store
   */
  getUsers () {
    this.users = this.srvUsers.getAll();
  }
}
