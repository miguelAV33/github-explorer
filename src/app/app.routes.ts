import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { FavoritesComponent } from './components/favorites/favorites.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'GitHub Explorer' },
  { path: 'usuario/:username', component: UserDetailComponent, title: 'Perfil — GitHub Explorer' },
  { path: 'favoritos', component: FavoritesComponent, title: 'Favoritos — GitHub Explorer' },
  { path: '**', redirectTo: '' }
];
