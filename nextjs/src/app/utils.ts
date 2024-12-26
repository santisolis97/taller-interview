'use client';

import uniqid from 'uniqid';

export type Transaction = {
  id: string;
  amount: number;
  date: Date;
};

export const fetchTx = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve([
      {
        id: uniqid(),
        amount: 3,
        date: new Date('2023-01-01'),
      },
      {
        id: uniqid(),
        amount: 6,
        date: new Date('2022-01-01'),
      },
      {
        id: uniqid(),
        amount: 8,
        date: new Date('2021-01-01'),
      },
      {
        id: uniqid(),
        amount: 1,
        date: new Date('2020-01-01'),
      },
      {
        id: uniqid(),
        amount: 5,
        date: new Date('2019-01-01'),
      },
    ]);
  }, 300);
});
