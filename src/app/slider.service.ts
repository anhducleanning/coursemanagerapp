import { Slider } from './slider';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SliderService {
  private apiServerUrl = environment.apiBaseUrl; 


  constructor(private http: HttpClient) { }

  public getSlider(): Observable<Slider[]>{
      return this.http.get<Slider[]>(`${this.apiServerUrl}/slider`);
  }

}
