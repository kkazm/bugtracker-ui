import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainOld } from './main-old.component';

describe('Main', () => {
  let component: MainOld;
  let fixture: ComponentFixture<MainOld>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainOld]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainOld);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
