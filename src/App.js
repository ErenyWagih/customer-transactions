import React, { useEffect, useState } from 'react';
import './App.css';
import { Chart } from 'chart.js/auto';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const data = {
      customers: [
        { id: 1, name: 'Ahmed Ali' },
        { id: 2, name: 'Aya Elsayed' },
        { id: 3, name: 'Mina Adel' },
        { id: 4, name: 'Sarah Reda' },
        { id: 5, name: 'Mohamed Sayed' },
        { id: 6, name: 'Ereny Wagih' },
        { id: 7, name: 'Eman Samy' },
        { id: 8, name: 'Said Mido' },
      ],
      transactions: [
        { id: 1, customer_id: 1, date: '2022-01-01', amount: 1000 },
        { id: 2, customer_id: 1, date: '2022-01-02', amount: 2000 },
        { id: 3, customer_id: 2, date: '2022-01-01', amount: 550 },
        { id: 4, customer_id: 3, date: '2022-01-01', amount: 500 },
        { id: 5, customer_id: 2, date: '2022-01-02', amount: 1300 },
        { id: 6, customer_id: 4, date: '2022-01-01', amount: 750 },
        { id: 7, customer_id: 3, date: '2022-01-02', amount: 1250 },
        { id: 8, customer_id: 5, date: '2022-01-01', amount: 2500 },
        { id: 9, customer_id: 5, date: '2022-01-02', amount: 875 },
        { id: 10, customer_id: 6, date: '2022-01-01', amount: 200 },
        { id: 11, customer_id: 5, date: '2022-01-02', amount: 963 },
        { id: 12, customer_id: 7, date: '2022-01-01', amount: 300 },
        { id: 13, customer_id: 8, date: '2022-01-02', amount: 1010 },
      ],
    };

    setCustomers(data.customers);
    setTransactions(data.transactions);
    setFilteredTransactions(data.transactions);

    const ctx = document.getElementById('transactionGraph').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.transactions.map(t => t.date),
        datasets: [{
          label: 'Transaction Amount',
          data: data.transactions.map(t => t.amount),
          backgroundColor: 'rgba(255, 255, 255, 0.2)',  
          borderColor: 'rgba(255, 255, 255, 1)',  
          borderWidth: 2,
          tension: 0.4, 
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            beginAtZero: true,
            ticks: {
              color: 'white'  
            }
          },
          y: {
            beginAtZero: true,
            ticks: {
              color: 'white'
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: 'white' 
            }
          },
          tooltip: {
            titleColor: 'white',  
            bodyColor: 'white',  
          }
        }
      }
    });
  }, []);

  const handleFilterName = (e) => {
    const value = e.target.value.toLowerCase();
    const filtered = transactions.filter(transaction =>
      customers.find(customer =>
        customer.id === transaction.customer_id && customer.name.toLowerCase().includes(value)
      )
    );
    setFilteredTransactions(filtered);
  };

  const handleFilterAmount = (e) => {
    const value = e.target.value;
    const filtered = transactions.filter(transaction =>
      transaction.amount >= value
    );
    setFilteredTransactions(filtered);
  };

  return (
    <div className="App">
      <section className="py-5">
        <div className="container">
          <h1 className="title">Customer Transactions</h1>
          <div className="row d-flex mb-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Search By Customer Name"
                onChange={handleFilterName}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Search By Amount"
                onChange={handleFilterAmount}
              />
            </div>
          </div>

          <div className="content">
            <div className="table-container">
              <table className="mt-4 w-100 bg-white" id="transactionsTable">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Customer ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody id="body">
                  {filteredTransactions.map(transaction => {
                    const customer = customers.find(c => c.id === transaction.customer_id);
                    return (
                      <tr key={transaction.id}>
                        <td>{customer ? customer.name : 'Unknown'}</td>
                        <td>{transaction.customer_id}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.amount}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="graph-container">
              <canvas id="transactionGraph"></canvas>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
