import { Component,inject, signal, input,output, effect } from '@angular/core';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-table-board',
  standalone: true,
  imports: [],
  templateUrl: './table-board.component.html',
  styleUrl: './table-board.component.css'
})
export class TableBoardComponent {
  readonly RESET_TIMEOUT = 4000;
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
    effect(() => {
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
    console.log("Pulsada: " + i + "-" + x);
    if(this.table()[i][x] != '') return;
    
    this.table.update(table =>{
      const newTable = table.map(row => [...row]);
      newTable[i][x] = this.isPlayer1() ? 'X' : 'O';
      return newTable;
    });
      
    this.tableBoard.emit(this.table());
  }

  isWinningCell(i : number, x : number): boolean{
    const result = this.gameManagerService.gameResult();

    if(result.winner != '='){
      return result.winningCells.some(
        current => current[0] === i && current[1] === x
      );
    }

    return false;
  }
}
