import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { User } from '../modules/User';

@Injectable({
    providedIn: 'root'
})

export class UserService{

     // Node/Express API
  REST_API: string = 'http://localhost:5000/users';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private httpClient: HttpClient){ }

    // get all users list

    GetUsers() {
        return this.httpClient.get(this.REST_API);
    }
    Store(payload: any) {
        return this.httpClient.post(this.REST_API, payload);
    }
    Update(payload: any, id: string): Observable<any> {
        let api = `${this.REST_API}/${id}`;
        return this.httpClient.put(api, payload, { headers: this.httpHeaders })
        .pipe(
            catchError(this.handleError)
        )
    }
    // Get single object
    Edit (id: any): Observable<any> {
        let API_URL = `${this.REST_API}/${id}`;
        return this.httpClient.get(API_URL, { headers: this.httpHeaders })
        .pipe(map((res: any) => {
            return res || {}
        }),
            catchError(this.handleError)
        )
    }

    Delete(id: string): Observable<any> {
        return this.httpClient.delete(`${this.REST_API}/${id}`, { headers: this.httpHeaders})
        .pipe(
            catchError(this.handleError)
        )
    }
    handleError (error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Handle client error
          errorMessage = error.error.message;
        } else {
          // Handle server error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
      }

}