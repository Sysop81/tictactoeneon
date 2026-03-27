import { Injectable, signal } from '@angular/core';

export interface GameState {
  board: string[][];
  currentTurn: 'X' | 'O';
  movements: number;
  pNames: {x:string; o: string};
  scores: { x: number; o: number };
  isAIplayer: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private readonly STATE_NAME : string  = 'state';

  saveGame(state: GameState){
    localStorage.setItem(this.STATE_NAME,JSON.stringify(state));
  }

  getCurrentGame<T>(): T | null {
    const data = localStorage.getItem(this.STATE_NAME);
    return data ? (JSON.parse(data) as T) : null;
  }

  clearGameData(){
    localStorage.removeItem(this.STATE_NAME)
  }

  constructor() { }
}
