import {  Component, OnInit, Input, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {UploadService} from '../../upload.service'; 

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css'],
})
export class DataComponent implements OnInit {
  @Input() data;
  collections = [];
  isCollapsed = [];
  coloumns = [];
  selected = 'Data';
  // cols = [];

  @ViewChild('fileInput', {static : false}) fileInput;
  onSubmit(f: NgForm) {

    const files: FileList = this.fileInput.nativeElement.files;

    if (files.length === 0) {
      return;
    };
    console.log(f.value);  // { first: '', last: '' }
    console.log(f.valid);  // false
    this.uploadService.uploadFile(files).subscribe(response => {
      if(response.status === "Success"){
        this.collections = this.collections.concat(response.collections);
        this.isCollapsed = this.isCollapsed.concat(new Array(response.collections.length).fill(false));
        this.coloumns = this.coloumns.concat(new Array(response.collections.length).fill([]));
      }
      console.log(this.collections);
      console.log(this.isCollapsed);
      console.log(this.coloumns);
    });
  }

  

  collapse(index : number){
    console.log(index);
    this.isCollapsed[index] = !this.isCollapsed[index];
    if(this.coloumns[index].length === 0){
      this.uploadService.getKeys(this.collections[index]).subscribe(response => {
        this.coloumns[index] = response.keys;
        console.log(this.coloumns);
      })
    }
  }

  removeData(i : number){
    this.data.datasets.splice(i, 1);
    this.data.cols.splice(i, 1);
  }

  updateData(i : number, j : number){
    this.uploadService.getData(this.collections[i], this.coloumns[i][j]).subscribe(response => {
      console.log(this.selected);
      console.log(this.data);
      if(this.selected === 'Label'){
        this.data.labels = response.data;
        this.data.labelsCol = [this.collections[i], this.coloumns[i][j]];
        console.log(this.data);
      }

      else if(this.data.chartType === 'line' || this.data.chartType === 'bar' || this.data.chartType === 'radar'){
        this.data.cols.push(this.coloumns[i][j]);
        if(!this.data.edited){
          this.data.datasets = [];
          this.data.edited = true;
        }
        this.data.datasetsCols.push([this.collections[i], this.coloumns[i][j]]);
        this.data.datasets.push({data : response.data, label : this.coloumns[i][j]});
      }
      else if(this.data.chartType === 'doughnut' ){
        this.data.cols.push(this.coloumns[i][j]);
        if(!this.data.edited){
          this.data.data = [];
          this.data.edited = true;
          this.data.labels = [];
        }
        this.data.dataCols.push([this.collections[i], this.coloumns[i][j]]);
        this.data.data.push(response.data);
      }
      else if(this.data.chartType === "pie" || this.data.chartType === 'polarArea'){
        this.data.dataCol = [this.collections[i], this.coloumns[i][j]];
        this.data.data = response.data;
      }
    })
  }

  constructor(private uploadService : UploadService) { }
  ngOnInit() {
    console.log(this.data);
    this.uploadService.getCollections().subscribe(response => {
      // for(var i=0; i<response.collections.length; i++)[
      //   this.uploadService.getKeys(response.collections[i]).subscribe(response =>{
      //     console.log(response);
      //   })
      // ]
      
      this.collections = response.status;
      this.isCollapsed = new Array(response.status.length).fill(false);
      this.coloumns = new Array(response.status.length).fill([]);
      console.log(response);
      console.log(this.isCollapsed);
      console.log(this.coloumns);
    });
  }
}
