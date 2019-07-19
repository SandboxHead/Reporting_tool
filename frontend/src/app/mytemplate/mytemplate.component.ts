import { Component, OnInit, Input } from '@angular/core';
import { ChartServiceService } from '../chart-service.service';
import { ResizeEvent } from 'angular-resizable-element';
import { TemplateService } from '../template.service';
import { ImageService } from "../image.service";
import { TextService } from "../text.service";

@Component({
  selector: 'app-mytemplate',
  templateUrl: './mytemplate.component.html',
  styleUrls: ['./mytemplate.component.css']
})
export class MytemplateComponent implements OnInit {

  
  data = {labels : ["SaveData", ""],

  };

  addSlide(event : any){
    this.templateService.count += 1;
    for(var i=0; i<this.chartService.charts.length; i++){
      if(this.chartService.charts[i].slide > event.data.index){
        this.chartService.charts[i].slide += 1;
        this.chartService.setInitial(i);
      }
    }
    console.log(event.data.index);
  }
  moveUp(event : any){
    for(var i=0; i<this.chartService.charts.length; i++){
      if(this.chartService.charts[i].slide === event.data.index){
        this.chartService.charts[i].slide += (-1);
        this.chartService.setInitial(i);
      }
      else if(this.chartService.charts[i].slide === event.data.index - 1){
        this.chartService.charts[i].slide += 1;
        this.chartService.setInitial(i);
      }
    }
    console.log(event);
  }
  moveDown(event : any){
    for(var i=0; i<this.chartService.charts.length; i++){
      if(this.chartService.charts[i].slide === event.data.index){
        this.chartService.charts[i].slide += 1;
        this.chartService.setInitial(i);
      }
      else if(this.chartService.charts[i].slide === event.data.index + 1){
        this.chartService.charts[i].slide += (-1);
        this.chartService.setInitial(i);
      }
    }
    console.log(event);
  }
  deleteSlide(event : any){
    this.templateService.count += (-1);
    for(var i=0; i<this.chartService.charts.length; i++){
      if(this.chartService.charts[i].slide > event.data.index){
        this.chartService.charts[i].slide += (-1);
        this.chartService.setInitial(i);
      }
      else if(this.chartService.charts[i].slide === event.data.index){
        this.chartService.charts[i].slide = -1;
        this.chartService.setInitial(i);
        console.log("delete");
      }
    }
    console.log(event);
  }

  onResizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
  }

  setSelected(event : any, label : any){
    this.templateService.selectedSlide = label.index;
    this.chartService.setSelected(-1);
    this.imageService.setSelected(-1);
  }

  checkSelected(index : number){
    console.log(index);
    if(index === this.templateService.selectedSlide){
      return "slide-selected";
    }
    else {
      return "";
    }
  }

  selected(i : number, type : string) {
    // console.log(i);
    // console.log(this.chartService.selected);
    if(this.templateService.selected.type === type && this.templateService.selected.index === i){
      return "selected";
    }
    else{ 
      return "";
    }
  };

  @Input() index : number;
  constructor( public chartService : ChartServiceService, public templateService : TemplateService, public imageService : ImageService, public textService : TextService) { }
  charts = [];
  getCharts(){
    this.charts = this.chartService.getCharts();
  }

  count : number;

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit() {
    console.log(this.chartService.charts);
    this.getCharts();
    this.count = 2;
  }

}
