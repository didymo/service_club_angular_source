import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuestionDisplayComponent } from './question-display/question-display.component';
import { QuestionDisplayResultComponent } from './question-display-result/question-display-result.component';
import { MapComponent }                   from './map/map.component';

const routes: Routes = [
  {path:'display-questions', component: QuestionDisplayComponent},
  {path: 'display-questions-result', component: QuestionDisplayResultComponent},
  {path: 'map', component: MapComponent},
  {path: '', redirectTo: '/display-questions', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
