import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { TextService } from '../text.service';
import { ResizeEvent } from 'angular-resizable-element';
import { CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})
export class TextComponent implements OnInit {
  @Input() data ;
  @Input() selected : string;
  @ViewChild('txt', {static : false}) txt : ElementRef;


  setSelected(event : Event){
    event.stopPropagation();
    this.textService.setSelected(this.data.index);
  }

  dragnow(event : any){
    this.textService.setInitial(this.data.index);
    console.log('started');
  }

  delete(){
    for(var i=this.data.index + 1; i<this.textService.texts.length; i++){
      this.textService.texts[i].index -= 1;
    }
    this.textService.texts.splice(this.data.index, 1);
  }

  dropnow(event: CdkDragEnd){
    console.log(event.distance);
    this.textService.texts[this.data.index].transform.x += event.distance.x;
    this.data.location_dummy.top += event.distance.y;
    this.data.location_dummy.left += event.distance.x;

    this.textService.texts[this.data.index].transform.y += event.distance.y;
    console.log(this.textService.texts[this.data.index]);
    this.textService.setInitial(this.data.index);

  }

  resizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.textService.setInitial(this.data.index);
    if(event.edges.hasOwnProperty('right')){
      this.data.dimension.width += event.edges.right;
      this.data.dimension_dummy.width += event.edges.right;
      this.ngOnInit();
      console.log(this.textService.texts[this.data.index]);
      console.log("it has changed");
      
    }
    if(event.edges.hasOwnProperty('left')){
      this.data.dimension.width += (-event.edges.left);
      this.data.dimension_dummy.width += (-event.edges.left);

      this.data.location.left+=event.edges.left;
      this.data.location_dummy.left+=event.edges.left;
      
      this.textService.setInitial(this.data.index);

      this.ngOnInit();
      console.log(this.textService.texts[this.data.index]);
      console.log("it has changed");
    }
    if(event.edges.hasOwnProperty('top')){
      this.data.dimension.height+=(-event.edges.top);
      this.data.dimension_dummy.height+=(-event.edges.top);

      this.data.location.top+=event.edges.top;
      this.data.location_dummy.top+=event.edges.top;
      
      this.textService.setInitial(this.data.index);
      this.ngOnInit();
      console.log(this.textService.texts[this.data.index]);
      console.log("it has changed");
    }
    if(event.edges.hasOwnProperty('bottom')){
      this.data.dimension.height += event.edges.bottom;
      this.data.dimension_dummy.height+= event.edges.bottom;
      this.textService.setInitial(this.data.index);

      this.ngOnInit();
      console.log(this.textService.texts[this.data.index]);
      console.log("it has changed");
    }
    this.textService.texts[this.data.index] = Object.assign({}, this.data);
  }

  constructor(private textService : TextService) { }

  ngOnInit() {
  }

}
