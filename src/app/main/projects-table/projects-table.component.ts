import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { ProjectsTableDataSource, ProjectsTableItem } from './projects-table-datasource';
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
import { ProjectService } from '../../service/project.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'app-projects-table',
  templateUrl: './projects-table.component.html',
  styleUrls: ['./projects-table.component.scss'],
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule
  ]
})
export class ProjectsTableComponent implements AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProjectsTableItem>;
  dataSource = new ProjectsTableDataSource(this.http);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'title'];

  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  createProjectDialog() {
    this.dialog.open(CreateProjectDialog);
  }

  /**
   * TODO Delete this
   * @deprecated
   */
  changeTheme() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "https://material.angular.io/purple-green.css";
    document.head.appendChild(link);
  }

}

@Component({
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
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private projectService: ProjectService,
    private snackBar: MatSnackBar,
  ) {
  }

  onSubmit() {
    const projectName = this.createProjectForm.getRawValue().projectName;
    this.projectService.createProject(projectName)
      .subscribe({
        next: (res) => {
          this.dialogRef.close();
          this.snackBar.open('Project created successfully', 'Close', { duration: 4000 });
        },
        error: (err) => {
          console.error(err);
        }
      })
  }


}
