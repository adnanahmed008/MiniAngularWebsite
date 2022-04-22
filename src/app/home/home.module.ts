import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './home-container/home-container.component';
import { AddUserComponent } from './home-container/add-user/add-user.component';
import { ListUserComponent } from './home-container/list-user/list-user.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeContainerComponent,
    AddUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ListUserComponent
  ]
})
export class HomeModule { }
