import { DeleteForever, Edit, Update } from '@mui/icons-material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../../../sidebar/Sidebar';
import AddPayments from './AddPayments';
import PaymentsInfo from './ListPayments';

const PaymentLoansInfo = () => {
  const [loans, setLoans] = useState([]);

  const location = useLocation();

  const clientId = location.pathname.split('/')[2];
  const loanId = location.pathname.split('/')[3];

  console.log(loanId);
  console.log(clientId);
  const GetLoans = async () => {
    try {
      const response = await fetch(`http://localhost:8000/loan/${loanId}`, {
        method: 'GET',
        headers: { Authorization: localStorage.getItem('token') },
      });

      const parseRes = await response.json();

      setLoans(parseRes);
    } catch (error) {
      console.log(error.message);
    }
  };

  async function updateLoan() {
    try {
      await fetch(`http://localhost:8000/loan/${loanId}`, {
        method: 'PATCH',
        headers: { Authorization: localStorage.getItem('token') },
      });
    } catch (error) {
      console.log(error.message);
    }
  }
  // console.log(loanId);

  // setBalance(loans[0].balance);
  // console.log(loans.client_id);

  useEffect(() => {
    GetLoans();
  }, []);

  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>

      <div className='w-full mx-auto px-8 pt-6 pb-8 mb-4 bg-white shadow-md rounded'>
        {/* TITLE */}
        <div className='px-4 py-5 sm:px-6 bg-red-500 mb-5'>
          <h3 className='text-lg font-medium leading-6 text-white'>
            Payment for Loan Voucher #{loanId}
          </h3>
          <p className='mt-1 max-w-2xl text-sm text-white'>
            Add a payment for a client
          </p>
        </div>

        {/* Loans Information */}
        <div>
          <div className='flex items-center justify-between border-y-2 mt-5'>
            <h3 className='text-lg font-medium leading-6 text-gray my-2  px-1 py-2 '>
              Client's Loans
            </h3>
            {/* <button
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-auto ml-auto '
              onClick={() => updateLoan()}
            >
              Update Loan
            </button> */}
          </div>
          <table className='table-fixed text-center '>
            <thead>
              <tr>
                <th className='w-1/1 px-1 py-2 text-gray-600'>Voucher</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Gross Loan</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>
                  Outstanding Balance
                </th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Amortization</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Terms</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Date Released</th>
                <th className='w-1/6 px-4 py-2 text-gray-600'>Status</th>
              </tr>
            </thead>
            <tbody>
              {loans.length <= 0 ? (
                <tr className='border px-4 py-2 bg-red-50'>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className='px-4 py-2 bg-red-50'>No Loan Data</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              ) : (
                <tr>
                  <td className='border px-4 py-2 bg-gray-50'>{loans.id}</td>
                  <td className='border px-4 py-2 '>₱ {loans.gross_loan}</td>
                  <td className='border px-4 py-2 '>₱ {loans.balance}</td>
                  <td className='border px-4 py-2 bg-gray-50'>
                    ₱ {loans.amort}
                  </td>
                  <td className='border px-4 py-2 '>{loans.terms} month/s</td>
                  <td className='border px-4 py-2 bg-gray-50'>
                    {new Date(loans.date_released).toDateString()}
                  </td>
                  <td className='border px-4 py-2 '>
                    {loans.status === 'Approved' ||
                    loans.status === 'Fully Paid' ? (
                      <span className=' bg-green-500 text-white px-4 py-1 rounded-md'>
                        {loans.status}
                      </span>
                    ) : loans.status === 'Declined' ? (
                      <span className=' bg-red-400 text-white px-4 py-1 rounded-md'>
                        {loans.status}
                      </span>
                    ) : loans.status === 'Pending' ? (
                      <span className=' bg-yellow-300 text-white px-4 py-1 rounded-md'>
                        {loans.status}
                      </span>
                    ) : (
                      <span className=' bg-orange-300 text-white px-4 py-1 rounded-md'>
                        {loans.status}
                      </span>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Payment Form */}
        <AddPayments
          loanId={loanId}
          balance={loans.balance}
          clientId={clientId}
        />
      </div>
    </div>
  );
};

export default PaymentLoansInfo;