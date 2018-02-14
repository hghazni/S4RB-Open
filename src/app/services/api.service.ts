import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response } from '@angular/http';
import { ComplaintInterface } from '../interface/interface';
import { Config } from '../Config';
import { ComplaintsModel } from '../models/ComplaintsModel.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

    // On subscribe returns an array of ComplaintsModel data per month
    public CPMUData(): Observable<any> {
        return this.http.get(this._url)
            .map(CPMUArray => {
                // Return data as JSON
                return CPMUArray as Array<ComplaintsModel>;
            })
            .catch(err => {
                return Observable.throw(err);
            });
    }

    // Error Handler
    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

}
