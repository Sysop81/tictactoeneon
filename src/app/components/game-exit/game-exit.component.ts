import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-exit',
  standalone: true,
  imports: [],
  templateUrl: './game-exit.component.html',
  styleUrl: './game-exit.component.css'
})
export class GameExitComponent {
  
  private router = inject(Router);

  exitGame(){
      this.router.navigate(['/login']);
  }
}
