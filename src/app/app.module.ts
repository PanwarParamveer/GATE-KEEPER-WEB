import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './modules/layout/layout.module';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxUiLoaderModule, NgxUiLoaderRouterModule } from 'ngx-ui-loader';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MomentModule } from 'ngx-moment';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule,
    NgxUiLoaderRouterModule,
    BrowserAnimationsModule,
    NgSelectModule,
    AngularFireStorageModule,
    
    
  MomentModule,
    ToastrModule.forRoot(
      {
        timeOut: 8000,
        positionClass: 'toast-top-center',
        enableHtml: true,
        preventDuplicates: true,
        closeButton: true
      }
    )
  ],
  providers: [AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
