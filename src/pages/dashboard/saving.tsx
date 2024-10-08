import { useState } from 'react';
import DashboardLayout from '../../components/Dashboard/DashboardLayout';

const MergedSavingsPage = () => {
  const [monthlyExpenses, setMonthlyExpenses] = useState(0);
  const [fundSize, setFundSize] = useState(0);
  const [emergencyFund, setEmergencyFund] = useState(0);

  // Savings Challenges state
  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: 'Save Ksh 10,000 in 30 Days',
      description: 'Challenge yourself to save Ksh 10,000 within the next 30 days!',
      isCompleted: false,
      reward: 'Badge of Honor',
    },
    {
      id: 2,
      title: 'Reduce Entertainment Spending by 20%',
      description: 'Cut your entertainment spending by 20% this month and save more!',
      isCompleted: false,
      reward: '20% Discount on Next Purchase',
    },
    {
      id: 3,
      title: 'Save 10% of Monthly Income',
      description: 'Set aside 10% of your monthly income as savings for the future.',
      isCompleted: false,
      reward: 'Free Financial Consultation',
    },
  ]);

  // Function to mark a challenge as completed
  const completeChallenge = (id) => {
    setChallenges((prevChallenges) =>
      prevChallenges.map((challenge) =>
        challenge.id === id ? { ...challenge, isCompleted: true } : challenge
      )
    );
  };

  // Calculate emergency fund size
  const calculateFundSize = () => {
    const calculatedSize = monthlyExpenses * 3; // Typically 3-6 months of expenses
    setFundSize(calculatedSize);
  };

  return (
    <DashboardLayout>
      <div className="merged-savings-page">
        {/* Savings Plans Section */}
        <section className="savings-plans">
          <h3>Savings Plans</h3>
          <p>Details and information about various savings plans offered to users.</p>
        </section>

        {/* Emergency Fund Planner Section */}
        <section className="emergency-fund-planner">
          <h3>Emergency Fund Planner</h3>
          <div className="calculator">
            <h4>Fund Size Calculator</h4>
            <input
              type="number"
              placeholder="Enter your monthly expenses"
              value={monthlyExpenses}
              onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
            />
            <button onClick={calculateFundSize}>Calculate Fund Size</button>
            {fundSize > 0 && <p>Your recommended emergency fund size: Ksh {fundSize}</p>}
          </div>
          <div className="progress-tracker">
            <h4>Emergency Fund Progress</h4>
            <input
              type="number"
              placeholder="Enter amount saved"
              onChange={(e) => setEmergencyFund(Number(e.target.value))}
            />
            <p>Current Emergency Fund: Ksh {emergencyFund}</p>
            <p>
              Remaining to reach your goal: Ksh {fundSize - emergencyFund > 0 ? fundSize - emergencyFund : 0}
            </p>
          </div>
        </section>

        {/* Offers Section */}
        <section className="offers">
          <h3>Exclusive Offers</h3>
          <div className="offers-list">
            <p>1. Get a 5% bonus when you save Ksh 20,000 or more.</p>
            <p>2. Refer a friend and earn Ksh 500 when they sign up and save Ksh 10,000.</p>
            <p>3. Access discounted financial consultations for achieving savings goals.</p>
          </div>
        </section>

        {/* Savings Challenges Section */}
        <section className="savings-challenges">
          <h3>Savings Challenges</h3>
          <div className="challenges">
            {challenges.map((challenge) => (
              <div
                className={`challenge-card ${challenge.isCompleted ? 'completed' : ''}`}
                key={challenge.id}
              >
                <h4>{challenge.title}</h4>
                <p>{challenge.description}</p>
                <button
                  onClick={() => completeChallenge(challenge.id)}
                  disabled={challenge.isCompleted}
                >
                  {challenge.isCompleted ? 'Completed' : 'Join Challenge'}
                </button>
                {challenge.isCompleted && <p className="reward">Reward: {challenge.reward}</p>}
              </div>
            ))}
          </div>
        </section>
      </div>

      <style jsx>{`
        .merged-savings-page {
          padding: 20px;
          font-family: 'Poppins', sans-serif;
          padding-left: 250px;
          padding-right: 20px;
        }

        h3 {
          font-size: 28px;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
        }

        section {
          margin-bottom: 40px;
        }

        .calculator,
        .progress-tracker,
        .offers,
        .savings-challenges {
          padding: 20px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .challenges {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .challenge-card {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        button {
          padding: 10px 15px;
          background-color: royalblue;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        button:hover {
          background-color: darkblue;
        }

        button:disabled {
          background-color: gray;
          cursor: not-allowed;
        }

        .reward {
          margin-top: 10px;
          font-size: 14px;
          color: #27ae60;
          font-weight: 500;
        }

        .completed {
          background-color: #ecf0f1;
        }

        .completed h4 {
          color: #7f8c8d;
        }

        .completed button {
          background-color: gray;
        }
      `}</style>
    </DashboardLayout>
  );
};

export default MergedSavingsPage;
