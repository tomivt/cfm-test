import { Routes } from '@angular/router';
import {HomePageComponent} from './features/home-page/home-page.component';
import {AgHomePageComponent} from './features/ag-home-page/ag-home-page.component';
import {AddPageComponent} from './features/add-page/add-page.component';
import {DetailsPageComponent} from './features/details-page/details-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'champions', pathMatch: 'full' },
  { path: 'champions', component: HomePageComponent },
  { path: 'champions-ag', component: AgHomePageComponent },
  { path: 'add-champion', component: AddPageComponent },
  { path: 'details-champion/:id', component: DetailsPageComponent },
];
