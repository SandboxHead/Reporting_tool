import { Component, OnInit, Input, ViewChild } from '@angular/core';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-styles',
  templateUrl: './styles.component.html',
  styleUrls: ['./styles.component.css']
})
export class StylesComponent implements OnInit {
  @Input() data;
  constructor() { }

  axisSelected = "title";
  axisToggle(event : any){
    if(this.axisSelected === 'title'){
      console.log('title selected');
      this.data.options.title.display = event;
    }
    else if(this.axisSelected === 'xAxis'){
      this.data.options.scales.xAxes[0].scaleLabel.display = event;
    }
    else{
      this.data.options.scales.yAxes[0].scaleLabel.display = event;
    }
    console.log(this.data);
  }

  checkToggle(){
    if(this.axisSelected === 'title'){
      return this.data.options.title.display;
    }
    else if(this.axisSelected === 'xAxis'){
      return this.data.options.scales.xAxes[0].scaleLabel.display;
    }
    else{
      return this.data.options.scales.yAxes[0].scaleLabel.display;
    }
  }

  currText(){
    if(this.axisSelected === 'title'){
      return this.data.options.title.text;
    }
    else if(this.axisSelected === 'xAxis'){
      return this.data.options.scales.xAxes[0].scaleLabel.labelString;
    }
    else {
      return this.data.options.scales.yAxes[0].scaleLabel.labelString;
    }
  }

  gridColor(event: any){
    console.log(event);
    this.data.options.scales.yAxes[0].gridLines.color = event;
    this.data.options.scales.xAxes[0].gridLines.color = event;
    
  }

  public items: string[] = ['Amsterdam', 'Antwerp', 'Athens', 'Barcelona',
  'Berlin', 'Birmingham', 'Bradford', 'Bremen', 'Brussels', 'Bucharest',
  'Budapest', 'Cologne', 'Copenhagen', 'Dortmund', 'Dresden', 'Dublin',
  'Düsseldorf', 'Essen', 'Frankfurt', 'Genoa', 'Glasgow', 'Gothenburg',
  'Hamburg', 'Hannover', 'Helsinki', 'Kraków', 'Leeds', 'Leipzig', 'Lisbon',
  'London', 'Madrid', 'Manchester', 'Marseille', 'Milan', 'Munich', 'Málaga',
  'Naples', 'Palermo', 'Paris', 'Poznań', 'Prague', 'Riga', 'Rome',
  'Rotterdam', 'Seville', 'Sheffield', 'Sofia', 'Stockholm', 'Stuttgart',
  'The Hague', 'Turin', 'Valencia', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław',
  'Zagreb', 'Zaragoza', 'Łódź'];

  data_temp : any;
  legendToggle(event : any){
    console.log(event);
    this.data.options.legend.display = event;
    this.data.legend = event;
    // this.data = JSON.parse(JSON.stringify(this.data_temp), this.getCircularReplacer());
    // console.log(this.data);
    
  }

  legendColor(event : any){
    console.log(event);
    this.data.options.legend.labels.fontColor = event;
  }

  getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  
  titleToggle(event : any){
    console.log(event);
    this.data.options.title.display = event;
    this.data.options = this.data.options;
    console.log(this.data);
    this.data.chartType = 'line';

  }

  ngOnInit() {
    console.log(this.data);
    this.data_temp = JSON.parse(JSON.stringify(this.data, this.getCircularReplacer()));
    console.log(this.data_temp);
  }
}
