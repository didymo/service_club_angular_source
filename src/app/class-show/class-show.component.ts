import {Component, OnInit, Input,Output,EventEmitter} from '@angular/core';
import {QuestionsService} from '../questions.service';
import {CategoryQuestion} from '../question';
import {TrafficPlanCategory} from '../traffic-plan-category';
import {ClassResponse} from '../traffic-plan-category';

@Component({
  selector: 'app-class-show',
  templateUrl: './class-show.component.html',
  styleUrls: ['./class-show.component.css']
})
export class ClassShowComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter();
  public classReturnInformation: ClassResponse;


  constructor(
              private questionService: QuestionsService,
              ) { }
  ngOnInit() {
    this.classReturnInformation = new ClassResponse;
    this.categoryResult();
}
  eventNu() {
    this.activeIndexChange.emit(2);
  }
  categoryResult(): void {
    this.questionService.categoryResult().subscribe((results) => this.assignResults(results));
  }

  private assignResults(results) {
    this.classReturnInformation = results;
    console.log(results);
  }

}


