import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MLApiService {
  configUrl = "https://api.mercadolibre.com/sites/MCO/search?q="
  constructor(private http: HttpClient) { }
  getItems(item: string) {
    console.log(`${this.configUrl}${item}`)
    return this.http.get(`${this.configUrl}${item}`).pipe(map((data: any) => {
      return data;
    }));
  }
}
