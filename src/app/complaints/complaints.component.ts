import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../services/api.service';
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
    ApiService
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
  public QuarterCPMUstat;

/**============================
* Gets Monthly CPMU Data
========================*/
  public getMonthlyCPMU() {
    return this.http.get(this.CPMULink)
    // Subscribes to MonthlyCPMUList as an array
        .subscribe(CPMUList => {   
          // Returns the response as an Observable
          this.CPMUList = CPMUList;
        },
            error => console.log('Error :: ' + error),
        );
  }

  /**=========================
  * Monthly Complaints Calculations
  ========================*/
  // Calculates the Monthly Complaints Per Million Units 
  public CalculateMonthlyComplaints() {
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
        }
      },

      private getMissingMonths(QuarterlyCPMUList){
        // Set start and end dates
        let currentDate = QuarterlyCPMUList[0].Month;
        let lastDate = QuarterlyCPMUList[QuarterlyCPMUList.length - 1].Month;
    
        // Loops through every month between start and end date and pushes any missing months
        for(let i = 0; moment(currentDate).format('DDMMYYYY') != moment(lastDate).add(1, 'month').format('DDMMYYYY'); i++){
          if(moment(QuarterlyCPMUList[i].Month).format('DDMMYYYY') != moment(currentDate).format('DDMMYYYY')){
            let quarter = this.getQuarter(moment(currentDate));
            QuarterlyCPMUList.splice(i, 0, {Quarter: quarter, Month: moment(currentDate).format('DD MMMM YYYY'), Complaints: 0, UnitsSold: 0, CPMU: 0});
          }
          // Format existing months
          if(QuarterlyCPMUList[i].CPMU != 0){
            QuarterlyCPMUList[i].Month = moment(QuarterlyCPMUList[i].Month).format('DD MMMM YYYY');
          }
          currentDate = moment(QuarterlyCPMUList[i].Month).add(1, 'month').startOf('month').toISOString();
        }
    
        return QuarterlyCPMUList;
      }

  /**============================
  * Calculate Quarterly Complaint Calculations
  ========================*/
  // Calculates the Quarterly Complaints Per Million Units 
  public CalculateQuarterlyComplaints() {
    let CPMUQuarterData;
    // grab Complaints & UnitsSold values from JSON Database
      return this.http.get(this.CPMULink)
          .subscribe(QuarterlyCPMUList => {

            // Loops through the Complaints Observable       
            QuarterlyCPMUList.forEach(i => {
              
              // Sets the Object value of CPMU to the Complaints Per Million Units Calculation      
             i.Quarter = (Object.values(i.Quarter).map(Number));
             return i.Quarter = parseInt(i.Quarter),
            
             // Formats Yearly data only from the Monthly JSON Timestamps
             i.Month = moment(i.Month).format('YYYY'),
            
             // Organises the Quarterly data into annual nodes with their relevant months
             CPMUQuarterData = (QuarterlyCPMUList).reduce((o,v) => {
               if (o && v) {
                o[moment(v.Month).year()] = o[moment(v.Month).year()] || [];
                o[moment(v.Month).year()][v.Quarter] = o[moment(v.Month).year()][v.Quarter] || [];
                o[moment(v.Month).year()][v.Quarter].push(v);
                return o;
               }
             }, Object.create({}));
          }),

          /**============================
          * Quarterly CPMU Organisation/Calculation
          ========================*/
            this.QuarterlyCPMUList = QuarterlyCPMUList;
            this.CPMUQuarterData = CPMUQuarterData;

            // Quarter Constants
            let QuarterCPMUAverage;
            let QuarterYear;
            let Quarter;
            let quarters;
            let complaints = 0;
            let units = 0;

            Object.keys(CPMUQuarterData).forEach(year => {
              Config.quarters.forEach( quarter => {
                if(CPMUQuarterData[year][quarter]) {
                  let i = 0;

                  // Quarterly CPMU Average
                  CPMUQuarterData[year][quarter].forEach(element => {
                    if(element.CPMUAverage != 0) {
                      quarters += element.Quarter;
                      complaints += element.Complaints;
                      units += element.UnitsSold;
                    }
                  });
                  CPMUQuarterData[year][quarter].CPMUAverage = +(complaints / units * 1000000).toFixed(1) || 0;
                  complaints = 0;
                  units = 0;

                  // Returns average quarterly CPMU data and puts into 'QuarterCPMUAverage'
                  QuarterCPMUAverage = CPMUQuarterData[year][quarter].CPMUAverage,
                  Quarter = CPMUQuarterData[year][quarter][i].Quarter,
                  QuarterYear = CPMUQuarterData[year][quarter][i].Month;

                  // console.log(Quarter)
                  // console.log(QuarterYear)

                /**============================
                * Calling and organising the Quarterly data 
                ========================*/
                  for (let i = 0; i < 0; i++){
                  console.log(CPMUQuarterData[i][i].CPMUAverage)
                  }
        
                  QuarterlyCPMUList = CPMUQuarterData;
                  console.log(CPMUQuarterData)
                }
              })
            })
            return CPMUQuarterData
          })
}   
  ngOnInit() {
    this.getMonthlyCPMU();
    this.CalculateMonthlyComplaints();
    this.CalculateQuarterlyComplaints();
  }
}
