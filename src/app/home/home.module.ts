import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './home-container/home-container.component';
import { HomeRoutingModule } from './home-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';
import { AddUserComponent } from './home-container/add-user/add-user.component';
import { ListUserComponent } from './home-container/list-user/list-user.component';
import { ProfilePictureThumbnailComponent } from '../components/profile-picture-thumbnail/profile-picture-thumbnail.component';



@NgModule({
  declarations: [
    HomeContainerComponent,
    AddUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  exports: [
    HomeContainerComponent,
    ListUserComponent
  ]
})
export class HomeModule { }
