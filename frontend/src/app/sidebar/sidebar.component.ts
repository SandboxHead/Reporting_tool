import { Component, OnInit } from '@angular/core';
import { ChartServiceService } from '../chart-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ChartPopupComponent } from '../chart-popup/chart-popup.component';
import { PopupService } from  '../popup.service';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  chartType = ["Line", "Bar", "Doughnut", "Radar", "Pie", "Polar", "Bubble", "Scatter"];

  closeResult: string;
  public createChart(chartType: string) {
    this.popupService.openPopup(-1, chartType);
  }

  createImage(){
    this.imageService.addImage(0, "../../assets/images/nokia_white_logo.png");
  }

  constructor(public imageService : ImageService, public popupService : PopupService ) { }

  ngOnInit() {
  }

}
