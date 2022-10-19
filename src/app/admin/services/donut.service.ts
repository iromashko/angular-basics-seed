import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  EMPTY,
  filter,
  map,
  Observable,
  of,
  tap,
  throwError,
} from 'rxjs';
import { Donut } from '../models/donut.model';

@Injectable({
  providedIn: 'root',
})
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  getDonuts(): Observable<Donut[]> {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    return this.http.get<Donut[]>(`api/donuts`).pipe(
      tap((donuts) => (this.donuts = donuts)),
      catchError(this.handleError)
    );
  }

  getDonut(id: string): Observable<Donut> {
    return this.getDonuts().pipe(
      map((donuts) => {
        const donut = donuts.find((donut) => donut.id === id);

        if (donut) {
          return donut;
        }

        return {
          name: '',
          icon: '',
          price: 0,
          description: '',
        };
      }),
      catchError(this.handleError)
    );
  }

  addDonut(donut: Donut) {
    return this.http.post<Donut>(`/api/donuts`, donut).pipe(
      tap((donut) => {
        this.donuts = [...this.donuts, donut];
      }),
      catchError(this.handleError)
    );
  }

  updateDonut(newDonut: Donut) {
    return this.http.put<Donut>(`/api/donuts/${newDonut.id}`, newDonut).pipe(
      tap((donut) => {
        this.donuts = this.donuts.map((oldDonut) => {
          if (oldDonut.id === donut.id) {
            return donut;
          }
          return oldDonut;
        });
      }),
      catchError(this.handleError)
    );
  }

  deleteDonut(oldDonut: Donut): Observable<Donut> {
    return this.http.delete<Donut>(`/api/donuts/${oldDonut.id}`).pipe(
      tap((donut) => {
        this.donuts = this.donuts.filter((d) => d.id !== donut.id);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse | ErrorEvent) {
    if (err instanceof ErrorEvent) {
      console.warn(`Client`, err.message);
    } else {
      console.warn(`Server`, err.status);
    }
    return throwError((err: HttpErrorResponse) => new Error(err.message));
  }
}
