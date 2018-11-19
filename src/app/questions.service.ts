///<reference path="../../node_modules/@angular/common/http/src/client.d.ts"/>
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CategoryQuestion} from './question';
import {map} from 'rxjs/operators';
import {Section} from './traffic-plan-category';
import {ClassReturn} from './class-return';
import {ClassResponse} from './traffic-plan-category';
import {AppData} from './app-data';
import {DrupalConnectionService} from './drupal-connection.service';


@Injectable({providedIn: 'root'})

/**
 * This class include all functions about get questions from server,
 * Post answer from server,
 * Get the specific class base on the answer.
 */
export class QuestionsService {
  constructor(private http: HttpClient, private appData: AppData, private drupalConnection: DrupalConnectionService) {
  }

  /**
   * Post the answers which get from question form to the backend.
   * @param myBody
   */
  postAnswers(myBody): Observable<ClassReturn> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'X-CSRF-Token': this.drupalConnection.csrfToken,
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };
    return this.http
      .post(this.drupalConnection.apiPostTheQuestions, myBody, headers)
      .pipe(
        map(response => this.mapCategory(response))
      );
  }

  /**
   * Maps a tab view from the Drupal server to a ClassResponse.
   *
   * @param response
   *  A class follow with the descriptions of the class from the list from the Drupal server.
   * @returns {classResponse}
   *  A classResponse object that has been populated by the server object.
   */
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

  /**
   * Connect with Druple backend and get specific data observe by ClassResponse
   */
  categoryResult(): Observable<ClassResponse> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'X-CSRF-Token': this.drupalConnection.csrfToken,
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };

    return this.http
      .get(this.drupalConnection.apiGetTheQuestionsResult, headers)
      .pipe(
        map(response => this.mapToClassReturn(response),
        )
      );
  }

  /**
   * Maps a tab view from the Drupal server to a ClassReturn.
   *
   * @param response
   *  A class from the list from the Drupal server.
   * @returns {trafficCategory}
   *  A trafficCategory object that has been populated by the server object.
   */
  private mapCategory(response): ClassReturn {
    const trafficCategory = new ClassReturn();
    trafficCategory.title = response;
    console.log(trafficCategory.title);
    return trafficCategory;
  }

  /**
   * Get the information about questions from backend and map it to mapToCategoryQuestionsArray.
   */
  getQuestion(): Observable<CategoryQuestion[]> {
    const headers = {
      'headers': new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.appData.jwtkey}`
      })
    };
    return this.http

      .get(this.drupalConnection.apiGetTheQuestions, headers)
      .pipe(
        map(response => this.mapToCategoryQuestionsArray(response),
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
      // Let the app keep running by returning an empty result.
      // return of(result as T);
      return null;
    };
  }
}
