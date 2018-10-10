import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {QuestionShowComponent} from './question-show.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //设置ShowmainRoutes为子路由
  ],
  declarations: [
    QuestionShowComponent
  ]
})
export class QuestionShowModule { }
