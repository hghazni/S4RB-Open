import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from 'config/Config';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ComplaintsService {
   private url: string = 'http://localhost:3000/';

  constructor(private http: HttpClient) {
    console.log('Hello ComplaintsService Provider');
  }

  getComplaints () {
    return this.http.get(Config.dbURL)
        .do((res: Response) => console.log(res))
        .map((res: Response) => res.json())
  }
}
