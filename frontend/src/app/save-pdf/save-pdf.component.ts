import { Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-save-pdf',
  templateUrl: './save-pdf.component.html',
  styleUrls: ['./save-pdf.component.css']
})
export class SavePdfComponent implements OnInit {

  constructor() { }
  doc = new jsPDF('p', 'pt');

  ngOnInit() {
    this.doc.text('Hello World!', 10, 10);
    this.doc.save('a4.pdf');
  }

}
