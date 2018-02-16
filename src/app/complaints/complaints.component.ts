import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ComplaintInterface } from '../interface/interface';
import { ComplaintsService } from '../services/complaints.service';
import { ComplaintsModel } from '../models/ComplaintsModel.model';
import { Observable } from 'rxjs/Observable';
import { Config } from '../Config';
import 'rxjs/Rx';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [
    ApiService,
    ComplaintsService
  ]
})

export class ComplaintsComponent implements OnInit {

  // CPMUList Array Model
  _postsArray: Array<ComplaintsModel>;

  constructor(public http: HttpClient) { }

  private CPMULink = Config.dbURL + '/CPMU/';

  // Gets Monthly CPMU Data
  getMonthlyCPMU() {
    return this.http.get(this.CPMULink)
    // subscribes to MonthlyCPMUList as an array
        .subscribe(MonthlyCPMUList => {
          console.log(MonthlyCPMUList);
          this.MonthlyCPMUList = MonthlyCPMUList;
        },
            error => console.log('Error :: ' + error),
        );
  }

  // grab Complaints & UnitsSold values from JSON DB
  CalculateComplaints() {
    return this.http.get(this.CPMULink)
        .subscribe(MonthlyCPMUList => {
          this.MonthlyCPMUList.Complaints / MonthlyCPMUList.UnitsSold = MonthlyCPMUList;
        },
  }

  ngOnInit() {
    this.getMonthlyCPMU();
  }
}
