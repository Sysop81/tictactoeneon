import { Component,inject, signal, input,output, effect,untracked } from '@angular/core';
import { GameManagerService } from '../../services/game-manager.service';
import { GameState } from '../../services/storage.service';
import { SoundService, SoundTypes } from '../../services/sound.service';
import { CpuPlayerService } from '../../services/cpu-player.service';

@Component({
  selector: 'app-table-board',
  standalone: true,
  imports: [],
  templateUrl: './table-board.component.html',
  styleUrl: './table-board.component.css'
})
export class TableBoardComponent {
  readonly RESET_TIMEOUT = 2500;
  readonly AI_PLAYER_MOVE = 500;
  gameManagerService = inject(GameManagerService);
  sounManager = inject(SoundService);
  cpuPlayer = inject(CpuPlayerService);

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

  isAIplaying : boolean = false;
  

  constructor() {

    const gameState = this.gameManagerService.gameState as GameState;
    if(gameState){
      this.table.set(gameState.board);
    }

    effect(()=>{
      const isP1Turn = this.isPlayer1();
      const isAI = this.gameManagerService.isPlayerTwoAI();
      
      if(this.isAIplaying) return;

      if(!isP1Turn && isAI){
        //console.log("[START] AI service playing")
         this.isAIplaying = true; 
          untracked(() => {
            setTimeout(() => {
              //const cpuMove = this.cpuPlayer.move(this.table());
              const cpuMove = this.cpuPlayer.moveSmart(this.table());
            
              if(cpuMove && cpuMove.length === 2){
                this.cellClick(cpuMove[0], cpuMove[1]);
              }
              
              this.isAIplaying = false;
              //console.log("[END] AI service playing")
            }, this.AI_PLAYER_MOVE);
          });
      }
        
    });

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
          //console.log("game reset")
          this.restartDone.emit();

        },this.RESET_TIMEOUT);
      }
    }, { allowSignalWrites: true });
  }


  cellClick(i : number, x : number){
    
    if(this.needRestart() || this.table()[i][x] != '') return;
    this.playMovementSound();
    
    this.table.update(table =>{
      const newTable = table.map(row => [...row]);
      newTable[i][x] = this.isPlayer1() ? 'X' : 'O';
      return newTable;
    });
    
    this.gameManagerService.updateCurrentTurn(this.isPlayer1() ? 'O' : 'X');
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

  playMovementSound(): void{
    this.sounManager.play(SoundTypes.MOVE);
  }
}
