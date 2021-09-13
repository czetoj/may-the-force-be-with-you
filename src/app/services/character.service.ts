import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterService extends BaseService<Character> {

  constructor(
    public http: HttpClient,
    public configService: ConfigService,
  ) {
    super(http, 'characters', configService);
  }
}
