const {sequelize,connectdb} = require('./Config/db');
const User = require('./Models/User');
const Document = require('./Models/Document');
const Transaction = require('./Models/Transaction');

(async () => {
  try {
  
    // Create a dummy document referencing the dummy issuer and receiver
    const dummyDocument = await Document.create({
      document_name:"Document1",
      document_hash: "dummyDocumentHash", // Normally a SHA-256 hash of your document
      issuer_id: "4f175b8c-b7ba-4b35-9b14-fe567fa32d3f",
      receiver_id: "4f175b8c-b7ba-4b35-9b14-fe567fa32d3f",
      metadata: { title: "Test Document", issuedDate: new Date() },
      storage_uri: "http://dummy.uri/document"
    });
    const dummyDocument2 = await Document.create({
      document_name:"Document1",
      document_hash: "dummyDocumentHash", // Normally a SHA-256 hash of your document
      issuer_id: "4f175b8c-b7ba-4b35-9b14-fe567fa32d3f",
      receiver_id:  "4f175b8c-b7ba-4b35-9b14-fe567fa32d3f",
      metadata: { title: "Test Document", issuedDate: new Date() },
      storage_uri: "http://dummy.uri/document"
    });
    const dummyDocument3 = await Document.create({
      document_name:"Document1",
      document_hash: "dummyDocumentHash", // Normally a SHA-256 hash of your document
      issuer_id: "4f175b8c-b7ba-4b35-9b14-fe567fa32d3f",
      receiver_id:  "4f175b8c-b7ba-4b35-9b14-fe567fa32d3f",
      metadata: { title: "Test Document", issuedDate: new Date() },
      storage_uri: "http://dummy.uri/document"
    });

    // Close the database connection gracefully
    await sequelize.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating dummy data:", error);
    process.exit(1);
  }
})();
