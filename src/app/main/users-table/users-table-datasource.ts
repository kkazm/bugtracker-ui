
import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map, switchAll, tap } from 'rxjs/operators';
import { Observable, of, merge } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../service/config.service';
import { inject } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { UserService } from '../../service/user.service';

export interface UsersTableItem {
  username: string,
  id: number,
}

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UsersTableDataSource extends DataSource<UsersTableItem> {

  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  resultsLength = 0;
  userService = inject(UserService);

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<UsersTableItem[]> {
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
            return this.userService.getAllUsers(page, per_page, sort, direction)
              .pipe(
                map(data => {
                  this.resultsLength = data.totalElements;
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