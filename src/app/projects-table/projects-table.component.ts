import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ProjectsTableDataSource, ProjectsTableItem } from './projects-table-datasource';
import { HttpClient } from '@angular/common/http';

// 
// 
// TODO Delete projects directory and my-table after projects table and users table is complete
// TODO Put component directories in directories according to routing hiearchy
//
// 

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule]
})
export class ProjectsTableComponent implements AfterViewInit {
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProjectsTableItem>;
  dataSource = new ProjectsTableDataSource(this.http);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title'];

  constructor(private http: HttpClient) {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  changeTheme() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://material.angular.io/purple-green.css";
    document.head.appendChild(link);
  }

}
