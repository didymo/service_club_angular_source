import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { QuestionsService } from '../questions.service';
import {CategoryQuestion} from '../question';


@Component({
  selector: 'app-question-get',
  templateUrl: './question-get.component.html',
  styleUrls: ['./question-get.component.css'],
  providers: [QuestionsService]
})
export class QuestionGetComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter();
  public questions: CategoryQuestion[];

  constructor(
    private questionservice: QuestionsService,
  ) { }

  ngOnInit() {
    //.getQuestion();
    this.questionservice.getQuestion();
  }
  eventNu() {
    this.activeIndexChange.emit(2);
  }
 // getQuestion(): void {
   // this.questionService.getQuestion().subscribe(returnvalue => this.question = returnvalue);
 // }

}
