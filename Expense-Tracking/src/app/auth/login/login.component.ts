import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  password:any;
  email:any;

  constructor(private router: Router) {}
  login(){
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log("user",users);

    if(!this.email || !this.password){
      alert("Enter Credentials First")
    }

    const user = users.find((u: any) => u.email === this.email && u.password === this.password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/']);
    } else {
      alert('Invalid email or password!');
    }
  }
}
