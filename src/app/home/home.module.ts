import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './home-container/home-container.component';
import { AddUserComponent } from './home-container/add-user/add-user.component';
import { ListUserComponent } from './home-container/list-user/list-user.component';
import { HomeRoutingModule } from './home-container/home-routing.module';



@NgModule({
  declarations: [
    HomeContainerComponent,
    AddUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
