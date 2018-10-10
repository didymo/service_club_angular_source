import { Component } from '@angular/core';
import {QuestionsService} from './questions.service';
import { QuestionShowComponent} from './question-show/question-show.component';
import { ClassShowComponent} from './class-show/class-show.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeTabViews: 0;
  activeIndex: 1;
}

