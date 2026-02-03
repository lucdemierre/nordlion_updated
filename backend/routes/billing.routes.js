const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');

// Get payment methods
router.get('/payment-methods', authenticateToken, async (req, res) => {
  try {
    const paymentMethods = [
      {
        id: 1,
        type: 'card',
        brand: 'Visa',
        last4: '4242',
        expiryMonth: 12,
        expiryYear: 2025,
        isDefault: true
      },
      {
        id: 2,
        type: 'card',
        brand: 'Mastercard',
        last4: '8888',
        expiryMonth: 6,
        expiryYear: 2026,
        isDefault: false
      }
    ];
    res.json({ success: true, paymentMethods });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Add payment method
router.post('/payment-methods', authenticateToken, async (req, res) => {
  try {
    const { cardNumber, expiryMonth, expiryYear, cvc } = req.body;
    // Process payment method addition (integrate with Stripe/etc)
    res.json({ success: true, message: 'Payment method added successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete payment method
router.delete('/payment-methods/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Remove from database
    res.json({ success: true, message: 'Payment method removed' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Set default payment method
router.put('/payment-methods/:id/default', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Update database
    res.json({ success: true, message: 'Default payment method updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get transaction history
router.get('/transactions', authenticateToken, async (req, res) => {
  try {
    const transactions = [
      {
        id: 1,
        orderId: 'NL-2024-145',
        amount: 245000,
        currency: 'USD',
        status: 'completed',
        date: '2024-01-15T10:30:00Z',
        description: 'Porsche 911 Turbo S',
        paymentMethod: 'Visa •••• 4242'
      },
      {
        id: 2,
        orderId: 'NL-2024-132',
        amount: 189000,
        currency: 'USD',
        status: 'completed',
        date: '2024-01-10T14:20:00Z',
        description: 'Mercedes-AMG GT',
        paymentMethod: 'Mastercard •••• 8888'
      }
    ];
    res.json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get invoices
router.get('/invoices', authenticateToken, async (req, res) => {
  try {
    const invoices = [
      {
        id: 1,
        invoiceNumber: 'INV-2024-001',
        orderId: 'NL-2024-145',
        amount: 245000,
        date: '2024-01-15',
        status: 'paid',
        downloadUrl: '/api/billing/invoices/1/download'
      }
    ];
    res.json({ success: true, invoices });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Download invoice
router.get('/invoices/:id/download', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Generate and send PDF
    res.json({ success: true, message: 'Invoice download initiated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;