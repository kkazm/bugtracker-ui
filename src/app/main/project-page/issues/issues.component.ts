import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTable, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { IssueService } from '../../../service/issue.service';
import { IssuesTableDataSource, IssuesTableItem } from './issues-table-datasource';

@Component({
    selector: 'app-issues',
    templateUrl: './issues.component.html',
    styleUrls: ['./issues.component.scss'],
    imports: [
        CommonModule,
        RouterOutlet,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatRippleModule,
    ]
})
export class IssuesComponent implements AfterViewInit, OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IssuesTableItem>;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['createdAt'];
  projectId: number = 0;
  dataSource = new IssuesTableDataSource(this.http, this.issueService)
  firstLoad: boolean = true;

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private issueService: IssueService,
    public router: Router,
    public route: ActivatedRoute,
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
    this.dataSource.projectId = this.projectId;
    this.table.dataSource = this.dataSource;
    this.table.contentChanged.subscribe(() => { // TODO Refactor
      if (this.firstLoad) {
        this.firstLoad = false;
        this.router.navigate([this.dataSource.newestIssueId], { relativeTo: this.route, replaceUrl: true })
      }
    });
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.projectId = params['id'];
    });
  }

}
