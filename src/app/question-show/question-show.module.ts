import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {QuestionShowComponent} from './question-show.component';
import { QuestionShowRoutes} from './question-show.routes';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //设置ShowmainRoutes为子路由
    RouterModule.forChild(<any>QuestionShowRoutes)
  ],
  declarations: [
    QuestionShowComponent
  ]
})
export class QuestionShowModule { }
