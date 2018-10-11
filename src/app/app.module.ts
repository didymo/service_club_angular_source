import { BrowserModule }          from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule }       from '@angular/common/http';
import { FormsModule }            from '@angular/forms';

import { UOWErrorHandler } from './classes/uow.error-handler';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { QuestionDisplayResultComponent } from './question-display-result/question-display-result.component';
import { MapComponent } from './map/map.component';
import { MapSearchComponent } from './map-search/map-search.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionDisplayComponent,
    QuestionDisplayResultComponent,
    MapComponent,
    MapSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{provide: ErrorHandler, useClass: UOWErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
