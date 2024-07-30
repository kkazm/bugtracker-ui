import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatDateFnsModule, provideDateFnsAdapter } from '@angular/material-date-fns-adapter';
import { DatePipe, JsonPipe } from '@angular/common';
import { format, formatDistance, subDays } from 'date-fns';
import { pl } from 'date-fns/locale';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import Quill from 'quill';

@Component({
  selector: 'app-issue-details',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatDateFnsModule,
    JsonPipe,
    DatePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss'
})
export class IssueDetailsComponent implements OnInit {

  quill!: Quill;

  ngOnInit(): void {
    this.quill = new Quill('#editor', {
      theme: 'snow',
    });
  }

}
