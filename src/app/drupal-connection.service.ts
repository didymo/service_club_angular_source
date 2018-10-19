import {Injectable} from '@angular/core';
import {AppData} from './app-data';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


/**
 * The Angular Application is being launched as a modal above the event page created in Drupal.
 * The Angular Application needs to communicate with the Drupal backend.
 * This service creates all the connections points to be used by other services and components in the Angular Application
 */
export class DrupalConnectionService {

  public apiGetEventState: string;
  public apiGetTheQuestions: string;
  public apiPostTheQuestions: string;
  public apiGetTheQuestionnaireResults: string;
  public apiPostGetTmp: string; // TMP stands for Traffic Management Plan, used to both POST and GET
  public apiTmpBounds: string; // TMP stands for Traffic Management Plan, used to both POST and GET
                               // bounds are defined by both two Latitude and two Longitude.
  public apiTmpObjects: string; // The icon positions for the barriers etc for the traffic management plan

  public api: string;
  public postapi: string;
  public getapi: string;

  /**
   * the csrfToken is a cross site scripting attack token.
   */
  public csrfToken: string;

  /**
   *
   * @param http
   *
   * @param appData
   * appData is the area of the DOM where the information required by the Angular app needs to connect to the Drupal Backend
   * The information is stored in the appData Class, see the appData class for details.
   *
   */
  constructor(private http: HttpClient, private appData: AppData) {

    this.apiGetEventState = this.appData.baseurl + '/event/' + this.appData.eventid + '/state?_format=json';
    this.apiGetTheQuestions = this.appData.baseurl + '/event/' + this.appData.eventid + '/questionnaire/result?_format=json';
    this.apiPostTheQuestions = this.appData.baseurl + '/event/' + this.appData.eventid + '/questionnaire/submit?_format=json';
    this.apiGetTheQuestionnaireResults = this.appData.baseurl + '/event/' + this.appData.eventid + '/questionnaire/result?_format=json';
    this.apiPostGetTmp = this.appData.baseurl + '/event/' + this.appData.eventid + '/tmp?_format=json';
    this.apiTmpBounds = this.appData.baseurl + '/event/' + this.appData.eventid + '/tmp/bounds?_format=json';
    this.apiTmpObjects = this.appData.baseurl + '/event/' + this.appData.eventid + '/tmp/objects?_format=json';

    /**
     * the below is the original set which need to be removed
     */
    this.api = 'http://' + this.appData.baseurl + '/questionnaire/questions?_format=json';
    this.postapi = 'http://' + this.appData.baseurl + '/event/' + this.appData.eventid + '/questionnaire/submit?_format=json';
    this.getapi = 'http://' + this.appData.baseurl + '/event/' + this.appData.eventid + '/questionnaire/result?_format=json';

    alert(this.appData.baseurl);
    /**
     *  The csrfToken is required for all REST communication and is obtained upon initialisation.
     */
    http.get(this.appData.baseurl + '/rest/session/token', {responseType: 'text'})
      .subscribe((value) => {
        this.csrfToken = value;
      });
  }
}
