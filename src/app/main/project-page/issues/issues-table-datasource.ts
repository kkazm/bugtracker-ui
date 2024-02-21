import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchAll, tap } from 'rxjs/operators';
import { Observable, of, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IssueService } from '../../../service/issue.service';

export interface IssuesTableItem {
  id: number,
  title: string,
  createdAt: string,
}

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class IssuesTableDataSource extends DataSource<IssuesTableItem> {

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  resultsLength = 0;
  // issueService = inject(IssueService);
  projectId!: number 
  newestIssueId: number | undefined
  firstDownload: boolean = true;

  constructor(
    private http: HttpClient,
    private issueService: IssueService,
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IssuesTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(of(null), this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(val => {
            console.log('Doing something') // TODO Delete this
          }),
          map((val) => {
            if (!this.paginator) throw Error('Please set the paginator and sort on the data source before connecting.');
            const per_page = this.paginator?.pageSize;
            // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            const page = this.paginator?.pageIndex;
            let sort = this.sort?.active ? this.sort?.active : 'created';
            const direction = this.sort?.direction ? this.sort?.direction : 'desc';
            console.log(page, per_page, sort);
            return this.issueService.getAllProjectIssues(this.projectId, page, per_page, sort, direction)
              .pipe(
                map(data => {
                  this.resultsLength = data.totalElements;
                  if (this.firstDownload) {
                    this.newestIssueId = data.content[0].id;
                    this.firstDownload = false;
                  }
                  return data.content;
                })
              )
          }),
          switchAll()
        )
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void { }

}