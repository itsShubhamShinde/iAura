import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router:Router) { }

  register() {
    if(!this.name || !this.email || !this.password){
      alert("Enter Field First..!")
      return;
    }
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const formData = {
      name: this.name,
      email: this.email,
      password: this.password,
      loggedIn:false
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
 
    if (users.some((user: any) => user.email === this.email)) {
      alert('This email is already registered!');
      return;
    }

    users.push(formData);

    localStorage.setItem('users', JSON.stringify(users));
    console.log("USer",users);
    
    this.router.navigate(['/login']);
  }

}
