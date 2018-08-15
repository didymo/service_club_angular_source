import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';

// @ts-ignore
@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css']
})
export class QuestionShowComponent implements OnInit {
  constructor(

    private questionService: QuestionsService,

  ) {}

  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion(): void {
    this.questionService.getQuestion();
  }

}
