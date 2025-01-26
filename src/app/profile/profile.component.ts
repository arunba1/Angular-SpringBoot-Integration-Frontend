import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  // imports:[RouterLink]
})
export class ProfileComponent {

  clearLocal(){
    localStorage.clear();
  }

}
