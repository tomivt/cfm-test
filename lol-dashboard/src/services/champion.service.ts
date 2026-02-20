import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Champion } from '../models/champion.model';

@Injectable({ providedIn: 'root' })
export class ChampionService {

  private readonly apiUrl = 'api/champions';
  private http: HttpClient = inject(HttpClient);

  getChampions(): Observable<Champion[]> {
    return this.http.get<Champion[]>(this.apiUrl);
  }

  getNextId(): Observable<number> {
    return this.getChampions().pipe(
      map((champions: Champion[]) => Math.max(...champions.map(c => c.id)) + 1)
    );
  }

  addChampion(champion: Champion): Observable<Champion> {
    return this.http.post<Champion>(this.apiUrl, champion);
  }

  updateChampion(champion: Champion): Observable<Champion> {
    return this.http.put<Champion>(`${this.apiUrl}/${champion.id}`, champion);
  }

  deleteChampion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
