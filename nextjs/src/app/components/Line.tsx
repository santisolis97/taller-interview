import React from 'react';
import { Transaction } from '../utils';

type LineProps = Transaction;

export const Line = ({ amount, id, date }: LineProps) => {
  return (
    <div className='flex w-full text-white justify-between'>
      <p>{id}</p>
      <p>{amount}</p>
      <p>{date.toDateString()}</p>
    </div>
  );
};
