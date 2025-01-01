import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  arr: any[] = [];

  constructor(private router: Router) {
    const storedExpenses = localStorage.getItem('expenses');
    if (storedExpenses) {
      this.arr = JSON.parse(storedExpenses);
    }
  }

  deleteExpense(index: number): void {
    this.arr.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(this.arr));
  }

  editExpense(idx: any): void {
    alert(idx);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
