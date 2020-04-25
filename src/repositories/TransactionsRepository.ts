import Transaction from '../models/Transaction';
import transactionsHelper, { Reducer } from '../helpers/transactionsHelpers';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}
class TransactionsRepository {
  private transactions: Transaction[];

  private incomeReducer: Reducer;

  private outcomeReducer: Reducer;

  constructor() {
    this.transactions = [];
    this.incomeReducer = transactionsHelper.reducerBuilder('income');
    this.outcomeReducer = transactionsHelper.reducerBuilder('outcome');
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    if (this.transactions.length === 0) {
      return { income: 0, outcome: 0, total: 0 };
    }

    const mockInitialValue: Transaction = {
      id: 'mockId',
      title: 'mockTransaction',
      type: 'income',
      value: 0,
    };

    const income = this.transactions.reduce(
      this.incomeReducer,
      mockInitialValue,
    ).value;
    const outcome = this.transactions.reduce(
      this.outcomeReducer,
      mockInitialValue,
    ).value;
    const total = income - outcome;
    const balance: Balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
