import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ITab } from 'src/app/Interfaces/itab';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {
  @Input() tabs: ITab[] = [];
  @Output() onTabSelection: EventEmitter<ITab> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  select(tab: ITab) {
    this.tabs.forEach(x => x.isActive = false);
    tab.isActive = true;

    this.onTabSelection.emit(tab);
  }
}
