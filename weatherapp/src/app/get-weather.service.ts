import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city): Observable<any> {
  	return this.http.get('/'+city);
  }
}