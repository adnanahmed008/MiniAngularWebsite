import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-profile-picture-thumbnail',
  templateUrl: './profile-picture-thumbnail.component.html',
  styleUrls: ['./profile-picture-thumbnail.component.scss']
})
export class ProfilePictureThumbnailComponent implements OnInit {
  @Input() base64: string = "";
  @Output() onLoad: EventEmitter<Event> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onLoadEvent(e: Event) {
    this.onLoad.emit(e);
  }
}
