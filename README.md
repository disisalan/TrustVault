

## 🛡️ TrustVault — Blockchain-based Document Transaction System

**TrustVault** is a secure and decentralized document transaction and verification system that ensures the authenticity of digital documents using blockchain technology.

In traditional systems, verifying whether a certificate or document is legitimate often requires contacting the issuing authority. TrustVault eliminates that bottleneck by storing cryptographic proofs of documents on the blockchain — allowing **anyone to verify authenticity without relying on third parties**.

---

### ✨ Key Features:
- ✅ **Immutable Verification**: Once stored on-chain, document proof cannot be tampered with.
- 🔐 **Issuer/Receiver Binding**: Each document is tied to its issuer and receiver IDs to prevent spoofing.
- ⚙️ **Smart Contract Integration**: Securely stores the hash of verified documents on the blockchain.
- 📄 **Backend API**: Handles document verification, status updates, and transaction logging.
- 🔗 **Transaction Metadata**: Stores both transaction hash and block hash for every on-chain verification.



## 🧰 Technologies Used

### Frontend  
`React.js`, `Tailwind CSS`, `Axios`  

### Backend  
`Node.js`, `Express.js`, `Sequelize ORM`, `PostgreSQL`, `Ethers.js`, `Hardhat`, `Solidity`  

---

## 🛠️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/disisalan/trustvault.git
cd trustvault/Backend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables  
Create a `.env` file inside the `Backend` folder with the following:
```
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_HOST=localhost
PORT=5000
```

### 4. Run Database Migrations (if using Sequelize CLI)
```bash
npx sequelize-cli db:migrate
```

### 5. Start the Local Blockchain
```bash
npx hardhat node
```

### 6. Deploy the Smart Contract
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 7. Start the Backend Server
```bash
node app.js
```


### 8. Run the Frontend

In a **new terminal**:

```bash
cd ../Frontend
npm install
npm run dev
```

> The frontend will be available at `http://localhost:5173` 

> You should see the API running at `http://localhost:5050`

---

## 📸 Screenshots

### 🧑‍🎓 Receiver Dashboard  
> Displays all verified documents issued to the receiver.

![Receiver Dashboard](/Screenshots/1.png)

---

### 🧑‍🏫 Sender Dashboard  
> Shows issued documents, pending verifications, and quick actions for the sender.

![Sender Dashboard](/Screenshots/2.png)

---

### 📝 Document Issue Page  
> Allows the sender to fill in details and issue a document to a verified receiver.

![Document Issue Page](/Screenshots/3.png)

---

### 🔁 Document Transaction Page  
> Verifies documents on the blockchain and shows transaction details like block hash and transaction hash.

![Document Transaction Page](/Screenshots/4.png)

---

### ⛓️ Hardhat Local Blockchain  
> Local Ethereum testnet used to deploy and test smart contracts.

![Hardhat Simulation](/Screenshots/5.png)

---
