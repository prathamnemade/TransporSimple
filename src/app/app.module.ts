import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DetailChainComponent } from './main/detail-chain/detail-chain.component';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailChainComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, HttpModule, HttpClientModule,FormsModule,
    DropdownModule,CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
