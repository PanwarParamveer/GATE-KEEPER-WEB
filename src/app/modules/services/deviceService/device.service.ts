import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private getRegistredDeviceList = environment.serviceUrl + '/deviceApi/device/getRegistredDeviceList';
  private getUserDeviceAccess = environment.serviceUrl + '/deviceApi/device/getUserDeviceAccess';
  
  constructor(private fauth: AuthServiceService, private http: HttpClient, private loader: NgxUiLoaderService) { }

getListOfDevice() {
   return this.http.post(this.getRegistredDeviceList, {}, this.fauth.getHeaders());
}

getDeviceAccess(data) {
  return this.http.post(this.getUserDeviceAccess, data, this.fauth.getHeaders());
}

}
