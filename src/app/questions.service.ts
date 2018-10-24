///<reference path="../../node_modules/@angular/common/http/src/client.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryQuestion} from './question';
import {map, toArray} from 'rxjs/operators';
import {Section, TrafficPlanCategory} from './traffic-plan-category';
import {ClassReturn} from './class-return';
import {ClassResponse} from './traffic-plan-category';
import {parseHttpResponse} from 'selenium-webdriver/http';
import {arrayify} from 'tslint/lib/utils';
import {fromArray} from 'rxjs/internal/observable/fromArray';
import {AppData} from './app-data';
import {DrupalConnectionService} from './drupal-connection.service';


@Injectable({providedIn: 'root'})

export class QuestionsService {
  // private baseurldrupal = 'https://bluemaxstudios.com';
  // private baseurldrupal: string;
//  public api: string;
//  public postapi: string;
//  public getapi: string;
  // private getcsrfToken:string;
//  public csrfToken: string;


  constructor(private http: HttpClient, private appData: AppData, private drupalConnection: DrupalConnectionService) {
    // this.baseurldrupal = this.appData.baseurl;
 //   this.api = this.appData.baseurl + '/questionnaire/questions?_format=json';
 //   this.postapi = 'http://' + this.appData.baseurl + '/event/' + this.appData.eventid + '/questionnaire/submit?_format=json';
 //   this.getapi = this.appData.baseurl + '/event/' + this.appData.eventid + '/questionnaire/result?_format=json';

//    http.get(this.appData.baseurl + '/rest/session/token', {responseType: 'text'})
  //    .subscribe((value) => {
    //    console.log(value);
      //  this.csrfToken = value;
    //  });
  }

  postAnswers(myBody): Observable<ClassReturn> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'X-CSRF-Token': this.drupalConnection.csrfToken,
        // 'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };
    // const body = '{"q_1":{"Will it impact a major road(s)?":false},"q_2":{"Will it disrupt the non-event community over a wide area?":false},"q_3":{"Will your event impact traffic over a wide area? (trains, buses, etc.)":false},"q_4":{"Will it impact local traffic and roads?":false},"q_5":{"Will it disrupt the non-event community over a local area?":false},"q_6":{"Will your event impact local transport systems? (Local buses and routes)":false},"q_7":{"Will it disrupt the non-event community in the immediate area only?":false},"q_8":{"Is it a minor event under Police supervision?":false}}';
    console.log(myBody);
    console.log('this junk is running in the code postAnswers ');
    console.log(this.drupalConnection.csrfToken);
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
      .post(this.drupalConnection.apiPostTheQuestions, myBody, headers)
      .pipe(
        map(response => this.mapCategory(response))
      );
  }



  private mapToClassReturn(response): ClassResponse {
    const classResponse = new ClassResponse();
    console.log(response);
    classResponse.title = response.Title;
    classResponse.sections = [];
    for (let i = 0; i < response.Sections.length; i++) {
      const section = new Section();
      section.sectionName = Object.keys(response.Sections[i]).pop();
      section.sectionContent = String(Object.values(response.Sections[i]).pop());
      classResponse.sections.push(section);
    }
    console.log(classResponse);
    return classResponse;
  }

  categoryResult(): Observable<ClassResponse> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'X-CSRF-Token': this.drupalConnection.csrfToken,
        // 'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };
    console.log('in getQuestion');
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
    // .get<CategoryQuestions[]>(this.api, headers)
      .get(this.drupalConnection.apiGetTheQuestionsResult, headers)
      .pipe(
        map(response => this.mapToClassReturn(response),
          console.log('inside pipe')
        )
      );
  }

  private mapCategory(response): ClassReturn {
    const trafficCategory = new ClassReturn();
    trafficCategory.title = response;
    console.log(trafficCategory.title);
    return trafficCategory;
  }

  // getQuestion(): Observable<CategoryQuestions[]> {
  getQuestion(): Observable<CategoryQuestion[]> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        // 'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };
    console.log('in getQuestion');
//    console.log(this.api);
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
    // .get<CategoryQuestions[]>(this.api, headers)
      .get(this.drupalConnection.apiGetTheQuestions, headers)
      .pipe(
        map(response => this.mapToCategoryQuestionsArray(response),
          console.log('inside pipe')
        )
      );
  }

  /**
   * Maps the Drupal server response to a CategoryQuestions array.
   *
   * @param response
   *  A tab view list that has been mapped to the CategoryQuestions object.
   */
  private mapToCategoryQuestionsArray(response): CategoryQuestion[] {
    console.log('private mapToCategoryQuestionsArray');
    // console.log(response);
    // return response.map(result => this.mapToCategoryQuestions(result));
    return response.map(result => this.mapToCategoryQuestions(result));
  }

  /**
   * Maps a tab view from the Drupal server to a CategoryQuestions.
   *
   * @param results
   *  A single question from the list from the Drupal server.
   * @returns {CategoryQuestion}
   *  A CategoryQuestions object that has been populated by the server object.
   */
  private mapToCategoryQuestions(results): CategoryQuestion {
    const categoryQuestions = new CategoryQuestion();
    categoryQuestions.id = Object.keys(results).pop();
    categoryQuestions.questionText = (<string>Object.values(results).pop());
    categoryQuestions.result = '';

    return categoryQuestions;
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return null;
    };
  }
}
