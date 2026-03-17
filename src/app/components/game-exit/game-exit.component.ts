import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-game-exit',
  standalone: true,
  imports: [],
  templateUrl: './game-exit.component.html',
  styleUrl: './game-exit.component.css'
})
export class GameExitComponent {
  private gameManager = inject(GameManagerService);
  private router = inject(Router);

  exitGame(){
    this.gameManager.endGame();  
    this.router.navigate(['/login']);
  }
}
