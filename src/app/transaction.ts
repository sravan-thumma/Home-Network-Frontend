import { user } from './user';

export class transaction {
  id!: string;
  user!: user;
  date!: Date;
  repayDate!: Date;
  description!: string;
  debitCard!: string;
  creditCard!: string;
  borrowedFromMe!: string;
  borrowedByMe!: string;
  status!: string;
  userId!: number;
}
