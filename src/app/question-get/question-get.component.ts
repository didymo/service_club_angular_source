import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';

@Component({
  selector: 'app-question-get',
  templateUrl: './question-get.component.html',
  styleUrls: ['./question-get.component.css'],
  providers: [QuestionsService]
})
export class QuestionGetComponent implements OnInit {
  constructor(
    private questionservice: QuestionsService,
  ) { }

  ngOnInit() {
    //.getQuestion();
    this.questionservice.getQuestion();
  }

 // getQuestion(): void {
   // this.questionService.getQuestion().subscribe(returnvalue => this.question = returnvalue);
 // }

}
