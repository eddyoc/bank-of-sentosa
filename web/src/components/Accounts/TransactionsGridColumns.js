import accounting from 'accounting';
import { formatDate } from 'utils';

const formatMoney = (row, attribute, creditValue) => {
  const { currency: symbol } = row;
  const amount = row[attribute];
  if (creditValue === true && amount >= 0) return '';
  if (creditValue === false && amount < 0) return '';

  return accounting.formatMoney(Math.abs(amount), { symbol,  format: "%v %s" });
};

export const columns = [
  {
    Header: 'Date',
    accessor: ({ date }) => formatDate(date),
    className: 'date'
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: 'Withdrawl',
    accessor: row => formatMoney(row, 'amount', true),
    className: 'withdrawl'
  },
  {
    Header: 'Deposit',
    accessor: row => formatMoney(row, 'amount', false),
    className: 'deposit'
  },
  {
    Header: 'Balance',
    accessor: row => formatMoney(row, 'closingBalance'),
    className: 'balance'
  },
];