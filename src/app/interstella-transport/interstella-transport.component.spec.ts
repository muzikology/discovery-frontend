import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InterstellaTransportComponent } from './interstella-transport.component';

describe('InterstellaTransportComponent', () => {
  let component: InterstellaTransportComponent;
  let fixture: ComponentFixture<InterstellaTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterstellaTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InterstellaTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
