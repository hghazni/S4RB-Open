import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreValues } from 'CoreValues';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  posts: any;

  constructor(private http: HttpClient) {}

  getPosts() {
    this.posts = this.http.get(CoreValues.dbURL + '/CPMU');
  }

}
