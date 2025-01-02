import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
 
  currentUserName: any;

  constructor(private router: Router,private apiService:ApiService) {}

  ngOnInit() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.currentUserName = parsedUser.name; 
    }
  }

  logout() {
    this.apiService.setToken(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']); 
  }
}
