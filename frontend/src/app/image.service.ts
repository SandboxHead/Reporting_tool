import { Injectable } from '@angular/core';
import {TemplateService } from './template.service';
import { ChartServiceService } from './chart-service.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  images = [];

  addImage(slide : number, src : string){
    if(this.templateService.count <= slide){
      console.log("Num slide bigger then expected");
    }
    else{
      var temp = {
        slide : slide,
        index : this.images.length,
        location : {
          top : 60,
          left : 60,
        },
       
        location_dummy : {
          top : 54,
          left : 54,
        },
        found : -1,
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
        source : src,
      };
      this.images.push(temp);
      this.templateService.selected.type = 'image';
      this.templateService.selected.index = this.images.length - 1;
      console.log(temp);
    }
  }
  setSelected(index : number){
    this.templateService.selected = {
      type : 'image',
      index : index,
    };
    console.log(index);
    if(index !== -1){
      this.templateService.selectedSlide = this.images[index].slide;
    }
  }

  setInitial(index : number){
    if(index >= 0){
      this.images[index].location.top += this.images[index].transform.y;
      this.images[index].location.left += this.images[index].transform.x;
      this.images[index].transform.x = 0;
      this.images[index].transform.y = 0;  
    }
  }

  getImages(){
    return this.images;
  }

  constructor(private templateService : TemplateService) { }
}
