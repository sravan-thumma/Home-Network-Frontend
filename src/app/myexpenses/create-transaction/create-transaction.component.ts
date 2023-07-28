import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { transaction } from 'src/app/transaction';
import { ExpensesService } from 'src/app/expenses.service';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent{
  //transactionForm!: FormGroup;
  trans:transaction=new transaction();
  transtype!:string;
  submitted=false;
  constructor(private expensesService:ExpensesService,private router:Router){}
onSubmit(){
  console.log(this.transtype);
  console.log(this.trans);
 /* if (
    !this.trans.debitCard &&
    !this.trans.creditCard &&
    !this.trans.borrowedFromMe &&
    !this.trans.borrowedByMe
  ) {
    this.transactionForm.setErrors({ requiredOneField: true });
    return;
  } */
  let userid=parseInt(sessionStorage.getItem("userid")??'0',10);
  if(sessionStorage.getItem("userid")!==null){
    this.trans.userId=userid;
  }
  console.log("Logic")
  this.submitted = true;
  this.save();
}
save(){
  this.expensesService.createTransaction(this.trans)
  .subscribe(
    data=>console.log(data),error=>console.log(error)
  );
  this.trans=new transaction();
  this.gotoList();
}
gotoList(){
  this.router.navigateByUrl('/transactions');
}
todayDate(): string {
  const today = new Date();
  // Format the date as "yyyy-MM-dd" to match the input type "date"
  return today.toISOString().slice(0, 10);
}
  /*isStatusRequired(): boolean {
    const borrowedFromMe = this.transactionForm.get('borrowedFromMe')?.value;
    const borrowedByMe = this.transactionForm.get('borrowedByMe')?.value;
    return borrowedFromMe || borrowedByMe;
  }*/
}
