import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ComplaintInterface } from '../interface/interface';
import { ComplaintsModel, MonthlyComplaintsModel, QuarterlyComplaintsModel } from '../models/ComplaintsModel.model';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [ApiService]
})
export class ComplaintsComponent implements OnInit {

  _postsArray: Array<ComplaintsModel>;
  _monthlyArray: Array<MonthlyComplaintsModel>;
  _quarterlyArray: Array<QuarterlyComplaintsModel>;

  constructor(private apiService: ApiService) { }

  // Gets Monthly CPMU
  getMonthlyCPMU(): void {
    this.apiService.getPosts()
        .subscribe(
            resultArray => this._monthlyArray = resultArray,
            error => console.log('Error :: ' + error)
        );
  }
  // Gets Quarterly CPMU
  getQuarterlyCPMU(): void {
    this.apiService.getPosts()
        .subscribe(
            resultArray => this._quarterlyArray = resultArray,
            error => console.log('Error :: ' + error)
        );
  }


  ngOnInit(): void {
    this.getQuarterlyCPMU();
  }

}
