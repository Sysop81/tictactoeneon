import { Component, inject, signal } from '@angular/core';
import { trigger, transition, style, animate, AnimationEvent } from '@angular/animations';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { GameManagerService } from '../../services/game-manager.service';
import { SoundService, SoundTypes } from '../../services/sound.service';
import { GameHeaderComponent } from '../game-header/game-header.component';

/**
 * validatePlayersNames
 * @param control 
 * @returns 
 */
export const validatePlayersNames: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const p1 = control.get('player1')?.value;
  const p2 = control.get('player2')?.value;
  return p1 && p2 && p1.toLowerCase() === p2.toLowerCase() ? { namesEqual: true } : null;
};
@Component({
  selector: 'app-login',
  standalone: true,
  animations: [
    trigger('errorState', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 }))
      ])
    ])
  ],
  imports: [ReactiveFormsModule,GameHeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Inject the router
  private router = inject(Router);
  
  // Inject the gameManager service
  private gameService = inject(GameManagerService);
  private soundManager = inject(SoundService);

  isAImode = signal(true);

  // Forms
  loginForm = new FormGroup({
    player1: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(1)]}),
    player2: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(1)]})
  },{
    validators : validatePlayersNames // Funtion to check equal names
  });

  handleAImode(e : Event){
    const value = e.target as HTMLInputElement;
    this.isAImode.set(value.checked);
    this.checkAImode();
  }


  startGame(){
    if(this.loginForm.valid){
      this.soundManager.play(SoundTypes.START);
      const { player1, player2 } = this.loginForm.getRawValue();
      this.gameService.initializeGame(player1 ?? 'Player1',player2 ?? 'Player2');
      this.router.navigate(['/game']);
    }
  }

  playInputSound(): void{
    this.soundManager.play(SoundTypes.INPUT);
  }

  playErrorSound(e: AnimationEvent): void{
    if(e.fromState !== 'void') return;
    this.soundManager.play(SoundTypes.ERROR);
  }

  checkAImode(): void{
    const p2 = this.loginForm.get('player2');
    if(this.isAImode()){
      p2?.setValue('cpu');
      p2?.disable();
      p2?.setErrors(null);
    }else{
      p2?.enable();
      p2?.setValue('');
    }
  }

  constructor(){
    this.checkAImode();
  }
}
