import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  password:any;
  email:any;

  constructor(private router: Router,private apiService: ApiService) {}
  login() {
    if (!this.email || !this.password) {
      alert("Enter Credentials First");
      return;
    }

    const credentials = {
      email: this.email,
      password: this.password,
    };

    this.apiService.login(credentials).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.apiService.setToken(response.token);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Invalid email or password!');
      }
    );
  }
}
