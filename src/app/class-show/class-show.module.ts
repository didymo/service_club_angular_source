import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import { FormsModule} from '@angular/forms';
import {ClassShowComponent} from './class-show.component';

@NgModule({
  imports: [
    CommonModule,
    //必须导入FormsMoudule，因为此页面用到了数据双向绑定
    FormsModule,
    //将LoginRoutes设置为子路由
  ],
  declarations: [
    ClassShowComponent
  ]
})
export class ClassShowModule { }
