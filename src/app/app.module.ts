import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
//import { QuestionShowComponent } from './question-show/question-show.component';
import { QuestionGetComponent } from './question-get/question-get.component';
import {FormsModule} from '@angular/forms';
//import { ClassShowComponent } from './class-show/class-show.component';
import { AppRoutes } from './app.router';
import { RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    //QuestionShowComponent,
    QuestionGetComponent,
    //ClassShowComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
