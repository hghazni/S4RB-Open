import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpmu',
  templateUrl: './cpmu.component.html',
  styleUrls: ['./cpmu.component.scss']
})
export class CpmuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export class Post {
  public Quarter: string;
  public Month: string;
  public Complaints: number;
  public UnitsSold: number;
}
