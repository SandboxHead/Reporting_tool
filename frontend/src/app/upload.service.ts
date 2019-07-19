import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {NgForm} from '@angular/forms';
import { ChartServiceService } from './chart-service.service';
import { ImageService } from './image.service';
import { TextService } from './text.service';
import { TemplateService } from './template.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  host = "http://localhost:5000";




  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      console.log('Error has happened');
      // TODO: better job of transforming error for user consumption
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  uploadFile(files: any) : Observable<any>{
    console.log("posting");
    console.log(files);
    const formData: FormData = new FormData();
    formData.append('file', files[0], files[0].name);
    return this.http.post(this.host + '/upload_data/' + this.authService.username + '/' + this.templateService.name, formData);

    // return this.http.post<any>(this.host, f, this.httpOptions).pipe(
    //   catchError(this.handleError<any>('Posting'))
    // );
  }

  getSavable() : any {
    console.log(this.chartService.charts);
    var diff = {
      slide : this.templateService.count,
      images : this.imageService.images,
      texts : this.textService.texts,
      charts : JSON.parse(JSON.stringify(this.chartService.charts, function(key, value){
        if(key === '_meta'){
          return 'broken';
        }
        else {
          return value;
        }
      })),
    };
    // var diff = JSON.parse(JSON.stringify(out));
    for(var i=0; i<diff.charts.length; i++){
      if(diff.charts[i].edited === true){
        if(diff.charts[i].chartType === 'line' || diff.charts[i].chartType === 'bar' || diff.charts[i].chartType === 'radar'){
          diff.charts[i].datasets = [];
          diff.charts[i].labels = [];
        }
        else if(diff.charts[i].chartType === 'doughnut'){
          diff.charts[i].data = [];
          diff.charts[i].labels = [];
        }
        else if(diff.charts[i].chartType === 'pie' || diff.charts[i].chartType === 'polarArea'){
          diff.charts[i].data = [];
        }
      }
    }
    return diff;
  }

  saveTemplate() : Observable<any>{
    var out = this.getSavable();
    console.log(out);
    return this.http.post(this.host + '/update_template/' + this.authService.username + '/' + this.templateService.name, out, this.authService.httpOptions);
  }

  getData(collection:string, key : string): Observable<any>{
    return this.http.get(this.host + '/get_data/' + this.authService.username + '/' + collection + '/' + key, this.authService.httpOptions);
  }

  getCollections() : Observable<any>{
    return this.http.get(this.host + '/get_user_data/' + this.authService.username, this.authService.httpOptions);
  }

  getKeys(collection : string) : Observable<any>{
    return this.http.get(this.host + '/get_keys/' + this.authService.username + '/' + collection, this.authService.httpOptions)
  }

  getMyTemplates(username : string): Observable<any>{
    console.log(this.authService.authToken);
    return this.http.get(this.host + '/get_template/'+username, this.authService.httpOptions);
  }


  initialzeNew(name : string){
    this.imageService.images = [];
    this.chartService.charts = [];
    this.textService.texts = [];
    this.templateService.count = 1;
    this.templateService.selectedSlide = 0;
    this.templateService.selected.index = -1;
    this.templateService.name = name;
  }

  createTemplate(username : string, name: string): Observable<any>{
    this.initialzeNew(name);
    var templateData = this.getSavable();
    return this.http.post(this.host + '/create_template/'+username + '/' + name , templateData, this.authService.httpOptions);
  }

  loadTemplate(name: string): Observable<any> {
    return this.http.get(this.host + '/return_template/' + this.authService.username + '/' + name, this.authService.httpOptions);
  }



  constructor(private http: HttpClient, private chartService : ChartServiceService, private templateService : TemplateService, private imageService : ImageService, private textService : TextService, private authService : AuthService) { }
}
