import { Component,signal,inject } from '@angular/core';
import { GameManagerService } from '../../services/game-manager.service';
import { GameHeaderComponent } from '../game-header/game-header.component';
import { ScoreboardComponent } from '../scoreboard/scoreboard.component';
import { GameExitComponent } from '../game-exit/game-exit.component';
//import { Router } from '@angular/router';
@Component({
  selector: 'app-game',
  standalone: true,
  imports: [GameHeaderComponent,ScoreboardComponent,GameExitComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
    // Inject Router
    //private router = inject(Router);

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
    MAX_MOVES : number = 9;
    movements : number = 0;
    
    table = signal([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);

    cellClick(i : number, x : number){
      console.log("Pulsada: " + i + "-" + x);
      if(this.table()[i][x] != '') return;
      this.updateMovements();
      this.table.update(table =>{
        const newTable = table.map(row => [...row]);
        newTable[i][x] = this.isPlayerOne ? 'X' : 'O';
        return newTable;
      });
      
      this.checkWinner();
      
    }

    updateMovements(){
      this.movements ++;
    }

    checkWinner(){
      let valueChecked = this.isPlayerOne ? "X" : "O"
      for(const combo of this.winningCombos){
        const [a, b, c] = combo;
        if (this.table()[a[0]][a[1]] == valueChecked &&
            this.table()[b[0]][b[1]] == valueChecked &&
            this.table()[c[0]][c[1]] == valueChecked){
          
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
      this.table.set([
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
              ]);
              
      this.isWinner = false;
      this.movements = 0;
    }

    // exitGame(){
    //   console.log("exit game")
    //   this.router.navigate(['/login']);
    // }
}
