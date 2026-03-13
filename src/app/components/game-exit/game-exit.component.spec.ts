import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameExitComponent } from './game-exit.component';

describe('GameExitComponent', () => {
  let component: GameExitComponent;
  let fixture: ComponentFixture<GameExitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameExitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
