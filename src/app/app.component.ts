import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Component } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Config } from 'config/Config';
import { Post } from './cpmu/cpmu.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ComplaintsService } from './services/complaints.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Observable that will connect to the post interface
  posts: Observable<any>;
  newPost: Observable<any>;

  constructor(public http: HttpClient) {}

  // Gets CPMU JSON data from Config.ts
  getPosts() {
    // Getting a new instance of the class to accommodate for dynamic parameters in the future
    let params = new HttpParams().set('Quarter', '1');
    this.posts = this.http.get(Config.dbURL + '/CPMU' , { params });
  }
}
