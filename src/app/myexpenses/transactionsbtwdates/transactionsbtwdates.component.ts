import { Component, OnInit } from '@angular/core';
import { transaction } from 'src/app/transaction';
import { ExpensesService } from 'src/app/expenses.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transactionsbtwdates',
  templateUrl: './transactionsbtwdates.component.html',
  styleUrls: ['./transactionsbtwdates.component.css'],
})
export class TransactionsbtwdatesComponent implements OnInit {
  originalStartdate!: Date;
  originalEnddate!: Date;
  startdate!: Date;
  enddate!: Date;
  localuserid!: number;
  userid!: number;
  trans: any[] = [];
  constructor(
    private expensesService: ExpensesService,
    private router: Router
  ) {}
  ngOnInit(): void {}
  onSubmit() {
    this.startdate = new Date(this.originalStartdate);
    this.startdate.setDate(this.startdate.getDate() - 1);
    this.enddate = new Date(this.originalEnddate);
    this.enddate.setDate(this.enddate.getDate() + 1);
    if (sessionStorage.getItem('userid') !== null) {
      this.localuserid = parseInt(sessionStorage.getItem('userid') ?? '0', 10);
    }
    this.expensesService
      .getTransactionByDates(
        this.startdate.toISOString().slice(0, 10),
        this.enddate.toISOString().slice(0, 10),
        this.localuserid
      )
      .subscribe(
        (data) => {
          this.trans = data;
          console.log(
            this.startdate.toISOString().slice(0, 10) +
              '----' +
              this.enddate.toISOString().slice(0, 10)
          );
          console.log('Transactions Fetched');
          console.log(this.localuserid);
        },
        (error) => console.log(error)
      );
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
        this.onSubmit();
      },
      (error) => console.log(error)
    );
  }
}
