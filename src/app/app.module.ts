import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { QuestionShowComponent } from './question-show/question-show.component';
import { QuestionGetComponent } from './question-get/question-get.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ClassShowComponent } from './class-show/class-show.component';
import {windowFactory} from './window-factory';
import {AppData} from './app-data';
import { MapComponent } from './map/map.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { InitMapComponent } from './init-map/init-map.component';
import { InitMapSaverComponent } from './init-map-saver/init-map-saver.component';
import { InitMapSearchComponent } from './init-map-search/init-map-search.component';



@NgModule({
  declarations: [
    AppComponent,
    QuestionShowComponent,
    QuestionGetComponent,
    ClassShowComponent,
    MapComponent,
    InitMapComponent,
    InitMapSaverComponent,
    InitMapSearchComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot()

  ],
  providers: [AppData,
    {
      provide: AppData,
      useFactory: windowFactory
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
