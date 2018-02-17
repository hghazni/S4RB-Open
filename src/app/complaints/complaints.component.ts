import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ComplaintInterface } from '../interface/interface';
import { ComplaintsService } from '../services/complaints.service';
import { ComplaintsModel } from '../models/ComplaintsModel.model';
import { Observable } from 'rxjs/Observable';
import { Config } from '../Config';
import 'rxjs/Rx';
import * as moment from 'moment';

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

  // Link to CPMU JSON Database
  private CPMULink = Config.dbURL + '/CPMU/';

  // Gets Monthly CPMU Data
  getMonthlyCPMU() {
    return this.http.get(this.CPMULink)
    // Subscribes to MonthlyCPMUList as an array
        .subscribe(CPMUList => {   
          // Returns the response as an Observable
          this.CPMUList = CPMUList;
        },
            error => console.log('Error :: ' + error),
        );
  }

  // Toggle Between Monthly & Quarterly CPMU
  toggleData(event) {
    const CPMUDataSwitch = <HTMLInputElement> document.getElementById("CPMUDataToggle");
    const MonthlyCPMU = <HTMLBodyElement> document.getElementById('MonthlyCPMU');
    const QuarterlyCPMU = <HTMLBodyElement> document.getElementById('QuarterlyCPMU');
    const QuarterLabel = <HTMLBodyElement> document.getElementById('quarterLabel');
    const MonthLabel = <HTMLBodyElement> document.getElementById('monthLabel');
    //grab event from dropdown/button/switch
    let isChecked = CPMUDataSwitch.checked;
      if (isChecked == true) {
        // Toggles Quarterly Data
        MonthlyCPMU.style.display = 'none';
        QuarterlyCPMU.style.display = 'block';
        // Toggles Quarterly Label
        MonthLabel.style.display = 'none';
        QuarterLabel.style.display = 'block';

      } else {
        // Toggles Monthly Data
        MonthlyCPMU.style.display = 'block';
        QuarterlyCPMU.style.display = 'none';
        // Toggles Monthly Label
        MonthLabel.style.display = 'block';
        QuarterLabel.style.display = 'none';
      }
    
  }

  // Calculates the Monthly Complaints Per Million Units 
  CalculateMonthlyComplaints() {
  // grab Complaints & UnitsSold values from JSON Database
    return this.http.get(this.CPMULink)
        .subscribe(MonthlyCPMUList => {
          // Loops through the Complaints Observable       
          MonthlyCPMUList.forEach(i => {
            // Sets the Object value of CPMU to the Complaints Per Million Units Calculation      
           i.CPMU = ((i.Complaints) / (i.UnitsSold) * 1000000).toFixed(1);
            // console.log(i.CPMU + ' ' + 'Monthly CPMU');
          });
          this.MonthlyCPMUList = MonthlyCPMUList;
        },
      }

  // Calculates the Quarterly Complaints Per Million Units 
  CalculateQuarterlyComplaints() {
    // grab Complaints & UnitsSold values from JSON Database
      return this.http.get(this.CPMULink)
          .subscribe(QuarterlyCPMUList => {
            // Loops through the Complaints Observable       
            QuarterlyCPMUList.forEach(i => {
              // Sets the Object value of CPMU to the Complaints Per Million Units Calculation      
             i.CPMU = ((i.Complaints) / (i.UnitsSold) * 1000000).toFixed(1);
              // console.log(i.CPMU + ' ' + 'Quarterly CPMU');
            });
            this.QuarterlyCPMUList = QuarterlyCPMUList;
          },
        }

  ngOnInit() {
    this.toggleData(event);
    this.getMonthlyCPMU();
    this.CalculateMonthlyComplaints();
    this.CalculateQuarterlyComplaints();
  }
}
