import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {QuestionsService} from '../questions.service';
import {CategoryQuestion} from '../question';
import {TrafficPlanCategory} from '../traffic-plan-category';
import {ClassResponse} from '../traffic-plan-category';




// @ts-ignore
@Component({
  selector: 'app-question-show',
  templateUrl: './question-show.component.html',
  styleUrls: ['./question-show.component.css']
})
export class QuestionShowComponent implements OnInit {
  @Input() activeIndex: number;
  @Output() activeIndexChange = new EventEmitter();
  public questions: CategoryQuestion[];
  public categoryInformation: TrafficPlanCategory;
  public classReturnInformation: ClassResponse;
  public postBody: string;
  typeList: any[] = [
    {id: 1, name: 'Yes'},
    {id: 2, name: 'No'}
  ];
  // FIXME this is a temporary declaration for an example that does not work correctly.
  protected radioButtons: any[] = [
    {},
  ];
  type: number;
  // TODO This is a temporary variable used to demonstrate the [disabled] tag on the submit button. Please remove when able.
  myNum: number;

  constructor(
    private questionService: QuestionsService,
  ) {
  }
  ngOnInit(): void {
    this.radioButtons = [0];
    this.classReturnInformation = new ClassResponse();
    this.getQuestion();
  }

 /* eventNu() {
    this.activeIndexChange.emit(1);
  }*/
  getQuestion(): void {
    this.questionService.getQuestion().subscribe((results) => this.assignResults(results));
  }

  postAnswers(myBody): void {
    this.questionService.postAnswers(myBody).subscribe((results) => this.assignCategory(results));
    console.log(this.categoryInformation);
  }

  private assignResults(results) {
    this.questions = results;
  }

  private assignCategory(results) {
    this.categoryInformation = results;
  }
  public onSubmit(value) {
    console.log('before');
    // alert('in onsubmit');
    this.makePOSTJsonStringBody(value);
    this.activeIndexChange.emit(1);
    this.questionService.postAnswers(this.postBody).subscribe(
      //(response) => this.classReturn(response)
    );
    console.log(this.postBody);
    console.log('test');
    event.preventDefault();
  }


 /* private classReturn(response) {
    this.classReturnInformation = response;
    console.log(response);
    console.log(this.classReturnInformation);
  }*/

  /**
   * When the POST function POSTs to the back end the body must be formatted
   * in a particular way. This function builds the return body.
   * @param value
   */

  private makePOSTJsonStringBody (value) {
    /**
     * The first return line does not have a comma preceding.
     * This variable tracks if this is the end of the first line
     */
    let first = 0;
    /**
     * The question return 0's and 1's these need to be mapped to false and true
     */
    let ourBoolean = 'FALSE';

    this.postBody = '{';
    for (const entry of this.questions) {
      if (entry.result === '0') {
        ourBoolean = 'false';
      } else if (entry.result === '1') {
        ourBoolean = 'true';
      }
      if (first) {
        this.postBody = this.postBody + ',';
      } else {
        first = 1;
      }
      this.postBody = `${this.postBody
      + JSON.stringify(entry.id)}:{${JSON.stringify(entry.questionText)}:${ourBoolean}}`;


      // console.log(JSON.stringify(entry));
      // console.log(JSON.stringify(entry.id));
      // console.log(JSON.stringify(entry.questionText));
      // console.log(JSON.stringify(entry.id));
      // console.log(JSON.stringify(entry.questionText));
      // console.log(JSON.stringify(entry.result));
      // this.postBody = this.postBody + '}';
    }
    this.postBody = this.postBody + '}';
    // console.log(this.postBody);
  }

  protected changeRadioButton(value, questionId) {
    console.log(value);
    // console.log(questionId);
  }

  protected processForm() {
    alert('got the form info');
    console.log('test');
    event.preventDefault();
  }
}
