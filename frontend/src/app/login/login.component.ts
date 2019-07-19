import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AlertService } from '../alert.service'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  loading = false;
  returnUrl: 'string';

  constructor(
    private authService : AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService : AlertService,
    ) { }

  onSubmit(f : any){
    this.loading = true;
    this.authService.login(this.model.username, this.model.password)
      .subscribe(
        data => {
          console.log(data);
          if(data.status == 'success'){
            this.router.navigate(['/', 'dashboard']);
          }
          else{
            this.loading = false;
          }
        },
        error => {
          this.loading = false;
        }
      )
    console.log(this.model);
  }

  ngOnInit() {
  }

}
