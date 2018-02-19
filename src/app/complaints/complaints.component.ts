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
import { Subject } from 'rxjs/Subject';
import { ToggleComponent } from '../toggle/toggle.component'; 

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [
    ApiService,
    ComplaintsService,
  ]
})

export class ComplaintsComponent implements OnInit {

  // CPMUList Array Model
  _postsArray: Array<ComplaintsModel>;

  constructor(public http: HttpClient) { }

  // Link to CPMU JSON Database
  private CPMULink = Config.dbURL + '/CPMU/';
  public complaintYears: Array<string>;
  public quarters = Config.quarters;
  public QuarterlyCPMUList = Object;
  public CPMUQuarterData: Array<ComplaintsModel>;
  private ngUnsubscribe: Subject<void> = new Subject<void>();

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
    let CPMUQuarterData;
    // grab Complaints & UnitsSold values from JSON Database
      return this.http.get(this.CPMULink)
          .subscribe(QuarterlyCPMUList => {
            // Loops through the Complaints Observable       
            QuarterlyCPMUList.forEach(i => {
              // Sets the Object value of CPMU to the Complaints Per Million Units Calculation      
             i.Quarter = (Object.values(i.Quarter).map(Number));
             return i.Quarter = parseInt(i.Quarter),
             // Gets Quarters in a month
            //  console.log(i.Quarter + ' ' + 'Quarter');
             // Formats Yearly data only from the Monthly JSON Timestamps
             i.Month = moment(i.Month).format('YY'),
            //  console.log('Year ' + 20 + i.Month);

             // Organises the monthly data into annual nodes with their relevant quarters
             CPMUQuarterData = QuarterlyCPMUList.reduce((o,v) => {
               if (o && v) {
                o[moment(v.Month).year()] = o[moment(v.Month).year()] || [];
                o[moment(v.Month).year()][v.Quarter] = o[moment(v.Month).year()][v.Quarter] || [];
                o[moment(v.Month).year()][v.Quarter].push(v);
                return o;
               }
             }, Object.create({}))
            //  console.log(CPMUQuarterData)
            })
            this.QuarterlyCPMUList = QuarterlyCPMUList,
            this.CPMUQuarterData = CPMUQuarterData;
            // console.log(CPMUQuarterData);
            let complaints = 0;
            let units = 0;
            Object.keys(CPMUQuarterData).forEach(year => {
              Config.quarters.forEach( quarter => {
                if(CPMUQuarterData[year][quarter]) {
                  let i = 0;
                  CPMUQuarterData[year][quarter].forEach(element => {

                    if(element.CPMU != 0) {
                      complaints += element.Complaints;
                      units += element.UnitsSold;
                    }
                  });
                  CPMUQuarterData[year][quarter].CPMUAverage = +(complaints / units * 1000000).toFixed(1) || 0;
                  complaints = 0;
                  units = 0;
                }
              })
            })
            return CPMUQuarterData,
            console.log(CPMUQuarterData)
          
          })
        }

  // Organises and returns CPMU Quarterly Data
  CalcQuarterlyCPMU() {

        }       

  ngOnInit() {
    this.getMonthlyCPMU();
    this.CalculateMonthlyComplaints();
    this.CalculateQuarterlyComplaints();
  }
}
