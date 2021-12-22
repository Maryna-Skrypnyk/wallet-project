import { createSelector } from '@reduxjs/toolkit';

const getTransactions = state => state.transactions.result;
const getTransactionsUser = state => state.auth.user.transactions;
const getLoading = state => state.transactions.loading;
const getError = state => state.transactions.error;
const getFilter = state => state.transactions.filter;
const getStatistics = state => state.transactions.result;
const getYears = state => state.transactions.result.uniqueYear;

const getVisibleTransactions = createSelector(
  [getTransactions, getFilter],
  (transactions, filter) => {
    return transactions.filter(({ data }) => data.includes(filter));
  },
);

const transactionsSelectors = {
  getTransactions,
  getTransactionsUser,
  getLoading,
  getError,
  getFilter,
  getStatistics,
  getVisibleTransactions,
  getYears,
};
export default transactionsSelectors;
