import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ComplaintInterface } from '../interface/interface';
import { ComplaintsService } from '../services/complaints.service';
import { ComplaintsModel, MonthlyComplaintsModel, QuarterlyComplaintsModel } from '../models/ComplaintsModel.model';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [ApiService]
})
export class ComplaintsComponent implements OnInit {


  _postsArray: Array<ComplaintsModel>;
  // _monthlyArray: Array<MonthlyComplaintsModel>;
  // _quarterlyArray: Array<QuarterlyComplaintsModel>;

  constructor(private apiService: ApiService) { }

  public MonthlyCPMUList: Array<ComplaintsModel>;
  public QuarterlyCPMUList: Array<ComplaintsModel>;

  // Gets Monthly CPMU Data
  getMonthlyCPMU(): Observable<ComplaintInterface[]> {
    this.apiService.getPosts()
        .subscribe(
            MonthlyCPMUList => this._postsArray = MonthlyCPMUList,
            error => console.log('Error :: ' + error)
        );
  }
  // Gets Quarterly CPMU Data
  getQuarterlyCPMU(): Observable<ComplaintInterface[]> {
    this.apiService.getPosts()
        .subscribe(
            QuarterlyCPMUList => this._postsArray = QuarterlyCPMUList,
            error => console.log('Error :: ' + error)
        );
  }


  ngOnInit(): void {
    this.getMonthlyCPMU();

  }
}
