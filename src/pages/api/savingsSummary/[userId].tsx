export default async function handler(req, res) {
    const { userId } = req.query;
  
    // Simulate fetching data from a database
    if (req.method === 'GET') {
      try {
        // Mock data for the user's savings summary
        const savingsSummary = {
          userId,
          currentBalance: 5000,
          projectedGrowth: [500, 600, 700, 850, 900, 1000],
          recentTransactions: [
            { id: 'TXN001', time: '2024-10-01 10:00 AM', paymentMode: 'M-Pesa', amount: 'Ksh 500' },
            { id: 'TXN002', time: '2024-10-02 02:30 PM', paymentMode: 'Bank Transfer', amount: 'Ksh 1000' },
            { id: 'TXN003', time: '2024-10-03 09:15 AM', paymentMode: 'M-Pesa', amount: 'Ksh 750' },
          ],
        };
  
        // Respond with the user's savings summary
        res.status(200).json(savingsSummary);
      } catch (error) {
        console.error('Error fetching savings summary:', error);
        res.status(500).json({ message: 'Error fetching savings summary' });
      }
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  