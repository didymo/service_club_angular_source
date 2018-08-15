import { Component, OnInit } from '@angular/core';
import { QuestionsService } from '../questions.service';
import { CategoryQuestion } from '../question';

// @ts-ignore
@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css']
})
export class QuestionShowComponent implements OnInit {
  private questions: CategoryQuestion[];
  typeList: any[] = [
    {id: 1, name: 'Yes'},
    {id: 2, name: 'No'}
  ];
  type: number;
  constructor(

    private questionService: QuestionsService,
  ) {}
  ngOnInit(): void {
    this.getQuestion();
  }

  getQuestion(): void {
    this.questionService.getQuestion().subscribe((results) => this.assignResults(results));
  }

  private assignResults(results) {
    this.questions = results;
    console.log(this.questions);
  }

  protected changeRadioButton(value, questionId) {
    console.log(value);
    console.log(questionId);
  }
  protected processForm() {
    console.log('test');
    event.preventDefault();
  }
  }
