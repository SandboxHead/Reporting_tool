import { Injectable } from '@angular/core';
import { TemplateService } from './template.service';
@Injectable({
  providedIn: 'root'
})
export class TextService {

  selected = -1;

  texts = [
    {
      slide : 0,
      index : 0,
      location : {
        top : 90,
        left : 90,
      },
     
      location_dummy : {
        top : 86,
        left : 86,
      },
      found : -1,
      dimension : {
        width : 200,
        height : 100,
      },
      dimension_dummy : {
        width : 212,
        height : 112,
      },
      transform : {
        x : 0,
        y : 0,
      },
      txt : "This is demo",
    }
  ]

  addText(slide : number, content : string) {
    if(this.templateService.count <= slide){
      console.log("Num slide bigger then expected");
    }
    else{
      var temp = {
        slide : slide,
        index : this.texts.length,
        location : {
          top : 90,
          left : 90,
        },
       
        location_dummy : {
          top : 86,
          left : 86,
        },
        found : -1,
        dimension : {
          width : 200,
          height : 100,
        },
        dimension_dummy : {
          width : 212,
          height : 112,
        },
        transform : {
          x : 0,
          y : 0,
        },
        txt : content,
      };
      this.texts.push(temp);
      console.log(temp);
    }
  }

  setInitial(index : number){
    if(index >= 0){
      this.texts[index].location.top += this.texts[index].transform.y;
      this.texts[index].location.left += this.texts[index].transform.x;
      this.texts[index].transform.x = 0;
      this.texts[index].transform.y = 0;  
    }
  }

  setSelected(index : number){
    this.templateService.selected = {
      type : 'text',
      index : index,
    };
    console.log(index);
    if(index !== -1){
      this.templateService.selectedSlide = this.texts[index].slide;
    }
  }

  constructor(private templateService : TemplateService) { }
}
