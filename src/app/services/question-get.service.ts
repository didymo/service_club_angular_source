import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';
import { Config }                  from '../config';

@Injectable({
  providedIn: 'root'
})

export class QuestionGetService {

  protected api = Config.api.questionGet;

  constructor(private http: HttpClient) { }

  get()
  {
    return this.http.get(this.api, {headers: {Authorization: `Basic ${Config.api.auth.base64}`}});
  }

}
