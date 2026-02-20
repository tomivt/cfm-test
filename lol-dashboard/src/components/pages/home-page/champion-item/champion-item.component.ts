import {Component, Input} from '@angular/core';
import {Champion} from '../../../../models/champion.model';
import {DecimalPipe, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-champion-item',
  imports: [
    DecimalPipe,
    TitleCasePipe
  ],
  templateUrl: './champion-item.component.html',
  styleUrl: './champion-item.component.css'
})
export class ChampionItemComponent {
  @Input() champion!: Champion;
}
