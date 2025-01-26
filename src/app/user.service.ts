// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {

//   constructor() { }
// }


// src/app/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3030'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  // Method to fetch user data by username
  getUserByUserName(userName: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/profile?userName=${userName}`);
  }
}
