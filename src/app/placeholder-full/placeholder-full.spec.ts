import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlaceholderFull } from './placeholder-full';

describe('PlaceholderFull', () => {
  let component: PlaceholderFull;
  let fixture: ComponentFixture<PlaceholderFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaceholderFull],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaceholderFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
