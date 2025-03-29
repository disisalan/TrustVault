const {sequelize,connectdb} = require('./Config/db');
const User = require('./Models/User');
const Document = require('./Models/Document');
const Transaction = require('./Models/Transaction');

(async () => {
  try {
    // Synchronize models with the database (force: true drops tables first - use only for testing!)
    await sequelize.sync({ force: true });

    // Create dummy users: one issuer, one receiver, and one verifier
    const dummyIssuer = await User.create({
      username:"User1",
      name: "Dummy Issuer",
      email: "issuer@example.com",
      role: "issuer",
      password_hash: "hashedpassword", // In a real app, use bcrypt to hash your password
      public_key: "dummyIssuerPublicKey"
    });

    const dummyReceiver = await User.create({
      username:"User2",
      name: "Dummy Receiver",
      email: "receiver@example.com",
      role: "receiver",
      password_hash: "hashedpassword",
      public_key: "dummyReceiverPublicKey"
    });

    const dummyVerifier = await User.create({
      username:"User3",
      name: "Dummy Verifier",
      email: "verifier@example.com",
      role: "verifier",
      password_hash: "hashedpassword",
      public_key: "dummyVerifierPublicKey"
    });

    console.log("Dummy users created:", {
      issuerId: dummyIssuer.user_id,
      receiverId: dummyReceiver.user_id,
      verifierId: dummyVerifier.user_id
    });

    // Create a dummy document referencing the dummy issuer and receiver
    const dummyDocument = await Document.create({
      document_name:"Document1",
      document_hash: "dummyDocumentHash", // Normally a SHA-256 hash of your document
      issuer_id: dummyIssuer.user_id,
      receiver_id: dummyReceiver.user_id,
      metadata: { title: "Test Document", issuedDate: new Date() },
      storage_uri: "http://dummy.uri/document"
    });

    console.log("Dummy document created:", { documentId: dummyDocument.document_id });

    // Create a dummy transaction referencing the dummy document
    const dummyTransaction = await Transaction.create({
      document_id: dummyDocument.document_id,
      composite_hash: "dummyCompositeHash", // Should be calculated from the document hash, issuer, and receiver
      signed_hash: "dummySignedHash",         // Dummy signature for testing purposes
      blockchain_tx_id: "dummyBlockchainTxId",  // Placeholder for blockchain transaction reference
      status: "pending"
    });

    console.log("Dummy transaction created:", { transactionId: dummyTransaction.transaction_id });

    // Close the database connection gracefully
    await sequelize.close();
    console.log("Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("Error creating dummy data:", error);
    process.exit(1);
  }
})();
