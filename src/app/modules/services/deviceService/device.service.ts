import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthServiceService } from '../../auth/auth-service.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DeviceService {
 
  private getDeviceList = environment.serviceUrl + '/deviceApi/device/getDeviceList';
  private updateDeviceNameApi = environment.serviceUrl + '/deviceApi/device/updateDeviceName';
  private getDeviceInfoapi = environment.serviceUrl + '/deviceApi/device/getDeviceInfo';
  private getListOfDeviceWithAccessCountApi = environment.serviceUrl + '/deviceApi/device/getListOfDeviceWithAccessCount';
  private getUserDeviceAccess = environment.serviceUrl + '/deviceApi/device/getUserDeviceAccess';
  // tslint:disable-next-line:variable-name
  private createNewDeviceAccess_api = environment.serviceUrl + '/deviceApi/device/createNewDeviceAccess';

  // tslint:disable-next-line:variable-name
  private getActiveUserAndIdList_api = environment.serviceUrl + '/deviceApi/device/getActiveUserAndIdList';

  constructor(private fauth: AuthServiceService, private http: HttpClient, private loader: NgxUiLoaderService) { }

  getShortListOfDevice() {
    return this.http.post(this.getDeviceList, {}, this.fauth.getHeaders());
  }

  getDeviceInfo(deviceid: string) {
    return this.http.post(this.getDeviceInfoapi, {device_id:deviceid}, this.fauth.getHeaders());
  }

  updateDeviceName(deviceId: string, newDeviceName: string) {
    return this.http.post(this.updateDeviceNameApi, {device_id:deviceId,device_name:newDeviceName}, this.fauth.getHeaders());
  }

  getListOfDeviceWithAccessCount() {
    return this.http.post(this.getListOfDeviceWithAccessCountApi, {}, this.fauth.getHeaders());
  }

  getDeviceAccess(data) {
    return this.http.post(this.getUserDeviceAccess, data, this.fauth.getHeaders());
  }

  getdrpUserDeviceList(): any {
    return this.http.post(this.getActiveUserAndIdList_api, {}, this.fauth.getHeaders());
  }


  // tslint:disable-next-line:variable-name
  createNewDeviceAccess(_user_sys_id: string, _device_id: string,_expiry_date: string): any {
    return this.http.post(this.createNewDeviceAccess_api, 
      {user_sys_id: _user_sys_id, device_id: _device_id, expiry_date: _expiry_date}, this.fauth.getHeaders());
  }



}
