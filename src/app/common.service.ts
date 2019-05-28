import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CommonService implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  commonSelectedFrom = null;
  commonSelectedTo = null;
  loader: boolean = true;
  allJSONData: any[] = [];
  planTripData: any[] = [];
  detailsJson: any[] = [];
  commonSelectedDepartureDate: Date = new Date();
  commonSelectedReturnDate: Date = new Date();
  constructor(private http: HttpClient) {
    this.getJSONData()
  }
  ngOnInit() {
  }
  getJSONData() {
    this.http.get('../../assets/citiesData.json', this.httpOptions).subscribe(
      (data) => {
        var allJSONData = Object.keys(data).map(i => data[i])
        allJSONData.forEach((data, index, array) => {
          if (data.code && data.city) this.allJSONData.push({ value: data.code, label: data.city, name: data.name });
          if (allJSONData.length - 1 == index) {
            this.loader = false;
          }
        })
      },
      (err) => {
        console.log(err);
      });
  }
  switchDestination() {
    [this.commonSelectedFrom, this.commonSelectedTo] = [this.commonSelectedTo, this.commonSelectedFrom];
  }
  planTrip() {
    if (this.planTripData.length > 0) {
      if (this.commonSelectedFrom == this.planTripData[this.planTripData.length - 1].to) {
        //when the trip is continued
        this.planTripData.push({ straightLine: this.planTripData[this.planTripData.length - 1].level != 2 ? true : false, straightLineArrow: false, color: this.setColor(), upCurve: false, downCurve: this.planTripData[this.planTripData.length - 1].level == 2 ? true : false, level: this.findLevel('continue') })
      } else if (this.commonSelectedTo == this.planTripData[this.planTripData.length - 1].to && this.commonSelectedFrom == this.planTripData[this.planTripData.length - 1].from) {
        //when the trip is same -Level need to be upgraded
        if (this.planTripData[this.planTripData.length - 2]) this.planTripData[this.planTripData.length - 2].level = 2;
        this.planTripData[this.planTripData.length - 1].level = 2;
        var set = false;
        for (let i = 0; i < this.planTripData.length; i++) {
          if (this.planTripData[i].upCurve) {
            set = true;
          }
          if (this.planTripData[i].downCurve) {
            set = !set
          }
        }
        if (this.planTripData[this.planTripData.length - 2]) {
          this.planTripData[this.planTripData.length - 2].straightLine = set;
          this.planTripData[this.planTripData.length - 2].straightLineArrow = false;
          this.planTripData[this.planTripData.length - 2].upCurve = !set;
          this.planTripData[this.planTripData.length - 2].downCurve = false;
        }
        this.planTripData.push({ straightLine: true, straightLineArrow: false, color: this.setColor(), upCurve: false, downCurve: false, level: this.findLevel('levelModify') })
      } else {
        //when the trip is discontinued
        var set = false;
        for (let i = 0; i < this.planTripData.length; i++) {
          if (this.planTripData[i].upCurve) {
            set = true;
          }
          if (this.planTripData[i].downCurve) {
            set = !set
          }
        }
        this.planTripData.push({ straightLine: false, straightLineArrow: !set, color: this.setColor(), upCurve: false, downCurve: set, level: this.findLevel('disContinue') })
      }
      this.planTripData.push({ from: this.commonSelectedFrom, to: this.commonSelectedTo, level: this.findLevel('new') })
      this.detailsJson.push({ from: this.commonSelectedFrom, to: this.commonSelectedTo, level: this.findLevel('new'), departure: this.commonSelectedDepartureDate, return: this.commonSelectedReturnDate })
    } else {
      this.planTripData.push({ from: this.commonSelectedFrom, to: this.commonSelectedTo, level: 1 })
      this.detailsJson.push({ from: this.commonSelectedFrom, to: this.commonSelectedTo, level: 1, departure: this.commonSelectedDepartureDate, return: this.commonSelectedReturnDate })
    }
  }
  setColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  findLevel(type) {
    if (type == 'new') {
      return this.planTripData[this.planTripData.length - 1].level;
    } else if (type == 'continue') {
      return 1;
    } else if (type == 'levelModify') {
      // if (this.planTripData[this.planTripData.length - 1].level == 1) {
      //   return 2;
      // } else {
      //   return 1;
      // }
      return 2
    } else if (type == 'disContinue') {
      return 1;
    }
  }
}
