import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompanyService } from '../services/company.service';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  public myToken;
  private eventAuthError = new BehaviorSubject<string>('test');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,private http : HttpClient,
    private ngxService: NgxUiLoaderService
    ) {

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        user.getIdToken().then(token => {
          localStorage.setItem('token', token.toString());
        }).catch((e) => {
          this.router.navigate(['/login']);
        });
      } else {
        localStorage.setItem('token', null);
        this.router.navigate(['/login']);
      }
    })

  }





  getUserState() {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    this.ngxService.start();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.ngxService.stop();
        this.eventAuthError.next(error);
      })
      .then(userCredential => {
        this.ngxService.stop();
        if (userCredential) {
          this.router.navigate(['/members']);
        }
      });
  }

  createUser(user) {
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .then(userCredential => {
        this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
        // Stop the foreground loading after 5s
       

        userCredential.user.getIdToken().then(token=>{
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              authorization: 'Bearer ' + token.toString()
            })
          };

          const url_ = environment.serviceUrl + '/companyApi/company/createAccount';
        

          this.http.post(url_, 
            {'organization_name':user.organization_name,
            'organization_type':user.organization_type,
            'email':user.email,
          }, httpOptions)
          .subscribe(res => {
            this.ngxService.stop();
           this.router.navigate(['/members']);
          });

        }).catch(error => {
          this.ngxService.stop();
          this.eventAuthError.next(error);
        });
       
        
        
        // this.companyService.createCompany(user);

        // this.router.navigate(['/members']);
      })
      .catch(error => {
        this.ngxService.stop();
        this.eventAuthError.next(error);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }


  getHeaders() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return httpOptions;
  }

}
