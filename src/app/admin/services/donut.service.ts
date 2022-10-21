import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  catchError,
  delay,
  map,
  Observable,
  of,
  retryWhen,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Donut } from '../models/donut.model';

@Injectable()
export class DonutService {
  private donuts: Donut[] = [];

  constructor(private http: HttpClient) {}

  getDonuts(): Observable<Donut[]> {
    if (this.donuts.length) {
      return of(this.donuts);
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).append('Api-Token', '234234234');

    const options = {
      headers,
    };

    return this.http.get<Donut[]>(`api/donuts`, options).pipe(
      tap((donuts) => (this.donuts = donuts)),
      retryWhen((errors) => errors.pipe(delay(5000), take(2))),
      catchError(this.handleError)
    );
  }

  getDonut(id: string | null): Observable<Donut> {
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
