import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ImageService } from "../image.service";
import { ResizeEvent } from 'angular-resizable-element';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() data ;
  @Input() selected : string;

  @ViewChild('img', {static : false}) img : ElementRef;

  setSelected(event : Event){
    event.stopPropagation();
    this.imageService.setSelected(this.data.index);
  }

  onLoad(event : any){
    if(this.data.found === -1){
      console.log((this.img.nativeElement as HTMLImageElement).width);
      console.log((this.img.nativeElement as HTMLImageElement).height);
      this.data.found = 1;
      this.data.dimension.width = 600;
      var hei = ((this.img.nativeElement as HTMLImageElement).height / (this.img.nativeElement as HTMLImageElement).width) * 700;
      this.data.dimension.height = Math.round(hei);
      this.data.dimension_dummy.height = this.data.dimension.height + 12;
      this.data.dimension_dummy.width = this.data.dimension.width + 12;
      console.log(this.data);
    }
  }

  resizeEnd(event: ResizeEvent): void {
    console.log('Element was resized', event);
    this.imageService.setInitial(this.data.index);
    if(event.edges.hasOwnProperty('right')){
      this.data.dimension.width += event.edges.right;
      this.data.dimension_dummy.width += event.edges.right;
      this.ngOnInit();
      console.log(this.imageService.images[this.data.index]);
      console.log("it has changed");
      
    }
    if(event.edges.hasOwnProperty('left')){
      this.data.dimension.width += (-event.edges.left);
      this.data.dimension_dummy.width += (-event.edges.left);

      this.data.location.left+=event.edges.left;
      this.data.location_dummy.left+=event.edges.left;
      
      this.imageService.setInitial(this.data.index);

      this.ngOnInit();
      console.log(this.imageService.images[this.data.index]);
      console.log("it has changed");
    }
    if(event.edges.hasOwnProperty('top')){
      this.data.dimension.height+=(-event.edges.top);
      this.data.dimension_dummy.height+=(-event.edges.top);

      this.data.location.top+=event.edges.top;
      this.data.location_dummy.top+=event.edges.top;
      
      this.imageService.setInitial(this.data.index);
      this.ngOnInit();
      console.log(this.imageService.images[this.data.index]);
      console.log("it has changed");
    }
    if(event.edges.hasOwnProperty('bottom')){
      this.data.dimension.height += event.edges.bottom;
      this.data.dimension_dummy.height+= event.edges.bottom;
      this.imageService.setInitial(this.data.index);

      this.ngOnInit();
      console.log(this.imageService.images[this.data.index]);
      console.log("it has changed");
    }
    this.imageService.images[this.data.index] = Object.assign({}, this.data);

  }

  delete(){
    for(var i=this.data.index + 1; i<this.imageService.images.length; i++){
      this.imageService.images[i].index -= 1;
    }
    this.imageService.images.splice(this.data.index, 1);
  }

  dropnow(event: CdkDragEnd){
    console.log(event.distance);
    this.imageService.images[this.data.index].transform.x += event.distance.x;
    this.data.location_dummy.top += event.distance.y;
    this.data.location_dummy.left += event.distance.x;

    this.imageService.images[this.data.index].transform.y += event.distance.y;
    console.log(this.imageService.images[this.data.index]);
  }

  constructor(private imageService : ImageService) { }

  ngOnInit() {
  }

}
