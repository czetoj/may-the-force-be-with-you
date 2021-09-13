import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { PlayersComponent } from './pages/players/players.component';
import { FightComponent } from './pages/fight/fight.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'characters',
    component: PlayersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'simulate',
    component: FightComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
