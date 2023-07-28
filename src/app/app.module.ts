import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { LoginComponent } from './login/login.component';
import { BnNgIdleService } from 'bn-ng-idle';
import { TransactionListComponent } from './myexpenses/transaction-list/transaction-list.component';
import { CreateTransactionComponent } from './myexpenses/create-transaction/create-transaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateTransactionComponent } from './myexpenses/update-transaction/update-transaction.component';
import { TransactionDetailsComponent } from './myexpenses/transaction-details/transaction-details.component';
import { TransactionsbtwdatesComponent } from './myexpenses/transactionsbtwdates/transactionsbtwdates.component';
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailsComponent,
    UpdateUserComponent,
    CreateUserComponent,
    LoginComponent,
    TransactionListComponent,
    CreateTransactionComponent,
    UpdateTransactionComponent,
    TransactionDetailsComponent,
    TransactionsbtwdatesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BnNgIdleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
