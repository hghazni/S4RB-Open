import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ComplaintsModel } from '../models/ComplaintsModel.model';
import { Observable } from 'rxjs/Observable';
import { Config } from '../Config';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.scss']
})
export class ToggleComponent implements OnInit {

  constructor(http: HttpClient) { }
    // Link to CPMU JSON Database
    private CPMULink = Config.dbURL + '/CPMU/';
    public QuarterlyCPMUList = Object;

// Toggle Between Monthly & Quarterly CPMU
toggleData(event) {
  const CPMUDataSwitch = <HTMLInputElement> document.getElementById("CPMUDataToggle");
  const MonthlyCPMU = <HTMLBodyElement> document.getElementById('MonthlyCPMU');
  const QuarterlyCPMU = <HTMLBodyElement> document.getElementById('QuarterlyCPMU');
  const QuarterLabel = <HTMLBodyElement> document.getElementById('quarterLabel');
  const MonthLabel = <HTMLBodyElement> document.getElementById('monthLabel');
  // Grabs event from switch
  let isChecked = CPMUDataSwitch.checked;
  // Checks the checkboxes state
    if (isChecked == true) {
      // Toggles Quarterly Data
      MonthlyCPMU.style.display = 'none';
      QuarterlyCPMU.style.display = 'block';
      // Toggles Quarterly Label
      MonthLabel.innerHTML = 'Year';
      MonthLabel.style.width = '3.25rem';
      QuarterLabel.style.display = 'block';

    } else {
      // Toggles Monthly Data
      MonthlyCPMU.style.display = 'block';
      QuarterlyCPMU.style.display = 'none';
      // Toggles Monthly Label
      MonthLabel.innerHTML = 'Month';
      MonthLabel.style.width = '6.75rem';
      QuarterLabel.style.display = 'none';
    } 
}
  ngOnInit() {
    this.toggleData(event);
    console.log('braaap')
  }

}