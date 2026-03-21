import { Component, inject, input } from '@angular/core';
import { GameManagerService, GameResult } from '../../services/game-manager.service';

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

    public isWinner = input<boolean>(false);
    public isEquals = input<boolean>(false);
    
    // Get players names
    public playerOne = this.gameService.playerOne;
    public playerTwo = this.gameService.playerTwo;

    // Get scores
    public p1Score = this.gameService.playerOneScore;
    public p2Score = this.gameService.playerTwoScore;

    // Get current turn
    public playerTurn = this.gameService.playerTurn;

    getPlayerName(): string{
      const gameResult = this.gameService.gameResult();
      return gameResult.winner === 'X' ? this.playerOne() : this.playerTwo();
    }
}
