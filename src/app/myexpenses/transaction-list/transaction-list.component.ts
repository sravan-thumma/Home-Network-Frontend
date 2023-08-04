import { Component, HostListener, OnInit } from '@angular/core';
import { transaction } from 'src/app/transaction';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpensesService } from 'src/app/expenses.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css'],
})
export class TransactionListComponent implements OnInit {
  /*@HostListener('window:focus', ['$event'])
  onFocus(event: any): void {
    console.log('Window focused, refreshing page...');
    window.location.reload();
  }*/
  //transactions!:Observable<transaction[]>;
  transactions: any[] = [];
  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.reloadData();
  }
  reloadData() {
    let userid = parseInt(sessionStorage.getItem('userid') ?? '0', 10);
    if (sessionStorage.getItem('userid') !== null) {
      //this.transactions=this.expensesService.getTransactionByUserId(userid).;
      this.expensesService.getTransactionByUserId(userid).subscribe(
        (transactions) => {
          this.transactions = transactions;
          console.log('Transactions Fetched');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  transactionDetails(id: string) {
    this.router.navigate(['transactiondetails', id]);
  }
  updateTransaction(id: string) {
    this.router.navigate(['edittransaction', id]);
  }
  deleteTransaction(id: string) {
    this.expensesService.deleteTransaction(id).subscribe(
      (data) => {
        console.log(data);
        this.reloadData();
      },
      (error) => console.log(error)
    );
  }
}
