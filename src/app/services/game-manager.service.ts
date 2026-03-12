import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  // Players Names
  playerOne = signal<string>('');
  playerTwo = signal<string>('');

  // Players Scores
  playerOneScore = signal<number>(0);
  playerTwoScore = signal<number>(0);

  initializeGame(p1name : string, p2name : string){
    this.playerOne.set(p1name);
    this.playerTwo.set(p2name);
    this.playerOneScore.set(0);
    this.playerTwoScore.set(0);
  }

  addPointToPlayerOne(){
    this.playerOneScore.update(score => score + 1);
  }

  addPointToPlayerTwo(){
    this.playerTwoScore.update(score => score + 1);
  }

  constructor() { }
}
