import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Data, Corr, Scatter, Radar, Country } from './data';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // Base url
  baseurl = 'http://localhost:5002';

  constructor(private http: HttpClient) { }

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  // POST
  CreateBug(data): Observable<Data> {
    return this.http.post<Data>(this.baseurl + '/test', JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetIssue(id): Observable<Data> {
    return this.http.get<Data>(this.baseurl + '/prices/' + id)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // GET
  GetIssues(): Observable<Data> {
    return this.http.get<Data>(this.baseurl + '/test')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  GetCorr(): Observable<Corr> {
    return this.http.get<Corr>(this.baseurl + '/corr')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  GetScatter(): Observable<Scatter> {
    return this.http.get<Scatter>(this.baseurl + '/scatter')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  GetRadar(): Observable<Radar> {
    return this.http.get<Radar>(this.baseurl + '/radar')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  GetCountry(): Observable<Country> {
    return this.http.get<Country>(this.baseurl + '/test-data')
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // PUT
  UpdateBug(id, data): Observable<Data> {
    return this.http.put<Data>(this.baseurl + '/test' + id, JSON.stringify(data), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // DELETE
  DeleteBug(id){
    return this.http.delete<Data>(this.baseurl + '/test' + id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandl)
    )
  }

  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }

}
