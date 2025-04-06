const hre = require("hardhat");

async function main() {
  const DocumentVerifier = await hre.ethers.getContractFactory("DocumentVerifier");
  const contract = await DocumentVerifier.deploy(); // deploy contract

  await contract.waitForDeployment(); // wait for deployment (v6 syntax)

  console.log("Contract deployed at:", await contract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });