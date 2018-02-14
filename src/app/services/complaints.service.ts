import { Injectable } from '@angular/core';
import { Config } from '../Config';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ComplaintsComponent } from '../complaints/complaints.component';
import { ComplaintsModel } from '../models/ComplaintsModel.model';


@Injectable()
export class ComplaintsService {

  // Pulls in JSON DB location
  private ComplaintsURL = Config.dbURL + '/CPMU/';

  constructor(public http: HttpClient) {}
}


