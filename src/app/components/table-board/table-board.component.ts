import { Component,inject, signal, input,output, effect } from '@angular/core';
import { GameManagerService } from '../../services/game-manager.service';
import { GameState } from '../../services/storage.service';

@Component({
  selector: 'app-table-board',
  standalone: true,
  imports: [],
  templateUrl: './table-board.component.html',
  styleUrl: './table-board.component.css'
})
export class TableBoardComponent {
  readonly RESET_TIMEOUT = 2500;
  gameManagerService = inject(GameManagerService);
  table = signal([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
  ]);

  // inputs and outputs
  isPlayer1 = input<boolean>(false);
  needRestart = input<boolean>(false);
  tableBoard = output<string[][]>();
  restartDone = output<void>();
  

  constructor() {

    const gameState = this.gameManagerService.gameState as GameState;
    if(gameState){
      this.table.set(gameState.board);
    }

    effect(() => {
      
      const isTableEmpty = this.table().every(row => 
        row.every(cell => cell === '')
      );

      if (isTableEmpty) return;
      
      if (this.needRestart()) {
        
        setTimeout(()=>{
          this.table.set([
              ['', '', ''],
              ['', '', ''],
              ['', '', '']
          ]);

          this.restartDone.emit();

        },this.RESET_TIMEOUT);
      }
    }, { allowSignalWrites: true });
  }


  cellClick(i : number, x : number){
    
    if(this.needRestart() || this.table()[i][x] != '') return;
    
    this.table.update(table =>{
      const newTable = table.map(row => [...row]);
      newTable[i][x] = this.isPlayer1() ? 'X' : 'O';
      this.gameManagerService.gameState.currentTurn = this.isPlayer1() ? 'O' : 'X';
      return newTable;
    });
      
    this.tableBoard.emit(this.table());
  }

  isWinningCell(i : number, x : number): string{
    const result = this.gameManagerService.gameResult();
    
    if(result.winner === '=') return '';
  
    const isWinner = result.winningCells.some(
        current => current[0] === i && current[1] === x
    );

    return isWinner ? 'winner': 'loser';
  }
}
