import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  expenseId: any;

  constructor(private router: Router, private route: ActivatedRoute) { }

  category: any;
  amount: any;
  comments: any;
  arr: any[] = [];

  ngOnInit() {
    this.expenseId = this.route.snapshot.paramMap.get('id');
    this.expenseId = parseInt(this.expenseId, 10);
    console.log("par", this.expenseId);

    const storedArr = localStorage.getItem('expenses');
    if (storedArr) {
      this.arr = JSON.parse(storedArr);
    }
    if (this.expenseId !== -1) {
      const expense = this.arr[this.expenseId];
      if (expense) {
        this.category = expense.category;
        this.amount = expense.amount;
        this.comments = expense.comments;
      }
    }
  }

  submit() {
    const currentDate = new Date();
    if(!this.category){
      alert("Enter Fields First..!")
    }
    if (this.expenseId === -1) {
      console.log(this.category,this.amount);
      
      this.arr.push({
        category: this.category,
        amount: this.amount,
        comments: this.comments,
        createdAt: currentDate.toISOString(),
        updatedAt: null
      });
    } else {
      this.arr[this.expenseId] = {
        category: this.category,
        amount: this.amount,
        comments: this.comments,
        createdAt: this.arr[this.expenseId].createdAt, 
        updatedAt: currentDate.toISOString() 
      };
    }
    this.category = '';
    this.amount = null;
    this.comments = '';

    localStorage.setItem('expenses', JSON.stringify(this.arr));
    this.router.navigate(['/']);
  }
}
