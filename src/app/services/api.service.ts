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

    private _url = Config.dbURL + '/CPMU/';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<ComplaintInterface[]> {
    return this.http
          .get(Config.dbURL)
          .map((res: Response) => {
              return <ComplaintInterface[]>res.json();
          })
          .catch(this.handleError);
  }

private handleError(error: Response) {
    return Observable.throw(error.statusText);
}

}
