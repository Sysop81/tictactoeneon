import { Routes } from '@angular/router';
// My Game components
import { LoginComponent } from './components/login/login.component';
import { GameComponent } from './components/game/game.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent},

    // Default path
    { path:'', redirectTo:'/login', pathMatch:'full' },
    { path:'**', redirectTo:'/login' }
];
