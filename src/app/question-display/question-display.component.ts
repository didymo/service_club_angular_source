import { Component, OnInit }     from '@angular/core';
import { Router }                from "@angular/router";
import { QuestionGetService }    from '../services/question-get.service';
import { QuestionSubmitService } from '../services/question-submit.service';
import { QuestionResultService } from '../services/question-result.service';
import { QuestionItem }          from '../classes/question-item';
import { QuestionAnswer }        from '../classes/question-answer';

@Component({
  selector:  'app-question-display',
  templateUrl: './question-display.component.html',
  styleUrls:  ['./question-display.component.css']
})

export class QuestionDisplayComponent implements OnInit {

  public    questionList:   QuestionItem[]   = [];
  public    questionResult: QuestionAnswer[] = [];

  constructor(private router:             Router,
              private getQuestions:       QuestionGetService,
              private submitAnswers:      QuestionSubmitService,
              private saveAnswers:        QuestionResultService) {}

  ngOnInit() {
    this.getQuestionList();
  }

  // From server
  protected getQuestionList()
  {
    let qlist = []; // Question List
    let id    = 0;

    this.getQuestions.get()
    .subscribe(res=>{
      for (let k in res)
      {
        id++;
        qlist.push({id: id, text: res[k]['q_'+id]});
      }
    });

    this.questionList = qlist;
  }

  /**
   * Handle form event - Checkbox changing
   * @param  id     Question ID
   * @param  answer Answer
   *
   * Save status in this.questionResult
   */
  public updateAnswerHandler(id: number, answer: boolean)
  {
    for (let k in this.questionResult)
    {
      if (id == this.questionResult[k].id)
      {
        this.questionResult[k].answer = answer;
        return;
      }
    }

    this.questionResult.push({id: id, answer: answer});
  }

  /**
   * Get answer by question ID
   * @param  id Question ID
   * @return    Answer
   *
   * null for non-exist ID
   */
  public getAnswerById(id: number)
  {
    for (let k in this.questionResult)
    {
      if (id == this.questionResult[k].id)
      {
        return this.questionResult[k].answer;
      }
    }

    return null;
  }

  // Form submit button handler
  public submitHandler()
  {
    if (this.ifAllAnswered() === false)
    {
      return;
    }

    let body = {};
    for (let key in this.questionResult)
    {
      body['q_'+ (Number(key)+1)] = {};
      body['q_'+ (Number(key)+1)][this.getQuestionTextById(this.questionResult[key].id)] = this.getAnswerById(this.questionResult[key].id);
    }

    this.submitAnswers.submit(body).subscribe(res=>{
      this.saveAnswers.message = res.toString();
      this.router.navigate(['display-questions-result']);
    });
  }


  /**
   * Get question text from this.questionList by ID
   * @param  id Question ID
   * @return    string;
   *
   * Null if non-exist ID
   */
  protected getQuestionTextById(id: number)
  {
    for (let k in this.questionList)
    {
      if (id == this.questionList[k].id)
      {
        return this.questionList[k].text;
      }
    }

    return null;
  }

  /**
   * If All questions are answered.
   * @return bool
   */
  private ifAllAnswered()
  {
    let i = 0;

    for (let k in this.questionResult)
    {
      i++;
      if (this.questionResult[k].answer === undefined ||
          this.questionResult[k].answer === null)
      {return false}
    }

    if (this.questionList.length != i)
    {
      return false;
    }
    else
    {
      return true;
    }
  }

}
