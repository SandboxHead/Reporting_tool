import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UploadService} from '../upload.service'; 

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  @ViewChild('fileInput', {static : false}) fileInput;
  onSubmit(f: NgForm) {

    const files: FileList = this.fileInput.nativeElement.files;

    if (files.length === 0) {
      return;
    };


    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    this.uploadService.uploadFile(files).subscribe(response => {
      console.log('Post done' + response);
    });
  }
  constructor(private uploadService : UploadService) { }

  ngOnInit() {
  }

}
