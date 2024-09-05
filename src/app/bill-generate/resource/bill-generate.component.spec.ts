import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillGenerateComponent } from './bill-generate.component';

describe('BillGenerateComponent', () => {
  let component: BillGenerateComponent;
  let fixture: ComponentFixture<BillGenerateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BillGenerateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BillGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
