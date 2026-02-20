import { Routes } from '@angular/router';
import {HomePageComponent} from '../components/pages/home-page/home-page.component';
import {AgHomePageComponent} from '../components/pages/ag-home-page/ag-home-page.component';
import {AddPageComponent} from '../components/pages/add-page/add-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'home-ag', component: AgHomePageComponent },
  { path: 'add', component: AddPageComponent },
];
