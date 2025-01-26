import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders } from '@angular/common/http';

let arr=['Arun','Arunbalaji'];

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  loginForm: FormGroup;

  data:string | null = null;;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3),this.alphaValidator]],//Validations
      password: ['', [Validators.required, Validators.minLength(6)]],
      
    });
  }

  numericValidator(control: AbstractControl): ValidationErrors | null {   //custom defined
    const value = control.value;
    if (value && !/^\d+$/.test(value)) {   //Regular expression for only digits should come.
      return { notNumeric: true }; // Return an error object
    }
    return null; // Return null if validation passes
  }

  alphaValidator(control:AbstractControl): ValidationErrors | null{
    const value = control.value;
    if(value && /^\d+$/.test(value)){
      return {notAlpha:true};
    }
    return null;
  }

  
  
onSubmit() {
  if (this.loginForm.valid) {
      const username = this.loginForm.value.userName;
      const password = this.loginForm.value.password;
      const dataToSend = JSON.stringify({ username, password });
      console.log(dataToSend);
      const apiUrl = 'http://localhost:8080/submit';
      const awshostposturl = 'https://qor7li8ydl.execute-api.us-east-1.amazonaws.com/sd'
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      // if(userName==arr[0] && password==arr[1]){
      this.http.post(apiUrl, dataToSend, { headers }).subscribe({
          next: (response: any) => {
              console.log('POST request successful', response);
              if ((response?.message === 'Data received successfully')) {
                  this.router.navigate(['/profile']);
              } else {
                  console.error('Unexpected response from server:', response);
              }
            
          },
          error: (error) => {
              console.error('POST request error', error);
          }
        
      });
    // }
  } else {
      this.loginForm.markAllAsTouched();
  }
}



getData() {
  const apiUrl = 'http://localhost:3000/sd';

  const awshostgeturl = 'https://qor7li8ydl.execute-api.us-east-1.amazonaws.com/sd'

  this.http.get(apiUrl, { responseType: 'text' }).subscribe({
    next: (response) => {
      console.log('GET request successful', response);
      this.data = response; // Assign the response data to the component variable
    },
    error: (error) => {
      console.error('GET request error', error);
    }
  });
}


}
