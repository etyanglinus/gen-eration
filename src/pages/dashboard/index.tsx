import {
  ArcElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { jsPDF } from 'jspdf';
import { useRouter } from 'next/router'; // Import useRouter from Next.js
import { useEffect, useState } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import Modal from 'react-modal';
import { utils, writeFile } from 'xlsx';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

const SavingsSummary = () => {
  const [savingsData, setSavingsData] = useState<SavingsData | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState<number | ''>(''); // Amount field added
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<any[]>([]);
  const userId = '1'; // Replace with the actual user ID

  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchSavingsSummary = async () => {
      try {
        const response = await fetch(`/api/savingsSummary/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch savings summary');
        }
        const data = await response.json();
        setSavingsData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching savings summary:', err);
      }
    };

    const fetchUserName = async () => {
      try {
        const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/user/id/1');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const userData = await response.json();
        setUserName(userData.name);
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/tid/1');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const transactionData = await response.json();
        setTransactions(transactionData);
        setFilteredTransactions(transactionData); // Initially show all transactions
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchSavingsSummary();
    fetchUserName();
    fetchTransactions();

    const interval = setInterval(fetchSavingsSummary, 30000); // Poll every 30 seconds
    return () => clearInterval(interval); // Clean up
  }, [userId]);

  // Handle modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handlePaymentSubmit = async () => {
    try {
      const response = await fetch('https://amsha-gen-96609f863a46.herokuapp.com/api/transactions/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentMethod, phoneNumber, amount }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate payment');
      }

      // Handle success case and redirect
      closeModal();
      router.push('/dashboard/waitForTransaction'); // Redirect to the waitForTransaction page
    } catch (error) {
      console.error('Payment initiation error:', error);
    }
  };

  // Export functions
  const exportPDF = () => {
    if (!savingsData || !savingsData.recentTransactions) {
      console.error('No recent transactions to export.');
      return;
    }
    const doc = new jsPDF();
    doc.text('Recent Transactions', 10, 10);
    let yPosition = 20;
    savingsData.recentTransactions.forEach((transaction) => {
      doc.text(`Transaction ID: ${transaction.id} - Amount: ${transaction.amount}`, 10, yPosition);
      yPosition += 10;
    });
    doc.save('transactions.pdf');
  };

  const exportExcel = () => {
    if (!savingsData || !savingsData.recentTransactions) {
      console.error('No recent transactions to export.');
      return;
    }
    const ws = utils.json_to_sheet(savingsData.recentTransactions);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Transactions');
    writeFile(wb, 'transactions.xlsx');
  };

  const exportCSV = () => {
    if (!savingsData || !savingsData.recentTransactions) {
      console.error('No recent transactions to export.');
      return;
    }
    const ws = utils.json_to_sheet(savingsData.recentTransactions);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Transactions');
    writeFile(wb, 'transactions.csv');
  };

  // Filter transactions
  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filterValue = event.target.value.toLowerCase();
    const filtered = transactions.filter((transaction) =>
      transaction.id.toLowerCase().includes(filterValue) ||
      transaction.paymentMode.toLowerCase().includes(filterValue)
    );
    setFilteredTransactions(filtered);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!savingsData || !userName) {
    return <div>Loading...</div>;
  }

  const goalProgressData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Goal Progress',
        data: [60, 40], // You can replace these with dynamic data as needed
        backgroundColor: ['orange', 'lightgray'],
        borderWidth: 1,
      },
    ],
  };

  const projectedGrowthData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Projected Growth',
        data: savingsData.projectedGrowth,
        fill: false,
        borderColor: 'royalblue',
        tension: 0.1,
      },
    ],
  };

  return (
    <DashboardLayout>
      <div className="container">
        <div className="header-section">
          <h3>Welcome, {userName}!</h3>
          <div className="balance-section">
            <p>Current Balance: <strong>Ksh {savingsData.currentBalance}</strong></p>
            <div className="button-group">
              <button className="add-funds-button" onClick={openModal}>Add Funds</button>
              <button className="withdraw-button" onClick={openModal}>Withdraw</button>
            </div>
          </div>
        </div>

        <h4>Your Savings Summary</h4>

        <div className="summary-sections">
          <div className="line-chart-card">
            <h4>Projected Growth</h4>
            <div className="chart-container">
              <Line data={projectedGrowthData} width={300} height={300} />
            </div>
          </div>

          <div className="donut-chart-container">
            <h4>Goal Progress</h4>
            <div className="chart-container">
              <Doughnut data={goalProgressData} width={300} height={300} />
            </div>
          </div>
        </div>

        <div className="transaction-section">
          <h4>Recent Transactions</h4>
          <input type="text" placeholder="Filter transactions" onChange={handleFilter} />
          <button onClick={exportPDF}>Export as PDF</button>
          <button onClick={exportExcel}>Export as Excel</button>
          <button onClick={exportCSV}>Export as CSV</button>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>Time</th>
                <th>Mode of Payment</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.time}</td>
                  <td>{transaction.paymentMode}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2>Deposit Funds</h2>
        <select onChange={(e) => setPaymentMethod(e.target.value)} value={paymentMethod}>
          <option value="M-Pesa">M-Pesa</option>
          <option value="Bank Transfer">Bank Transfer</option>
        </select>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button onClick={handlePaymentSubmit}>Submit</button>
        <button onClick={closeModal}>Close</button>
      </Modal>

      <style jsx>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        .container {
          margin-left: 250px;
          padding: 20px;
        }

        .header-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        h3 {
          color: black;
          font-size: 24px;
          margin: 0;
        }

        .balance-section {
          display: flex;
          align-items: center;
        }

        .balance-section p {
          margin-right: 20px;
        }

        .button-group {
          display: flex;
          gap: 10px;
        }

        .add-funds-button,
        .withdraw-button {
          padding: 10px 15px;
          background-color: royalblue;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .add-funds-button:hover,
        .withdraw-button:hover {
          background-color: orange;
        }

        h4 {
          color: black;
          font-size: 20px;
          margin: 20px 0 10px;
        }

        .summary-sections {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }

        .line-chart-card,
        .donut-chart-container {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .chart-container {
          width: 300px;
          height: 300px;
          margin: 0 auto;
        }

        .transaction-section {
          margin-top: 20px;
        }

        .transaction-table {
          width: 100%;
          border-collapse: collapse;
        }

        .transaction-table th,
        .transaction-table td {
          padding: 10px;
          border: 1px solid #ddd;
        }

        .transaction-table th {
          background-color: #f8f8f8;
        }

        .transaction-table tbody tr:nth-child(even) {
          background-color: #f8f8f8;
        }

        .transaction-table tbody tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default SavingsSummary;
