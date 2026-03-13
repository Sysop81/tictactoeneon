import { Component,signal,inject } from '@angular/core';
import { GameManagerService } from '../../services/game-manager.service';
import { GameHeaderComponent } from '../game-header/game-header.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { TableBoardComponent } from '../table-board/table-board.component';
import { GameExitComponent } from '../game-exit/game-exit.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameHeaderComponent,ScoreboardComponent,GameExitComponent,TableBoardComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
    
    // Inject the gameManager service
    private gameService = inject(GameManagerService);
    
    winningCombos = [
      // Rows
      [[0,0],[0,1],[0,2]],
      [[1,0],[1,1],[1,2]],
      [[2,0],[2,1],[2,2]],

      // Cols
      [[0,0],[1,0],[2,0]],
      [[0,1],[1,1],[2,1]],
      [[0,2],[1,2],[2,2]],

      // Cross
      [[0,0],[1,1],[2,2]],
      [[0,2],[1,1],[2,0]],
    ];
    isPlayerOne :boolean = true;
    isWinner : boolean = false;
    isRestart : boolean = false;
    MAX_MOVES : number = 9;
    movements : number = 0;

    updateMovements(){
      this.movements ++;
    }

    checkWinner(tableBoard : string[][]){
      this.updateMovements();
      let valueChecked = this.isPlayerOne ? "X" : "O";
      for(const combo of this.winningCombos){
        const [a, b, c] = combo;
        if (tableBoard[a[0]][a[1]] == valueChecked &&
            tableBoard[b[0]][b[1]] == valueChecked &&
            tableBoard[c[0]][c[1]] == valueChecked){
          
            this.isWinner = true
            break;
          }
      }

      if (this.movements == this.MAX_MOVES || this.isWinner){
        if(this.isWinner){
          this.isPlayerOne ? this.gameService.addPointToPlayerOne():
                           this.gameService.addPointToPlayerTwo();
        }

        this.resetGame();        
      }

      this.isPlayerOne = !this.isPlayerOne;
    }


    resetGame(){
      this.isRestart = true;        
      this.isWinner = false;
      this.movements = 0;
    }

    handleRestart(){
      this.isRestart = false;
    }
}
