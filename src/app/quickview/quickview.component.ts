import {Component, OnInit} from '@angular/core';
import {Toggable, ToggleService} from '../service/toggle.service';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.scss']
})
export class QuickviewComponent implements OnInit {
  visible: boolean;
  constructor(public toggleService: ToggleService) { }

  ngOnInit() {
    this.toggleService.visible(Toggable.Quickview).subscribe(visible => {
      this.visible = visible;
    });
  }

}
