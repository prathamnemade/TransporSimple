import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../common.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  constructor(private common: CommonService) { }
  ngOnInit() {
    
  }
}
