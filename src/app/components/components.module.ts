import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureThumbnailComponent } from './profile-picture-thumbnail/profile-picture-thumbnail.component';
import { TabsComponent } from './tabs/tabs.component';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    ProfilePictureThumbnailComponent,
    TabsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProfilePictureThumbnailComponent,
    TabsComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
