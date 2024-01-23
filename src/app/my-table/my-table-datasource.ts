import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { concatAll, concatMap, delay, map, retry, switchAll, switchMap, take, tap, throttleTime } from 'rxjs/operators';
import { Observable, of, merge } from 'rxjs';
import { Component, Directive, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// TODO: Replace this with your own data model type
export interface MyTableItem {
  title: string;
  id: number;
}

const EXAMPLE_DATA: MyTableItem[] = [
  { id: 1, title: 'Hydrogen' },
  { id: 2, title: 'Helium' },
  { id: 3, title: 'Lithium' },
  { id: 4, title: 'Beryllium' },
  { id: 5, title: 'Boron' },
  { id: 6, title: 'Carbon' },
  { id: 7, title: 'Nitrogen' },
  { id: 8, title: 'Oxygen' },
  { id: 9, title: 'Fluorine' },
  { id: 10, title: 'Neon' },
  { id: 11, title: 'Sodium' },
  { id: 12, title: 'Magnesium' },
  { id: 13, title: 'Aluminum' },
  { id: 14, title: 'Silicon' },
  { id: 15, title: 'Phosphorus' },
  { id: 16, title: 'Sulfur' },
  { id: 17, title: 'Chlorine' },
  { id: 18, title: 'Argon' },
  { id: 19, title: 'Potassium' },
  { id: 20, title: 'Calcium' },
  { id: 1, title: 'Hydrogen' },
  { id: 2, title: 'Helium' },
  { id: 3, title: 'Lithium' },
  { id: 4, title: 'Beryllium' },
  { id: 5, title: 'Boron' },
  { id: 6, title: 'Carbon' },
  { id: 7, title: 'Nitrogen' },
  { id: 8, title: 'Oxygen' },
  { id: 9, title: 'Fluorine' },
  { id: 10, title: 'Neon' },
  { id: 11, title: 'Sodium' },
  { id: 12, title: 'Magnesium' },
  { id: 13, title: 'Aluminum' },
  { id: 14, title: 'Silicon' },
  { id: 15, title: 'Phosphorus' },
  { id: 16, title: 'Sulfur' },
  { id: 17, title: 'Chlorine' },
  { id: 18, title: 'Argon' },
  { id: 19, title: 'Potassium' },
  { id: 20, title: 'Calcium' },
];

/**
 * Data source for the MyTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class MyTableDataSource extends DataSource<MyTableItem> {

  data: MyTableItem[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  resultsLength = 0;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<MyTableItem[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(of(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(
          tap(val => {
            console.log('Doing something') // TODO Delete this
          }),
          map((val) => {
            if (!this.paginator) throw Error('Please set the paginator and sort on the data source before connecting.');
            const per_page = this.paginator?.pageSize;
            // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
            const page = this.paginator?.pageIndex + 1; // TODO Plus one because GitHub
            let sort = this.sort?.active ? this.sort?.active : 'created';
            sort = 'created'
            const direction = this.sort?.direction;
            console.log(page, per_page, sort);
            return this.http.get<MyTableItem[]>(
              `https://api.github.com/repos/angular/angular/issues?page=${page}&per_page=${per_page}&sort=${sort}&state=all&direction=${direction}`,
              { observe: 'response' }
            ).pipe(
              map(val => {
                this.resultsLength = 3042
                return val.body as MyTableItem[]
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