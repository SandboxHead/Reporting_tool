import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logined = false;
  username = '';
  constructor(private http: HttpClient) { }
  host = "http://localhost:5000";
  authToken = '';

  httpOptions = {
    headers: new HttpHeaders({
      'Auth' : this.authToken
    }),
  };

  login(username: string, password: string) : Observable<any> {
    return this.http.post<any>(this.host+"/login", { username: username, password: password })
        .pipe(map(user => {
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            this.logined = true;
            this.username = username;
            
            localStorage.setItem('currentUser', JSON.stringify(user));
            
          }
          this.logined = true;
          this.username = username;
          this.authToken = user.token;
          this.httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Auth' : this.authToken
            }),
          };
          console.log(this.authToken);
          return user;
        })
        );    
  }

  logout(): Observable<any> {
    return this.http.post<any>(this.host+'/logout', {username: this.username})
      .pipe(map(response=> {
        if(response.status === 'success'){
          this.logined = false;
          this.username = '';
          localStorage.setItem('currentUser', '');
        }
        return response;
      }))
  }


}
