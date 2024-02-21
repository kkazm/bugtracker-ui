import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { HttpClient } from '@angular/common/http';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { IssuesTableDataSource, IssuesTableItem } from './issues-table-datasource';
import { AuthenticationService } from '../../../service/authentication.service';
import { IssueService } from '../../../service/issue.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects-table',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss'],
  standalone: true,
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
    private authenticationService: AuthenticationService,
    public router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator
    this.dataSource.sort = this.sort;
    this.dataSource.projectId = this.projectId;
    this.table.dataSource = this.dataSource;
    this.table.contentChanged.subscribe(() => { // TODO Refactor
      if (this.firstLoad) {
        this.firstLoad = false;
        this.router.navigate([this.dataSource.newestIssueId], { relativeTo: this.route })
      }
    });
  }

  ngOnInit(): void {
    this.route.parent?.params.subscribe(params => {
      this.projectId = params['id'];
      console.warn("Issue component knows of this Project ID: " + this.projectId);
      // Now you can use this.projectId to fetch the project based on the ID
    });
  }
  /* 
    createProjectDialog() {
      if (this.authenticationService.isLoggedIn()) {
        this.dialog.open(CreateProjectDialog);
      } else {
        this.snackBar.open('Sign in to create a project', 'Close', { duration: 5000 });
        this.router.navigate(['/login']);
      }
    }
   */

}

/* @Component({
  selector: 'dialog-data-example-dialog',
  templateUrl: './create-project-dialog.html',
  standalone: true,
  imports: [
    MatButton,
    MatFormFieldModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogActions,
    MatDialogClose,
    MatSnackBarModule,
    ReactiveFormsModule,
  ],
})
export class CreateProjectDialog {

  createProjectForm = this.fb.nonNullable.group({
    projectName: ['', { validators: [Validators.required, Validators.minLength(3)] }],
  });

  constructor(
    public dialogRef: MatDialogRef<CreateProjectDialog>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
  }

  onSubmit() {
    const projectName = this.createProjectForm.getRawValue().projectName;
    this.projectService.createProject(projectName)
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.snackBar.open('Project created successfully', 'Close', { duration: 4000 });
          this.router.navigate(['/projects', res.id]);
        },
        error: (err) => {
          console.error(err);
        }
      })
  }

}
 */