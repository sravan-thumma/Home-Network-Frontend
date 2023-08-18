import { Component, HostListener, OnInit,OnChanges } from '@angular/core';
import { transaction } from 'src/app/transaction';
import { ActivatedRoute,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ExpensesService } from 'src/app/expenses.service';
import { user } from 'src/app/user';

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
  userid!:number;
  role!:any;
  constructor(
    private expensesService: ExpensesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    if (this.route.snapshot.paramMap.has('User')) {
        this.route.params.subscribe((params) => {
          this.role=sessionStorage.getItem('role');
          if(this.role==='Admin'){
            this.userid = params['User'];
            this.reloadData();
          }else{
            this.userid = parseInt(sessionStorage.getItem('userid') ?? '0', 10);
            this.reloadData();
          }
        });
    }else if(this.route.snapshot.paramMap.has('Action')){
      this.route.params.subscribe((params) => {
        const createdTransaction = params['Action'];
        if (createdTransaction) {
          console.log("Action:Refresh");
          this.userid = parseInt(sessionStorage.getItem('userid') ?? '0', 10);
          this.reloadData();
        }
      });
    }else{
      this.userid = parseInt(sessionStorage.getItem('userid') ?? '0', 10);
      this.reloadData();
    }
  }
  
  reloadData() {
    //let userid = parseInt(sessionStorage.getItem('userid') ?? '0', 10);
    if (sessionStorage.getItem('userid') !== null) {
      let user=this.userid;
      console.log(user)
      //this.transactions=this.expensesService.getTransactionByUserId(userid).;
      this.expensesService.getTransactionByUserId(user).subscribe(
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
