import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput} from '@angular/material/input';
import {MatBadge} from '@angular/material/badge';
import {Champion} from '../../../models/champion.model';
import {ChampionService} from '../../../services/champion.service';
import {Subscription} from 'rxjs';
import {ColDef} from 'ag-grid-community';
import {AgGridAngular} from 'ag-grid-angular';

@Component({
  selector: 'app-ag-home-page',
  imports: [
    FormsModule,
    MatFormField,
    MatInput,
    MatBadge,
    AgGridAngular
  ],
  templateUrl: './ag-home-page.component.html',
  styleUrl: './ag-home-page.component.css'
})
export class AgHomePageComponent implements OnInit, OnDestroy {

  protected champions: Champion[] = [];
  protected filteredChampions: Champion[] = [];
  protected searchQuery: string = '';

  protected colDefs: ColDef<Champion>[] = [
    {
      field: 'id',
      headerName: '#',
      width: 90,
      valueFormatter: p => `#${String(p.value).padStart(3, '0')}`,
    },
    {
      field: 'name',
      headerName: 'Champion',
      flex: 1,
      minWidth: 140,
    },
    {
      field: 'title',
      headerName: 'Title',
      flex: 2,
      minWidth: 200,
      valueFormatter: p => p.value
        ? p.value.replace(/\b\w/g, (l: string) => l.toUpperCase())
        : '',
    },
    {
      field: 'tags',
      headerName: 'Roles',
      flex: 1,
      minWidth: 160,
      valueFormatter: p => p.value?.join(' · ') ?? '',
      sortable: false,
    },
  ];
  protected defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
  };

  private championService: ChampionService = inject(ChampionService);
  private sub: Subscription = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.championService.getChampions().subscribe((champions: Champion[]) => {
        this.champions = champions.filter((c: Champion) => c.id !== -1);
        this.filteredChampions = this.champions;
      })
    );
  }

  onSearch(): void {
    const q: string = this.searchQuery.toLowerCase().trim();
    this.filteredChampions = this.champions.filter((c: Champion) =>
      c.name.toLowerCase().includes(q) || c.title.toLowerCase().includes(q)
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
