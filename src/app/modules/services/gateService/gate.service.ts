import { Injectable } from '@angular/core';
import { AuthServiceService } from '../../auth/auth-service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GateService {
  
  private gateListapi = environment.serviceUrl + '/gateApi/gateList';

  constructor(private fauth: AuthServiceService,private http: HttpClient) { }

  getListOfGates() {
    return this.http.post(this.gateListapi,{data:"ALL"}, this.fauth.getHeaders());
   
  }

}
