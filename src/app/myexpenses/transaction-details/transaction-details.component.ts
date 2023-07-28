import { Component,OnInit } from '@angular/core';
import { ExpensesService } from 'src/app/expenses.service';
import { transaction } from 'src/app/transaction';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  transactionid!:string;
  trans!:transaction;
  localuserid!:number;
  userid!:number;
  constructor(private expensesservice:ExpensesService,private router:Router,private route:ActivatedRoute){
  }
ngOnInit(): void {
  if(sessionStorage.getItem("userid")!==null){
    this.localuserid=parseInt(sessionStorage.getItem("userid")??'0',10);
  }
    this.trans=new transaction();
    this.transactionid=this.route.snapshot.params['id'];
    this.expensesservice.getTransaction(this.transactionid).subscribe(data => {
      this.trans=data;
      this.userid=this.trans.user.id;
      console.log(this.localuserid +"----" +this.userid);
    },
      error => console.log(error));
}
list(){
  this.router.navigateByUrl("/transactions");
}
}
