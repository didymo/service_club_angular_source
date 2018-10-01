import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Params } from '@angular/router';
//import { QuestionShowComponent} from '../question-show/question-show.component';
import {QuestionsService} from '../questions.service';
import {TrafficPlanCategory} from '../traffic-plan-category';
import {ClassReturn} from '../class-return';

@Component({
  selector: 'app-class-show',
  templateUrl: './class-show.component.html',
  styleUrls: ['./class-show.component.css']
})
export class ClassShowComponent implements OnInit {
  public classReturnInformation: ClassReturn;
  public postBody: string;
  public data: any;

  constructor(private route: ActivatedRoute,
              private questionService: QuestionsService,
              ) { }

  ngOnInit() {
    this.classReturnInformation = new ClassReturn();
      this.route.queryParams.subscribe(params => {
        this.data = params['this.classReturnInformation'];
        console.log(this.data);
      });
}}
