export default async function handler(req, res) {
    if (req.method === 'POST') {
      const { paymentMethod, phoneNumber } = req.body;
  
      try {
        // Simulate payment processing
        console.log('Initiating payment...');
        console.log('Payment method:', paymentMethod);
        console.log('Phone number:', phoneNumber);
  
        // Simulate success response from payment provider
        res.status(200).json({ message: 'Payment initiated successfully!' });
      } catch (error) {
        console.error('Error initiating payment:', error);
        res.status(500).json({ message: 'Error initiating payment' });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  