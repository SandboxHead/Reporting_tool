import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemplateService {

  name = '';
  count : number = 1;
  getCount() : number{
    return this.count;
  }

  increaseCount(){
    this.count = this.count  + 1;
  }

  selectedSlide = 0;
  selected = {
    type : 'charts',
    index : -1,
  }

  constructor() { }
}
