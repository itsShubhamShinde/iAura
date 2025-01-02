import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

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

  constructor(private router:Router,
    private apiService:ApiService,
    private http: HttpClient) { }

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
      username: this.name,
      email: this.email,
      password: this.password
    };
    this.apiService.register(formData).subscribe(
      (response) => {
        console.log('Registration successful:', response);
        if (response && response.token) {
          this.apiService.setToken(response.token); 
        }
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration failed:', error);
        alert('Registration failed!');
      }
    );
  }

}
