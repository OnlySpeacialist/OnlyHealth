import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  baseUrl = '/events/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  window: any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  // Add Event to Calender//
  addEvent(event) {
    return this.http.post(this.baseUrl + 'add_events', event);
  }

  // Get All Events //
  getAllEvents() {
    return this.http.get(this.baseUrl + 'get_events').
      pipe(
        map((data: any) => {
          console.log(data);
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }

  // Delete Single Event//
  deleteSingleEvent(id) {
    return this.http.delete(this.baseUrl + 'delete_event/' + id).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong');
        })
      );
  }
}