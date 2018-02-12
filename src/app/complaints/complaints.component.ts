import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ComplaintInterface } from '../interface/interface';
import { ComplaintsModel } from '../models/ComplaintsModel.model';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss'],
  providers: [ApiService]
})
export class ComplaintsComponent implements OnInit {

  _postsArray: Array<ComplaintsModel>;

  constructor(private apiService: ApiService) { }

  getPosts(): void {
    this.apiService.getPosts()
        .subscribe(
            resultArray => this._postsArray = resultArray,
            error => console.log('Error :: ' + error)
        );
  }

  ngOnInit(): void {
    this.getPosts();
  }

}
