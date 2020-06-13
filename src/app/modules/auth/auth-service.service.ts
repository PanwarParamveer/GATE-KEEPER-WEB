import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { auth } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  
newRegistration: boolean;

  resetPassword(email: any) {
    this.ngxService.start();
    this.afAuth.auth.sendPasswordResetEmail(email).then(d=>{ 
      this.ngxService.stop();
      this.toastr.success(' <br>A passwrod reset link has been sent to your email id.',"Email sent",{ timeOut: 60000});     
      this.router.navigate(['/login']);    
    }).catch(e=>{
      this.toastr.error(e.message);
      this.ngxService.stop();
    });
  }

  public myToken;
  private eventAuthError = new BehaviorSubject<string>('test');
  eventAuthError$ = this.eventAuthError.asObservable();

  newUser: any;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router, private http: HttpClient,
    private ngxService: NgxUiLoaderService,
    private toastr: ToastrService
  ) {
   
    this.afAuth.auth.onAuthStateChanged((user) => {
      if(this.newRegistration){   
        this.newRegistration =false;    
        setTimeout(function() {
          location.reload();
          this.router.navigate(['/organizationProfile']);
        }, 5000);      
        return;
      }
      if (user) {
        this.ngxService.stop();
        user.getIdToken(true).then(token => {
          sessionStorage.setItem('token', token.toString());
          this.toastr.info('Welcome ' + this.afAuth.auth.currentUser.displayName, 'Welcome');
          this.router.navigate(['/dashboard']);
        }).catch((e) => {
          this.ngxService.stop();
          sessionStorage.setItem('token', null);
          this.router.navigate(['/login']);
        });
      } else {
        this.ngxService.stop();
        sessionStorage.setItem('token', null);
        this.router.navigate(['/login']);
      }
    });

  }





  login(email: string, password: string) {
    this.ngxService.start();
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.ngxService.stop();
        this.eventAuthError.next(error);
      });
      
  }

  loginWithGoogle() {    
    var provider = new auth.GoogleAuthProvider();
    this.afAuth.auth.signInWithPopup(provider).catch(error => {
      this.ngxService.stop();
      this.eventAuthError.next(error);
    });
  }


  signUpByGoogle() {
    this.ngxService.start();
    const provider = new auth.GoogleAuthProvider();
      this.afAuth.auth.signInWithPopup(provider).then(userCredential=>{    
        this.newRegistration=true;
          
      
    }).catch(error=>{
      this.ngxService.stop();
      this.eventAuthError.next(error);
    });
  }




  createUser(user) {
    this.ngxService.start();
     this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(userAuth => {
      this.newRegistration=true;
      userAuth.user.updateProfile({
        displayName:user.first_name+ " "+ user.last_name        
      });
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
        authorization: 'Bearer ' + sessionStorage.getItem('token')
      })
    };
    return httpOptions;
  }

}
