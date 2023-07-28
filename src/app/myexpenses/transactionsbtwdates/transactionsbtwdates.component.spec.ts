import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsbtwdatesComponent } from './transactionsbtwdates.component';

describe('TransactionsbtwdatesComponent', () => {
  let component: TransactionsbtwdatesComponent;
  let fixture: ComponentFixture<TransactionsbtwdatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsbtwdatesComponent]
    });
    fixture = TestBed.createComponent(TransactionsbtwdatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
