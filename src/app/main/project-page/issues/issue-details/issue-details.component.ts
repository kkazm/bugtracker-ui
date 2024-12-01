import { DatePipe, JsonPipe } from '@angular/common';
import { Component, OnDestroy, OnInit, Signal, signal, computed, Injector, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDateFnsModule } from '@angular/material-date-fns-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import Quill from 'quill';
import { ConfigService } from '../../../../service/config.service';
import { QuillEditorComponent } from 'ngx-quill'

@Component({
  selector: 'app-issue-details',
  imports: [
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatDateFnsModule,
    ReactiveFormsModule,
    QuillEditorComponent,
  ],
  templateUrl: './issue-details.component.html',
  styleUrl: './issue-details.component.scss'
})
export class IssueDetailsComponent implements OnDestroy {

  quill!: Quill;
  para = signal(false)

  constructor(
    private injector: Injector,
    private configServcie: ConfigService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    var existingNode = document.getElementById('editor')
    if (existingNode) {
      const newNode: HTMLElement = document.createElement('div')
      newNode.textContent = 'This is a new sibling node.'
      if (existingNode.parentNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
      }
    }
  }

  ngOnDestroy(): void {
    console.log("Destroyed IssueDetails Component")
  }

  paragraphClick(e: MouseEvent): void {
    this.quill = new Quill('#editor', {
      theme: 'snow',
      placeholder: 'Write a description of your issue...',
      // bounds: 
      modules: {
        toolbar: this.configServcie.quillToolbarOptions
      },
    });
    const e2 = e.target as HTMLElement
    e2.attributes.removeNamedItem('id') // TODO Refactor
  }

}
