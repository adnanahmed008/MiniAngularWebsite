import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  private username: string = "";
  public user?: User;

  constructor(private route: ActivatedRoute,
    private srvUsers: UserStoreService) {
    const routeParams = this.route.snapshot.paramMap;
    this.username = routeParams.get('username') || "";
  }

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation() {
    if (!this.username?.length) return;

    this.user = this.srvUsers.getByUsername(this.username);
  }

}
