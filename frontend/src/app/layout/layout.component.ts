import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UploadService } from '../upload.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(public authService : AuthService, public router: Router, private uploadService : UploadService) { }
  logout(){
    this.authService.logout().subscribe(data => {
      console.log(data);
      this.router.navigate(['/', 'login']);
    })
  }

  saveTemplate(){
    this.uploadService.saveTemplate().subscribe(data => {
      console.log(data);
    });
  }

  ngOnInit() {
  }

}
