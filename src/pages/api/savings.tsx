// pages/api/savings.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    // Simulate savings data
    const savingsData = {
      totalSavings: 4500,
      goalProgress: 75,
      recentTransactions: [
        { date: '2024-10-01', type: 'Deposit', amount: 500 },
        { date: '2024-09-15', type: 'Withdrawal', amount: 200 },
        { date: '2024-09-10', type: 'Deposit', amount: 1000 },
      ],
      projectedGrowth: 5200, // Future growth simulation (with interest)
    };
    
    res.status(200).json(savingsData);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};
