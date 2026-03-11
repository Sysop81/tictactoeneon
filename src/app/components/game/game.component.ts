import { Component,signal } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css'
})
export class GameComponent {
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
    table = signal([
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ]);

    cellClick(i : number, x : number){
      console.log("Pulsada: " + i + "-" + x);
      if(this.table()[i][x] != '') return;

      this.table.update(table =>{
        const newTable = table.map(row => [...row]);
        newTable[i][x] = this.isPlayerOne ? 'X' : 'O';
        return newTable;
      });
      this.checkWinner();
      
    }

    checkWinner(){
      let valueChecked = this.isPlayerOne ? "X" : "O"
      for(const combo of this.winningCombos){
        const [a, b, c] = combo;
        if (this.table()[a[0]][a[1]] == valueChecked &&
            this.table()[b[0]][b[1]] == valueChecked &&
            this.table()[c[0]][c[1]] == valueChecked){
            console.log("Winner " + (this.isPlayerOne ? "X" : "O"));
            this.isWinner = true
            break;
          }
      }

      if (!this.isWinner) this.isPlayerOne = !this.isPlayerOne;

    }
}
