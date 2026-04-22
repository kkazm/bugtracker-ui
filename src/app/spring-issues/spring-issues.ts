import { AfterViewInit, ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { catchError, map, merge, of, startWith, switchMap } from 'rxjs';

export interface GithubIssue {
  number: number;
  title: string;
  state: string;
  user: { login: string } | null;
  comments: number;
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface GithubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GithubIssue[];
}

@Component({
  selector: 'app-spring-issues',
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
  ],
  templateUrl: './spring-issues.html',
  styleUrl: './spring-issues.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpringIssues implements AfterViewInit {
  private readonly http = inject(HttpClient);
  private static readonly API = 'https://api.github.com/search/issues';
  private static readonly QUERY = 'repo:spring-projects/spring-framework is:issue';

  readonly displayedColumns = ['number', 'title', 'state', 'user', 'comments', 'created_at', 'updated_at'];

  readonly paginator = viewChild.required(MatPaginator);
  readonly sort = viewChild.required(MatSort);

  readonly issues = signal<GithubIssue[]>([]);
  readonly resultsLength = signal(0);
  readonly loading = signal(true);
  readonly errored = signal(false);

  ngAfterViewInit(): void {
    const sort = this.sort();
    const paginator = this.paginator();

    sort.sortChange.subscribe(() => (paginator.pageIndex = 0));

    merge(sort.sortChange, paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loading.set(true);
          this.errored.set(false);
          return this.fetch(sort.active, sort.direction, paginator.pageIndex, paginator.pageSize).pipe(
            catchError(() => {
              this.errored.set(true);
              return of<GithubSearchResponse>({ total_count: 0, incomplete_results: false, items: [] });
            }),
          );
        }),
        map((response) => {
          this.loading.set(false);
          // GitHub caps search results at 1000.
          this.resultsLength.set(Math.min(response.total_count, 1000));
          return response.items;
        }),
      )
      .subscribe((items) => this.issues.set(items));
  }

  private fetch(active: string, direction: SortDirection, pageIndex: number, pageSize: number) {
    let params = new HttpParams()
      .set('q', SpringIssues.QUERY)
      .set('per_page', pageSize)
      .set('page', pageIndex + 1);

    if (direction && active) {
      params = params.set('sort', active).set('order', direction);
    }

    return this.http.get<GithubSearchResponse>(SpringIssues.API, { params });
  }
}
