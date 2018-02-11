import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';


import { AppComponent } from './app.component';
import { CpmuComponent } from './cpmu/cpmu.component';
import { ComplaintsService } from './services/complaints.service';


@NgModule({
  declarations: [
    AppComponent,
    CpmuComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
      ComplaintsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
