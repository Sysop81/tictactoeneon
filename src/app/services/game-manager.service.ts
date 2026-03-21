import { Injectable, signal, inject } from '@angular/core';
import { StorageService, GameState  } from './storage.service';

export interface GameResult {
  winner: 'X' | 'O' | '=';
  winningCells: number[][];
}

@Injectable({
  providedIn: 'root'
})
export class GameManagerService {

  storageService = inject(StorageService);

  // Players Names
  playerOne = signal<string>('');
  playerTwo = signal<string>('');

  // Players Scores
  playerOneScore = signal<number>(0);
  playerTwoScore = signal<number>(0);

  // Player turn
  playerTurn = signal<string>('');

  // Winning player
  gameResult = signal<GameResult>({ winner: '=', winningCells: [] });

  // Game State object to map with local storage service
  gameState = this.getDefaultGameState();

  initializeGame(p1name : string, p2name : string){
    this.playerOne.set(p1name);
    this.playerTwo.set(p2name);
    this.playerOneScore.set(0);
    this.playerTwoScore.set(0);
    this.playerTurn.set('X');

    this.gameState.pNames.x = p1name;
    this.gameState.pNames.o = p2name;
    this.storageService.saveGame(this.gameState);
  }

  resetGameResult(){
    this.gameResult.set({ winner: '=', winningCells: []});
    this.gameState.board = Array(3).fill(null).map(() => Array(3).fill(''));
    this.gameState.movements = 0;
    this.gameState.currentTurn = this.gameState.currentTurn === 'O' ? 'X' : 'O';
    this.storageService.saveGame(this.gameState);
  }

  addPointToPlayerOne(){
    this.playerOneScore.update(score => score + 1);
    this.gameState.scores.x++;
    this.storageService.saveGame(this.gameState);
  }

  addPointToPlayerTwo(){
    this.playerTwoScore.update(score => score + 1);
    this.gameState.scores.o++;
    this.storageService.saveGame(this.gameState);
  }

  endGame(){
    this.playerOne.set('Player1');
    this.playerTwo.set('Player2');
    this.playerOneScore.set(0);
    this.playerTwoScore.set(0);
    this.playerTurn.set('X');
    
    this.gameState = this.getDefaultGameState();
    this.storageService.clearGameData();
  }

  getDefaultGameState():GameState{
    return {
      board: Array(3).fill(null).map(() => Array(3).fill('')),
      currentTurn: 'X',
      movements: 0,
      pNames: {x:'Player1', o: 'Player2'},
      scores: { x: 0, o: 0 }
    };
  }

  updateState():void{
    this.playerOne.set(this.gameState.pNames.x);
    this.playerTwo.set(this.gameState.pNames.o);
    this.playerOneScore.set(this.gameState.scores.x);
    this.playerTwoScore.set(this.gameState.scores.o);
    this.playerTurn.set(this.gameState.currentTurn);
  }

  updateMovements(value : number): void{
    this.gameState.movements = value;
    this.storageService.saveGame(this.gameState);
  }

  updateTableBoard(value : string[][]): void{
    this.gameState.board = value;
    this.storageService.saveGame(this.gameState);
  }

  updateCurrentTurn(value : "X" | "O"){
    this.playerTurn.set(value);
    this.gameState.currentTurn = value;
    this.storageService.saveGame(this.gameState);
  }

  constructor() { 
    const currentState = this.storageService.getCurrentGame() as GameState;
    if(!currentState) return;

    this.gameState = currentState;
    this.updateState();
  }
}
