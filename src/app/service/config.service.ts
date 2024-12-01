import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  apiUrl = 'http://localhost:8080';
  quillToolbarOptions = [
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['code-block', 'link', 'image', 'video', 'formula'],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme

    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],

    ['clean']                                         // remove formatting button
  ];
/*   allQuillToolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
  ]; */

  constructor() { }
}
