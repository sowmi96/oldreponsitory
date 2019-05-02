import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class GeneralService {
  public loc = location.href;
  public locSplit = this.loc.split('/');
  public fbaseUrl = this.locSplit[0] + '//' + this.locSplit[2];
  public domain = this.locSplit[2];
 // public newBaseUrl = 'http://localhost:8091/ecommerce/';//
 public newBaseUrl = 'http://61.16.140.101:6171/ecommerce/';
  private filterApply = new Subject<string>();
  filterChange$ = this.filterApply.asObservable();
  filterInfo;
  filters;
  constructor(private http: HttpClient) {}
  returnHref() {
    return this.loc;
  }
  validValue(data) {
    if (data === undefined || data == null || data === '') {
      return false;
    } else {
      return true;
    }
  }
  /** Start : Header Declaration */

  public getUserId() {
    return window.localStorage.getItem('co-optex-userId');
  }
  private getHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  postRequest(surl, data) {
    const postUrl = this.newBaseUrl + surl;
    const sessionId = localStorage.getItem('co-optex-sessionId');
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    const postData$ = this.http
      .post(postUrl, data, { headers: headers, withCredentials: true })
      .map(mapAppList)
      .catch(handleError);
    return postData$;
  }
  postRequest1(surl, data) {
    const postUrl = this.newBaseUrl + surl;
    const sessionId = localStorage.getItem('co-optex-sessionId');
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json')
      .set('X-XSRF-TOKEN', sessionId);
    const postData$ = this.http
      .post(postUrl, data, { headers: headers, withCredentials: true })
      .map(mapAppList)
      .catch(handleError);
    return postData$;
  }
  postRequest2(surl, data) {
    const postUrl = this.newBaseUrl + surl;
    const sessionId = localStorage.getItem('co-optex-sessionId');
    let headers = new HttpHeaders();
    headers = headers.set('X-XSRF-TOKEN', sessionId);
    const postData$ = this.http
      .post(postUrl, data, { headers: headers, withCredentials: true })
      .map(mapAppList)
      .catch(handleError);
    return postData$;
  }
  getRequest(surl) {
    const sessionId = localStorage.getItem('co-optex-sessionId') || '';
    let headers = new HttpHeaders();
    headers = headers
      .set('Content-Type', 'application/json')
      .set('X-XSRF-TOKEN', sessionId);
    const getUrl = this.newBaseUrl + surl;

    const getData$ = this.http
      .get(getUrl, { headers: headers })
      .map(mapAppList)
      .catch(handleError);
    return getData$;
  }
  getRequest1(url) {
    const getUrl = this.newBaseUrl + url;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    const getData$ = this.http
      .get(getUrl, { headers: headers })
      .map(mapAppList)
      .catch(handleError);
    return getData$;
  }

  getCurrencyValue(base) {
    const getData$ = this.http
      .get('https://exchangeratesapi.io/api/latest?base=' + base)
      .map(mapAppList)
      .catch(handleError);
    return getData$;
  }
}
function mapDataResponse(response: Response) {
  return response;
}
function mapAppList(response: Response) {
  return response;
}

function handleError(error: any) {
  const errorMsg = error.message || `Something went wrong please try again`;

  return Observable.throw(error);
}
