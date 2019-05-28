import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-detail-chain',
  templateUrl: './detail-chain.component.html',
  styleUrls: ['./detail-chain.component.css']
})
export class DetailChainComponent implements OnInit {

  constructor() { }
  @Input('planData') public planTripData;
  @Input('detailsJSON') public detailsJson;
  ngOnInit() {
  }

}
