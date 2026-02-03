const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/auth');
const multer = require('multer');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documents/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

// Get all documents
router.get('/', authenticateToken, async (req, res) => {
  try {
    const documents = [
      {
        id: 1,
        name: 'Purchase Agreement - Porsche 911.pdf',
        type: 'contract',
        size: 245632,
        uploadDate: '2024-01-15T10:30:00Z',
        category: 'Contracts',
        url: '/uploads/documents/purchase-agreement.pdf'
      },
      {
        id: 2,
        name: 'Vehicle Registration.pdf',
        type: 'registration',
        size: 189456,
        uploadDate: '2024-01-14T15:20:00Z',
        category: 'Registration',
        url: '/uploads/documents/registration.pdf'
      },
      {
        id: 3,
        name: 'Insurance Certificate.pdf',
        type: 'insurance',
        size: 321789,
        uploadDate: '2024-01-10T09:15:00Z',
        category: 'Insurance',
        url: '/uploads/documents/insurance.pdf'
      }
    ];
    res.json({ success: true, documents });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Upload document
router.post('/upload', authenticateToken, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }
    
    const document = {
      id: Date.now(),
      name: req.file.originalname,
      type: req.body.type || 'other',
      size: req.file.size,
      uploadDate: new Date().toISOString(),
      category: req.body.category || 'General',
      url: '/uploads/documents/' + req.file.filename
    };
    
    // Save to database
    res.json({ success: true, document });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Download document
router.get('/:id/download', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Get document from database and send file
    res.json({ success: true, message: 'Document download initiated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Delete document
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    // Delete from filesystem and database
    res.json({ success: true, message: 'Document deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Update document metadata
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, type } = req.body;
    // Update in database
    res.json({ success: true, message: 'Document updated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;