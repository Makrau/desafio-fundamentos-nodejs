import Transaction from '../models/Transaction';

export interface Reducer {
  (
    previousValue: Transaction,
    currentValue: Transaction,
    currentIndex?: number,
    array?: Transaction[],
  ): Transaction;
}

interface ReducerBuilder {
  (transactionType: 'income' | 'outcome'): Reducer;
}

const reducerBuilder: ReducerBuilder = transactionType => {
  const mockTransaction: Transaction = {
    id: 'mockId',
    title: 'mockTransaction',
    type: 'income',
    value: 0,
  };

  const reducer: Reducer = (
    accumulator: Transaction,
    currentTransaction: Transaction,
  ) => {
    mockTransaction.value = accumulator.value;

    if (currentTransaction.type === transactionType) {
      mockTransaction.value = currentTransaction.value + accumulator.value;
    }

    return mockTransaction;
  };

  return reducer;
};

export default { reducerBuilder };
