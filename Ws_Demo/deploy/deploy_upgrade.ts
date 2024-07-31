import { ethers } from 'hardhat';

async function deploy_upgrade() {
  const WS = ethers.getContractFactory('WsTokenUp');
  const ws = (await WS).deploy();
  (await ws).waitForDeployment();
  console.log(`${(await ws).target}`);
}
async function get_contract() {
  const wsp = await ethers.getContractAt(
    'WsTokenUp',
    '0xED8CAB8a931A4C0489ad3E3FB5BdEA84f74fD23E'
  );
  await wsp.initialize('WSP', 'WSP', 10000, 6);
  const [owner] = await ethers.getSigners();
  console.log(`${await wsp.balanceOf(owner)}`);
}
async function main() {
  //   await deploy_upgrade();
  await get_contract();
}

main().catch((e) => {
  console.log(e);
  process.exitCode = 1;
});
