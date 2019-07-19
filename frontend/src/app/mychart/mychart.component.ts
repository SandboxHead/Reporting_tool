import { Component, OnInit, Input } from '@angular/core';
import { ResizeEvent } from "angular-resizable-element";
import { CdkDragStart, CdkDragEnd } from "@angular/cdk/drag-drop";
import { ChartServiceService } from "../chart-service.service";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PopupService } from "../popup.service";
import {SampleChartService } from '../sample-chart.service';

@Component({
  selector: 'app-mychart',
  templateUrl: './mychart.component.html',
  styleUrls: ['./mychart.component.css']
})
export class MychartComponent implements OnInit {

  delete(){
    for(var i=this.data.index + 1; i<this.chartService.charts.length; i++){
      this.chartService.charts[i].index -= 1;
    }
    this.chartService.charts.splice(this.data.index, 1);
  }

  resizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.chartService.setInitial(this.data.index);
    if(event.edges.hasOwnProperty('right')){
      this.data.dimension.width += event.edges.right;
      this.data.dimension_dummy.width += event.edges.right;
      this.data.options.aspectRatio = this.data.dimension.width / this.data.dimension.height;
      this.ngOnInit();
      console.log(this.chartService.charts[this.data.index]);
      console.log("it has changed");
      
    }
    if(event.edges.hasOwnProperty('left')){
      this.data.dimension.width += (-event.edges.left);
      this.data.dimension_dummy.width += (-event.edges.left);

      this.data.location.left+=event.edges.left;
      this.data.location_dummy.left+=event.edges.left;
      
      this.data.options.aspectRatio = this.data.dimension.width / this.data.dimension.height;
      this.chartService.setInitial(this.data.index);

      this.ngOnInit();
      console.log(this.chartService.charts[this.data.index]);
      console.log("it has changed");
    }
    if(event.edges.hasOwnProperty('top')){
      this.data.dimension.height+=(-event.edges.top);
      this.data.dimension_dummy.height+=(-event.edges.top);

      this.data.location.top+=event.edges.top;
      this.data.location_dummy.top+=event.edges.top;
      
      this.data.options.aspectRatio = this.data.dimension.width / this.data.dimension.height;
      this.chartService.setInitial(this.data.index);
      this.ngOnInit();
      console.log(this.chartService.charts[this.data.index]);
      console.log("it has changed");
    }
    if(event.edges.hasOwnProperty('bottom')){
      this.data.dimension.height += event.edges.bottom;
      this.data.dimension_dummy.height+= event.edges.bottom;
      this.data.options.aspectRatio = this.data.dimension.width / this.data.dimension.height;
      this.chartService.setInitial(this.data.index);

      this.ngOnInit();
      console.log(this.chartService.charts[this.data.index]);
      console.log("it has changed");
    }
    this.chartService.charts[this.data.index] = Object.assign({}, this.data);

  }

  resizeStart(event : ResizeEvent): void {
    console.log('Element started to resize', event)
  }

  // @Input() index : number;
  @Input() data;
  @Input() disabled;
  @Input() locClass;
  @Input() selected : string;

  setSelected(event : Event){
    event.stopPropagation();
    this.chartService.setSelected(this.data.index);
  }

  constructor(private chartService : ChartServiceService, public modalService : NgbModal, private popupService : PopupService, private sampleChartService : SampleChartService) { }

  dragnow(event : CdkDragStart){
    console.log("started");
    this.chartService.setSelected(this.data.index);
  }

  dropnow(event: CdkDragEnd){
    console.log(event.distance);
    this.chartService.charts[this.data.index].transform.x += event.distance.x;
    this.data.location_dummy.top += event.distance.y;
    this.data.location_dummy.left += event.distance.x;

    this.chartService.charts[this.data.index].transform.y += event.distance.y;
    console.log(this.chartService.charts[this.data.index]);
  }

  public popUp() {
    this.popupService.openPopup(this.data.index, this.data.chartType);
  }

  ngOnInit() {
    console.log(this.disabled);
    console.log(this.locClass);
    console.log(this.selected);
  }

}
