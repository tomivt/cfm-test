import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  protected isOpen: boolean = false;

  protected links = [
    { path: '/champions', label: 'Champions', icon: '⚔' },
    { path: '/champions-ag', label: 'List', icon: '☰' },
    { path: '/add-champion', label: 'Add', icon: '+' },
  ];

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }
}
