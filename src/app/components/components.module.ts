import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilePictureThumbnailComponent } from './profile-picture-thumbnail/profile-picture-thumbnail.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    ProfilePictureThumbnailComponent,
    TabsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProfilePictureThumbnailComponent,
    TabsComponent
  ]
})
export class ComponentsModule { }
