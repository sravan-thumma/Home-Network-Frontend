import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { transaction } from 'src/app/transaction';
import { ExpensesService } from 'src/app/expenses.service';
@Component({
  selector: 'app-update-transaction',
  templateUrl: './update-transaction.component.html',
  styleUrls: ['./update-transaction.component.css'],
})
export class UpdateTransactionComponent implements OnInit {
  transactionid!: string;
  trans!: transaction;
  localuserid!: number;
  userid!: number;
  constructor(
    private router: Router,
    private expensesservice: ExpensesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('userid') !== null) {
      this.localuserid = parseInt(sessionStorage.getItem('userid') ?? '0', 10);
    }
    this.trans = new transaction();
    this.transactionid = this.route.snapshot.params['id'];
    this.expensesservice.getTransaction(this.transactionid).subscribe(
      (data) => {
        this.trans = data;
        this.userid = this.trans.user.id;
        console.log(this.localuserid + '----' + this.userid);
      },
      (error) => console.log(error)
    );
  }
 async updateTransaction() {
  //await this.http.get(url,this.httpOptions).toPromise().then((data:any)=>
    await this.expensesservice
      .updateTransaction(this.transactionid, this.trans)
      .toPromise().then(
        (data) => console.log(data),
        (error) => console.log(error)
      );
    this.trans = new transaction();
    this.gotoList();
  }
  async onSubmit() {
    await this.updateTransaction();
  }
  gotoList() {
    this.router.navigateByUrl('transactions');
  }
}
