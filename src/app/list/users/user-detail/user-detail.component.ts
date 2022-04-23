import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserStoreService } from 'src/app/services/user-store.service';
import { faPencil, faCircle, faEllipsisVertical, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { ITab } from 'src/app/Interfaces/itab';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  faPencil = faPencil;
  faCircle = faCircle;
  faGraduationCap = faGraduationCap;
  faEllipsisVertical = faEllipsisVertical;

  private username: string = "";
  public user?: User;

  public tabs: ITab[] = [
    { label: "Profile", isActive: true },
    { label: "Posts", isActive: false },
    { label: "Portfolio", isActive: false },
    { label: "Events", isActive: false },
    { label: "Gallery", isActive: false },
    { label: "Saved", isActive: false }
  ];

  constructor(private router: Router,
    private route: ActivatedRoute,
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
    if (!this.user)
      this.router.navigate(['/home']);
  }
}
