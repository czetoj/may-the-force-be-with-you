import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {

  apiUrl: string = '';
  entityName: string = '';

  constructor(
    public http: HttpClient,
    @Inject('entityName') entityName: string,
    public configService: ConfigService,
  ) {
    this.entityName = entityName;
    this.apiUrl = `${configService.apiUrl}/${this.entityName}/`;
  }

  create(item: T): Observable<T> {
    return this.http.post<T>(this.apiUrl, item, {
      headers: new HttpHeaders({
        'Applicant-Id': '73cWh2EbpFX5Mpum',
      })
    });
  }

  get(): Observable<{ characters: T[] }> {
    return this.http.get<{ characters: T[] }>(this.apiUrl, {
      headers: new HttpHeaders({
        'Applicant-Id': '73cWh2EbpFX5Mpum',
      })
    });
  }
}
