import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EventService {
  constructor(private http: HttpClient) {}
  getNewsByCategory(category) {
    return this.http
      .get('events?category=' + category)
      .map((data: any) => {
        return data;
      })
      .catch(this.handleError);
  }

  private handleError(error: any) {
    return Observable.throw(error.error);
  }
}
