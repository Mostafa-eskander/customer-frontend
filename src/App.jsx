import {RouterProvider, createBrowserRouter} from 'react-router-dom';

import RootLayout from './pages/Root';
import ErrorPage from './pages/Error';
import HomePage from './pages/Home';
import CustomerDetail, {
  loader as customerLoader,
  action as deleteCustomerAction,
} from './pages/CustomerDetail';
import AuthenticationPage, {action as AuthAction} from './pages/Authentication';
import RootCustomer from './pages/RootCustomers';
import CustomersPage from './pages/Customers';
import EditCustomer from './pages/EditCustomer';
import NewCustomer from './pages/NewCustomers';
import {action as manipulateEventAction} from './components/CustomerForm';
import {loader as tokenLoader} from './util/auth';
import {action as logoutAction } from './pages/Logout';
import { loader as loaderCustomers } from './pages/Customers';
import {action as actionCustomer} from './components/CustomerForm';
import {action as actionTransaction} from './components/TransactionForm';
import CustomerTransaction from './pages/CustomerTransactions';
import NewTransaction from './pages/NewTransaction';
import { loader as loaderTransaction } from './pages/CustomerTransactions';
import {loader as transactionFormLoader} from './components/TransactionForm';
import RootTransactions from './pages/RootTransaction';
import Transaction from './pages/Transaction';
import {loader as loaderTransactions } from './pages/Transaction'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {index: true,element: <HomePage />},
      {
        path: 'customers',
        element: <RootCustomer />,
        children: [
          {
            index: true, 
            element: <CustomersPage />,
            loader: loaderCustomers
          },
          {
            path: ':customerId',
            id: 'customer-detail',
            loader: customerLoader,
            children: [
              {
                index: true, 
                element: <CustomerDetail />,
                action: deleteCustomerAction,
              },
              {
                path: 'edit', 
                element: <EditCustomer />,
                action: manipulateEventAction
              },
              {
                path: 'transaction',
                element: <Transaction />,
                loader: loaderTransactions
              }
          ],
        },
        {
          path: 'new', 
          element: <NewCustomer />,
          action: actionCustomer,
        },
        ]
      },
      {
        path: 'transactions',
        element: <RootTransactions />,
        loader: loaderTransaction,
        id: 'transactionsLoader',
        children: [
          {
            index: true,
            element: <CustomerTransaction />,
            loader: loaderTransaction,
          },
          {
            path: 'newTransaction',
            element: <NewTransaction />,
            loader: transactionFormLoader,
            action: actionTransaction,
          },
        ]
      },
      {
        path: 'auth', 
        element: <AuthenticationPage />,
        action: AuthAction
      },
      {
        path: 'Logout',
        action: logoutAction
      }
    ]
  }
])
function App() {
  return(
    <RouterProvider  router={router}/>
  )
}

export default App;
