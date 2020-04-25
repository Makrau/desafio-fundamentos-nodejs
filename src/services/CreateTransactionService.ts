import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  type: string;
  value: number;
  title: string;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ type, title, value }: RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type !== 'income' && type !== 'outcome') {
      throw Error('Invalid type value.');
    }

    if (value <= 0) {
      throw Error('Value must be greater than 0');
    }

    if (type === 'outcome' && balance.total < value) {
      throw Error('Insufficient balance');
    }

    const transaction = this.transactionsRepository.create({
      type,
      title,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
