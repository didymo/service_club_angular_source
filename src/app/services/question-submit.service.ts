import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs';
import { catchError, map, tap }    from 'rxjs/operators';
import { Config }                  from '../config';

@Injectable({
  providedIn: 'root'
})

export class QuestionSubmitService {

  protected api = Config.api.questionPost;

  constructor(private http: HttpClient) { }

  submit(body)
  {
    var headers = {'headers': new HttpHeaders({'Content-Type': 'application/json',
      'Authorization': `Basic ${Config.api.auth.base64}` })};
    return this.http.post( this.api, body, headers );
  }
}
