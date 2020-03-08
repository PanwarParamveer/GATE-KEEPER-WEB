import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }

getUserDetails(){
  return {

    first_name:"paramveer",
    last_name:"panwar",
    role:"admin",
    photo:"assets/dist/img/avatar2.png"

  }
}

}
