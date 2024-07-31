import { ethers } from 'hardhat';

async function main() {
  const ZeroTransferFactory = await ethers.getContractFactory(
    'ZeroTransferAttack'
  );
  const zerotransfer = await ZeroTransferFactory.deploy();
  zerotransfer.waitForDeployment();
  console.log(`${zerotransfer.target}`);
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
