import { Injectable } from '@angular/core';
import {MapSelectedArea} from './map-selected-area';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable }              from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class TmpSaveService {

  protected api = Config.api.tmpSave;
  public   selectedArea: MapSelectedArea;

  constructor(private http: HttpClient) { }

  submit(body)
  {
    let selectedArea = Object.assign({}, body);
    delete selectedArea.name;
    this.selectedArea = selectedArea;

    var headers = {'headers': new HttpHeaders({'Content-Type': 'application/json',
        'Authorization': `Basic ${Config.api.auth.base64}` })};
    return this.http.post( this.api, body, headers );
  }

}
