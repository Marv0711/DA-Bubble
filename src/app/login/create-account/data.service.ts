import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  username!: string
  password!: string
  email!: string

  constructor() { }



    /**
   * resets all variables
   */
    resetData() {
      this.username = ''
      this.password = ''
      this.email= ''
    }
  
}
