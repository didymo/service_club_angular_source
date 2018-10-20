import { Injectable } from '@angular/core';
import {MapSelectedArea} from './map-selected-area';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable }              from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';
import { Config} from './config';
import { DrupalConnectionService } from './drupal-connection.service';
import {AppData} from './app-data';

@Injectable({
  providedIn: 'root'
})
export class TmpSaveService {

  public   selectedArea: MapSelectedArea;

  constructor(private http: HttpClient, private drupalCon: DrupalConnectionService, private appData: AppData) {
  }

  submit(body)
  {
    let selectedArea = Object.assign({}, body);
    delete selectedArea.name;
    this.selectedArea = selectedArea;

    var headers = {'headers': new HttpHeaders({'Content-Type': 'application/json',
        'X-CSRF-Token': this.drupalCon.csrfToken,
        'Authorization': `Bearer ${this.appData.jwtkey}` })};
    return this.http.post( this.drupalCon.apiPostGetTmp, body, headers );
  }

}
