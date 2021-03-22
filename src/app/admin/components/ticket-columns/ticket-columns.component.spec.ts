import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketColumnsComponent } from './ticket-columns.component';

describe('TicketColumnsComponent', () => {
  let component: TicketColumnsComponent;
  let fixture: ComponentFixture<TicketColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
