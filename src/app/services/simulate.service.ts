import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { Simulate } from '../models/simulate';
import { BaseService } from './base.service';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class SimulateService extends BaseService<Simulate> {

  public selectedCharacters: Character[] = [];
  public simulationId: any;

  constructor(
    public http: HttpClient,
    public configService: ConfigService,
  ) {
    super(http, 'simulate', configService);
  }
}
