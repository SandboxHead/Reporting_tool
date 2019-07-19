import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartServiceService } from "./chart-service.service";
import { TemplateService } from "./template.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'frontend';
  loggined = true;
  src = "http://localhost:8000/bar-chart";

  addSlide(){
    this.templateService.increaseCount();
  }
  
  constructor(public router : Router, private chartService : ChartServiceService, private templateService : TemplateService) {}

  ngOnInit(){
    console.log(this.router.url);
  }
}
