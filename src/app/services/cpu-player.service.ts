import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpuPlayerService {

  private winningCombos = [
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

  // [STUPID] Random AI
  move(board :string[][]): number[] {
  
    let movements : number[][] = [];

    for(let i = 0; i < 3; i++){
      for(let x = 0; x < 3; x++){
        if(board[i][x] === ''){
          movements.push([Number(i),Number(x)]);
        }
      }
    }

    return movements[Math.floor(Math.random() * movements.length)]
  }

  // [SMART MEDIUM] AI
  moveSmart(board :string[][]): number[] {
    console.log(board)
    let movement : number[] = [];

    // Get center if is empty
    if(board[1][1] === '') return [1,1];

    // Get winning movement
    movement = this.findBestMovement(board,'O');
    if(movement.length === 0){
      movement = this.findBestMovement(board,'X'); //this.move(board);
    }

    if(movement.length === 0) movement = this.move(board);

    return movement;
  }

  // TODO Testing and REFACT
  findBestMovement(tableBoard : string[][], playerSymbol : 'X' | 'O'): number[]{
    let movement : number[] = [];
    
    let comb : number[] = [];
    for(const combo of this.winningCombos){
        const [a, b, c] = combo;
        let counter = 0;
        let isEmpty = 0;
        
        if(tableBoard[a[0]][a[1]] === playerSymbol){
          counter++;
        }else if(tableBoard[a[0]][a[1]] === ''){
          comb = a;
          isEmpty++;
        } 

        if(tableBoard[b[0]][b[1]] === playerSymbol){
          counter++;
        }else if(tableBoard[b[0]][b[1]] === ''){
          comb = b;
          isEmpty++;
        }

        if(tableBoard[c[0]][c[1]] === playerSymbol){
          counter++;
        }else if(tableBoard[c[0]][c[1]] === ''){
          comb = c;
          isEmpty++;
        }

        if(counter === 2 && isEmpty === 1){
          movement = comb;
          break;
        }

    }

    return movement;
  }

  constructor() { }
}
