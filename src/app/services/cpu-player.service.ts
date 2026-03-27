import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CpuPlayerService {
  // TODO Change to minimax algorithm
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

  constructor() { }
}
