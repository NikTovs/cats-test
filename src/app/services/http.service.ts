import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {
  }

  getCats(limit: number, id: string): Observable<any> {
   const query_params = new HttpParams().set('limit', limit).set('breed_ids', id);
   return this.http.get(environment.apiUrl + `v1/images/search?`, {params: query_params } );
  }

  getBreedsList(): Observable<any> {
    return this.http.get(environment.apiUrl + 'v1/breeds/');
  }
}
