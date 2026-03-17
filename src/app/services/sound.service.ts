import { Injectable, signal } from '@angular/core';

export enum SoundTypes {
  INPUT = 'input'
}

@Injectable({
  providedIn: 'root'
})
export class SoundService {
  
  isMuted = signal<boolean>(false);

  private sounds : { [key: string]: HTMLAudioElement } = {
    input: new Audio('assets/sounds/input_focus.mp3')
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
