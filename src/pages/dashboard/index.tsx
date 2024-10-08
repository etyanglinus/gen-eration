import { ArcElement, CategoryScale, Chart as ChartJS, Legend, LineElement, LinearScale, PointElement, Tooltip } from 'chart.js';
import { Doughnut, Line } from 'react-chartjs-2';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

// Registering the necessary elements for the charts
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

const SavingsSummary = () => {
  const currentUser = "User"; // Replace with the actual user name if available
  const currentBalance = "Ksh 50,000"; // Replace with actual balance logic

  // Sample data for the charts
  const goalProgressData = {
    labels: ['Completed', 'Remaining'],
    datasets: [
      {
        label: 'Goal Progress',
        data: [60, 40], // 60% completed
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
        data: [50000, 52000, 54000, 56000, 58000, 60000], // Example data
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
          <h3>Welcome, {currentUser}!</h3>
          <div className="balance-section">
            <p>Current Balance: <strong>{currentBalance}</strong></p>
            <div className="button-group">
              <button className="add-funds-button">Add Funds</button>
              <button className="withdraw-button">Withdraw</button>
            </div>
          </div>
        </div>

        <h4>Your Savings Summary</h4>

        <div className="summary-sections">

          {/* Projected Growth - Line Chart */}
          <div className="line-chart-card">
            <h4>Projected Growth</h4>
            <div className="chart-container">
              <Line data={projectedGrowthData} width={300} height={300} />
            </div>
          </div>

          {/* Goal Progress - Donut Chart (Outside Card) */}
          <div className="donut-chart-container">
            <h4>Goal Progress</h4>
            <div className="chart-container">
              <Doughnut data={goalProgressData} width={300} height={300} />
            </div>
          </div>
        </div>

        {/* Recent Transactions - Table (at bottom) */}
        <div className="transaction-section">
          <h4>Recent Transactions</h4>
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
              <tr>
                <td>#TXN1234</td>
                <td>Oct 3, 2024</td>
                <td>M-Pesa</td>
                <td>Ksh 5,000</td>
              </tr>
              <tr>
                <td>#TXN1235</td>
                <td>Oct 1, 2024</td>
                <td>Bank Transfer</td>
                <td>Ksh 2,000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Scoped CSS for this component */}
      <style jsx>{`
        * {
          font-family: 'Poppins', sans-serif;
        }

        .container {
          margin-left: 250px; /* Add left margin to avoid obstruction by sidebar */
          padding: 20px; /* Add padding for better spacing */
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

        .card {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          color: black;
        }

        .line-chart-card {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

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
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        .transaction-table th {
          background-color: royalblue;
          color: white;
        }

        .transaction-table tr:hover {
          background-color: #f1f1f1;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default SavingsSummary;
