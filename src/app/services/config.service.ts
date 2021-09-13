import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl: string = 'https://developer.webstar.hu/rest/frontend-felveteli';

  constructor() { }
}
