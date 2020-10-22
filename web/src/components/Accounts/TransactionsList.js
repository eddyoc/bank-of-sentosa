import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { useTable } from 'react-table';
import { columns } from './TransactionsGridColumns';
import { sortByDate } from 'utils';
import { AccountSummary } from 'components/Accounts';

import './TransactionsList.scss';

const TableHeader = ({
  headerGroups
}) => {
  return (
    <thead>
    {headerGroups.map(headerGroup => (
      <tr {...headerGroup.getHeaderGroupProps()}>
        {headerGroup.headers.map(column => (
          <th {...column.getHeaderProps()}>{column.render('Header')}</th>
        ))}
      </tr>
    ))}
    </thead>
  )
};

const TableRow = ({
  row,
}) => {
  const { cells } = row;
  const rowProps = row.getRowProps();
  return (
    <tr {...rowProps}>
      {cells.map(cell => {
        const { className } = cell.column;
        return (
          <td {...cell.getCellProps({ className })}>
            {cell.render("Cell")}
          </td>
        );
      })}
    </tr>
  )
};

const TableBody = ({
  tableBodyProps,
  rows,
  prepareRow,
}) => {
  return (
    <tbody {...tableBodyProps}>
    {rows.map(row => {
      prepareRow(row);
      return <TableRow row={row} />;
    })}
    </tbody>
  )
};

const TransactionsList = ({
  account,
  transactions,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: transactions,
  });

  const tableBodyProps = getTableBodyProps();
  return (
    <Fragment>
      <h1>Transaction Details</h1>
      <div className="list-header">
        <AccountSummary {...account} />
      </div>
      <table className="transactions-grid" {...getTableProps()}>
        <TableHeader headerGroups={headerGroups} />
        <TableBody tableBodyProps={tableBodyProps} rows={rows} prepareRow={prepareRow} />
      </table>
    </Fragment>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {
    transactions: { data: transactionsData },
    accounts: { data: accountsData },
  } = state;
  const { accountId } = ownProps.match.params;
  const account = accountsData.find(x => x._id === accountId);
  const transactions = transactionsData
    .filter(el => el.accountId === accountId)
    .sort(sortByDate);

  return { transactions, account };
};

const _TransactionsList = connect(mapStateToProps)(TransactionsList);
export { _TransactionsList as TransactionsList };
