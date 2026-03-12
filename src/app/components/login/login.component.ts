import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { GameManagerService } from '../../services/game-manager.service';
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
  imports: [ReactiveFormsModule,GameHeaderComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  // Inject the router
  private router = inject(Router);
  
  // Inject the gameManager service
  private gameService = inject(GameManagerService);

  // Forms
  loginForm = new FormGroup({
    player1: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(1)]}),
    player2: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(1)]})
  },{
    validators : validatePlayersNames // Funtion to check equal names
  });

  startGame(){
    if(this.loginForm.valid){
      const { player1, player2 } = this.loginForm.value;
      this.gameService.initializeGame(player1 ?? 'Player1',player2 ?? 'Player2');
      this.router.navigate(['/game']);
    }
  }
}
