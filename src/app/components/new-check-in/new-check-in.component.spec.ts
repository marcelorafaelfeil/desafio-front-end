import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCheckInComponent } from './new-check-in.component';

describe('NewCheckInComponent', () => {
  let component: NewCheckInComponent;
  let fixture: ComponentFixture<NewCheckInComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCheckInComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCheckInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
