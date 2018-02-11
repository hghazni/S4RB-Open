import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpmuComponent } from './cpmu.component';

describe('CpmuComponent', () => {
  let component: CpmuComponent;
  let fixture: ComponentFixture<CpmuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpmuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpmuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
