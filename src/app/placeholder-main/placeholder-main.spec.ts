import { ComponentFixture, TestBed } from '@angular/core/testing';
import PlaceholderMain from './placeholder-main';

describe('PlaceholderMain', () => {
  let component: PlaceholderMain;
  let fixture: ComponentFixture<PlaceholderMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderMain],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceholderMain);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
