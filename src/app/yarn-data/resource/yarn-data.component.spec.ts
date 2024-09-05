import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YarnDataComponent } from './resource/yarn-data.component';

describe('YarnDataComponent', () => {
  let component: YarnDataComponent;
  let fixture: ComponentFixture<YarnDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YarnDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YarnDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
