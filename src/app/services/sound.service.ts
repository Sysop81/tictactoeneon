import { Injectable, signal } from '@angular/core';

export enum SoundTypes {
  INPUT = 'input',
  START = 'start',
  ERROR = 'error',
  MOVE = 'move',
  EXIT = 'exit'
}

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  
  isMuted = signal<boolean>(false); // Not implemented yet

  private sounds : { [key: string]: HTMLAudioElement } = {
    input: new Audio('assets/sounds/input_focus.mp3'),
    start: new Audio('assets/sounds/start_game.mp3'),
    error: new Audio('assets/sounds/error_input.mp3'),
    move: new Audio('assets/sounds/cell_movement.mp3'),
    exit: new Audio('assets/sounds/exit_game.mp3')
  };

  play(soundName : SoundTypes): void{
    if (this.isMuted()) return;

    const audio = this.sounds[soundName]
    if(!audio) return;

    audio.currentTime = 0;
    audio.play();

    
  }


  constructor() { }
}
