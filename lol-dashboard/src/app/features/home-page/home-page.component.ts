import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Champion} from '../../models/champion.model';
import {ChampionService} from '../../services/champion.service';
import {Subscription} from 'rxjs';
import {MatFormField, MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatBadge} from '@angular/material/badge';
import {ChampionItemComponent} from './champion-item/champion-item.component';
@Component({
  selector: 'app-home-page',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatBadge,
    ChampionItemComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit, OnDestroy {

  protected champions: Champion[] = [];
  protected filteredChampions: Champion[] = [];
  protected searchQuery: string = '';

  private championService: ChampionService = inject(ChampionService);
  private sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.championService.getChampions().subscribe((champions: Champion[]) => {
        this.champions = champions.filter((c: Champion) => c.id !== -1);
        this.filteredChampions = this.champions;
      })
    )
  }

  onSearch(): void {
    const q: string = this.searchQuery.toLowerCase().trim();
    this.filteredChampions = this.champions.filter(c =>
      c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
