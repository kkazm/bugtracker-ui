import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { SpringIssues } from './spring-issues';

describe('SpringIssues', () => {
  let component: SpringIssues;
  let fixture: ComponentFixture<SpringIssues>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpringIssues],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(SpringIssues);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => httpMock.verify());

  it('should create and request issues from GitHub', () => {
    const req = httpMock.expectOne((r) => r.url === 'https://api.github.com/search/issues');
    expect(req.request.params.get('q')).toBe('repo:spring-projects/spring-framework is:issue');
    req.flush({ total_count: 0, incomplete_results: false, items: [] });
    expect(component).toBeTruthy();
  });
});
