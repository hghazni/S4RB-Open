import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ComplaintsComponent } from './complaints/complaints.component';
import { ToggleComponent } from './toggle/toggle.component'


@NgModule({
  declarations: [
    AppComponent,
    ComplaintsComponent,
    ToggleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
