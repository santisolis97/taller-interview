'use client';
import { SyntheticEvent, useEffect, useState } from 'react';
import { Line } from './components/Line';
import { fetchTx, Transaction } from './utils';

export default function Home() {
  const [txs, setTx] = useState<Transaction[]>([]);
  const [filteredTx, setFilteredTx] = useState<Transaction[]>([]);
  const [value, setValue] = useState(0);
  const [error, setError] = useState('');
  const [range, setRange] = useState<Array<Date | undefined>>([
    undefined,
    undefined,
  ]);
  const [transactionsSum, setTransactionsSum] = useState<Transaction[]>([]);

  useEffect(() => {
    const getTx = async () => {
      const transactions: Transaction[] = await fetchTx;
      setTx(transactions);
    };

    getTx();
  }, []);

  const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(Number(e.target.value));
  };

  const handleCheck = () => {
    if (value > 0) {
      let foundValue = undefined;
      let inspectingValue = undefined;
      for (let i = 0; i < txs.length; i++) {
        inspectingValue = txs[i];
        foundValue = txs.find((tx) => tx.amount + txs[i].amount === value);
      }
      if (foundValue && inspectingValue) {
        setTransactionsSum([foundValue, inspectingValue]);
        setError('');
      } else {
        setError('No matching transactions found.');
      }
    }
  };

  const handleOnChangeStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange((prev) => [e.target.value, prev[1]]);
    console.log(e.target.value);
  };
  const handleOnChangeEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRange((prev) => [prev[0], e.target.value]);
    console.log(e.target.value);
  };

  const handleFilterByDate = () => {
    if (range[0] && range[1]) {
      const filteredTx = txs.filter(
        (tx) => tx.date >= new Date(range[0]) && tx.date <= new Date(range[1])
      );
      console.log({ filteredTx });
      setFilteredTx(filteredTx);
    }
  };

  return (
    <div className='w-full px-6'>
      <p>All Transactions</p>
      {txs.map((tx) => {
        return (
          <Line date={tx.date} key={tx.id} id={tx.id} amount={tx.amount} />
        );
      })}
      <div className='py-8 flex flex-col gap-2'>
        <label>Enter Sum Amount: </label>
        <br />
        <input
          type='number'
          className='text-black'
          onChange={handleTextInput}
        />
        <br />
        <button className='p-8 border-white border-2' onClick={handleCheck}>
          Check Transactions
        </button>
      </div>
      {error && <p>{error}</p>}
      <p className='text-white'>
        {transactionsSum.map((tx) => {
          return (
            <Line date={tx.date} key={tx.id} id={tx.id} amount={tx.amount} />
          );
        })}
      </p>
      <div className='flex flex-col py-8'>
        <p>Filter By Date</p>
        <div>
          <label>Start Date</label>
          <input type='date' onChange={handleOnChangeStartDate} />
        </div>
        <div>
          <label>End Date</label>
          <input type='date' onChange={handleOnChangeEndDate} />
        </div>
      </div>
      <button
        className='p-8 border-white border-2'
        onClick={handleFilterByDate}
      >
        Filter
      </button>
      <p>Results</p>
      {filteredTx.map((tx) => {
        return (
          <Line date={tx.date} key={tx.id} id={tx.id} amount={tx.amount} />
        );
      })}
    </div>
  );
}
