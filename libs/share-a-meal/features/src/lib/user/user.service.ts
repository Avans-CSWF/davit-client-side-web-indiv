import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { ApiResponse, IUser } from '@avans-nx-workshop/shared/api';
import { Injectable } from '@angular/core';
import { environment } from '@avans-nx-workshop/shared/util-env';
import { ProductService } from '../product/product.service';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
export const httpOptions = {
  observe: 'body',
  responseType: 'json',
};

@Injectable()
export class UserService {
  //endpoint = 'http://localhost:3000/api/user';
  //endpoint = environment.dataApiUrl + '/user';
  endpoint = `http://localhost:3000/api/user`;

  constructor(
    private readonly http: HttpClient,
    private productService: ProductService
  ) {}

  public list(options?: any): Observable<IUser[] | null> {
    //lijst van users
    console.log(`list ${this.endpoint}`);

    return this.http
      .get<ApiResponse<IUser[]>>(this.endpoint, {
        //get request naar de endpoint
        ...options,
        ...httpOptions,
      })
      .pipe(
        map((response: any) => response.results as IUser[]), // map de response naar een array van users
        tap(console.log),
        catchError(this.handleError)
      );
  }

  public read(id: string | null, options?: any): Observable<IUser> {
    console.log(`read user id ${this.endpoint}/${id}`);

    return this.http
      .get<ApiResponse<IUser>>(`${this.endpoint}/${id}`, {
        //get request naar de endpoint met het id
        ...options,
        ...httpOptions,
      })
      .pipe(
        tap((response) => console.log('Received user data:', response)), // Log de ontvangen gebruikersgegevens
        map((response: any) => response.results as IUser), // map de response naar een user
        catchError(this.handleError)
      );
  }

  public create(user: IUser): Observable<IUser> {
    console.log(`create ${this.endpoint}`);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http
      .post<ApiResponse<IUser>>(this.endpoint, user, httpOptions) // post request naar de endpoint met de user
      .pipe(
        tap(console.log),
        map((response: any) => response.results as IUser), // map de response naar een user
        catchError(this.handleError)
      );
  }

  public update(user: IUser): Observable<IUser> {
    console.log('userEEEEEE bday', user.bday);
    //user.bday = new Date(user.bday);
    console.log('userEEEEEE bday', user.bday);

    console.log(`update userCC ${this.endpoint}/${user._id}`);
    return this.http
      .put<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`, user) // put request naar de endpoint met de user
      .pipe(
        tap(console.log),
        catchError((error) => {
          console.error('Update error:', error);
          throw error;
        })
      );
  }

  public delete(user: IUser): Observable<IUser> {
    console.log(`delete ${this.endpoint}/${user._id}`);
    return this.http
      .delete<ApiResponse<IUser>>(`${this.endpoint}/${user._id}`) // delete request naar de endpoint met id
      .pipe(tap(console.log), catchError(this.handleError));
  }

  public findOneInCartlist(_id: string | null): Observable<IUser> {
    console.log(`findOneInCartlist ${this.endpoint}/${_id}`);

    return this.http.get<ApiResponse<IUser>>(`${this.endpoint}/${_id}`).pipe( //get request naar de endpoint met id
      tap(console.log),
      map((response: any) => {
        console.log('response:', response);

        const userWithCartlist: IUser = response.results as IUser; // response toewijzen

        userWithCartlist.cart = userWithCartlist.cart.map((cartItem: any) => { // door elke item in de cart loopen
          return {
            ...cartItem, // alle cartItems eigenschappen kopieren naar nieuw object
            productId: cartItem.productId?._id || '', // productId toewijzen
          };
        });

        return userWithCartlist;
      }),
      catchError(this.handleError)
    );
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    console.log('handleError in UserService', error);

    return throwError(() => new Error(error.message));
  }
}
