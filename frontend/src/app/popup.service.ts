import { Injectable } from '@angular/core';
import { ChartServiceService } from './chart-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ChartPopupComponent } from "./chart-popup/chart-popup.component";
import { TemplateService } from './template.service';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  openPopup(index : number, type : string){
    const modalRef = this.modalService.open(ChartPopupComponent, {
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      size: 'lg',
    });
    modalRef.componentInstance.type = type;
    modalRef.componentInstance.index = index;
    modalRef.result.then((result) => {
      console.log(result);

      if(result.data.hasOwnProperty('slide')){
        console.log(result.type);
        this.chartService.charts[result.data.index] = result.data;
        console.log(this.chartService.charts[result.data.index]);
        this.chartService.setInitial(result.data.index);
      }
      else{
        // console.log(result.f.value);  // { first: '', last: '' }
        // console.log(result.f.valid);  // false
        // console.log(result.f.type);
        this.chartService.addChart(this.templateService.selectedSlide, result.data);
      }
    },
    (reason) => {
      console.log(reason);
    });
  }
  constructor(private chartService : ChartServiceService,  public modalService : NgbModal, private templateService : TemplateService) { }
}
