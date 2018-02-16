import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { ComplaintInterface } from '../interface/interface';
import { ComplaintsService } from '../services/complaints.service';
import { ComplaintsModel, MonthlyComplaintsModel, QuarterlyComplaintsModel } from '../models/ComplaintsModel.model';
import { Observable } from 'rxjs/Observable';
import { Config } from '../Config';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [ApiService]
})

export class ComplaintsComponent implements OnInit {

  // CPMUList Array Model
  _postsArray: Array<ComplaintsModel>;

  constructor(private apiService: ApiService) { }

  public MonthlyCPMUList: Array<ComplaintsModel>;
  public QuarterlyCPMUList: Array<ComplaintsModel>;


  // Gets Monthly CPMU Data
  getMonthlyCPMU(): void {
    this.apiService.getPosts()
        // subscribes to MonthlyCPMUList as an array
        .subscribe(MonthlyCPMUList => this._postsArray = MonthlyCPMUList,
            error => console.log('Error :: ' + error)
        );
  }

  ngOnInit() {
    this.getMonthlyCPMU();
    console.log(Config.UnitsSold);
  }
}
