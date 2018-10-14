/**
 * Human-reabable address to coordinate convertor
 */

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Config} from './config';

@Injectable({
  providedIn: 'root'
})
export class Addr2coordService {

  constructor(private http: HttpClient) {}

  get(address: string) {
    return this.http.get('https://nominatim.openstreetmap.org/search?format=json&limit=1' + '&q=' + encodeURI(address));
  }
}
