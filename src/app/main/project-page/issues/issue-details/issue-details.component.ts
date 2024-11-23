import { DatePipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Signal, signal, computed, Injector } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import Quill from 'quill';

@Component({
    selector: 'app-issue-details',
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
export class IssueDetailsComponent implements OnInit, OnDestroy {

  count = signal(0);
  comp: Signal<number> = computed(() => this.count() + 1);
  quill!: Quill;

  constructor(private injector: Injector) {
  }

  ngOnInit(): void {
    console.log("Created IssueDetails Component")
    this.quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Write a description of your issue...',
    });

    var existingNode = document.getElementById('editor');
    if (existingNode) {
      const newNode: HTMLElement = document.createElement('div');
      newNode.textContent = 'This is a new sibling node.';
      if (existingNode.parentNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
      }
    }

  }

  ngOnDestroy(): void {
    console.log("Destroyed IssueDetails Component")
  }

}
