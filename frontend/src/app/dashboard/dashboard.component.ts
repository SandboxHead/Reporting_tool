import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';
import { ImageService } from '../image.service';
import { ChartServiceService } from '../chart-service.service';
import { TextService } from '../text.service';
import { TemplateService } from '../template.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  mytemplates = [];
  constructor(
    private authService : AuthService,
    private router: Router,
    private uploadService : UploadService,
    private imageService : ImageService,
    private chartService : ChartServiceService,
    private textService : TextService,
    private templateService : TemplateService,
    ) { }



  createTemplate(){
    this.uploadService.createTemplate(this.authService.username, 'untitled').subscribe(data => {
      console.log(data);
      this.router.navigate(['/', 'template']);
    })
  }

  loadAllData(tdata : any){
    
    this.templateService.count = tdata.slide;
    this.imageService.images = tdata.images;
    this.textService.texts = tdata.texts;
    this.chartService.charts = tdata.charts;
    console.log('loading data');
    for(var i=0; i<tdata.charts.length; i++){
      if(tdata.charts[i].edited === false){
        console.log('breaking');
        break;
      }
      if(tdata.charts[i].labelsCol[0] !== 'random'){
        this.uploadService.getData(tdata.charts[i].labelsCol[0], tdata.charts[i].labelsCol[1])
          .subscribe(data => {
            console.log('inside');
            console.log(data);
            this.chartService.charts[i].labels = data;
          });
      }
      if(tdata.charts[i].chartType === 'line' || tdata.charts[i].chartType === 'bar' || tdata.charts.chartType === 'radar'){
        console.log("Inside");
        for(var j=0; j<tdata.charts[i].datasetsCols.length; j++){
          console.log('inside for loop');
          this.uploadService.getData(tdata.charts[i].datasetsCols[j][0], tdata.charts[i].datasetsCols[j][1])
            .subscribe(data => {
              console.log(data);
              this.chartService.charts[i].datasets.push({data : data, label : tdata.charts[i].datasetsCols[j][1]});
            });
        } 
      }
      if(tdata.charts[i].chartType === 'doughnut'){
        for(var j=0; j<tdata.charts[i].dataCols.length; j++){
          this.uploadService.getData(tdata.charts[i].dataCols[j][0], tdata.charts[i].dataCols[j][1])
            .subscribe(data => {
              this.chartService.charts[i].data.push(data);
            });
        }
      }
      if(tdata.charts[i].chartType === 'pie' || tdata.charts[i].chartType === 'polarArea'){
        this.uploadService.getData(tdata.charts[i].dataCol[0], tdata.charts[i].dataCol[1])
          .subscribe(data => {
            this.chartService.charts[i].data.push(data);
          });
      
      }
    }

  }

  loadTemplate(template : string){
    this.uploadService.loadTemplate(template).subscribe(data => {
      console.log(data);

      this.loadAllData(data);

      this.router.navigate(['/', 'template']);
    })
  }

  ngOnInit() {
    // if(this.authService.logined === false){
    //   this.router.navigate(['/', 'login']);
    // }

    this.uploadService.getMyTemplates(this.authService.username).subscribe(data => {
      this.mytemplates = data.collections;
    });
    console.log(this.mytemplates);
  }

}
