import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { TransactionListComponent } from './myexpenses/transaction-list/transaction-list.component';
import { CreateTransactionComponent } from './myexpenses/create-transaction/create-transaction.component';
import { TransactionDetailsComponent } from './myexpenses/transaction-details/transaction-details.component';
import { UpdateTransactionComponent } from './myexpenses/update-transaction/update-transaction.component';
import { TransactionsbtwdatesComponent } from './myexpenses/transactionsbtwdates/transactionsbtwdates.component';
const routes: Routes = [
  //{ path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: UserListComponent ,canActivate:[AuthGuard] },
  { path: 'details/:id', component: UserDetailsComponent,canActivate:[AuthGuard] },
  { path: 'update/:id', component: UpdateUserComponent,canActivate:[AuthGuard] },
  { path: 'add', component:  CreateUserComponent,canActivate:[AuthGuard]},
  {path: '',component:LoginComponent,pathMatch: 'full'},
  {path:'transactions',component:TransactionListComponent,canActivate:[AuthGuard]},
  {path:'createtransaction',component:CreateTransactionComponent,canActivate:[AuthGuard]},
  {path:'transactiondetails/:id',component:TransactionDetailsComponent,canActivate:[AuthGuard]},
  {path:'edittransaction/:id',component:UpdateTransactionComponent,canActivate:[AuthGuard]},
  {path:'filterbydates',component:TransactionsbtwdatesComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
