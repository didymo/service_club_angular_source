///<reference path="../../node_modules/@angular/common/http/src/client.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryQuestion} from './question';
import {map, toArray} from 'rxjs/operators';
import {TrafficPlanCategory} from './traffic-plan-category';
import {ClassReturn} from './class-return';
import {ClassResponse} from './traffic-plan-category';
import {parseHttpResponse} from 'selenium-webdriver/http';
import {arrayify} from 'tslint/lib/utils';
import {fromArray} from 'rxjs/internal/observable/fromArray';


@Injectable({providedIn: 'root'})

export class QuestionsService {
  private baseurl = 'https://bluemaxstudios.com';
  private api: string;
  private postapi: string;
  private getapi: string;


  constructor(private http: HttpClient) {
    this.api = this.baseurl + '/questionnaire/questions?_format=json';
    this.postapi = this.baseurl + '/event/1/questionnaire/submit?_format=json';
    this.getapi = this.baseurl + '/event/1/questionnaire/result?_format=json';
  }

  postAnswers(myBody): Observable<ClassReturn> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
      })
    };
    // const body = '{"q_1":{"Will it impact a major road(s)?":false},"q_2":{"Will it disrupt the non-event community over a wide area?":false},"q_3":{"Will your event impact traffic over a wide area? (trains, buses, etc.)":false},"q_4":{"Will it impact local traffic and roads?":false},"q_5":{"Will it disrupt the non-event community over a local area?":false},"q_6":{"Will your event impact local transport systems? (Local buses and routes)":false},"q_7":{"Will it disrupt the non-event community in the immediate area only?":false},"q_8":{"Is it a minor event under Police supervision?":false}}';
    console.log(myBody);
    console.log('this junk is running in the code postAnswers ');
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
      .post(this.postapi, myBody, headers)
      .pipe(
        map(response => this.mapCategory(response))
      );
  }

  /*categoryResult(): Observable<ClassResponse[]> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
      })
    };
    console.log('in getQuestion');
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
    // .get<CategoryQuestions[]>(this.api, headers)
      .get(this.getapi, headers)
      .pipe(
        map(response => this.mapToClassReturn(response),
          console.log('aaaaaaaaa')
        )
      );
  }*/

  /* private mapToClassReturnArray(response): ClassResponse[] {
     console.log('private mapToCategoryQuestionsArray');
     console.log(response);
     // return response.map(result => this.mapToCategoryQuestions(result));
     return response.map(result => this.mapToClassReturn(result));
   }*/
  /* private mapToClassReturnArray(response): ClassResponse[] {
     console.log('private mapToCategoryQuestionsArray');
     console.log(response);
     // return response.map(result => this.mapToCategoryQuestions(result));
     return response.map(result => this.mapToClassReturn(result));
   }*/

  /*private mapToClassReturn(response): ClassResponse[] {
    const ClassResponses = new ClassResponse();
    console.log(ClassResponses);
   // ClassResponses.Title = Object.getOwnPropertyNames(response).pop();
    ClassResponses.return = arrayify(response).pop();
    return ClassResponses;
    ////return response.map(result => this.mapToClassReturn(result));
  }*/

  private mapToClassReturn(response): ClassResponse[] {
    const ClassResponses = new ClassResponse();
    console.log(ClassResponses);
    console.log('about to create return object');
    //ClassResponses.title = Object.keys(response).pop();
    //ClassResponses.sections = arrayify(response).pop();
    ClassResponses.return = arrayify(response).pop();
    //ClassResponses.result = '';
//    return ClassResponses[response];
    // @ts-ignore
    return ClassResponses;
    ////return response.map(result => this.mapToClassReturn(result));
  }

  categoryResult(): Observable<ClassResponse[]> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
      })
    };
    console.log('in getQuestion');
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
    // .get<CategoryQuestions[]>(this.api, headers)
      .get(this.getapi, headers)
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
        'Authorization': 'Basic ZnJvbnRlbmQ6cmVzdDEyMw=='
      })
    };
    console.log('in getQuestion');
    // this.http.get(this.api, headers).subscribe((questions) => console.log(questions));
    // return null;

    return this.http
    // .get<CategoryQuestions[]>(this.api, headers)
      .get(this.api, headers)
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
