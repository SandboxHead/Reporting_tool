import { Injectable } from '@angular/core';
import { TemplateService } from './template.service';


@Injectable({
  providedIn: 'root'
})
export class ChartServiceService {

  charts = [];
  addChart(numSlide : number, data : any){
    var temp;
    if(this.templateService.count <= numSlide){
      console.log("Num of slide bigger then expected");
    }
    
    else{
      temp = Object.assign({
        slide : numSlide, 
        index : this.charts.length,
        location : {
          top : 30,
          left : 30,
        },
       
        location_dummy : {
          top : 24,
          left : 24,
        },

        dimension : {
          width : 400,
          height : 333,
        },
        dimension_dummy : {
          width : 412,
          height : 345,
        },
        transform : {
          x : 0,
          y : 0,
        },
        
      }, data);
      this.charts.push(temp);
      this.templateService.selected.index = this.charts.length - 1;
      this.templateService.selected.type = 'chart';
      console.log(temp);
    }
  }

  setSelected(index : number){
    console.log(index);
    this.templateService.selected = {
      type : 'chart',
      index : index,
    };
    if(index !== -1){
      this.templateService.selectedSlide = this.charts[index].slide;
    }
  }

  setInitial(index : number){
    if(index >= 0){
      this.charts[index].location.top += this.charts[index].transform.y;
      this.charts[index].location.left += this.charts[index].transform.x;
      this.charts[index].transform.x = 0;
      this.charts[index].transform.y = 0;  
    }
  }


  getCharts(){
    return this.charts;
  }
  constructor(private templateService : TemplateService) { }
}
