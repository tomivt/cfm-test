import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Champion, ChampionResponse} from '../models/champion.model';
import championData from '../../assets/champion_info_2.json';

@Injectable({
  providedIn: 'root'
})
export class ChampionDataService implements InMemoryDbService {
  createDb() {
    const response = championData as ChampionResponse;
    const champions: Champion[] = Object.values(response.data).filter(c => c.id !== -1);
    return { champions };
  }
}
