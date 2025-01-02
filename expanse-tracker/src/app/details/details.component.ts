import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  expenseId: any;
  category: any;
  amount: any;
  comments: any;
  arr: any[] = [];
  createdAt: any;

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private apiService: ApiService,
    private http: HttpClient 
  ) {}

  ngOnInit() {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    this.expenseId = parseInt(this.expenseId, 10);
    console.log("Expense ID:", this.expenseId);

    if (this.expenseId !== -1) {
      this.apiService.getExpenses().subscribe(
        (expenses: any[]) => {
          const expense = expenses[this.expenseId];
          if (expense) {
            this.category = expense.category;
            this.amount = expense.amount;
            this.comments = expense.comments;
            this.createdAt = expense.createdAt;
          }
        },
        (error: any) => {
          console.error('Error fetching expenses:', error);
        }
      );
    }
  }

  submit() {
    const currentDate = new Date();
    if (!this.category || !this.amount || !this.comments) {
      alert("Please fill in all the fields!");
      return;
    }

    const expenseData = {
      category: this.category,
      amount: this.amount,
      comments: this.comments,
      createdAt: this.expenseId === -1 ? currentDate.toISOString() : this.createdAt,
      updatedAt: currentDate.toISOString()
    };

    if (this.expenseId === -1) {
      this.http.post('http://localhost:5000/api/expenses/add-expense', expenseData).subscribe({
        next: (response) => {
          console.log('Response:', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Error:', error);
          alert(error.error?.message || 'Registration failed. Please try again.');
        }
      });
      // this.apiService.addExpense(expenseData).subscribe(
      //   (response) => {
      //     console.log('Expense added:', response);
      //     this.router.navigate(['/']);
      //   },
      //   (error) => {
      //     console.error('Error adding expense:', error);
      //   }
      // );
    } else {
      this.apiService.updateExpense(this.expenseId, expenseData).subscribe(
        (response) => {
          console.log('Expense updated:', response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Error updating expense:', error);
        }
      );
    }

    // Reset form fields
    this.category = '';
    this.amount = null;
    this.comments = '';
    this.createdAt='';
  }
}
