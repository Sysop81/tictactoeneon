import { Injectable } from '@angular/core';
import { WINNING_COMBOS } from '../constants/game.constants';

@Injectable({
  providedIn: 'root'
})
export class CpuPlayerService {

  private readonly AI_SYMBOL = 'O';
  private readonly P1_SYMBOL = 'X';

  // [STUPID] Random AI
  move(board :string[][]): number[] {
    let movements : number[][] = [];

    for(let i = 0; i < board.length; i++){
      for(let x = 0; x < board.length; x++){
        if(board[i][x] === ''){
          movements.push([Number(i),Number(x)]);
        }
      }
    }

    return movements[Math.floor(Math.random() * movements.length)]
  }

  moveSmart(board :string[][]): number[] {
  
    let movement : number[] = [];

    // Get the center if it is empty
    if(board[1][1] === '') return [1,1];

    // Get winning movement
    movement = this.findBestMovement(board, this.AI_SYMBOL);
    
    // Get defensive movement
    if(movement.length === 0) movement = this.findBestMovement(board,this.P1_SYMBOL);
    
    // Get random movement
    if(movement.length === 0) movement = this.move(board);

    return movement;
  }

  findBestMovement(tableBoard : string[][], playerSymbol : 'X' | 'O'): number[]{
    
    let comb : number[] = [];
    for(const combo of WINNING_COMBOS){
        
        let counter : number = 0;
        let isEmpty : number = 0;

        for(const cell of combo){
          if(tableBoard[cell[0]][cell[1]] === playerSymbol){
            counter++;
          }else if(tableBoard[cell[0]][cell[1]] === ''){
            comb = cell;
            isEmpty++;
          }
        }

        if(counter === 2 && isEmpty === 1){
          return comb;
        }
    }
    return [];
  }

  constructor() { }
}
