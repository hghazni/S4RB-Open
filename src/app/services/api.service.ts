import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { ComplaintInterface } from '../interface/interface';
import { Config } from '../Config';
import { ComplaintsModel } from '../models/ComplaintsModel.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

console.log(Config.dbURL + '/CPMU/');

@Injectable()
export class ApiService {

  // Pulls in JSON DB location
  private _url = Config.dbURL + '/CPMU/';

  constructor(private http: HttpClient) { }

// Gets JSON data and returns it as an Observable Array through an Interface
  getPosts(): Observable<ComplaintInterface[]> {
    return this.http
          .get(this._url)
          .map((res: Response) => {
              return res;
          })
          .catch(this.handleError);
  }

// Error Handler
private handleError(error: Response) {
    return Observable.throw(error.statusText);
}

}
