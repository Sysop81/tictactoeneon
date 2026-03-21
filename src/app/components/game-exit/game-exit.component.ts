import { Component,inject } from '@angular/core';
import { Router } from '@angular/router';
import { GameManagerService } from '../../services/game-manager.service';
import { SoundService, SoundTypes } from '../../services/sound.service';

@Component({
  selector: 'app-game-exit',
  standalone: true,
  imports: [],
  templateUrl: './game-exit.component.html',
  styleUrl: './game-exit.component.css'
})
export class GameExitComponent {
  private gameManager = inject(GameManagerService);
  private soundManager = inject(SoundService);
  private router = inject(Router);

  exitGame(){
    this.playExitSound();
    this.gameManager.endGame();  
    this.router.navigate(['/login']);
  }

  playExitSound(): void{
    this.soundManager.play(SoundTypes.EXIT);
  }
}
