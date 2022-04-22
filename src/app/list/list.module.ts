import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { ListRoutingModule } from './list-routing.module';
import { HomeModule } from '../home/home.module';
import { UserDetailComponent } from './users/user-detail/user-detail.component';



@NgModule({
  declarations: [
    UsersComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    HomeModule
  ]
})
export class ListModule { }
