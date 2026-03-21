import { Component, inject } from '@angular/core';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.css'
})
export class ScoreboardComponent {
  // Inject the gameManager service
    private gameService = inject(GameManagerService);
    
    // Get players names
    public playerOne = this.gameService.playerOne;
    public playerTwo = this.gameService.playerTwo;

    // Get scores
    public p1Score = this.gameService.playerOneScore;
    public p2Score = this.gameService.playerTwoScore;

    // Get current turn
    public playerTurn = this.gameService.playerTurn;
}
