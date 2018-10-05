import {Component, OnInit} from '@angular/core';
import {QuestionsService} from '../questions.service';
import {CategoryQuestion} from '../question';
import {TrafficPlanCategory} from '../traffic-plan-category';
import {Params, Router} from '@angular/router';
import {ClassResponse} from '../traffic-plan-category';
import {query} from '@angular/animations';

@Component({
  selector: 'app-class-show',
  templateUrl: './class-show.component.html',
  styleUrls: ['./class-show.component.css']
})
export class ClassShowComponent implements OnInit {
  public questions: CategoryQuestion[];
  public categoryInformation: TrafficPlanCategory;
  public classReturnInformation: ClassResponse;
  public postBody: string;


  constructor(
              private questionService: QuestionsService,
              ) { }

  ngOnInit() {
    this.classReturnInformation = new ClassResponse();
    this.categoryResult();
}
  categoryResult(): void {
    this.questionService.categoryResult().subscribe((results) => this.assignResults(results));
    /*this.questionService.categoryResult().subscribe(
      (response) => this.classReturn(response)
    );*/
  }

  private assignResults(response) {
    this.classReturnInformation = response;
    console.log(response);
  }
  /*private classReturn(response) {
    this.classReturnInformation = response;
    console.log(response);
    console.log(this.questions);
  }*/
}

/*categoryResult(myBody): void {
  this.questionService.categoryResult(myBody).subscribe((results) => this.assignCategory(results));
console.log(this.categoryInformation);
}*/


