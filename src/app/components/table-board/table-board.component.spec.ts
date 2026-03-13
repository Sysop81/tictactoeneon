import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBoardComponent } from './table-board.component';

describe('TableBoardComponent', () => {
  let component: TableBoardComponent;
  let fixture: ComponentFixture<TableBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableBoardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TableBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
