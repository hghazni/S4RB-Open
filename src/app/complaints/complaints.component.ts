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
    // Subscribes to MonthlyCPMUList as an array
        .subscribe(MonthlyCPMUList => {   
          this.MonthlyCPMUList = MonthlyCPMUList;
        },
            error => console.log('Error :: ' + error),
        );
  }

  // grab Complaints & UnitsSold values from JSON DB
  CalculateComplaints() {
    return this.http.get(this.CPMULink)
        .subscribe(MonthlyCPMUList => {
          // Loops through the Complaints Observable       
          MonthlyCPMUList.forEach(i => {
            // Sets the Object value of CPMU to the Complaints Per Million Units Calculation      
           i.CPMU = ((i.Complaints) / (i.UnitsSold) * 1000000).toFixed(1);
            console.log(i.CPMU);
          });
          this.MonthlyCPMUList = MonthlyCPMUList;
        },
      }

  ngOnInit() {
    this.getMonthlyCPMU();
    this.CalculateComplaints();
  }
}
