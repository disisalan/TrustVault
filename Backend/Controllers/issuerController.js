const User = require('../Models/User'); // Adjust the path and model name as needed
const Document = require('../Models/Document'); // Adjust the path and model name as needed

exports.profile = async (req, res) => {
    try {
      const userId = req.user.userId || req.user.id;
      
      // Fetch the user data from the database
      const userData = await User.findByPk(userId);
      
      if (!userData) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Send a response with dashboard info (customize as needed)
      res.json({
        message: `Welcome to your Profile , ${userData.username}`,
        user: {
          id: userData.id,
          username: userData.username,
          userId:userData.user_id,
          name:userData.name,
          email: userData.email,
          role: userData.role,
          public_key:userData.public_key        // include any other dashboard-specific data here
        }
      });
    } catch (error) {
      console.error('Dashboard error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
exports.uploadDocument = async (req, res) => {
    try {
      // Get the logged-in issuer's ID (from JWT middleware)
      const issuerId = req.user.userId || req.user.id;
      
      // Fetch issuer data to verify they exist
      const issuerData = await User.findByPk(issuerId);
      if (!issuerData) {
        return res.status(404).json({ error: 'Issuer not found' });
      }
      
      // Expected fields from frontend:
      // - file (handled by multer, available as req.file)
      // - document_name (optional; you can default to file.originalname)
      // - receiver_id (required)
      // - metadata (optional, sent as JSON string)
      
      // Check if file is provided
      if (!req.file) {
        return res.status(400).json({ error: 'File is required' });
      }
      
      // Retrieve file and other fields
      const { document_name, receiver_id, metadata } = req.body;
      console.log(document_name,receiver_id,metadata)
      // Compute SHA-256 hash of the file
    //   const fileBuffer = fs.readFileSync(req.file.path);
    //   const fileHash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
      
      // Optional: Upload file to IPFS or another storage service here,
      // then set the storage_uri to the returned URI. For now, we'll use the local path.
      const storage_uri = req.file.path;
      
      // Create a new document record in the database
      const documentRecord = await Document.create({
        document_name: document_name || req.file.originalname,
        document_hash: 123445,
        issuer_id: issuerData.user_id, // Note: database column is user_id in User model
        receiver_id:receiver_id,
        metadata: metadata ? JSON.parse(metadata) : null,
        storage_uri
      });
      
      res.status(201).json({
        message: 'Document uploaded and recorded successfully',
      });
      
    } catch (error) {
      console.error('Upload Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
