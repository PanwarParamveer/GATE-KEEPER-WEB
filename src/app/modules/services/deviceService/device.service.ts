import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private getRegistredDevice = environment.serviceUrl + '/deviceApi/device/getRegistredDevice';

  constructor(private fauth: AuthServiceService, private http: HttpClient, private loader: NgxUiLoaderService) { }

getListOfDevice() {
return this.http.post(this.getRegistredDevice, {}, this.fauth.getHeaders());
}

}
