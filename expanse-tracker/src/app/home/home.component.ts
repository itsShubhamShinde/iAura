import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  arr: any[] = [];

  constructor(private router: Router,private apiService:ApiService) {}

  ngOnInit(): void {
    this.apiService.getExpenses().subscribe(
      (response) => {
        console.log('Fetched expenses:', response);
        this.arr = response; 
      },
      (error) => {
        console.error('Error fetching expenses:', error);
        alert('Failed to load expenses.');
      }
    );
  }

  deleteExpense(id:any){
    console.log(id );
    
    this.apiService.deleteExpense(id).subscribe(
      (response) => {
        console.log('Expense deleted:', response);
      },
      (error) => {
        console.error('Error deleting expense:', error);
      }
    );
  }

}
