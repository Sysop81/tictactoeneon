import { Component, signal, input,output, effect } from '@angular/core';

@Component({
  selector: 'app-table-board',
  standalone: true,
  imports: [],
  templateUrl: './table-board.component.html',
  styleUrl: './table-board.component.css'
})
export class TableBoardComponent {
  readonly RESET_TIMEOUT = 2000;
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
}
