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
  links = [
    { path: '/home',    label: 'Champions',  icon: '⚔' },
    { path: '/home-ag', label: 'List',       icon: '☰' },
    { path: '/add',     label: 'Add',     icon: '+' },
  ];
}
