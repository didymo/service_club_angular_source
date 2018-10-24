import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';
import { DrupalConnectionService } from './drupal-connection.service';
import { AppData }                 from './app-data';

@Injectable({
  providedIn: 'root'
})
export class TmpObjectSaveService {

  public data: any;

  constructor(private http:      HttpClient,
              private drupalCon: DrupalConnectionService,
              private appData:   AppData) { }

  submit(data)
  {
    this.data = data;

    var headers = {'headers': new HttpHeaders({'Content-Type': 'application/json',
      'X-CSRF-Token': this.drupalCon.csrfToken,
      'Authorization': `Bearer ${this.appData.jwtkey}` })};
    return this.http.post( this.drupalCon.apiTmpObjects, data, headers );
  }
}
