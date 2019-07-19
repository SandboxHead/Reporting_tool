import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ChartServiceService } from "../chart-service.service";
import {NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {NgForm} from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
 

import { SampleChartService } from  '../sample-chart.service'; 

@Component({
  selector: 'app-chart-popup',
  templateUrl: './chart-popup.component.html',
  styleUrls: ['./chart-popup.component.css']
})
export class ChartPopupComponent implements OnInit {
  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;
  // closeResult: string;
  @Input() type : string;
  @Input() index : number;

  data : any;
  notselected = "";

  onSubmit(f: NgForm) {
    if(this.index === -1){
      console.log(f.value);  // { first: '', last: '' }
      console.log(f.valid);  // false
      console.log(this.type);
      this.chartService.addChart(parseInt(f.value.slide), this.data);
    }
    else{
      this.chartService.charts[this.index] = this.data;
      this.chartService.setInitial(this.index);
    }
  }

  ngOnInit() {
    if(this.index === -1){
      if(this.type === 'Line'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.line_chart));
      }
      else if(this.type === 'Bar'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.bar_chart));
      }
      else if(this.type === 'Doughnut'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.doughnut_chart));
      }
      else if(this.type === 'Radar'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.radar_chart));
      }
      else if(this.type === 'Pie'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.pie_chart));
      }
      else if(this.type === 'Polar'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.polar_chart));
      }
      else if(this.type === 'Bubble'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.bubble_chart));
      }
      else if(this.type === 'Scatter'){
        this.data = JSON.parse(JSON.stringify(this.sampleChartService.scatter_chart));
      }
    }
    else{
      this.data = Object.assign({}, this.chartService.charts[this.index]);
    }
    console.log(this.data);
  }

  constructor(
    private modalService: NgbActiveModal, 
    private chartService : ChartServiceService,
    private sampleChartService : SampleChartService,
    ) {}


}
