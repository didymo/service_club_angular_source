import { Injectable } from '@angular/core';
import { MapSelectedArea }         from './map-selected-area';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';
import { DrupalConnectionService } from './drupal-connection.service';
import { AppData }                 from './app-data';

@Injectable({
  providedIn: 'root'
})
export class TmpGetService {

  public   selectedArea: MapSelectedArea;

  constructor(private http:      HttpClient,
              private drupalCon: DrupalConnectionService,
              private appData:   AppData) { }

  get()
  {
    var headers = {'headers': new HttpHeaders({'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.appData.jwtkey}` })};

    return this.http.get( this.drupalCon.apiTmpBounds, headers );
  }
}
