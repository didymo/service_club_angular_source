import { Component, OnInit } from '@angular/core';
import { QuestionResultService } from '../services/question-result.service';
import { Router }                from "@angular/router";

@Component({
  selector: 'app-question-display-result',
  templateUrl: './question-display-result.component.html',
  styleUrls: ['./question-display-result.component.css']
})

export class QuestionDisplayResultComponent implements OnInit {

  public message: string = null;

  constructor(private router: Router, 
              private result: QuestionResultService) {
    this.message = result.message;
  }

  ngOnInit() {
  }

  // Submit button handler
  public submitHandler()
  {
    this.router.navigate(['map']);
  }

}
