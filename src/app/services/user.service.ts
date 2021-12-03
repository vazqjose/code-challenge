import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /*
    base path for the api we are getting the data from
  */
  baseUrl: string = 'https://jsonplaceholder.cypress.io/';

  /*
  create an instance of our http module
  */
  constructor(private http: HttpClient) { }

  /*
    get api data from GET call with the proper url
  */
  listUsers(){
    return this.http.get(this.baseUrl + 'users');
  }

  /*
    Receive a user data object and call POST method
  */
  addUser(userObj: any){
    return this.http.post(this.baseUrl + 'users', userObj)
  }

  /*
    get id parameter and call delete method
  */
  deleteUser(id: any){
    return this.http.delete(this.baseUrl + 'users/' + id)
  }

    /*
    get id parameter and call get method
  */
    viewUser(id: any){
      return this.http.get(this.baseUrl + 'users/' + id)
    }

    updateUser(id: any, userObj: any){
      return this.http.put(this.baseUrl + 'users/' + id, userObj);
    }
}
